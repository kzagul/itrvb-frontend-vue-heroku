<template>
  <!-- <v-footer  color="#ECEFF1" padless app>
    <v-col class="text-center" cols="6">
      © {{ new Date().getFullYear() }} — Спорт 
    </v-col>
     <v-col class="text-center" cols="6">
        <router-link to="/aboutpage" exact style="text-decoration: ; color: inherit;">
          <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
            Связаться с нами
          </v-btn>
        </router-link>
    </v-col>
  </v-footer> -->
  <v-footer color="#ECEFF1" padless app>
    <v-col
        class="text-center"
        cols="12"
      >
          ©{{ new Date().getFullYear() }} — <strong>Спорт</strong>
    </v-col>
   </v-footer>
</template>

<script>
  export default {
    data: () => ({
      
    }),
  }
</script>