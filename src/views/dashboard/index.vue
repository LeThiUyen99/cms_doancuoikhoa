<template>
  <el-row class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <div class="grid-content bg-purple">
          <div class="count-container">
            <el-card :body-style="{ padding: '0px' }">
              <div class="income item-col">
                <div class="thumb">
                  <el-image :src="icon_money" fit="contain" style="width: 100px" />
                </div>
                <div class="data-income">
                  <p class="revenue">{{ $t('revenue') }}</p>
                  <p>{{ formatNumber(income) }}</p>
                </div>
              </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }">
              <div class="count-buy item-col">
                <div class="thumb">
                  <el-image :src="cart" fit="contain" style="width: 100px" />
                </div>
                <div class="data-count-buy">
                  <p class="revenue">{{ $t('book_tour') }}</p>
                  <p>{{ count }}</p>
                </div>
              </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }">
              <div class="count-cancel item-col">
                <div class="thumb">
                  <el-image :src="returns" fit="contain" style="width: 100px" />
                </div>
                <div class="data-cancel">
                  <p class="revenue">{{ $t('total_cancel_tour') }}</p>
                  <p>{{ cancel }}</p>
                </div>
              </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }">
              <div class="count-success item-col">
                <div class="thumb">
                  <el-image :src="returns" fit="contain" style="width: 100px" />
                </div>
                <div class="data-cancel">
                  <p class="revenue">{{ $t('total_success_tour') }}</p>
                  <p>{{ success }}</p>
                </div>
              </div>
            </el-card>
          </div>
          <div class="chart-container">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple">
                <chart :chart_data="chart_data" :screen-name="screenName" />
              </div>
              </el-col>
              <el-col :span="24"><div class="grid-content bg-purple-light">
                <pie-chart :chart_data="pie_data" :screen-name="screenName" />
              </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { formatNumber } from '@/utils/convert'
import cash_icon from '@/assets/images/cash-icon.svg'
import cart from '@/assets/images/orders.svg'
import return_svg from '@/assets/images/return-svg.svg'
import Chart from '@/views/dashboard/chart/Chart'
import pieChart from '@/views/dashboard/chart/PieChart'
import AdminResource from '@/api/admin'
const adminRescource = new AdminResource()
export default {
  name: 'Dashboard',
  components: { Chart, pieChart },
  data() {
    return {
      chart_data: [],
      pie_data: [],
      screenName: '',
      icon_money: cash_icon,
      cart: cart,
      returns: return_svg,
      income: 0,
      count: 0,
      success: 0,
      cancel: 0
    }
  },
  created() {
    this.requestChartList()
  },
  methods: {
    requestChartList() {
      adminRescource.chartList().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.income = data.income
          this.count = data.count
          this.cancel = data.cancel
          this.success = data.success
          const view = data.view
          const month = data.incomeByMonth
          this.drawChart(month)
          this.piesChart(view)
          this.NameScreen(view)
        }
      })
    },
    NameScreen() {
      this.screen_name = this.screenName
      console.log('--------------------------------------this.screen_name = ', this.screenName)
    },
    drawChart(data) {
      this.chart_data = [...data]
    },
    piesChart(data) {
      this.pie_data = [...data]
    },
    formatNumber
  }
}
</script>
<style scoped>
.dashboard-container{
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#line-chart{
  height: 350px;
}
.table-data{
  padding: 30px;
}
.list__data{
  padding-top: 30px;
}
.item:before {
  content: "từ ";
}
.item + .item:before {
  content: " đến ";
}
.list-detail{
  margin-top: 50px;
}
.custom-date-picker.el-date-picker>.el-picker-panel__sidebar{
    width: 200px!important;
  }
.card-footer-page {
  padding-top: 30px;
}
.page-item.active .page-link {
  z-index: 1;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.pagination-container{
  display: block!important;
}
.count-container, .item-col{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.count-container .el-card{
  width: 24%;
  padding: 20px;
  cursor: pointer;
}
.count-container p{
  margin: 0;
  font-size: 1.3em;
  font-weight: bold;
}
.revenue{
  color: #aaa;
  font-size: 1em !important;
  padding: 10px;
  padding-top: 25px;
}
.income .el-image{
  padding-top: 20px;
}
/*.chart-container{*/
/*  display: flex;*/
/*  width: 100%;*/
/*}*/
/*.column-chart{*/
/*  width: 79%;*/
/*}*/
/*.pie-chart{*/
/*  width: 100%;*/
/*}*/
</style>
