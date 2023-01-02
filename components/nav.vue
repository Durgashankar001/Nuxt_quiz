<template>
    <div class="nav">
        <p>
            <NuxtLink to="/">Edgistify</NuxtLink>
        </p>
        <div v-if="user !== null" class="nav_list">
            <p>{{ user }}</p>
            <p @click="handleLogout">Log out</p>
        </div>
        <div class="nav_list" v-else>
            <p>
                <NuxtLink to="/registration/signin">Signin</NuxtLink>
            </p>
            <p>
                <NuxtLink to="/registration/signup">Signup</NuxtLink>
            </p>
        </div>
    </div>

</template>

<script>
export default {
    name: "Nav_Element",
    data() {
        return {
            user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("_n_a_m_e_")) : null
        }
    },
    beforeCreate: function () {
        this.user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("_n_a_m_e_")) : null
    },
    methods: {
        handleLogout() {
            typeof window !== 'undefined' ? localStorage.removeItem("_n_a_m_e_") : null,
                typeof window !== 'undefined' ? window.location.reload() : nulll
        }
    },

}
</script>