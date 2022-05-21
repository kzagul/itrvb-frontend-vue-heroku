<template>
    <v-form v-model="valid">
        <v-container>
            <router-link :to="'/contactspage'" exact style="text-decoration: none; color: inherit;">
                
            <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                    <v-icon>
                        mdi-arrow-left
                    </v-icon>
                        Назад к таблице
                </v-btn>

            </router-link>

            <h2 class="text-center mb-10">
                Записать новые контакты
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
                        <p v-if="success">
                            Новые контакты были успешно добавлены!
                        </p>
                        <p v-if="!success">
                            Ошибка: запись не была добавлена!
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
    data() {
        return {
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
                axios({
                    method: "post",
                    url: "https://kzagul-core.herokuapp.com/api/contacts",
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
}
</script>