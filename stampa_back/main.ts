import { Request, Response } from 'express'
import express from 'express'

const app = express()

app.get('/helloworld', (_req: Request, res: Response) => res.send('Hello World'))

app.listen(4005, () => console.log("Server up"))
