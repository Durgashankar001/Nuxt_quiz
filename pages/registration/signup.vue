<template>
    <Nav_Element />
    <div class="signup">
        <h1>SIGN UP</h1>
        <div class='my_form'>
            <form action="" id="form" @submit.prevent="addData">
                <label htmlFor="">Name</label>
                <input v-model="name" type="text" placeholder='Enter your name' name='name' required />
                <label htmlFor="">Email</label>
                <input v-model="email" type="email" name="email" placeholder="Enter your email" required />
                <label htmlFor="">Password</label>
                <input v-model="password" type="password" name="password" required placeholder='Enter Password' />
                <p>Already have an account ?<NuxtLink to="/registration/signin"> Signin</NuxtLink>
                </p>
                <input type="submit" value="Submit" class="btn" />
            </form>
        </div>
    </div>
</template>
<script>
import Nav_Element from '~~/components/nav.vue';
export default {
    data() {
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    components: {
        Nav_Element
    },
    methods: {
        async addData() {
            try {
                await $fetch("/api/users/signup", {
                    method: "POST",
                    body: {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                })
                    .then((res) => {
                        alert("Registration successfull")
                        this.name = "",
                            this.email = "",
                            this.password = ""
                        navigateTo('/registration/signin')
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            } catch (e) {
                alert("something went wrong.Please try after some time")
            }
        }
    }
}
</script>