<template>
    <Nav_Element />
    <marquee class="blink" behavior="scroll">Please refresh your page after completing your full quiz because we are not
        saving your quiz before you click SUBMIT button, Thank You and you Welcome!</marquee>
    <div class="question_flex">
        <div>
            <div class="question">
                <div class="question_input">
                    <label for="">Quiz Name !</label>
                    <input v-model="quiz_title" type="text" placeholder="e.g. enter quiz name">
                </div>
                <hr />
                <div class="question_details">
                    <h1>Add Questions:</h1>
                    <div class="question_add">
                        <input v-model="question_name" type="text" placeholder="e.g. enter question name">
                        <input class="btn" type="submit" value="Create" @click="handleUpdate">
                    </div>
                    <div v-if="addQuestion" class="question_details">
                        <h1>Add Options:</h1>
                        <div v-for="(data, index) in optionArray" class="option_list">
                            <div>{{ data }}</div>
                            <div class="cross" @click="handleDelete(index)">x</div>
                        </div>
                        <div class="question_add">
                            <input v-model="option_name" type="text" placeholder="e.g. enter option">
                            <input class="btn" type="submit" value="Add" @click="handleOptionPush">
                        </div>
                    </div>
                    <div v-if="correct_answer" class="question_details">
                        <h1>Correct Answer:</h1>
                        <span>( Make sure your spellings are correct )</span>
                        <div v-for="(data, index) in correct_answer_arr" class="option_list">
                            <div>{{ data }}</div>
                            <div class="cross" @click="handleDeleteanswer(index)">x</div>
                        </div>
                        <div class="question_add">
                            <input v-model="correct_question_name" type="text" placeholder="e.g. enter correct answer">
                            <input class="btn" type="submit" value="Add" @click="handleAnswerPush">
                        </div>
                    </div>

                </div>
                <input class="btn_last" type="submit" value="Add This Question" @click="handleQuestioSubmit">
            </div>
            <div class="btn_flex">
                <h1 class="quiz_submit" @click="handleQuizSubmit">Submit this Quiz</h1>
                <button class="copy" v-if="copy" @click="copyText">copy link</button>
                <button class="copy" v-if="copy" @click="openLink">open link</button>
            </div>
        </div>

        <div class="preview">
            <h2>Preview of quiz</h2>
            <h1>{{ quiz_title }}</h1>
            <div v-for="(data, index) in questionArr" class="preview_question">
                <p>{{ index + 1 }}. {{ data.name }} ?</p>
                <ul>
                    <li v-for="(option, index) in data.options">{{ option }}</li>
                </ul>
                <div class="correct">
                    <div>Correct Answer : <span v-for="(e, i) in data.correct">{{ e }},</span></div>
                    <div class="cross" @click="handleDeletequestionPreview(index)">x</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav_Element from '~~/components/nav.vue';
export default {
    data() {
        return {
            user_id: null,
            user: null,
            addQuestion: false,
            quiz_title: "",
            questionArr: [],
            optionArray: [],
            question_name: "",
            option_name: "",
            correct_answer: false,
            correct_answer_arr: [],
            correct_question_name: "",
            copy: false,
            copy_text: "",
        }
    },
    components: {
        Nav_Element
    },
    beforeCreate: function () {
        this.user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("_n_a_m_e_")) : null
        if (process.client && this.user == null) {
            return navigateTo("/registration/signin")
        }
    },
    beforeMount: function () {
        this.user_id = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("_t_o_k_e_n_")) : null
    },
    methods: {
        handleUpdate() {
            if (this.question_name == "") {
                alert("Question can't be Empty !")
                return
            }
            this.addQuestion ? this.addQuestion = false : this.addQuestion = true
        },
        handleOptionPush() {
            if (this.option_name == "") {
                alert("Option Field can't be empty")
                return
            }
            this.optionArray.push(this.option_name)
            this.option_name = ""
            this.correct_answer = true
        },
        handleDelete(index) {
            this.optionArray.splice(index, 1)
        },
        handleDeleteanswer(index) {
            this.correct_answer_arr.splice(index, 1)
        },
        handleAnswerPush() {
            if (this.correct_question_name == "") {
                alert("Correct answer fied can't be empty")
                return
            }
            this.correct_answer_arr.push(this.correct_question_name)
            this.correct_question_name = ""
        },
        handleQuestioSubmit() {
            if (this.question_name == "") {
                alert("Please Enter Question Name")
            } else if (this.optionArray.length < 2 || this.optionArray.length > 5) {
                alert("options can't be less than 2 or more than 5")
            } else if (this.correct_answer_arr.length <= 0) {
                alert("You have to mention minimum one answer")
            }
            else {
                this.questionArr.push({
                    name: this.question_name,
                    options: this.optionArray,
                    correct: this.correct_answer_arr
                })

                this.question_name = ""
                this.optionArray = []
                this.correct_answer_arr = []
                this.correct_answer = false
                this.addQuestion = false
            }
        },
        async handleQuizSubmit() {
            const id = JSON.parse(localStorage.getItem("_t_o_k_e_n_"))
            if (this.user_id == null) {
                alert("Please login first to upload quiz")
            }
            else if (this.quiz_title == "") {
                alert("Please add a title to your quiz")
            } else if (this.questionArr.length <= 4) {
                alert("Please add more than or equal to 5 questions")
            }
            else {
                try {
                    await $fetch("/api/quizs", {
                        method: "POST",
                        body: {
                            user_id: this.user_id,
                            title: this.quiz_title,
                            questions: this.questionArr,
                        }
                    })
                        .then((res) => {
                            alert("Quiz Created successfull")
                            this.quiz_title = "",
                                this.copy_text = `https://nuxt-quiz-six.vercel.app/quiz/${res.id}`,
                                this.copy = true
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                } catch (e) {
                    alert("something went wrong.Please try after some time")
                }
            }

        },
        handleDeletequestionPreview(index) {
            this.questionArr.splice(index, 1)
        },
        copyText() {
            if (this.copy) {
                navigator.clipboard.writeText(this.copy_text)
                alert("link Copied to clipBoard")
            }
        },
        openLink() {
            const link = document.createElement('a')
            link.href = this.copy_text
            link.target = '_blank'
            link.click()
        }

    }
}
</script>