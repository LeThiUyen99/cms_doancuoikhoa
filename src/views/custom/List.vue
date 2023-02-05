<template>
  <el-row class="app-container list-account">
    <el-row class="list-account__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_user') }}</h3>
      </el-col>
    </el-row>
    <el-row class="list-account__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center" prop="id" width="100">
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('name')" align="center" prop="name" />
        <el-table-column :label="$t('username')" align="center" prop="username" />
        <el-table-column :label="$t('phone')" align="center" prop="phone" />
        <el-table-column :label="$t('email')" align="center" header-align="center" prop="email" />
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestCustomerList" />
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import CustomerResource from '@/api/customer'
const customerResource = new CustomerResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { Pagination },

  data() {
    return {
      listQuery: Object.assign({}, defaultQuery),
      loadingTable: false,
      tableData: [],
      total: 0
    }
  },

  created() {
    this.requestCustomerList()
  },

  methods: {
    requestCustomerList() {
      this.loadingTable = true
      customerResource.customerList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tableData = data.list
          this.total = data.total
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
