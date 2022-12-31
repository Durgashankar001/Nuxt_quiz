import { User } from "~~/server/models/User.models"


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body
    try {
        let find_user = await User.findOne({ email })
        if (find_user) {
            return {
                message: "Email is already exist try using different email"
            }
        }
        const newUser = await User.create(body)
        return {
            message: "User Created",
            token: `${newUser.id}:${newUser.name}:${newUser.email}`
        }
    }
    catch (e) {
        return e
    }
})