<template>
    <div>
          <div class="text-center mx-auto mb-2 px-7 mt-5">
            <h2>Локации</h2>
          </div>


    <LocateTable />

    <div v-if="showAdminBoard" class="nav-item">

          <div id="button" class="text-center">
              <router-link :to="'/register-new-locate'" exact style="text-decoration: none; color: inherit;">
                  <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                  <v-icon>
                      mdi-plus
                      </v-icon>
                      Добавить
                  </v-btn>
              </router-link>
          </div>

    </div>
  </div>
</template>
a
<script>
import LocateTable from '../../components/locate/LocateTable.vue'

export default {
    name: 'Home',
    components: {
        LocateTable,
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
  }
}
</script>

<style scoped>
#button {
    display: flex;
    width:85%;
    margin: auto;
    justify-content: center;
}
</style>