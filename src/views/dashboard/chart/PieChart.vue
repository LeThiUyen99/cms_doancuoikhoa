<template>
  <div v-if="series1.length" class="pie-chart">
    <h3 align="left" style="padding-left: 20px">{{ $t('chart_pie') }} <span>{{ screenName || '' }}</span></h3>
    <apexchart type="pie" width="70%" :options="chartOptions" :series="series1" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'PieChart',
  components: { apexchart: VueApexCharts },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
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
      series1: [],
      chartOptions: {
        chart: {
          width: '100%',
          type: 'pie'
        },
        labels: [],
        legend: {
          position: 'right',
          horizontalAlign: 'right',
          textAnchor: 'right',
          floating: false,
          inverseOrder: false,
          offsetX: 0,
          offsetY: 0,
          align: 'start',
          labels: {
            align: 'start'
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }]
      }
    }
  },
  watch: {
    // NameScreen(value) {
    //   console.log('------------------------------------------------name', JSON.stringify(value))
    //   this.fillDataBarChart(value)
    // },
    chart_data(value) {
      this.fillDataBarChart(value)
    }
  },
  methods: {
    fillDataBarChart(data) {
      this.chartOptions = { ...this.chartOptions, ...{ labels: data.map(d => d.name) }}
      this.series1 = data.map(d => parseInt(d.view_number))
    }
  }
}
</script>
<style>
.apexcharts-legend {
  text-align: left;
}
.apexcharts-canvas{
  width: 100% !important;
}
#SvgjsSvg1136{
  width: 100%;
}
foreignObject{
  width: 100%;
}
</style>
<style scoped>
.apexcharts-legend{
  display: none;
}
</style>
