<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" :before-close="handleClose">
    <el-form :model="body">
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="body.name" :placeholder="$t('name')" />
      </el-form-item>
      <el-form-item :label="$t('menu')">
        <el-select v-model="body.menu_id" class="w-100" filterable remote :multiple-limit="1" :placeholder="$t('menu')">
          <el-option v-for="menu in menus" :key="menu.id" :label="menu.name" :value="menu.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import i18n from '@/lang/i18n'
// import PermissionResource from '@/api/permission'
import AdminResource from '@/api/admin'
// const permissionResource = new PermissionResource()
const adminResource = new AdminResource()
export default {
  name: 'DialogFormPermission',
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
      dialog: { titleName: i18n.t('add_permission'), buttonName: i18n.t('add') },
      body: {},
      menus: []
    }
  },
  watch: {
    isAdd(value) {
      if (value) {
        this.body = {}
        this.dialog = Object.assign({}, { titleName: i18n.t('add_permission'), buttonName: i18n.t('add') })
      } else {
        this.dialog = Object.assign({}, { titleName: i18n.t('update_permission'), buttonName: i18n.t('update') })
      }
    },
    objectData(object) {
      if (Object.keys(object).length > 0) {
        this.body = Object.assign({}, object)
      }
    }
  },
  created() {
    this.requestMenusList()
  },
  methods: {
    requestMenusList() {
      adminResource.menuList().then(res => {
        const { error_code, data } = res
        if (error_code === 0) {
          this.menus = data.menus
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
