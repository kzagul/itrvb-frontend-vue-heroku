<template>
    <v-form v-model="valid">
        <v-container v-if="trainers">
            <h2 class="text-center mb-10" v-if="registration">
                Записать нового тренера
            </h2>
            <h2 class="text-center mb-10" v-if="edit">
                Изменить данные тренера
            </h2>

            <v-row>
                <!-- address label -->
                <v-col cols="8 ml-auto mr-auto" >
                    <v-text-field v-model="editedItem.fullname" label="ФИО" :rules="correctRules">
                    </v-text-field>
                </v-col>

                <!-- longitude label -->
                <v-col cols="8 ml-auto mr-auto" >
                    <v-text-field v-model="editedItem.sportdirection" label="Спортивное направление" :rules="correctRules">
                    </v-text-field>
                </v-col>

                <v-col cols="8 ml-auto mr-auto" >
                    <v-text-field v-model="editedItem.qualification" label="Квалификация" :rules="correctRules">
                    </v-text-field>
                </v-col>
                
            </v-row>
            
            <v-dialog v-model="dialog" width="50%">
                <v-card>
                    <v-card-title>
                        <p v-if="success && registration">
                            Новый тренер успешно добавлен!
                        </p>
                        <p v-if="!success && registration">
                            Ошибка: новый тренер не был добавлен!
                        </p>
                        <p v-if="success && edit">
                            Данные тренера успешно изменены!
                        </p>
                        <p v-if="!success && edit">
                           Ошибка: данные тренера не были изменены!
                        </p>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn v-if="edit" @click.stop="dialog = !dialog" class="ma-1" large color="#000000" plain>Продолжить изменение</v-btn>
                        <v-spacer></v-spacer>
                            <router-link to="/trainerpage" style="text-decoration: none">
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
            trainers: null,
            dialog: false,
            editedItem: {
                fullname: "",
                sportdirection: "",
                qualification: "",

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
                    url: "https://kzagul-core.herokuapp.com/api/trainer/",
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
                    url: `https://kzagul-core.herokuapp.com/api/trainer/${id}`,
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
                .get(`https://kzagul-core.herokuapp.com/api/trainer/${this.$route.params.id}`)
                .then(response => {
                    this.trainers = response.data[0]
                    this.editedItem = this.trainers
                })
                .catch(error => console.log(error))
        }


    }
}
</script>