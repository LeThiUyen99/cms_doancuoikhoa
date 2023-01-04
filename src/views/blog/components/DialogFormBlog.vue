<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" :before-close="handleClose">
    <el-form ref="ruleForm" :model="body" class="demo-ruleForm">
      <el-form-item :label="$t('title')" prop="name">
        <el-input v-model="body.title" :placeholder="$t('title')" />
      </el-form-item>
      <el-form-item :label="$t('content')" prop="name">
        <el-input v-model="body.content" type="textarea" :placeholder="$t('content')" />
      </el-form-item>
      <el-form-item :label="$t('desc')" prop="name">
        <el-input v-model="body.description" type="textarea" :placeholder="$t('desc')" />
      </el-form-item>
      <el-form-item :label="$t('img_blog')" prop="name">
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
import { getAcountInfo } from '@/utils/auth'
import BlogResource from '@/api/blog'
import uploadImage from '@/components/UploadImage'
import i18n from '@/lang/i18n'
const blogResource = new BlogResource()
const account = getAcountInfo()
export default {
  name: 'DialogFormBlog',
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
      dialog: { titleName: i18n.t('add_blog'), buttonName: i18n.t('add') },
      body: {},
      loadingSubmit: false
    }
  },
  watch: {
    isAdd(value) {
      if (value) {
        this.dialog = Object.assign({}, { titleName: i18n.t('add_blog'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_blog'), buttonName: i18n.t('update') })
      }
    },
    objectData(object) {
      if (Object.keys(object).length > 0) {
        this.body = Object.assign({}, object)
      }
    }
  },
  methods: {
    onSubmitForm() {
      if (this.isAdd) {
        this.handleCreateBlog()
      } else {
        this.handleUpdateBlog()
      }
    },
    handleCreateBlog() {
      this.loadingSubmit = true
      this.body.auth_id = account.id
      blogResource.storeBlog(this.body).then(res => {
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
      console.log(this.objectData)
      for (const key of keys) {
        if (this.body[key] !== this.objectData[key]) {
          body[key] = this.body[key]
        }
      }
      body.id = this.body.id
      return body
    },
    handleUpdateBlog() {
      this.loadingSubmit = true
      const body = this.getBody()
      blogResource.updateBlog(body).then(res => {
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

<style scoped>

</style>
