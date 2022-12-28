<template>
  <el-row class="app-container list-category">
    <el-row class="list-account__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_category') }}</h3>
      </el-col>
      <el-col :sm="12" align="right">
        <el-button type="primary" @click="addCategory">{{ $t('add') }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-account__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column :label="$t('name')" align="center" prop="name" />
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestCategoriesList" />
      </el-row>
      <dialog-form-category :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectCate" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import DialogFormCategory from '@/views/category/compoments/DialogFormCategory'
import CategoryResource from '@/api/category'
const categoryResource = new CategoryResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { DialogFormCategory, Pagination },
  data() {
    return {
      listQuery: Object.assign({}, defaultQuery),
      onShowDialog: false,
      isAdd: false,
      objectCate: {},
      loadingTable: false,
      tableData: [],
      total: 0
    }
  },
  created() {
    this.requestCategoriesList()
  },
  methods: {
    addCategory() {
      this.onShowDialog = true
      this.objectCate = {}
      this.isAdd = true
    },
    handleClickButtonDialog(object) {
      const { dialog } = object
      this.onShowDialog = dialog
    },
    requestCategoriesList() {
      this.loadingTable = true
      categoryResource.categoryList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tableData = data.list
          this.total = data.totalPgae
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
