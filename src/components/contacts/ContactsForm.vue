<template>
    <v-form v-model="valid">
        <v-container v-if="contacts">
            <h2 class="text-center mb-10" v-if="registration">
                Записать новый контакты
            </h2>
            <h2 class="text-center mb-10" v-if="edit">
                Изменить данные контактов
            </h2>

            <v-row>
                <v-col cols="8 ml-auto mr-auto" >
                    <v-text-field v-model="editedItem.website" label="Вебсайт" :rules="correctRules">
                    </v-text-field>
                </v-col>

                <v-col cols="8 ml-auto mr-auto" >
                    <v-text-field v-model="editedItem.phonenumber" label="Номер телефона" :rules="correctRules">
                    </v-text-field>
                </v-col>
                 <v-col cols="8 ml-auto mr-auto" >
                    <v-text-field v-model="editedItem.vk" label="Вк" :rules="correctRules">
                    </v-text-field>
                </v-col>
                <v-col cols="8 ml-auto mr-auto" >
                    <v-text-field v-model="editedItem.inst" label="Inst" :rules="correctRules">
                    </v-text-field>
                </v-col>
                
            </v-row>
            
            <v-dialog v-model="dialog" width="50%">
                <v-card>
                    <v-card-title>
                        <p v-if="success && registration">
                            Новые контакты успешно добавлен!
                        </p>
                        <p v-if="!success && registration">
                            Ошибка: запись не была добавлена!
                        </p>
                        <p v-if="success && edit">
                            Данные контактов успешно изменены!
                        </p>
                        <p v-if="!success && edit">
                           Ошибка: данные контактов не были изменены!
                        </p>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn v-if="edit" @click.stop="dialog = !dialog" class="ma-1" large color="#000000" plain>Продолжить изменение</v-btn>
                        <v-spacer></v-spacer>
                            <router-link to="/contactspage" style="text-decoration: none">
                                <v-btn @click.stop="dialog = false" v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                                    Подтвердить
                                </v-btn>
                            </router-link>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-row>
                <v-col cols="3 ml-auto mr-auto">
                    <!-- <router-link :to="'/'" exact style="text-decoration: none; color: inherit;"> -->
                        <v-btn @click.stop="save" :disabled="!valid" v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                            <v-icon>
                                mdi-check
                            </v-icon>
                            Сохранить
                        </v-btn>
                    <!-- </router-link> -->
                </v-col>
            </v-row>


        </v-container>
    </v-form>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        registration: {
            type: Boolean,
            default: false,
        },
        edit: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            contacts: null,
            dialog: false,
            editedItem: {
                website: "",
                phonenumber: "",
                vk: "",
                inst: "",
            },
            isOperationSuccess: false,
            valid: false,
            correctRules: [
                v => !!v || 'Поле пустое',
                v => v.length <= 40 || 'Должно быть не более 40 символов',
                v => v.length > 3 || 'Должно быть не менее 4 символов',
            ],
            reg: /^(([-]\d{1,3})|([\d]{1,3}))[.,][\d]{3,5}\b/gmu,
            
            coordinatesRules: [
                v => !!v || 'Поле пустое',
                v => v.match(this.reg) != null || 'Не корректный ввод данных' 
            ]
        }
    },

    computed: {
        success(){
            return this.isOperationSuccess
        },
    },

    methods: {
        save() {
            if(this.registration){
                axios({
                    method: "post",
                    url: "http://localhost:3000/api/contacts/",
                    data: this.editedItem,
                    })
                .then(response => {
                    this.isOperationSuccess = true
                    this.dialog = true
                    console.log(response.data)
                })
                .catch(error =>{
                    this.isOperationSuccess = false
                    this.dialog = true
                    console.log(error)
                })
            }

            if(this.edit){
                const id = this.$route.params.id
                axios({
                    method: "put",
                    url: `http://localhost:3000/api/contacts/${id}`,
                    data: this.editedItem,
                })
                .then(response => {
                    this.isOperationSuccess = true
                    this.dialog = true
                    console.log(response.data)
                })
                .catch(error =>{
                    this.isOperationSuccess = false
                    this.dialog = true
                    console.log(error)
                })
            }
        },
    },

    created(){
        if(this.edit) {
            axios
                .get(`http://localhost:3000/api/contacts/${this.$route.params.id}`)
                .then(response => {
                    this.contacts = response.data[0]
                    this.editedItem = this.contacts
                })
                .catch(error => console.log(error))
        }


    }
}
</script>