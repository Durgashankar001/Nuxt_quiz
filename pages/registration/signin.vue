<template>
    <Nav_Element />
    <div class="signup">
        <h1>SIGN IN</h1>
        <div class='my_form'>
            <form action="" id="form" @submit.prevent="addData">
                <label htmlFor="">Email</label>
                <input v-model="email" type="email" name="email" placeholder="Enter your email" required />
                <label htmlFor="">Password</label>
                <input v-model="password" type="password" name="password" required placeholder='Enter Password' />
                <p>Don't have an account ?<NuxtLink to="/registration/signup"> Signup</NuxtLink>
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
                await $fetch("/api/users/signin", {
                    method: "POST",
                    body: {
                        email: this.email,
                        password: this.password
                    }
                })
                    .then((res) => {
                        if (res.message == "Invalid Credential") {
                            return alert("Invalid Credential")
                        }
                        localStorage.setItem("_n_a_m_e_", JSON.stringify(res.token.split(":")[1]))
                        localStorage.setItem("_t_o_k_e_n_", JSON.stringify(res.token.split(":")[0]))
                        alert("Login successful")
                        this.email = "",
                            this.password = ""
                        navigateTo('/')
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