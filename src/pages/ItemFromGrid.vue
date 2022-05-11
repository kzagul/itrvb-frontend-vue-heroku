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
                        {{items.about}}
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
                .get(`http://localhost:3000/api/sportinstitution/${this.$route.params.id}`)
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
