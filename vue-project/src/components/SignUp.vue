<template>
    <!-- <img class="logo" scr="../assets/logo.png" /> -->


<form class="form-center register">
    <h1>Sign Up</h1>
    <div class="col-12">
        <label  class="form-label col-12">Name</label>
        <input class="col-12" v-model="name" id="name" name="name" />
        <label  class="form-label col-12">Email</label>
        <input class="col-12" v-model="email" id="email" name="email" />
        <label  class="form-label col-12">Password :</label>
        <input  class="col-12" v-model="password"  id="password" name="password" type="password" />
        <button class="btn btn-primary col-12" type="button" v-on:click="signUp">Register</button>
    </div>
</form>

</template>

<script>
import axios from 'axios'
export default {
    name: 'SignUp',
    data(){
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async signUp()
        {
            let result = await axios.post("http://localhost:5000/api/v1/auth/register",{
                name:this.name,
                email:this.email,
                password:this.password
            });

            console.warn(result);
            if(result.status==200){
                alert('sign-up done')
                this.$router.push({name:'Login'})
            }
            // console.warn("signup", this.name, this.email, this.password)
        }
    }
}
</script>

<style>
.logo{
    width: 100px;
}

.register input{
    width: 300px;
    height: 50px;
    /* padding-left: 20px; */
    /* display: 'block'; */
    /* margin-bottom: 30px;
    */
    /* margin-left: 50%; 
    margin-right: 300px; */
    border: 1px solid skyblue;
} 

.register button{
    margin-top: 20px;
}

.form-center{
    display:block;
  justify-content: center;

}
</style>