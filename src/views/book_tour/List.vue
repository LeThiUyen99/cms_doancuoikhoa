<template>
  <el-row class="app-container list-book-tour">
    <el-row class="list-book-tour__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_book_tour') }}</h3>
      </el-col>
      <el-col :sm="12" align="right">
        <el-button type="primary" @click="addBookTour">{{ $t('add') }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-book-tour__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center" prop="id" width="100">
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('name_tour')" align="center" prop="name">
          <template slot-scope="scope">{{ scope.row.tour? scope.row.tour.name: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('full_name')" align="center" prop="customer_name" />
        <el-table-column :label="$t('phone')" align="center" prop="customer_phone" />
        <el-table-column :label="$t('email')" align="center" header-align="center" prop="customer_email" />
        <el-table-column :label="$t('price')" align="center" header-align="center" prop="price" />
        <el-table-column :label="$t('time')" align="center" header-align="center" prop="time">
          <template slot-scope="scope">{{ `${convertDateTime(scope.row.start_date)} - ${convertDateTime(scope.row.end_date)}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('active')" align="center">
          <template slot-scope="scope">
            <el-tag :type="(scope.row.active === 1) ? 'success' : 'danger'">{{ (scope.row.active === 1) ? $t('confirmation_complete'): $t('confirm_wait') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('action')" align="center">
          <template slot-scope="scope">
            <el-button v-if="showBtn" type="success" circle icon="el-icon-check" @click="onConfirmBookTour(scope.row)" />
            <el-button type="primary" circle icon="el-icon-edit" @click="onShowDialogEdit(scope.row)" />
            <el-button type="danger" circle icon="el-icon-delete" @click="onDeleteBookTour(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestBookTourList" />
      </el-row>
      <dialog-form-book-tour :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectBook" @onClickButtonDialog="handleClickButton" />
    </el-row>
  </el-row>
</template>

<script>
import { convertDateTime, formatNumber } from '@/utils/convert'
import DialogFormBookTour from '@/views/book_tour/components/DialogFormBookTour'
import Pagination from '@/components/Pagination'
import BookTourResource from '@/api/book_tour'
import TourResource from '@/api/tour'
import i18n from '@/lang/i18n'
const bookTourResource = new BookTourResource()
const tourResource = new TourResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { Pagination, DialogFormBookTour },
  data() {
    return {
      loadingTable: false,
      tableData: [],
      listQuery: Object.assign({}, defaultQuery),
      total: 0,
      objectBook: {},
      isAdd: false,
      onShowDialog: false,
      showBtn: false
    }
  },
  created() {
    this.requestBookTourList()
  },
  methods: {
    BtnConfirm() {
      for (const data of this.tableData) {
        console.log(data)
        if (data.active === 1) {
          this.showBtn = false
        } else {
          this.showBtn = true
        }
      }
    },
    onConfirmBookTour(row) {
      this.sendMessage(row)
      this.updateActive(row)
    },
    updateActive(row) {
      const body = {
        active: row.active,
        id: row.id
      }
      this.loadingTable = true
      bookTourResource.updateActiveBook(body).then(res => {
        this.loadingTable = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$message.success(error_msg)
          this.requestBookTourList()
        } else {
          this.$message.error(error_msg)
        }
      })
    },
    sendMessage(row) {
      const query = {
        full_name: row.customer_name,
        phone: row.customer_phone,
        price: formatNumber(row.price),
        start_date: convertDateTime(row.start_date),
        end_date: convertDateTime(row.end_date),
        name_tour: row.tour.name,
        id: row.id
      }
      this.loadingTable = true
      tourResource.sendMess(query).then(res => {
        this.loadingTable = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$message.success(error_msg)
          this.requestBookTourList()
        } else {
          this.$message.error(error_msg)
        }
      })
    },
    addBookTour() {
      this.objectBook = {}
      this.isAdd = true
      this.onShowDialog = true
    },
    onShowDialogEdit(row) {
      this.objectBook = Object.assign({}, row)
      this.isAdd = false
      this.onShowDialog = true
    },
    handleClickButton(object) {
      const { dialog, reload } = object
      this.onShowDialog = dialog
      if (reload) {
        this.requestBookTourList()
      }
    },
    requestBookTourList() {
      this.loadingTable = true
      bookTourResource.bookTourList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tableData = data.data
          this.total = this.listQuery.page === 1 ? data.totalPage : this.total
          this.BtnConfirm(this.tableData)
        }
      })
    },
    onDeleteBookTour(row) {
      this.$confirm(i18n.t('delete_confirm').format(row.name)).then(_ => {
        bookTourResource.deleteBookTour(row.id).then(response => {
          const { error_code, error_msg } = response
          if (error_code === 0) {
            this.$message.success(i18n.t('delete_success.'))
            this.requestBookTourList()
          } else {
            this.$message.error(error_msg)
          }
        })
      }).catch(_ => {})
    },
    convertDateTime,
    formatNumber
  }
}
</script>

<style scoped>

</style>
