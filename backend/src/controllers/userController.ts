import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { generateToken } from '../utils/auth';

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body
    console.log(username, password)

    let userCheck = await User.findOne({username})
    if(userCheck) {
      res.status(400).json({message: 'Username already exists'})
      return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username,
      password: hashedPassword
    })
    let id: any = user._id
    res.status(201).json({token: generateToken(id)})
  } catch (error) {
    console.warn(`Error in registerUser- ${error}`)
    res.status(400).json({message: `Registration failed`})
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password} = req.body
    console.log(username, password)

    let userCheck = await User.findOne({username})
    if(!userCheck) {
      res.status(404).json({message: 'User does not exist. If account not created, Register.'})
      return
    }
    let passwordCompare = await bcrypt.compare(password, userCheck.password)
    if(!passwordCompare) {
      res.status(404).json({message: 'Enter the correct password'})
      return
    }
    let id: any = userCheck._id
    res.status(200).json({token: generateToken(id)})
  } catch (error) {
    console.warn(`Error in loginUser- ${error}`)
    res.status(400).json({message: `Login failed`})
  }
}


export {
  registerUser,
  loginUser
}