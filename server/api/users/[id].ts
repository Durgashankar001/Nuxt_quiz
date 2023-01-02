import { Quiz } from "~~/server/models/Quiz.model"
import { User } from "~~/server/models/User.models"

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;
    const data = await Quiz.find({user_id:id})
    return data
})