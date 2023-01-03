<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" :before-close="handleClose">
    <el-form :model="body">
      <el-form-item :label="$t('name')">
        <el-input v-model="body.name" :placeholder="$t('name')" />
      </el-form-item>
      <el-form-item :label="$t('day')">
        <el-input v-model="body.day" :placeholder="$t('day')" />
      </el-form-item>
      <el-form-item :label="$t('desc')">
        <el-input v-model="body.description" type="textarea" :placeholder="$t('desc')" />
      </el-form-item>
      <el-form-item :label="$t('name_tour')">
        <el-select v-model="body.tour_id" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('name_tour')">
          <el-option v-for="tour in tours" :key="tour.id" :label="tour.name" :value="tour.id" />
        </el-select>
        <!--        <el-input v-model="body.tour_id" :placeholder="$t('enter_vga')" />-->
        <!--        <el-button class="button-delivery" @click="requestTour">{{ $t("extra") }}</el-button>-->
      </el-form-item>
      <el-form-item :label="$t('image')">
        <div class="clearfix" />
        <upload-image v-model="body.images" :url-current="body.images" @onSetUrlImage="handleSetImageTour" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import uploadImage from '@/components/UploadImage'
import i18n from '@/lang/i18n'
import ItinerariesResource from '@/api/itineraries'
const itirenatiesResource = new ItinerariesResource()
export default {
  name: 'DialogFormItineraties',
  components: { uploadImage },
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
      dialog: { titleName: i18n.t('add_category'), buttonName: i18n.t('add') },
      body: {},
      loadingSubmit: false,
      defaultTime: '23:59:00',
      tours: []
    }
  },
  watch: {
    objectData(object) {
      console.log('.........onject update ... ', JSON.stringify(object))
      if (Object.keys(object).length > 0) {
        this.body = Object.assign({}, object)
      }
    }
  },
  created() {
    this.requestTour()
  },
  methods: {
    requestTour() {
      itirenatiesResource.search_tour().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.tours = data
        }
      })
    },
    onSubmitForm() {
      if (this.isAdd) {
        this.handleCreateItineratiesTour()
      } else {
        this.handleUpdateItirenatiesTour()
      }
    },
    handleCreateItineratiesTour() {
      this.loadingSubmit = true
      itirenatiesResource.storeItineraries(this.body).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
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
      for (const key of keys) {
        if (this.body[key] !== this.objectData[key]) {
          body[key] = this.body[key]
        }
      }
      body.id = this.objectData.id
      return body
    },
    handleUpdateItirenatiesTour() {
      this.loadingSubmit = true
      const body = this.getBody()
      itirenatiesResource.updateItineraries(body).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$message.success(error_msg)
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
      })
    },
    handleSetImageTour(object) {
      if (Object.keys(object).length > 0) {
        this.body.images = object.name
      }
    },
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
