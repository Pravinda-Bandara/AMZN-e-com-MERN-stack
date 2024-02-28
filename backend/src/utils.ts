import {User} from "./models/userModle.js";
import jwt from 'jsonwebtoken'
import {NextFunction,Request,Response} from "express";
export const generateToken = (user: User) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    )
}

export const isAuth=(req:Request,res:Response,next:NextFunction)=>{
    const {authorization}=req.headers
    if (authorization){
        const token=authorization.slice(7,authorization.length)//Bearer xxx
        const decode=jwt.verify(
            token,
            process.env.JWT_SECRET||'somethingsecret'
        )
        req.body.user=decode as{
            _id:string
            name:string
            email:string
            isAdmin:boolean
            token:string
        }
        next()
    }
    else{
        res.status(401).json({ message: 'NO Token' });
    }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' })
    }
}

/*export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer xxx
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret'
        );
        req.body.user = decode as {
            _id: string;
            name: string;
            email: string;
            isAdmin: boolean;
            token: string;
        };
        next();
    } else {
        res.status(401).json({ message: 'No Token' });
    }
};*/

