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
                    :items = "trainers"
                    :search = "search"
                    >

                    <!-- Удалить/отменить -->
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

                    <!--  -->
                    <template v-slot:[`item.fullname`] = "{ item }">
                        <router-link :to="`/trainerdetails/${item.id}/${linkNeated(item.fullname)}`" >
                            {{item.fullname}}
                        </router-link>
                    </template>

                    <!-- Actions -->
                    <template v-slot:[`item.actions`]="{ item }">
                        <router-link :to="`/traineredit/${item.id}/${linkNeated(item.fullname)}`" style="text-decoration: none; color: inherit;">
                        <v-icon
                                small
                                class="mr-2"
                                @click="close(item)"
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
            :data="trainers"
            :fields="json_fields"
            type="csv"
            name="trainers.xls"
            >

            <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain
                 @click="download">
                <v-icon>
                    mdi-microsoft-excel
                </v-icon>
                    Экспорт 
            </v-btn>
            
        </download-excel>

    </v-container>
    
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            search: '',
            dialogDelete: false,
            selectedItemIndex: -1,
            headers: [
                {text: "ФИО", value: "fullname"},
                {text: "Направление", value: "sportdirection"},
                {text: "Квалификация", value: "qualification"},
                {text: "Действия", value: "actions"}
            ],
            trainers: [],
            json_fields: {
                "ID": "id",
                "ФИО": "fullname",
                "Направление": "sportdirection",
                "Квалификация": "qualification",
            },
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
            this.selectedItemIndex = this.trainers.indexOf(item)
            this.dialogDelete = true
        },
        deleteItemConfirm () {
            const deleteTrainer = this.trainers[this.selectedItemIndex]
            axios
                .delete(`https://kzagul-core.herokuapp.com/api/trainer/${deleteTrainer.id}`)
                .then(response => {
                    this.trainers.splice(this.selectedItemIndex, 1)
                    this.closeDelete()
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    },

    mounted() {
        axios
            .get('https://kzagul-core.herokuapp.com/api/trainer')
            .then(response => {
                this.trainers = response.data
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }
}
</script>
