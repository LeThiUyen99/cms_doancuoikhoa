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
        <el-table-column :label="$t('action')" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteCategory(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestCategoriesList" />
      </el-row>
      <dialog-form-category :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectCate" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import i18n from '@/lang/i18n'
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
    onShowDialogEdit(row) {
      this.onShowDialog = true
      this.objectCate = Object.assign({}, row)
      this.isAdd = false
    },
    onDeleteCategory(row) {
      this.$confirm(i18n.t('delete_confirm').format(row.name)).then(_ => {
        categoryResource.deleteCate(row.id).then(response => {
          const { error_code, error_msg } = response
          if (error_code === 0) {
            this.$message.success(i18n.t('delete_success.'))
            this.requestTourList()
          } else {
            this.$message.error(error_msg)
          }
        })
      }).catch(_ => {})
    },
    handleClickButtonDialog(object) {
      const { dialog, reload } = object
      this.onShowDialog = dialog
      if (reload) {
        this.requestCategoriesList
      }
    },
    requestCategoriesList() {
      this.loadingTable = true
      categoryResource.categoryList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tableData = data.list
          this.total = data.totalPage
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
