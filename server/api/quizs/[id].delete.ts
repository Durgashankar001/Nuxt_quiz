import { Quiz } from "~~/server/models/Quiz.model"

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;
    const data = await Quiz.findByIdAndDelete(id)
    return data
})