<template>
    <div v-if="items" class="ml-5">

        <router-link :to="'/sportinstitutionpage'" exact style="text-decoration: none; color: inherit;">
                
          <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                <v-icon>
                    mdi-arrow-left
                </v-icon>
                    К списку учреждений
            </v-btn>

         </router-link>


        <h2 class="d-flex justify-center mb-6 mt-6">Подробная информация: {{items.name}} </h2>

        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card ref="form">
                    <v-card-text>
                        <v-text-field :value=items.id label="ID" readonly></v-text-field>
                        <v-text-field :value=items.name label="Наименование" readonly></v-text-field>
                        <v-text-field :value=items.classificationnumber label="Классификационный номер" readonly></v-text-field>
                        <h4>{{items.about}}</h4>
                        <v-divider></v-divider>
                        <h5>{{'Адрес'}}</h5>
                        <v-text-field :value=items.address label="Адрес" readonly></v-text-field>
                        <v-divider></v-divider>
                        <h5>{{'Директор'}}</h5>
                        <v-text-field :value=items.fullname label="Директор" readonly></v-text-field>
                        <v-divider></v-divider>
                        <h5>{{'Контакты'}}</h5>
                        <v-text-field :value=items.phonenumber  label="Контакты 1" readonly></v-text-field>
                        <v-text-field :value=items.phonenumber  label="Контакты 2" readonly></v-text-field>



                    </v-card-text>
                    <v-divider class="mt-12"></v-divider>
                
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
            items: null
        }
    },
    methods: {
        fetchData() {
            axios
                .get(`https://kzagul-core.herokuapp.com/api/sportinstitution/${this.$route.params.id}`)
                .then(response => {
                    this.items = response.data[0]
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
