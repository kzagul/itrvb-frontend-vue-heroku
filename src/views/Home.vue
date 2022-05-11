<template>
    <div class="container">
      <v-card class="flex justify-center  mx-auto mb-5 px-7" max-width="750">
        <div class="text-center">
             <img v-if="!currentUser" src="@/assets/images/sportLogo.png" width="300"/>
        </div>
          <div class="text-center">
            <h1>Добро пожаловать на портал <span class="red--text text--darken-4"><i> СПОРТ</i></span> о спорте </h1>
          </div>
          <v-divider></v-divider>



          <!-- <div v-if="currentUser" class="text-center">
            <PhotoGallery />
          </div> -->






          <div v-if="!currentUser" class="text-center">
            <div>
              <h6>Чтобы продолжить, вам необходимо авторизоваться или создать новый аккаунт</h6>
            </div>
              
                
                <router-link to="/register" style="text-decoration: none; color: inherit;">
                    <v-btn  class="ma-1" large color="#424242" plain>
                        <v-icon>mdi-account-plus</v-icon>
                        Регистрация
                    </v-btn>
                    <!-- <font-awesome-icon icon="user-plus" />Sign Up -->
                </router-link>

                <router-link to="/login" style="text-decoration: none; color: inherit;">
                   
                    <v-btn  class="ma-1" large color="#424242" plain  >
                        <v-icon>mdi-login</v-icon>
                        Войти
                    </v-btn>
                    <!-- <font-awesome-icon icon="sign-in-alt" />Login -->
                </router-link>
            </div>




        </v-card>
        <div v-if="currentUser" class="text-center">
            <PhotoGallery />
        </div>
    </div>
</template>

<script>
// import SystemGrid from '../pages/HomeGrid.vue';
import UserService from '../services/user.service';
import PhotoGallery from '../components/PhotoGallery.vue';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },

  components: {
    // SystemGrid
    PhotoGallery
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
      this.$router.push('/login');
    }
  },



  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
