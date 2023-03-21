import Home from "./components/Home.vue"
import SignUp from "./components/SignUp.vue"
import {createRouter, createWebHistory} from "vue-router"
import Login from './components/Login.vue'
import Reschedule from './components/Reschedule.vue'

const routes = [
    {
        name: "Home",
        component: Home,
        path:"/home",
    },
    {
        name: "SignUp",
        component: SignUp,
        path:"/sign-up",
    },
    {
        name: "Login",
        component: Login,
        path:"/login",
    },
    {
        name: "Reschedule",
        component: Reschedule,
        path:"/reschedule",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;