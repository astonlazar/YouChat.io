import jwt from 'jsonwebtoken'


export const generateToken = (id: string) => {
  return jwt.sign({id}, process.env.JWT_SECRET || "secretKey", {
    expiresIn: "1h"
  })  
}