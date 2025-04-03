import express, {Application, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import userRoute from './routes/userRoute'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
  res.send('Chat server running...')
})

app.use('/api', userRoute)


connectDB()

app.listen(PORT, () => {
  console.info(`Server connected:- http://localhost:${PORT}`)
})