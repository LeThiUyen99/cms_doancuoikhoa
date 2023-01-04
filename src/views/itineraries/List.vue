<template>
  <el-row class="app-container list-itineraries-tour">
    <el-row class="list-tour__header">
      <el-col :sm="12">
        <h3>{{ $t('itineraries_tour') }}</h3>
      </el-col>
      <el-col :sm="12" align="right">
        <el-button type="primary" @click="addItinerariesTour">{{ $t('add') }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-tour__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center" width="50">
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('day')" prop="name" align="center" width="150">
          <template slot-scope="scope">{{ `${scope.row.name} ${scope.row.day}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('image')" prop="image" align="center">
          <template slot-scope="scope">
            <el-image v-if="scope.row.image" :src="url + scope.row.image" fit="contain" style="height: 70px;" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('desc')" prop="description" align="center" />
        <el-table-column :label="$t('name_tour')" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.tour? scope.row.tour.name: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('action')" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="updateItinerariesTour(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteItirenatiesTour(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-category__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestItinerariesTourList" />
      </el-row>
      <dialog-form-itineraties :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectItineraries" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import BASE_URL from '@/constant/domain'
import Pagination from '@/components/Pagination'
import ItinerariesResource from '@/api/itineraries'
import DialogFormItineraties from '@/views/itineraries/compoments/DialogFormItineraties'
import i18n from '@/lang/i18n'
const itinerariesResource = new ItinerariesResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { Pagination, DialogFormItineraties },
  data() {
    return {
      listQuery: Object.assign({}, defaultQuery),
      loadingTable: false,
      tableData: [],
      total: 0,
      onShowDialog: false,
      isAdd: false,
      url: BASE_URL,
      objectItineraries: {}
    }
  },
  created() {
    this.requestItinerariesTourList()
  },
  methods: {
    onDeleteItirenatiesTour(row) {
      this.$confirm(i18n.t('delete_confirm').format(row.name)).then(_ => {
        itinerariesResource.deleteItineraries(row.id).then(response => {
          const { error_code, error_msg } = response
          if (error_code === 0) {
            this.$message.success(i18n.t('delete_success.'))
            this.requestItinerariesTourList()
          } else {
            this.$message.error(error_msg)
          }
        })
      }).catch(_ => {})
    },
    requestItinerariesTourList() {
      this.loadingTable = true
      itinerariesResource.itinerariesList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        if (error_code === 0) {
          this.tableData = data.data
          this.total = data.totalPage
        }
      })
    },
    addItinerariesTour() {
      this.onShowDialog = true
      this.isAdd = true
      this.objectItineraries = {}
    },
    updateItinerariesTour(row) {
      this.onShowDialog = true
      this.isAdd = false
      this.objectItineraries = Object.assign({}, row)
    },
    handleClickButtonDialog(object) {
      const { dialog, reload } = object
      this.onShowDialog = dialog
      if (reload) {
        this.requestItinerariesTourList()
      }
    }
  }
}
</script>

<style scoped>
</style>
