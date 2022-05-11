<template>
  <div class="content">
    <div class="container">
      <div class="Search__container">
        <input
          class="Search__input"
          @keyup.enter="requestData"
          placeholder="npm pack name"
          type="search" name="search"
          v-model="pack"
        >
        <button class="Search__button" @click="requestData">Find</button>
      </div>
      <div class="error-message" v-if="showError">
       {{ errorMessage }}
      </div>
      <hr>
      <h1 class="title" v-if="loaded">{{ packName }}</h1>
      <div class="Chart__container" v-if="loaded">
        <div class="Chart__title">
          Downloads per Day <span>{{ period }}</span>
          <hr>
        </div>
        <div class="Chart__content">
          <line-chart v-if="loaded" :chart-data="downloads" :chart-labels="labels"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios'
  import LineChart from '@/components/LineChart'
  export default {
    components: {
      LineChart
    },
    props: {},
    data () {
      return {
        pack: null,
        packName: '',
        period: 'last-month',
        loaded: false,
        downloads: [],
        labels: [],
        showError: false,
        errorMessage: 'Please enter a pack name'
      }
    },
    mounted () {
      if (this.$route.params.pack) {
        this.pack = this.$route.params.pack
        this.requestData()
      }
    },
    methods: {
      resetState () {
        this.loaded = false
        this.showError = false
      },
      requestData () {
        if (this.pack === null || this.pack === '' || this.pack === 'undefined') {
          this.showError = true
          return
        }
        this.resetState()
        axios.get(`https://api.npmjs.org/downloads/range/${this.period}/${this.pack}`)
          .then(response => {
            console.log(response.data)
            this.downloads = response.data.downloads.map(download => download.downloads)
            this.labels = response.data.downloads.map(download => download.day)
            this.packName = response.data.pack
            this.setURL()
            this.loaded = true
          })
          .catch(err => {
            this.errorMessage = err.response.data.error
            this.showError = true
          })
      },
      setURL () {
        history.pushState({ info: `npm-stats ${this.pack}` }, this.pack, `/#/${this.pack}`)
      }
    }
  }
</script>