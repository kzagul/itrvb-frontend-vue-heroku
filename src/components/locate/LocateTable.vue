<template>
    <v-container>

        
        <v-row>
            <v-col cols="4">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Поиск..."
                > </v-text-field>
            </v-col>
            
        </v-row>
        
       
        <v-row>
            <v-col>
                <v-data-table
                    :headers = "headers"
                    :items = "locates"
                    :search = "search"
                    :items-per-page="5"
                    >

                    <!-- Confirm delete -->
                    <template v-slot:top>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Вы действительно хотите удалить?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="closeDelete">
                                        Отменить
                                    </v-btn>
                                     <v-btn color="primary" @click="deleteItemConfirm">
                                        Подтвердить
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>


                    

                    
                    <template v-slot:[`item.address`] = "{ item }">
                        <router-link :to="`/locatedetails/${item.id}/${linkNeated(item.address)}`" >
                            {{item.address}}
                        </router-link>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                       <router-link :to="`/edit/${item.id}/${linkNeated(item.address)}`" style="text-decoration: none; color: inherit;">
                            <v-icon
                                small
                                class="mr-2"
                               
                                >
                                    mdi-pencil
                            </v-icon>
                        </router-link>

                        <v-icon
                            small
                            @click="deleteItem(item)"
                            >
                                mdi-delete
                        </v-icon>
                    </template>

                </v-data-table>
            </v-col>

            

        </v-row>

        <download-excel
            class="btn btn-default"
            :data="locates"
            :fields="json_fields"
            type="csv"
            name="filename.xls"
            >

            <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain
                 @click="download">
                <v-icon>
                    mdi-microsoft-excel
                </v-icon>
                    Экспорт 
            </v-btn>
            
        </download-excel>


        <router-link :to="'/locatepage/chart'" exact style="text-decoration: none; color: inherit;">
                
          <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                <v-icon>
                    mdi-chart-bar
                </v-icon>
                    Показать график
            </v-btn>

         </router-link>
    

        <!-- <BarChart /> -->
        


    </v-container>
    
</template>

<script>
import axios from 'axios'

// import {Line, mixins} from 'vue-chartjs'
// import {chart} from 'highcharts'

// import PieChart from './locateChart'

export default {
    data(){
        return{
            // Chart
            // extends: Line,
            // mixins: [mixins.reactiveProp],
            // props: ['chartData', 'options'],


            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                    stacked: true,
                    grid: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    }
                    },
                    x: {
                    grid: {
                        display: false
                    }
                    }
                }
            },



            search: '',
            dialogDelete: false,

            dialogChart: false,

            selectedItemIndex: -1,
            headers: [
                // {text: "ID", value: "id"},
                {text: "Адрес", value: "address"},
                // {text: "Долгота", value: "longitude"},
                // {text: "Широта", value: "latitude"},
                {text: "Действия", value: "actions"}
            ],

            locates: [],


            json_fields: {
                "ID": "id",
                "Адрес": "address",
                "Долгота": "longitude",
                "Широта": "latitude",
            },
                json_data: [
                {
                    id: "Tony Peña",
                    address: "New York",
                    login: "United States",
                    password: "1978-03-15",
                    role: "1978-03-15",
                },
                {
                    id: "Tony Peña",
                    fullname: "New York",
                    login: "United States",
                    password: "1978-03-15",
                    role: "1978-03-15",
                },

                ],

                //
            json_meta: [
                [
                    {
                        key: "charset",
                        value: "utf-8",
                    },
                ],
            ],

        }

    },

    methods: {
        linkNeated (link) {
            return link.replace(/\s+/g, '-').toLocaleLowerCase()
        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.selectedItemIndex = -1
            })
        },
        deleteItem (item) {
            this.selectedItemIndex = this.locates.indexOf(item)
            this.dialogDelete = true
        },
        deleteItemConfirm () {
            const deleteLocate = this.locates[this.selectedItemIndex]
            axios
                .delete(`https://kzagul-core.herokuapp.com/api/locate/${deleteLocate.id}`)
                .then(response => {
                    this.locates.splice(this.selectedItemIndex, 1)
                    this.closeDelete()
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        },

        showChart () {
            this.dialogChart = true
        },

        closeChart () {
            this.dialogChart = false
        },

    },

    mounted() {
        axios
            .get('https://kzagul-core.herokuapp.com/api/locate/')
            .then(response => {
                this.locates = response.data
                console.log(response.data)
            })
            .catch(error => console.log(error))




        
    }
}
</script>

<style>
canvas {
  border: 1px dotted red;
}

.chart-container {
  position: relative;
  margin: auto;
  height: 80vh;
  width: 80vw;
}

</style>