<template>
  <v-app>



    <div v-if="currentUser " class="nav-item">
      <Navbar />
    </div>
    
    <v-main>
       <router-view />
    </v-main>

    <div v-if="currentUser" class="nav-item">
      <Footer />
    </div>

  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

import Vue from "vue";
import JsonExcel from "vue-json-excel"
 
Vue.component("downloadExcel", JsonExcel);

export default {
  name: 'App',

  components: {
    Navbar,
    Footer
  },

  data: () => ({
    //
  }),

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
  }
};
</script>
