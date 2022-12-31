<template>
    <Nav_Element />
    <div class="front_quiz" @click="handleClick">
        <div> Create Your Own Quiz</div>
        <div class="plus">+</div>
    </div>
</template>
<script>
import Nav_Element from '~~/components/nav.vue';
export default {
    components: {
        Nav_Element
    },
    methods: {
        handleClick() {
            navigateTo("/quiz/create")
        }
    }
}
</script>