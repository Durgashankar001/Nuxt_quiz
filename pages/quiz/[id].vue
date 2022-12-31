<template>
    <h1 class="quiz_heading">The Quiz</h1>
    <p class="note">( Some Questions may have multiple options Please answer it by this way )</p>
    <div v-if="quizCompleted" class="quiz_box result">Your Score : {{ score + "/" + data.questions.length }}</div>
    <div v-else class="quiz_box">
        <p class="title">{{ current_question + 1 }}. {{ data.questions[current_question].name }} ?</p>
        <div class="list">
            <p class="green" :class="{ active: selected.includes(i) }" @click="handleClick(i, e, current_question)"
                v-for="(e, i) in data.questions[current_question].options">
                {{ e }}</p>
        </div>
        <hr>
        <div>
            <button @click="nextQuestion(data)">Next Question -></button>
        </div>
    </div>


</template>
<script setup>
const route = useRoute()
const id = route.params.id
const { data, pending } = await useAsyncData('data', () => {
    return $fetch(`/api/quizs/${id}`)
})
let current_question = useState('current_question', () => 0)
let score = useState('score', () => 0)
let selected = useState('selected', () => [])
const quizCompleted = ref(false)
const handleClick = (i, e, no) => {
    let x = selected.value.indexOf(i)
    if (x != -1) {
        selected.value.splice(x, 1)
    } else {
        selected.value = [...selected.value, i]
    }
}

const nextQuestion = (data) => {
    if (data.questions[current_question.value].correct.length === selected.value.length) {
            let temp = true
            for (let i = 0; i < selected.value.length; i++) {
                let x = data.questions[current_question.value].correct.indexOf(data.questions[current_question.value].options[selected.value[i]])
                if (x == -1) {
                    temp = false
                    break;
                }
            }

            if (temp) score.value = score.value + 1
        }
    if (current_question.value < data.questions.length - 1) {
        current_question.value = current_question.value + 1
        selected.value = []
    } else {
        quizCompleted.value = true
        current_question.value = 0
        selected.value = []
    }

}
</script>