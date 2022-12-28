<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <el-form ref="ruleForm" :model="objectData" :rules="rules" class="demo-ruleForm">
      <el-form-item :label="$t('name_cate')" prop="name">
        <el-input v-model="objectData.name" :placeholder="$t('name_cate')" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import i18n from '@/lang/i18n'
import CategoryResource from '@/api/category'
const categoryResource = new CategoryResource()
export default {
  name: 'DialogFormCategory',
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
      rules: {
        name: [
          { required: true, message: i18n.t('vali_cate'), trigger: 'blur' }
        ]
      },
      loadingSubmit: false
    }
  },
  methods: {
    onSubmitForm() {
      if (this.isAdd) {
        this.HandleCreateCategories()
      }
    },
    HandleCreateCategories() {
      this.loadingSubmit = false
      categoryResource.storeCategory(this.objectData).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.$message.success(i18n.t('msg_cate'))
          this.objectData = []
        } else {
          this.$message.error(error_msg)
        }
      }).catch(_ => {
        this.loadingSubmit = false
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
