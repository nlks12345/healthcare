

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
              <v-btn block @click="router.push({ name: 'user'})">
                Logout
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 400px"></v-main>
      </v-layout>
    </v-card>


    <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th>ID</th>
        <th>Code</th>
        <th>Patient Name</th>
        <th>Appointment Date</th>
        <th>Status</th>
        <th>Update</th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr> -->
      <tr v-for="(appointments, index) in this.appointments" :key="index" v-on:click="rowClick(appointments.id)">
            <td>{{appointments.id  }}</td>
            <td>{{appointments.code  }}</td>
            <td>{{JSON.parse(appointments.patient).name  }}</td>
            <td>{{appointments.appt_datetime  }}</td>
            <td>{{appointments.status  }}</td>
        </tr>
    </tbody>
  </v-table>

  
</template>

<script>
import axios from 'axios'
export default{
    name:'Home',
    data(){
        return {
            appointments: []
        }
    },
    mounted(){
        // console.log(this.$route.query.user_id) 
        this.getStudent();
    },
    methods: {
        getStudent(){
            axios.get('http://localhost:5000/api/v1/appointment/list').then(res => 
            {
                this.appointments = res.data.data;
                // let patient = JSON.parse(this.appointments[0].patient);
                //  console.log(patient.name)
                console.log(res.data)
            })

            // axios({
            //     method: 'get',
            //     url: 'http://localhost:5000/api/v1/appointment/list',
            //     responseType: 'json',
            //     headers: {
            //         'Access-Control-Allow-Origin': '*',
            //         'Content-type': 'application/json',
            //     }
            // })
            // .then(function (response) {
            //     // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            //     console.log(response.data)
            // });
            
        },

        rowClick(appointments_id){
            // let data = {
            //     appt_id: appointments_id,
            //     description: "testing pass data through params"
            // };
           this.$router.push({name:'Reschedule', params: {appointments_id:appointments_id} })
        },

        // logout(){
        //     this.$router.push({name:'Login'})
        // }
    }
}

</script>