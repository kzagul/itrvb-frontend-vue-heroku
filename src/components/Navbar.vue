<template>
    <div>
        <v-toolbar tabs flat lights-out color="#ECEFF1">  
            <!-- image -->
            <router-link :to="'/'" exact>
                <img src="@/assets/images/sportLogo.png" />
            </router-link>
                
            <router-link :to="'/'" exact style="text-decoration: none; color: inherit;">
                <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                  {{home.title}}
                </v-btn>
            </router-link>

            <router-link to="/sportinstitutionpage" exact style="text-decoration: none; color: inherit;">
                <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                    {{sportInstitution.title}}
                </v-btn>
            </router-link>

            

            <div class="text-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                            Справочники
                        </v-btn>
                    </template>

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
                </v-menu>
            </div>

            <v-spacer></v-spacer>


            <div v-if="!currentUser" class="text-center">
                <router-link to="/register" style="text-decoration: none; color: inherit;">
                    <v-btn  class="ma-1" large color="#FFFFFF" plain>
                        <v-icon>mdi-account-plus</v-icon>
                        Зарегестрироваться
                    </v-btn>
                </router-link>
                <router-link to="/login" style="text-decoration: none; color: inherit;">
                    <v-btn  class="ma-1" large color="#FFFFFF" plain  >
                        <v-icon>mdi-login</v-icon>
                        Войти
                    </v-btn>
                </router-link>
            </div>




            <div v-if="currentUser" class="text-center">
                <router-link to="/profile" style="text-decoration: none; color: inherit;">
                    <v-btn  class="ma-1" large color="#000000" plain>
                        <v-icon>mdi-account</v-icon>
                        {{ currentUser.username }}
                    </v-btn>
                </router-link>
                <v-btn  class="ma-1" large color="#000000" plain href @click.prevent="logOut">
                    <v-icon>mdi-logout</v-icon>
                     Выйти
                </v-btn>
            </div>


           
        </v-toolbar>
    </div>
</template>



<style scoped>

img {
    width: 100px;
}

</style>


<script>


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
                title: 'Тренеры',
                route: '/trainers' 
            },
        ],
    }),
    components: {

    },
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
  }
</script>

