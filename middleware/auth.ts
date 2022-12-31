export default function (context: any) {
    console.log("MiddleWare")
    // if (process.browser) { if (!window.localStorage.getItem('token')) { window.location = '/login' } }
    // let token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("_n_a_m_e_")) : null
    // if(process.client&&token==null){
    //     return context.redirect("/registration/signin")
    // }
}