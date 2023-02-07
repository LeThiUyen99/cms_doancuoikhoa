<template>
  <el-row class="app-container list-book-tour">
    <el-row class="list-book-tour__header">
      <h3>{{ $t('manage_comment') }}</h3>
    </el-row>
    <el-row class="list-book-tour__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center" width="50">
          <template slot-scope="scope">#{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('name')" prop="customer_name" align="center">
          <template slot-scope="scope">{{ scope.row.user? scope.row.user.name: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('email')" prop="customer_email" align="center">
          <template slot-scope="scope">{{ scope.row.user? scope.row.user.email: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('comment')" prop="comment" align="center" />
        <el-table-column :label="$t('tour_name')" align="center">
          <template slot-scope="scope">{{ scope.row.tour? scope.row.tour.name: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('time')" prop="created_at" align="center">
          <template slot-scope="scope">{{ convertDateTime(scope.row.created_at) }}</template>
        </el-table-column>
      </el-table>
      <el-row class="list-category__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestCommentList" />
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import { convertDateTime } from '@/utils/convert'
import Pagination from '@/components/Pagination'
import CommentResource from '@/api/comment'
const commentResource = new CommentResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { Pagination },
  data() {
    return {
      loadingTable: false,
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultQuery)
    }
  },
  created() {
    this.requestCommentList()
  },
  methods: {
    requestCommentList() {
      this.loadingTable = true
      commentResource.commentList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tableData = data.data
          this.total = this.listQuery.page === 1 ? data.totalPage : this.total
        }
      })
    },
    convertDateTime
  }
}
</script>

<style scoped>

</style>
