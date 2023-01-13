<template>
  <el-row class="app-container list-account">
    <el-row class="list-account__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_account') }}</h3>
      </el-col>
    </el-row>
    <el-row class="list-account__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center" prop="id" width="100">
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('name')" align="center" prop="name" />
        <el-table-column :label="$t('username')" align="center" prop="user_name" />
        <el-table-column :label="$t('phone')" align="center" prop="phone" />
        <el-table-column :label="$t('email')" align="center" header-align="center" prop="email" />
        <el-table-column :label="$t('active')" align="center" header-align="center" prop="is_active">
          <template slot-scope="scope">
            <el-switch
              :key="scope.row.id"
              :value="scope.row.is_active ? true : false"
              :active-text="getStatusTitle(scope.row.is_active)"
              @change="changeActiveReturn(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('action')" align="center">
          <template slot-scope="scope">
            <el-button type="primary" circle icon="el-icon-edit" @click="onShowDialogEdit(scope.row)" />
            <el-button type="danger" circle icon="el-icon-delete" @click="onDeleteAccount(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-shop__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestAccountList" />
      </el-row>
      <dialog-form-account :show-dialog="onShowDialog" :object-data="objectAccount" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import DialogFormAccount from '@/views/admin/compoments/DialogFormAccount'
import AdminResource from '@/api/admin'
import i18n from '@/lang/i18n'
const adminResource = new AdminResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { Pagination, DialogFormAccount },
  data() {
    return {
      listQuery: Object.assign({}, defaultQuery),
      loadingTable: false,
      tableData: [],
      total: 0,
      onShowDialog: false,
      objectAccount: {}
    }
  },
  created() {
    this.requestAccountList()
  },
  methods: {
    getStatusTitle(value) {
      return value ? i18n.t('active_') : i18n.t('not_active')
    },
    changeActiveReturn(row) {
      let is_active = row.is_active
      is_active = is_active === 1 ? 0 : 1
      const body = {
        id: row.id,
        is_active: is_active
      }
      console.log('..........................row ', JSON.stringify(row))
      adminResource.updateActive(body).then(response => {
        console.log('----------------------------------body', body)
        console.log('.............................res', response)
        const { error_code, error_msg } = response
        if (error_code === 0) {
          this.$message.success(error_msg)
          row.is_active = is_active
        } else {
          this.$message.error(error_msg)
          is_active = is_active === 1 ? 0 : 1
          // this.switchData[row.id] = status === 1 ? true : false
        }
      })
        .catch(err => {
          this.$message.error(err)
          // this.switchData[row.id] = status === 1 ? true : false
        })
    },
    requestAccountList() {
      this.loadingTable = true
      adminResource.AccountList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tableData = data.admins
          this.total = data.totalPgae
        }
      })
    },
    onShowDialogEdit(row) {
      this.objectAccount = Object.assign({}, row)
      this.onShowDialog = true
    },
    handleClickButtonDialog(object) {
      const { dialog } = object
      this.onShowDialog = dialog
    },
    onDeleteAccount(row) {
      this.$confirm(i18n.t('delete_confirm').format(row.name)).then(_ => {
        adminResource.deleteAccount(row.id).then(response => {
          const { error_code, error_msg } = response
          if (error_code === 0) {
            this.$message.success(i18n.t('delete_success.'))
            this.requestAccountList()
          } else {
            this.$message.error(error_msg)
          }
        })
      }).catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
