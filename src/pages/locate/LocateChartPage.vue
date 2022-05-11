<template>
    <div>
        <router-link :to="'/locatepage'" exact style="text-decoration: none; color: inherit;">
                
          <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                <v-icon>
                    mdi-arrow-left
                </v-icon>
                    Назад к таблице
            </v-btn>

         </router-link>

        <Chart />
    <!-- <LocateTable />
        <div id="button">
            <router-link :to="'/register-new-locate'" exact style="text-decoration: none; color: inherit;">
                <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                <v-icon>
                    mdi-plus
                    </v-icon>
                    Добавить
                </v-btn>
            </router-link>
        </div> -->
    </div>
</template>
a
<script>
import Chart from '../../components/locate/LocateChart.vue'

export default {
    name: 'Home',
    components: {
        Chart,
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