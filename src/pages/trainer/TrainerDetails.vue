<template>
    <div v-if="trainers" class="ml-5">

        <router-link :to="'/trainerpage'" exact style="text-decoration: none; color: inherit;">
                
          <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                <v-icon>
                    mdi-arrow-left
                </v-icon>
                    Назад к таблице
            </v-btn>

         </router-link>

        <h2 class="d-flex justify-center mb-6 mt-6">Подробная информация о тренере {{trainers.fullname}} </h2>

        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card ref="form">
                    <v-card-text>
                        <v-text-field :value=trainers.id label="ID" readonly></v-text-field>
                        <v-text-field :value=trainers.fullname label="ФИО" readonly></v-text-field>
                        <v-text-field :value=trainers.sportdirection label="Спортивное направление" readonly></v-text-field>
                        <v-text-field :value=trainers.qualification label="Квалификация" readonly></v-text-field>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            trainers: null
        }
    },
    methods: {
        fetchData() {
            axios
                .get(`https://kzagul-core.herokuapp.com/api/trainer/${this.$route.params.id}`)
                .then(response => {
                    this.trainers = response.data[0]
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    },
    created() {
        this.fetchData()
    }
}
</script>
