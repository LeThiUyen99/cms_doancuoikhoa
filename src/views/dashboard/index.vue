<template>
  <div />
</template>

<script>
export default {
  name: 'Dashboard'
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
</style>
