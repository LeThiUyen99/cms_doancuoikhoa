<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form ref="ruleForm" :model="objectData" :rules="rules" class="demo-ruleForm">
      <el-form-item :label="$t('name_tour')" prop="name">
        <el-input v-model="objectData.name" :placeholder="$t('name_tour')" />
      </el-form-item>
      <el-row>
        <el-col :span="12" style="padding-right: 10px">
          <div class="grid-content bg-purple">
            <el-form-item :label="$t('price')" prop="name">
              <el-input v-model="objectData.price" :placeholder="$t('price')" />
            </el-form-item>
            <el-form-item class="start-from" :label="$t('from_start')" prop="name">
              <el-date-picker
                v-model="objectData.start_date"
                type="datetime"
                format="dd-MM-yyyy HH:mm:ss"
                :placeholder="$t('from_start')"
              />
            </el-form-item>
            <el-form-item :label="$t('country')" prop="name">
              <el-select v-model="countryId" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('category')">
                <el-option
                  v-for="country in countries"
                  :key="country.id"
                  :label="country.name"
                  :value="country.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('category')" prop="name">
              <el-select v-model="objectData.category_id" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('category')">
                <el-option
                  v-for="cate in categories"
                  :key="cate.id"
                  :label="cate.name"
                  :value="cate.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('quantily')" prop="name">
              <el-input v-model="objectData.quantity" :placeholder="$t('quantily')" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <!--            <el-form-item :label="$t('slug')" prop="name">-->
            <!--              <el-input v-model="objectData.slug" :placeholder="$t('slug')" />-->
            <!--            </el-form-item>-->
            <el-form-item :label="$t('currency_unit')" prop="name">
              <el-input v-model="objectData.currency" :placeholder="$t('currency_unit')" />
            </el-form-item>
            <el-form-item class="time-end" :label="$t('time_end')" prop="name">
              <el-date-picker
                v-model="objectData.expire_date"
                type="datetime"
                format="dd-MM-yyyy HH:mm:ss"
                :default-time="defaultTime"
                :placeholder="$t('time_end')"
              />
            </el-form-item>
            <el-form-item :label="$t('city')" prop="name">
              <el-select v-model="objectData.city_id" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('city')">
                <el-option
                  v-for="city in citis"
                  :key="city.id"
                  :label="city.name"
                  :value="city.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('sold_number')" prop="name">
              <el-input v-model="objectData.sold_number" :placeholder="$t('sold_number')" />
            </el-form-item>
            <el-form-item :label="$t('guest_number')" prop="name">
              <el-input v-model="objectData.guest_number" :placeholder="$t('guest_number')" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item :label="$t('desc')" prop="name">
        <el-input v-model="objectData.description" type="textarea" :rows="3" :placeholder="$t('desc')" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item :label="$t('avatar')" prop="images">
              <div class="clearfix" />
              <upload-image v-model="objectData.images" :url-current="objectData.images" @onSetUrlImage="handleSetImageTour" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item :label="$t('image')" prop="thumbnail">
              <div class="clearfix" />
              <upload-image v-model="objectData.thumbnail" :url-current="objectData.thumbnail" @onSetUrlImage="handleSetImageKeyTour" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form :model="objectImg">
        <el-form-item v-if="objectData.id" :label="$t('list_image')" prop="image">
          <div class="clearfix" />
          <upload-image-tour :file-list="listImage" @onChangeUploadImage="handleChangeUploadImage" />
        </el-form-item>
      </el-form>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import UploadImageTour from '@/views/tour/compoments/UploadImageTour'
import UploadImage from '@/components/UploadImage'
import i18n from '@/lang/i18n'
import CategoryResource from '@/api/category'
import TourResource from '@/api/tour'
const tourResource = new TourResource()
const categoryResource = new CategoryResource()

export default {
  name: 'DialogFormTour',
  components: { UploadImage, UploadImageTour },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    objectData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialog: { titleName: i18n.t('add_tour'), buttonName: i18n.t('add') },
      rules: {
        name: [
          { required: true, message: i18n.t('vali_acc_name'), trigger: 'blur' }
        ]
      },
      defaultTime: '23:59:00',
      categories: [],
      tourAvatar: '',
      listImage: [],
      loadingSubmit: false,
      countries: [],
      citis: [],
      countryId: '',
      objectImg: {},
      thumbNail: ''
    }
  },
  watch: {
    objectData(object) {
      this.countryId = object.country_id
    },
    countryId(country_id) {
      this.objectData.country_id = country_id
      this.requestProvinceList(country_id)
    },
    isAdd(value) {
      if (value) {
        this.dialog = Object.assign({}, { titleName: i18n.t('add_tour'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_tour'), buttonName: i18n.t('update') })
      }
    }
  },
  created() {
    this.requestCategoryList()
    this.requestCountryList()
  },
  methods: {
    submitListImage() {
      if (this.listImage.length > 0) {
        const array = []
        this.listImage.map(image => {
          array.push(image.url)
        })
        this.objectImg.url = [...array]
      } else {
        this.objectImg.url = []
      }
      this.objectImg.tour_id = this.objectData.id
      console.log(this.objectData)
      tourResource.storeListImage(this.objectImg).then(res => {
        console.log(this.objectImg)
        const { error_code, data } = res
        if (error_code === 0) {
          this.$message.success(data.error_msg)
        } else {
          this.$message.error(data.error_msg)
        }
      })
    },
    onSubmitForm() {
      if (this.isAdd) {
        this.handleCreateTour()
      } else {
        this.submitListImage()
        this.handleUpdateTour()
      }
    },
    handleCreateTour() {
      this.loadingSubmit = true
      tourResource.storeTour(this.objectData).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.objectData = []
          this.$message.success(error_msg)
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
      })
    },
    handleUpdateTour() {
      this.loadingSubmit = true
      const body = {
        id: this.objectData.id,
        name: this.objectData.name,
        category_id: this.objectData.category_id,
        city_id: this.objectData.city_id,
        country_id: this.objectData.country_id,
        currency: this.objectData.currency,
        expire_date: this.objectData.expire_date,
        start_date: this.objectData.start_date,
        guest_number: this.objectData.guest_number,
        images: this.objectData.images,
        price: this.objectData.price,
        quantity: this.objectData.quantity,
        slug: this.objectData.slug,
        description: this.objectData.description,
        thumbnail: this.objectData.thumbnail
      }
      tourResource.updateTour(body).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.objectData = []
          this.$message.success(error_msg)
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
      })
    },
    requestCategoryList() {
      categoryResource.categoryList().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.categories = data.list
        }
      })
    },
    requestCountryList() {
      tourResource.getCountryList().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.countries = data.data
        }
      })
    },
    requestProvinceList(country_id) {
      tourResource.getProvinceList({ country_id: country_id }).then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.citis = data.data
        }
      })
    },
    handleChangeUploadImage(url) {
      this.listImage = [...url]
    },
    handleSetImageTour(object) {
      if (Object.keys(object).length > 0) {
        this.objectData.images = object.name
      }
    },
    handleSetImageKeyTour(object) {
      if (Object.keys(object).length > 0) {
        this.objectData.thumbnail = object.name
      }
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
.el-dialog{
  margin-bottom: 30px;
}
</style>
