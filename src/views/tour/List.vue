<template>
  <el-row class="app-container list-tour">
    <el-row class="list-account__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_tour') }}</h3>
      </el-col>
      <el-col :sm="12" align="right">
        <el-button type="primary" @click="addTour">{{ $t('add') }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-account__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center" prop="id" width="50">
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('avatar')" align="center" prop="images">
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-image
              v-if="scope.row.images"
              :src="scope.row.images"
              :fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('image')" align="center" prop="thumbnail">
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-image
              v-if="scope.row.thumbnail"
              :src="scope.row.thumbnail"
              :fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('name')" align="center" prop="name" />
        <el-table-column :label="$t('from_start')" align="center" prop="start_date" />
        <el-table-column :label="$t('time_end')" align="center" prop="expire_date" />
        <el-table-column :label="$t('price')" align="center" prop="price" />
        <el-table-column :label="$t('sold_number')" align="center" prop="sold_number" />
        <el-table-column :label="$t('quantily')" align="center" prop="quantity" />
        <el-table-column :label="$t('guest_number')" align="center" prop="guest_number" />
        <el-table-column :label="$t('slug')" align="center" prop="slug" />
        <el-table-column :label="$t('city')" align="center" prop="city_id" />
        <el-table-column :label="$t('country')" align="center" prop="country_id" />
        <el-table-column :label="$t('category')" align="center" prop="category_id" />
        <el-table-column :label="$t('active')" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteAccount(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-category__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestTourList" />
      </el-row>
      <dialog-form-tour :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectTour" @onClickButtonDialog="handleClickButtonDialog" />
    </el-row>
  </el-row>
</template>

<script>
import Pagination from '@/components/Pagination'
import DialogFormTour from '@/views/tour/compoments/DialogFormTour'
import TourResource from '@/api/tour'
const tourResource = new TourResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { DialogFormTour, Pagination },
  data() {
    return {
      listQuery: Object.assign({}, defaultQuery),
      onShowDialog: false,
      isAdd: false,
      objectTour: {},
      loadingTable: false,
      tableData: [],
      total: 0,
      contain: 'contain'
    }
  },
  created() {
    this.requestTourList()
  },
  methods: {
    addTour() {
      this.onShowDialog = true
      this.objectTour = {}
      this.isAdd = true
    },
    onShowDialogEdit(row) {
      this.objectTour = Object.assign({}, row)
      this.isAdd = false
      this.onShowDialog = true
    },
    handleClickButtonDialog(object) {
      const { dialog } = object
      this.onShowDialog = dialog
    },
    onDeleteAccount(row) {},
    requestTourList() {
      this.loadingTable = true
      tourResource.tourList(this.listQuery).then(res => {
        this.loadingTable = false
        const { error_code, data } = res
        const { list, totalPage } = data
        if (error_code === 0) {
          this.tableData = list
          this.total = totalPage
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
