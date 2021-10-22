import config from "config";
import { connect } from "mongoose";
import { ConnectOptions } from 'mongoose'

const connectDB = async () => {
    try {
        const mongoURI: string = config.get("mongoURI");
        const options: ConnectOptions = {
        };
        await connect(mongoURI, options);
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB