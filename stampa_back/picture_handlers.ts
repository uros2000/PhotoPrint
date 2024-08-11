import multer, { FileFilterCallback } from "multer"
import { isDevelopmentMode, isTestEnv } from "./helpers"
import { Request, Response } from "express"
import sharp from "sharp"
import { RequestError } from "./errors"

const allowedImageTypes = [
    'image/png',
    'image/jpeg',
    'image/tiff',
    'image/webp'
]

function imageFileFitler(_req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
    if (!allowedImageTypes.includes(file.mimetype)) {
        callback(new Error("Tip fajla nije podrzan"))
    }

    callback(null, true)
}

const multerStorage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        const uploadFolder = isDevelopmentMode() || isTestEnv() ? 
            './uploads/' :
            './../public_html/uploads'
        callback(null, uploadFolder)
    },
    filename: (_req, file, callback) => {
        callback(null, file.fieldname + '_' + Math.floor(Math.random() * 10000000000) + '_' + Date.now() + "." + "webp")
    }
})

async function processImage(path: string) {
    const buffer = await sharp(path)
        .resize(null, 3000, {
            withoutEnlargement: true
        })
        .toBuffer()

    await sharp(buffer).toFile(path)
    return path
}

// EXPRESS HANDLERS

export const multerMiddleware = multer({ fileFilter: imageFileFitler, storage: multerStorage })

export function singlePictureUpload(req: Request, res: Response) {
    const file = req.file
    if (file == undefined) {
        throw new RequestError("Photo is not given")
    }

    processImage(file.path)
        .then(result => res.status(200).send({ picture: result }))
}

export function multiplePictureUpload(req: Request, res: Response) {
    const files = req.files
    if (files == undefined) {
        throw new RequestError("Photos are not given")
    }
    if (!(Array.isArray(files))) {
        throw new RequestError("Photos are not array")
    }

    Promise.all(files.map(file => processImage(file.path)))
        .then(results => res.status(200).send({ pictures: results }))
}
