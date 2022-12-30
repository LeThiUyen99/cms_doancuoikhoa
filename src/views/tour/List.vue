<template>
  <el-row class="app-container list-tour">
    <el-row class="list-tour__header">
      <el-col :sm="12">
        <h3>{{ $t('manage_tour') }}</h3>
      </el-col>
      <el-col :sm="12" align="right">
        <el-button type="primary" @click="addTour">{{ $t('add') }}</el-button>
      </el-col>
    </el-row>
    <el-row class="list-tour__search" style="padding-bottom: 10px">
      <el-col :sm="24">
        <el-input v-model="listQuery.q" :placeholder="$t('key_input')" />
        <el-select v-model="filterId" :placeholder="$t('key_input')">
          <el-option
            v-for="filter in filters"
            :key="`filter_${filter.key}`"
            :label="filter.name"
            :value="filter.key"
          />
        </el-select>
        <el-select v-model="CategoryId" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('category')">
          <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
        </el-select>
      </el-col>
    </el-row>
    <el-row class="list-tour__data">
      <el-table v-loading="loadingTable" :data="tableData" border>
        <el-table-column label="ID" align="center" prop="id" width="50">
          <template slot-scope="scope">{{ `#${scope.row.id}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('avatar')" align="center" prop="images">
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-image
              v-if="scope.row.images"
              :src="url + scope.row.images"
              :fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('image')" align="center" prop="thumbnail">
          <template slot-scope="scope">
            <span class="demonstration">{{ scope.row.contain }}</span>
            <el-link
              type="primary"
              @click="onShowDialogImage(scope.row)"
            >
              <el-image
                v-if="scope.row.thumbnail"
                :src="url + scope.row.thumbnail"
                :fit="contain"
              />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('name')" align="center" prop="name" />
        <el-table-column :label="$t('time')" align="center" prop="start_date">
          <template slot-scope="scope">{{ `${convertDate(scope.row.start_date)} - ${convertDate(scope.row.expire_date)}` }}</template>
        </el-table-column>
        <!--        <el-table-column :label="$t('time_end')" align="center" prop="expire_date">-->
        <!--          <template slot-scope="scope">{{ convertDate(scope.row.expire_date) }}</template>-->
        <!--        </el-table-column>-->
        <el-table-column :label="$t('price')" align="center" prop="price">
          <template slot-scope="scope">{{ `${formatNumber(scope.row.price)} ${scope.row.currency}` }}</template>
        </el-table-column>
        <el-table-column :label="$t('sold_number')" align="center" prop="sold_number" />
        <el-table-column width="100" :label="$t('quantily')" align="center" prop="quantity" />
        <el-table-column :label="$t('guest_number')" align="center" prop="guest_number" />
        <!--        <el-table-column :label="$t('desc')" align="center">-->
        <!--          <template slot-scope="scope">-->
        <!--            <div v-html="scope.row.description" />-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column :label="$t('slug')" align="center" prop="slug" />-->
        <el-table-column :label="$t('city')" align="center" prop="city_id">
          <template slot-scope="scope">{{ scope.row.city?scope.row.city.name: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('country')" align="center" prop="country_id">
          <template slot-scope="scope">{{ scope.row.country?scope.row.country.name: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('category')" align="center" prop="category_id">
          <template slot-scope="scope">{{ scope.row.category?scope.row.category.name: '' }}</template>
        </el-table-column>
        <el-table-column :label="$t('action')" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="onShowDialogEdit(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteTour(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-row class="list-category__footer">
        <pagination v-show="total > listQuery.limit" :total="total" :limit.sync="listQuery.limit" :page.sync="listQuery.page" @pagination="requestTourList" />
      </el-row>
      <dialog-form-tour :show-dialog="onShowDialog" :is-add="isAdd" :object-data="objectTour" @onClickButtonDialog="handleClickButtonDialog" />
      <dialog-image :dialog-visible="showDialogImage" :list-images="objectImage" @onClickButtonDialogImage="handleClickButtonDialogImage" />
    </el-row>
  </el-row>
</template>

<script>
import { convertDate, formatNumber } from '@/utils/convert'
import BASE_URL from '@/constant/domain'
import Pagination from '@/components/Pagination'
import DialogFormTour from '@/views/tour/compoments/DialogFormTour'
import DialogImage from '@/views/tour/compoments/DialogImage'
import TourResource from '@/api/tour'
import CategoryResource from '@/api/category'
import i18n from '@/lang/i18n'
const tourResource = new TourResource()
const categoryResource = new CategoryResource()
const defaultQuery = {
  page: 1,
  limit: 10
}
export default {
  name: 'List',
  components: { DialogFormTour, Pagination, DialogImage },
  data() {
    return {
      listQuery: Object.assign({}, defaultQuery),
      onShowDialog: false,
      isAdd: false,
      objectTour: {},
      loadingTable: false,
      tableData: [],
      total: 0,
      contain: 'contain',
      url: BASE_URL,
      showDialogImage: false,
      objectImage: [],
      categories: [],
      CategoryId: null,
      filterId: null,
      filters: [
        { key: 1, name: 'Tìm theo Id' },
        { key: 2, name: 'Tìm theo tên tour' }
      ]
    }
  },
  watch: {
    filterId(filter_id) {
      this.listQuery.filter = filter_id
      if (this.listQuery.q && this.listQuery.q.trim().length) {
        this.requestTourList()
      }
    },
    CategoryId(category_id) {
      this.listQuery.category_id = category_id
      this.requestTourList()
    }
  },
  created() {
    this.requestTourList()
    this.requestCategoryList()
  },
  methods: {
    requestCategoryList() {
      categoryResource.categoryList().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.categories = [...data.list]
        }
      })
    },
    onShowDialogImage(row) {
      const images = row.tour_images
      this.objectImage = [... images]
      console.log(this.objectImage)
      this.showDialogImage = true
    },
    handleClickButtonDialogImage(object) {
      this.showDialogImage = object.dialog
    },
    onDeleteTour(row) {
      this.$confirm(i18n.t('delete_confirm').format(row.name)).then(_ => {
        tourResource.deleteTour(row.id).then(response => {
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
    },
    convertDate,
    formatNumber
  }
}
</script>

<style scoped>
</style>
