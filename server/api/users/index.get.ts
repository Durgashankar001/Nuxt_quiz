import { User } from "~~/server/models/User.models"

export default defineEventHandler(async (event) => {
    const user = await User.find()
    return user
})