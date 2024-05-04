import { Request, Response } from 'express'
import express from 'express'
import { notImplementedHandler } from './helpers'
import { RequestError, defaultInternalErrorHandler } from './errors'

const app = express()

app.get('/helloworld', (_req: Request, res: Response) => res.send('Hello World'))

app.listen(4005, () => console.log("Server up"))

// LOGIN AND USER MANAGEMENT
// TODO: Uraditi logovanje korisnika i omoguciti mu pregled proslih narudzbina

app.post('/login', notImplementedHandler)
app.post('/signup', notImplementedHandler)
app.get('/myorders', notImplementedHandler)

// POST PHOTOS

app.post('/imageupload', notImplementedHandler)
app.post('/photorequest', notImplementedHandler)


// ADMIN PANEL
// Query params: date from
app.get('/requests', notImplementedHandler)
app.post('/request/accept/:request', notImplementedHandler)
app.post('/request/done/:request', notImplementedHandler)

// DEFAULT ERROR HANDLER
app.use("*", (err: Error, _req: Request, res: Response, _next: any) => {
    if (err instanceof RequestError) {
        res.status(400).send({ errMsg: err.message })
    }
    else {
        defaultInternalErrorHandler(err, res)
    }
})
