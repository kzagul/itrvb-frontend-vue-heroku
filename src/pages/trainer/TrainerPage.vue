<template>
    <div>
        <div class="text-center mx-auto mb-2 px-7 mt-5">
            <h2>Тренеры</h2>
        </div>
        <TrainerTable />

        <div id="button">
            <router-link :to="'/register-new-trainer'" exact style="text-decoration: none; color: inherit;">
                <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain>
                <v-icon>
                    mdi-plus
                    </v-icon>
                    Добавить
                </v-btn>
            </router-link>
        </div>
    </div>
</template>

<script>
import TrainerTable from '../../components/trainer/TrainerTable.vue'

export default {
    name: 'Home',
    components: {
        TrainerTable
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