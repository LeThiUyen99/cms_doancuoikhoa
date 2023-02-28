<template>
  <div class="pie-chart">
    <h3 align="left" style="padding-left: 20px">{{ $t('chart_pie_month') }}</h3>
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
        }
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
      this.chartData = { ...this.chartData, ...{ labels: data.map(d => `Ngày ${d.date}`) }}
      this.months = data.map(d => parseInt(d.money))
    }
  }
}
</script>

<style scoped>

</style>
