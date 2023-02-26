<template>
  <div class="pie-chart">
    <h3 align="left" style="padding-left: 20px">{{ $t('chart_pie') }}</h3>
    <apexchart type="pie" width="70%" :options="chartData" :series="months" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'DateChart',
  components: { apexchart: VueApexCharts },
  props: {
    dateChart: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      months: [],
      chartData: {
        chart: {
          width: '100%',
          type: 'pie'
        },
        labels: [],
        legend: {
          display: false
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
    dateChart(value) {
      this.fillDatDateChart(value)
    }
  },
  methods: {
    fillDatDateChart(data) {
      // console.log(data)
      this.chartData = { ...this.chartData, ...{ labels: data.map(d => d.date) }}
      this.months = data.map(d => parseInt(d.money))
    }
  }
}
</script>

<style scoped>

</style>
