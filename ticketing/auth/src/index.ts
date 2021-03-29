import mongoose from 'mongoose';
import {app} from './app';

const start = async () => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT is required!');
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connected to mongodb...');
    } catch (error) {
        console.error(error);
    }
}

start();

app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
});

