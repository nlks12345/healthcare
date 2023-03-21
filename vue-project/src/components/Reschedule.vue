<template>
 <v-card>
      <v-layout>
        <v-navigation-drawer
          class="bg-deep-purple"
          theme="dark"
          permanent
        >
        <v-list color="transparent">
            <v-list-item prepend-icon="mdi-view-dashboard" title="Home" to="/home"></v-list-item>
            <v-list-item prepend-icon="mdi-account-box" title="SignUp" to="/sign-up"></v-list-item>
            <v-list-item prepend-icon="mdi-gavel" title="Update Status" to="/reschedule"></v-list-item>
          </v-list>
          
          <template v-slot:append>
            <div class="pa-2">
              <v-btn block @click="logout">
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 400px"></v-main>
      </v-layout>
    </v-card>


<form>
    <h1>Reschedule</h1>
    <v-label>Status</v-label>
    <v-select
        v-model="selectedStatus"
        :items="['Pending', 'Arrived', 'Reschedule']"
        label="Select"
        id="selectedStatus"
    ></v-select>
    <v-label>Appointment ID</v-label>
    <v-text-field
      v-model="appt_id"
      id = "appt_id"
      name="appt_id"
      required
    ></v-text-field>
    <!-- <input class="col-12" v-model="appt_id"  id="appt_id" name="appt_id" type="text" disabled/> -->
    

    <v-btn block @click="reschedule()">
        Update
    </v-btn>
</form>

</template>

<script>
import axios from 'axios'
export default {
    name: 'Reschedule',
    data(){
        return {
            appt_id:5,
            items: [
                {value: '0', status: 'Pending'},
                {value: '1', status: 'Arrived'},
                {value: '2', status: 'Reschedule'},
            ],
            selectedStatus: null
        }
    },
    mounted(){
        // localStorage.setItem('appt_id', '5');
        // let appt_id = localStorage.getItem('appt_id') || 'what ever default you have';
        // console.log(this.$route.query)

    },
    methods: {
        async reschedule()
        {   
            let self = this
            const current = new Date()
            const datetime = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()} ${current.getTime()}`
            const status_text =this.selectedStatus
            const appt_id = this.appt_id

            if(status_text == "Pending" )
                var status_value = 0
            if(status_text == "Arrived" )
                var status_value = 1
            if(status_text == "Reschedule" )
                var status_value = 2

            if(status_value == 2)
            {
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/appointment/reschedule/',
                    data: {
                        id: this.appt_id,
                        status: status_value     
                    }
                })
                .then(function (response) {
                
                    if(response.status == 200)
                    {   
                        let url = `http://localhost:5000/api/v1/appointment/list/${appt_id}`

                        axios({
                            method: 'get',
                            url: url,
                        
                        }).then(function (response) {
                            if(response.status == 200)
                            {
                                let data = response.data.data[0]
                                let code = data.code
                                let code_no = code.split('|')
                                let next_code_no = Number(code_no[1]) + 1
                                let new_code= code_no[0]+next_code_no

                                axios({
                                    method: 'post',
                                    url: 'http://localhost:5000/api/v1/appointment/create',
                                    data: {
                                        code:new_code,
                                        patient:data.patient,
                                        status:0,
                                        appt_datetime:datetime,
                                        created_at:datetime
                                    }
                                
                                }).then(function (response) {
                                    if(response.status == 200)
                                    {
                                        if(response.data.status == "success"){
                                            self.$router.push({name:'Home'})
                                        }
                                    }
                                },(error) => {
                                    console.log(error)
                                });

                                
                            }
                        },(error) => {
                            console.log(error)
                        });
                    }


                },(error) => {
                    console.log(error)
                });
           
            }
            else if(status_value == 1){
                const appt_id = this.appt_id
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/appointment/arrive/',
                    data: {
                        id: appt_id,
                        status: status_value ,
                        arrive_at:datetime   
                    }
                })
                .then(function (response) {

                    if(response.status == 200)
                    {
                        console.log(response)
                    }

                },(error) => {
                    console.log(error)
                });

            }
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