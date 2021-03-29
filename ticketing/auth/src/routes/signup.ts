import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import {validateRequest} from '../middlewares/validate-request';
import {User} from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({min: 4, max: 20}).withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} : {email:string, password:string} = req.body;
        const existedUser = await User.findOne({email});
        if (existedUser) {
            console.log('Email in use');
            throw new BadRequestError('Email in use');
        }
        const user = User.build({
            email, password
        });
        await user.save();

        //Generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET!);
        //Store jwt in session obj
        req.session = {
            jwt: userJwt
        };

        console.log('Creating user!!!');
        res.status(201).send(user);
});

export {router as signUpRouter};