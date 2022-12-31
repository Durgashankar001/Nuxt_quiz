import { Schema, model } from "mongoose"
const QuizSchema = new Schema({
    title: { type: String, required: true },
    questions: { type: Array, required: true },
}, { timestamps: true })

export const Quiz = model("quiz", QuizSchema)