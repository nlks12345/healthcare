<template>
  
  <form>
    <h1>Login Form</h1>
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :counter="10"
      label="Pssword"
      required
      type="password"
    ></v-text-field>

    <v-btn
      class="me-4"
      @click="login"
    >
      Login
    </v-btn>
    <router-link to="/sign-up">Register</router-link>
  </form>
<!-- 
    <form class="form-center register">
        <h1>Login Page</h1>
        <div class="col-12">

            <label  class="form-label col-12">Email</label>
            <input  class="col-12"  v-model="email" id="email" name="email" />

            <label  class="form-label col-12">Password :</label>
            <input  class="col-12" v-model="password" id="password" name="password" type="password" />

            <button class="btn btn-primary col-12" type="button"  v-on:click="login">Login</button>
            
        </div>
    </form> -->
</template>

<script>
import axios from 'axios'
    export default{
        name:'Login',
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods:{
            async login(){
                // let result = await axios.post("http://localhost:5000/api/v1/auth/login",{
                
            // });
            let self = this
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/auth/login',
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                .then(function (response) {
                    console.log(response)
                    if(response.status == 200){
                        if(response.data.accessToken){
                            const token = response.data.accessToken
                            axios({
                                method: 'get',
                                url: 'http://localhost:5000/api/v1/verify',
                                headers:{
                                    authorization: 'Bearer '+token
                                },
                                // data: {
                                //     userId: response.data.data.userId,
                                //     email:response.data.data.userId
                                // }
                            }).then(function (response) {
                                 if(response.status == 200){
                                    self.$router.push({name:'Home',params:{user_id:response.data.user.userId }})
                                }
                                    
                            })
                        }   
                    }     
                }, (error) => {
                    console.log(error)
                });
                

                // console.warn(result);
                // if(result.status==201){
                //     alert('sign-up done')
                // }
            }
        }
    }

</script>