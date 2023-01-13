<template>
  <el-row class="app-container list-permission">
    <el-row class="list-permission__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_permission') }}</h3>
      </el-col>
      <el-col :sm="12" align="right">
        <el-button type="primary" icon="el-icon-edit" @click="onShowAdd()">{{ $t('add') }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-permission__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column :label="$t('name')" align="center" prop="name" />
        <el-table-column :label="$t('menu')" align="center" prop="menu" />
        <el-table-column :label="$t('action')" align="center">
          <template slot-scope="scope">
            <el-button type="primary" circle icon="el-icon-edit" @click="onShowDialogEdit(scope.row)" />
            <el-button type="danger" circle icon="el-icon-delete" @click="onDeletePermission(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <dialog-form-permission :show-dialog="onShowDialog" :object-data="objectData" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import DialogFormPermission from '@/views/permissions/components/DialogFormPermission'
import PermissionResource from '@/api/permission'
const permissionResource = new PermissionResource()

const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { DialogFormPermission },
  data() {
    return {
      loadingTable: false,
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultQuery),
      onShowDialog: false,
      isAdd: false,
      objectData: {}
    }
  },
  created() {
    this.requestPermissionList()
  },
  methods: {
    onShowAdd() {
      this.onShowDialog = true
      this.isAdd = true
      this.objectData = {}
    },
    onShowDialogEdit(row) {
      this.onShowDialog = true
      this.isAdd = false
      this.objectData = Object.assign({}, row)
    },
    handleClickButtonDialog(object) {
      const { reload, dialog } = object
      this.onShowDialog = dialog
      if (reload) {
        this.requestPermissionList()
      }
    },
    onDeletePermission(row) {},
    requestPermissionList() {
      this.loadingTable = true
      permissionResource.permissionList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tableData = data.data
          this.total = this.listQuery.page === 1 ? data.totalPage : this.total
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
