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
                    :items = "contacts"
                    :search = "search"
                    >

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

                    <template v-slot:[`item.website`] = "{ item }">
                        <router-link :to="`/contactsdetails/${item.id}/${linkNeated(item.website)}`" >
                            {{item.website}}
                        </router-link>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                          <router-link :to="`/contactsedit/${item.id}/${linkNeated(item.website)}`" style="text-decoration: none; color: inherit;">
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
            :data="contacts"
            :fields="json_fields"
            type="csv"
            name="contacts.xls"
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
                {text: "Сайт", value: "website"},
                {text: "Номер телефона", value: "phonenumber"},
                {text: "Действия", value: "actions"}
            ],
            contacts: [],
            json_fields: {
                "ID": "id",
                "Сайт": "website",
                "Телефон": "phonenumber",
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
            this.selectedItemIndex = this.contacts.indexOf(item)
            this.dialogDelete = true
        },
        deleteItemConfirm () {
            const deleteContacts = this.contacts[this.selectedItemIndex]
            axios
                .delete(`http://localhost:3000/api/contacts/${deleteContacts.id}`)
                .then(response => {
                    this.contacts.splice(this.selectedItemIndex, 1)
                    this.closeDelete()
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    },

    mounted() {
        axios
            .get('http://localhost:3000/api/contacts/')
            .then(response => {
                this.contacts = response.data
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }
}
</script>
