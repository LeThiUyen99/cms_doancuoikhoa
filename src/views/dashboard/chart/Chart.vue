<template>
  <div class="column-chart">
    <h3 align="left" style="padding-left: 20px">{{ $t('chart_column') }} <span>{{ screenName || "" }}</span></h3>
    <el-row>
      <el-col :sm="16">
        <Bar
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
        <!--        @click="handleClick"-->
      </el-col>
      <el-col :sm="8">
        <el-row v-if="show_chart">
          <date-chart :date-chart="charts" />
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import VueApexCharts from 'vue-apexcharts'
import { Bar } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import DateChart from '@/views/dashboard/chart/DateChart'
import AdminResource from '@/api/admin'
const adminRescource = new AdminResource()
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)
export default {
  name: 'Chart',
  components: { DateChart, Bar },
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
    },
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
      charts: {},
      show_chart: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '#f87979',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event, args) => {
          // console.log(event, args)
          this.show_chart = true
          // console.log(this.chartData)
          // console.log(this.chartData?.labels)
          const chart_date = this.chartData?.labels[args[0].index].replace('tháng ', '')
          // console.log(chart_date, args[0].index, 'gfdvh')
          this.requestDateChartList(+chart_date)
          // need to access my_data here
        }
      }
    }
  },
  watch: {
    chart_data(value) {
      this.fillDataBarChart(value)
    }
  },
  methods: {
    // handleClick(event, chartContext, config) {
    //   // console.log(config.dataPointIndex, +this.chartOptions?.xaxis?.categories[config.dataPointIndex].replace('tháng ', ''), 'chartOptions')
    //   // console.log(event, chartContext, config)
    //   // console.log(event, chartContext, config)
    //   this.show_chart = true
    //   const chart_date = +this.chartOptions?.xaxis?.categories[config.dataPointIndex].replace('tháng ', '')
    //   this.requestDateChartList(chart_date)
    // },
    requestDateChartList(date) {
      const query = {
        month: date,
        year: new Date().getFullYear()
      }
      adminRescource.dateChart(query).then(res => {
        const { error_code, data } = res

        // console.log(data)
        if (error_code === 0) {
          this.charts = data
        }
      })
    },
    fillDataBarChart(data) {
      // console.log('.................data ', JSON.stringify(data))
      // this.chartOptions1.xaxis.categories = data.map(d => d.user_name)
      // this.chartData = { ...this.chartData, xaxis: { categories: data.map(d => d.month) }}

      this.chartData = { ...this.chartData, labels: data.map(d => d.month), datasets: [{ ...this.chartData.datasets[0], data: data.map(({ money }) => money || 0) }] }
      // this.series = [{ name: '', data: data.map(({ view_number }) => view_number || 0) }]
      // this.series = [{ name: '', data: data.map(({ money }) => money || 0) }]
      // this.series = data.map(d => ({
      //   name: d.name,
      //   data: [d.view_number]
      // }))

      // console.log(this.series, this.chartOptions)
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
