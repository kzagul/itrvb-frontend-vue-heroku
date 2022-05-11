<template>
    <div>
       <v-list>
                        <v-list-item>
                            <router-link to="/locatepage" exact style="text-decoration: none; color: inherit;">
                                <v-list-item-title>
                                    <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                                        {{ dictsItems[0].title }}
                                    </v-btn>
                                </v-list-item-title>
                            </router-link>
                        </v-list-item>

                        <v-list-item>
                            <router-link to="/directorpage" exact style="text-decoration: none; color: inherit;">
                                <v-list-item-title>
                                    <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                                        {{ dictsItems[1].title }}
                                    </v-btn>
                                </v-list-item-title>
                            </router-link>
                        </v-list-item>

                         <v-list-item>
                            <router-link to="/contactspage" exact style="text-decoration: none; color: inherit;">
                                <v-list-item-title>
                                    <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                                        {{ dictsItems[2].title }}
                                    </v-btn>
                                </v-list-item-title>
                            </router-link>
                        </v-list-item>

                         <v-list-item>
                            <router-link to="/trainerpage" exact style="text-decoration: none; color: inherit;">
                                <v-list-item-title>
                                    <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                                        {{ dictsItems[3].title }}
                                    </v-btn>
                                </v-list-item-title>
                            </router-link>
                        </v-list-item>

                    </v-list>
    </div>
</template>


<script>
// import UserLogo from './UserLogo.vue'


  export default {
    data: () => ({
        home: {
            title: "Главная",
            link: '/homepage'
        },
        sportInstitution: {
            title: "Спорт учреждения",
            link: '/sportinstitutions'
        },
        locate: {
            title: "Локации",
            link: '/locates'
        },

        items: [
            {
                title: "Главная",
                link: '/home'
            },
            {
                title: "Спорт учреждения",
                link: '/sportinstitutions'
            },
            {
                title: "Локации",
                link: '/locates'
            }
        
        ],

        dictsItems: [
            { 
                title: 'Локации',
                route: '/locates'
            },
            { 
                title: 'Директора',
                route: '/directors' 
            },
            { 
                title: 'Контакты',
                route: '/contacts'
            },
            { 
                title: 'Тренера',
                route: '/trainers' 
            },
        ],
    }),
    components: {
    //   UserLogo,
    }
  }
</script>