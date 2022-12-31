import { Quiz } from "~~/server/models/Quiz.model"


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        const newQuiz = await Quiz.create(body)
        return {
            message: "Quiz Created Successfull",
            id: newQuiz._id
        }
    }
    catch (err) {
        return err
    }

})