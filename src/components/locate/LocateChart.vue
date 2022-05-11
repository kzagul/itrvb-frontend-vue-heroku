<template>
  <div class="ml-6 mr-6">
    <Bar
    v-if="isLoaded"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"/>

    <!-- <v-btn v-bind="attrs" v-on="on" class="ma-1" large color="#000000" plain  @click="testing(1)">
      Тестинг
    </v-btn> -->
    
  </div>


</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import axios from 'axios'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

      jsonChart: [],

      // v-if="isLoaded",
      isLoaded: false,

      chartData: {
        labels: [
          'Восточный',
          'Матмассы',
          'Центральный',
        ],

        datasets: [
          {
            label: 'Распределение кол-ва спортивных учреждений по районам Г.Тюмени',
            backgroundColor: '#f87979',
            data: [0,0,0],

          },
        ]

      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  methods: {
    testing () {
      // console.log(this.chartData.datasets.data3)
        // for await (let elem of this.jsonChart){
        //   if(elem.area === this.chartData.labels[0]) this.chartData.datasets[0].data2[0] += 1
        //   else if(elem.area === this.chartData.labels[1]) this.chartData.datasets[0].data2[1] += 1
        //   else if(elem.area === this.chartData.labels[2]) this.chartData.datasets[0].data2[2] += 1
        // }
        // console.log(this.chartData.datasets[0].data2)

        this.$data._chart.update()
    }
  },
  
   mounted() {
        axios
            .get('http://localhost:8086/api/locate/')
            .then(response => {
                this.jsonChart = response.data
                 console.log(this.jsonChart)

                
                let timeArr = [0,0,0]

                for(let i = 0; i < 3; i++){
                  this.chartData.datasets[0].data.push(0)
                }


                // for (let i = 0; i < this.jsonChart.length; i++){
                //   if(this.jsonChart[i].area === this.chartData.labels[0]) this.chartData.datasets[0].data[0] += 1
                //   else if(this.jsonChart[i].area === this.chartData.labels[1]) this.chartData.datasets[0].data[1] += 1
                //   else if(this.jsonChart[i].area === this.chartData.labels[2]) this.chartData.datasets[0].data[2] += 1
                // }

                for (let i = 0; i < this.jsonChart.length; i++){
                  if(this.jsonChart[i].area === this.chartData.labels[0]) timeArr[0] += 1
                  else if(this.jsonChart[i].area === this.chartData.labels[1]) timeArr[1] += 1
                  else if(this.jsonChart[i].area === this.chartData.labels[2]) timeArr[2] += 1
                }



                console.log(this.jsonChart)
                console.log(this.chartData.labels)
                console.log(this.chartData.datasets[0].data)
                // console.log(timeArr)

                this.chartData.datasets[0].data = timeArr

                console.log(this.chartData.datasets[0].data)

              this.isLoaded = true
                
            })
            .catch(error => console.log(error))
    }
}
</script>
