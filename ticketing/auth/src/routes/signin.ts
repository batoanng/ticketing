import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import {validateRequest} from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import {User} from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({min: 4, max: 20}).withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} : {email:string, password:string} = req.body;
        const existedUser = await User.findOne({email});
        if (!existedUser) {
            throw new BadRequestError('Invalid credentials');
        }
        const passwordMatch = await Password.compare(existedUser.password, password);
        if (!passwordMatch) {
            throw new BadRequestError('Invalid credentials');
        }
        const userJwt = jwt.sign({
            id: existedUser.id,
            email: existedUser.email
        }, process.env.JWT_SECRET!);
        //Store jwt in session obj
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existedUser);
});

export {router as signInRouter};