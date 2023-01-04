<template>
  <el-row class="app-container list-account">
    <el-row class="list-account__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_blog') }}</h3>
      </el-col>
      <el-col :sm="12" align="right">
        <el-button type="primary" @click="addBlog">{{ $t('add') }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-tour__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center" prop="id" width="50">
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('img_blog')" align="center" prop="images">
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-image
              v-if="scope.row.images"
              :src="url + scope.row.images"
              fit="contain"
              style="height: 150px"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('title')" align="center" prop="title" />
        <el-table-column :label="$t('create_date')" align="center" prop="start_date">
          <template slot-scope="scope">{{ convertDate(scope.row.create_at) }}</template>
        </el-table-column>
        <el-table-column :label="$t('content')" align="center" prop="content" />
        <el-table-column :label="$t('auth')" align="center" prop="auth_id">
          <template slot-scope="scope">{{ scope.row.accounts?scope.row.accounts.name: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('action')" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteBlog(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-category__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestBlogList" />
      </el-row>
      <dialog-form-blog :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectData" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import { convertDate } from '@/utils/convert'
import DialogFormBlog from '@/views/blog/components/DialogFormBlog'
import BASE_URL from '@/constant/domain'
import Pagination from '@/components/Pagination'
import BlogResource from '@/api/blog'
import i18n from '@/lang/i18n'
const blogResource = new BlogResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { Pagination, DialogFormBlog },
  data() {
    return {
      listQuery: Object.assign({}, defaultQuery),
      loadingTable: false,
      tableData: [],
      total: 0,
      url: BASE_URL,
      isAdd: false,
      onShowDialog: false,
      objectData: {}
    }
  },
  created() {
    this.requestBlogList()
  },
  methods: {
    requestBlogList() {
      this.loadingTable = true
      blogResource.BlogList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tableData = data.data
          this.total = this.listQuery.page === 1 ? data.totalPage : this.total
        }
      })
    },
    addBlog() {
      this.isAdd = true
      this.onShowDialog = true
      this.objectData = {}
    },
    onShowDialogEdit(row) {
      this.objectData = Object.assign({}, row)
      this.isAdd = false
      this.onShowDialog = true
    },
    handleClickButtonDialog(object) {
      const { dialog, reload } = object
      this.onShowDialog = dialog
      if (reload) {
        this.requestBlogList()
      }
    },
    onDeleteBlog(row) {
      this.$confirm(i18n.t('delete_confirm').format(row.name)).then(_ => {
        blogResource.deleteBlog(row.id).then(response => {
          const { error_code, error_msg } = response
          if (error_code === 0) {
            this.$message.success(i18n.t('delete_success.'))
            this.requestBlogList()
          } else {
            this.$message.error(error_msg)
          }
        })
      }).catch(_ => {})
    },
    convertDate
  }
}
</script>

<style scoped>

</style>
