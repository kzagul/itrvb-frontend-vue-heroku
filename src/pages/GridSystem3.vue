<template>
    <v-container  class="mx-auto mt-5" max-width="900">
       <v-card class="d-flex justify-center mx-auto mb-5 " max-width="500">
        <div>
         <h1>Спортивные учреждения</h1>
        </div>
      </v-card>

      <v-row dense >
        <v-col v-for="card in cards" :key="card.id" :cols=6 md=4>

          <v-card>
            <v-img
              :src=images[cards.indexOf(card)]
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >

            <v-card-title v-text="card.name"></v-card-title>

            </v-img>
            

            <v-row >
            
                <v-spacer></v-spacer>

            </v-row>
            

            <v-card-actions class="my-5">
                <v-spacer></v-spacer>

                <!-- iconsTypeExcursion[cart.typeexcursion_id - 1] -->
             <router-link :to="`/sportinstitution/${card.id}/${linkNeated(card.name)}`" exact style="text-decoration: none; color: inherit;">
                <v-btn
                    text
                    color="accent-4"
                   
                >
                <!-- @click="showInfoItem(card)" -->
                    Подробнее
                </v-btn>
                </router-link>

              <!-- <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn> -->
            </v-card-actions>
          </v-card>

         
                
        </v-col>
      </v-row>

    </v-container>


<!-- 
    <v-btn  class="ma-1" large color="#FFFFFF" plain>
      Экскурсии
    </v-btn> -->
    
  
</template>


<script>
import axios from 'axios'

export default {
  data(){
    return {
        id: '',
        currentCartTitle: '',
        dialog: false,


        currentCard: '',

        // 
        showInfo: false,

        selectedItemIndex: -1,

        image2: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',

        image:  '../assets/excursionImg/img1.jpeg',


        images: [
          'https://avatars.mds.yandex.net/get-altay/1551063/2a00000166b243f6561b4d33ba1bc14afede/XXL',
          'https://avatars.mds.yandex.net/get-altay/2809325/2a00000174c1d3089ad5cbe65448d6ac1ac8/XXL',
          'https://avatars.mds.yandex.net/get-altay/2378041/2a0000017481c631357be718ea029c82e08d/XXL'
        ],



        currentIconE: '',
        currentIconv: '',

        iconsTypeExcursion: [
            'mdi-walk',
            'mdi-scooter',
            'mdi-greenhouse',
            'mdi-bus-side',
        ],
        iconsTypeVisiting: [
            'mdi-',
            'mdi-',
            'mdi-',
            'mdi-',
        ],


        cardsDialogs: [],


        cards: [],

        }
    },

    methods: {
       linkNeated (link) {
            return link.replace(/\s+/g, '-').toLocaleLowerCase()
        },

        showInfoItem(card) {
            this.selectedItemIndex = this.cards.indexOf(card)
            this.currentCartTitle = this.cards[this.selectedItemIndex].name
            // this.showInfo = true
            console.log(this.cardsDialogs)
            this.chooseDialog(card)
        },

        chooseDialog(card) {
          // let num = this.cards.length
          let index = this.cards.indexOf(card)
          this.cardsDialogs[index] = true
           console.log(this.cardsDialogs)
        },

        choosenDialogClose() {
          this.$nextTick(() => {
                this.selectedItemIndex = -1
            })
          // let index = this.cards.indexOf(card)
          // this.cardsDialogs[index] = false
          // console.log(this.cardsDialogs)

          for(let i = 0; i < this.cardsDialogs.length; i++) this.cardsDialogs[i] = false
        },


        getDialogValue(card) {
          return this.cardsDialogs[this.cards.indexOf(card)]
        },
        

        closeInfoItem () {
            this.$nextTick(() => {
                this.selectedItemIndex = -1
            })
            this.showInfo = false
        },
        chooseIcon (cart) {
            if (cart.iconsTypeExcursion === "Пешая") this.currentIconE = this.iconStyles[0]
            else if (cart.iconsTypeExcursion === "На самокатах") this.currentIconE = this.iconStyles[1]
            else if (cart.iconsTypeExcursion === "В помещении") this.currentIconE = this.iconStyles[2]
            else if (cart.iconsTypeExcursion === "Автобус") this.currentIconE = this.iconStyles[3]
        },

        ff () {
            this.currentIconE = 'mdi-scooter'
        }
    },



    mounted() {
        axios
            .get('http://localhost:3000/api/sportinstitution')
            .then(response => {
                console.log(response.data);
                this.cards = response.data
                console.log(response.data)
                for (let i = 0; i < this.cards.length; i++) this.cardsDialogs.push(false)
            })
            .catch(error => console.log(error))
    }
  }
</script>