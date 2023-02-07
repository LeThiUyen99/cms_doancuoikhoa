<template>
  <div v-if="series.length" class="column-chart">
    <h3 align="left" style="padding-left: 20px">{{ $t('chart_column') }} <span>{{ screenName || "" }}</span></h3>
    <apexchart
      ref="myChart"
      type="bar"
      height="500"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'Chart',
  components: { apexchart: VueApexCharts },
  props: {
    chart_data: {
      type: Array,
      default() {
        return []
      }
    },
    screenName: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 1000
        },
        legend: {
          show: false
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '100%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 10,
          colors: ['transparent']
        },
        xaxis: {
          categories: []
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          enabled: true
        }
      }
    }
  },
  watch: {
    // NameScreen(value) {
    //   this.fillDataBarChart(value)
    // },
    chart_data(value) {
      // console.log('..................du lieu bieu do ', JSON.stringify(value))
      this.fillDataBarChart(value)
    }
  },
  methods: {
    fillDataBarChart(data) {
      // console.log('.................data ', JSON.stringify(data))
      // this.chartOptions1.xaxis.categories = data.map(d => d.user_name)
      this.chartOptions = { ...this.chartOptions, xaxis: { categories: data.map(d => d.month) }}
      // this.series = [{ name: '', data: data.map(({ view_number }) => view_number || 0) }]
      this.series = [{ name: '', data: data.map(({ money }) => money || 0) }]
      // this.series = data.map(d => ({
      //   name: d.name,
      //   data: [d.view_number]
      // }))

      console.log(this.series, this.chartOptions)
    },
    intToRGB(value) {
      // credit to https://stackoverflow.com/a/2262117/2737978 for the idea of how to implement
      var blue = Math.floor(value % 256)
      var green = Math.floor(value / 256 % 256)
      var red = Math.floor(value / 256 / 256 % 256)

      return 'rgb(' + red + ',' + green + ',' + blue + ')'
    }
  }
}
</script>

<style scoped>
.apexcharts-legend.position-bottom.apexcharts-align-center {
  display: none;
}
</style>
