import {  Schema, model } from "mongoose"
const QuizSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: { type: String, required: true },
    questions: { type: Array, required: true },
}, { timestamps: true })

export const Quiz = model("quiz", QuizSchema)