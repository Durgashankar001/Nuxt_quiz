import { User } from "~~/server/models/User.models"


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body
    try {
        const find_user = await User.findOne({ email, password })

        if (!find_user) {
            return {
                message: "Invalid Credential"
            }
        }
        return {
            message:"Login Successfull",
            token: `${find_user.id}:${find_user.name}:${find_user.email}`
        }
    }
    catch (err) {
        return err
    }

})