import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongoose connected to database');
        })
        connection.on('error', (err) => {
            console.log('Mongoose connection error: ', err);
        })

    } catch (error) {
        console.log('Mongoose connect Eror');
        console.log(error);
    }
} 