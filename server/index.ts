import mongoose from "mongoose"
import { Nitro } from "nitropack"
export default async (_nitroApp: Nitro) => {
    mongoose.set('strictQuery', true);
    const config = useRuntimeConfig();
    try {
        await mongoose.connect(config.mongoURI)
        console.log("Database connected")
    } catch (e) {
        console.log(e)
    }


}