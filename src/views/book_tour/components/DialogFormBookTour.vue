<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" :before-close="handleClose">
    <el-form :model="body">
      <el-form-item :label="$t('name_tour')">
        <el-select v-model="body.tour_id" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('name_tour')">
          <el-option v-for="tour in tours" :key="tour.id" :label="tour.name" :value="tour.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('full_name')">
        <el-input v-model="body.customer_name" :placeholder="$t('full_name')" />
      </el-form-item>
      <el-form-item :label="$t('phone')">
        <el-input v-model="body.customer_phone" type="number" :placeholder="$t('phone')" />
      </el-form-item>
      <el-form-item :label="$t('email')">
        <el-input v-model="body.customer_email" :placeholder="$t('email')" />
      </el-form-item>
      <el-form-item :label="$t('price')">
        <el-input v-model="body.price" type="number" :placeholder="$t('price')" />
      </el-form-item>
      <el-form-item class="time-end" :label="$t('from_start')" prop="name">
        <el-date-picker
          v-model="body.start_date"
          type="datetime"
          format="dd-MM-yyyy HH:mm:ss"
          :placeholder="$t('from_start')"
        />
      </el-form-item>
      <el-form-item class="time-end" :label="$t('time_end')" prop="name">
        <el-date-picker
          v-model="body.end_date"
          type="datetime"
          format="dd-MM-yyyy HH:mm:ss"
          :default-time="defaultTime"
          :placeholder="$t('time_end')"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ItinerariesResource from '@/api/itineraries'
import BookTourResource from '@/api/book_tour'
import i18n from '@/lang/i18n'
const bookTourResource = new BookTourResource()
const itinerariesResource = new ItinerariesResource()
export default {
  name: 'DialogFormBookTour',
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
      body: {},
      loadingSubmit: false,
      dialog: { titleName: i18n.t('add_book_tour'), buttonName: i18n.t('add') },
      tours: [],
      defaultTime: '23:59:00'
    }
  },
  watch: {
    isAdd(value) {
      if (value) {
        this.body = {}
        this.dialog = Object.assign({}, { titleName: i18n.t('add_book_tour'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_book_tour'), buttonName: i18n.t('update') })
      }
    },
    objectData(object) {
      if (Object.keys(object).length > 0) {
        this.body = Object.assign({}, object)
      }
    }
  },
  created() {
    this.requestTour()
  },
  methods: {
    onSubmitForm() {
      if (this.isAdd) {
        this.handleCreateBookTour()
      } else {
        this.handleUpdateBookTour()
      }
    },
    handleCreateBookTour() {
      this.loadingSubmit = true
      this.body.start_date = new Date(this.body.start_date).getTime()
      this.body.end_date = new Date(this.body.end_date).getTime()
      bookTourResource.storeBookTour(this.body).then(res => {
        console.log(this.body, '----------------------------')
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.body = {}
          this.$message.success(error_msg)
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
      })
    },
    getBody() {
      const body = {}
      const keys = Object.keys(this.objectData)
      this.body.start_date = new Date(this.body.start_date).getTime()
      this.body.end_date = new Date(this.body.end_date).getTime()
      for (const key of keys) {
        if (this.body[key] !== this.objectData[key]) {
          body[key] = this.body[key]
        }
      }
      body.id = this.body.id
      return body
    },
    handleUpdateBookTour() {
      this.loadingSubmit = true
      const body = this.getBody()
      bookTourResource.updateBookTour(body).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.body = {}
          this.$message.success(error_msg)
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
      })
    },
    requestTour() {
      itinerariesResource.search_tour().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.tours = data
        }
      })
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>

</style>
