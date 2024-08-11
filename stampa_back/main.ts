import { Request, Response } from 'express'
import express from 'express'
import { notImplementedHandler } from './helpers'
import { RequestError, defaultInternalError } from './errors'
import { multerMiddleware, multiplePictureUpload } from './picture_handlers'
import { destroyDBAccess } from './db/user-db'
import { getAppContext } from './context'
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()

app.get('/helloworld', (_req: Request, res: Response) => res.send('Hello World'))

// LOGIN AND USER MANAGEMENT
// TODO: Uraditi logovanje korisnika i omoguciti mu pregled proslih narudzbina

const context = getAppContext()
const handlerFactory = context.getHandlerFactory()

app.post('/login', handlerFactory.getUserLoginHandler())
app.post('/signup', handlerFactory.getUserSignUpHandler())
app.get('/myorders', notImplementedHandler)

// POST PHOTOS

app.post('/imageupload', multerMiddleware.array('pictures', 3), multiplePictureUpload)
app.post('/photorequest', notImplementedHandler)


// ADMIN PANEL
// Query params: date from
app.get('/requests', notImplementedHandler)
app.post('/request/accept', notImplementedHandler)
app.post('/request/sent', notImplementedHandler)


// DEFAULT ERROR HANDLER
app.use('*', (err: Error, _req: Request, res: Response, _next: any) => {
    if (err instanceof RequestError) {
        res.status(400).send({ errorMsg: err.message })
    }
    else {
        res.status(500).send(defaultInternalError(err))
    }
})

app.listen(4005, () => console.log("Server up"))

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    destroyDBAccess();
}