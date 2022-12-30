<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" :before-close="handleClose">
    <el-form :model="body">
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="body.name" :placeholder="$t('name')" />
      </el-form-item>
      <el-form-item :label="$t('username')" prop="user_name">
        <el-input v-model="body.user_name" :placeholder="$t('username')" />
      </el-form-item>
      <el-form-item :label="$t('phone')" prop="phone">
        <el-input v-model="body.phone" :placeholder="$t('phone')" />
      </el-form-item>
      <el-form-item :label="$t('email')" prop="email">
        <el-input v-model="body.email" :placeholder="$t('email')" />
      </el-form-item>
    </el-form><span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('canel') }}</el-button>
      <el-button type="primary" :loading="loadingSubmit" @click="onSubmitForm('ruleForm')">{{ dialog.buttonName }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import i18n from '@/lang/i18n'
import AdminResource from '@/api/admin'
const adminResource = new AdminResource()

export default {
  name: 'DialogFormAccount',
  props: {
    showDialog: {
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
      dialog: { titleName: i18n.t('update_acc'), buttonName: i18n.t('update') },
      loadingSubmit: false,
      body: {}
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
  methods: {
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
    onSubmitForm() {
      this.loadingSubmit = true
      const body = this.getBody()
      console.log(body)
      adminResource.updateAccount(body).then(res => {
        this.loadingSubmit = false
        const { error_code, error_msg } = res
        if (error_code === 0) {
          this.$emit('onClickButtonDialog', { dialog: false, reload: true })
          this.objectData = []
          this.$message.success(error_msg)
        } else {
          this.$message.error(error_msg)
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
