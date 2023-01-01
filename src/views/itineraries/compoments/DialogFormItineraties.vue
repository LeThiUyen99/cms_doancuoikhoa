<template>
  <el-dialog :title="dialog.titleName" :visible.sync="showDialog" :before-close="handleClose">
    <el-form :model="body">
      <el-form-item :label="$t('name')">
        <el-input v-model="body.name" :placeholder="$t('name')" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import i18n from '@/lang/i18n'
export default {
  name: 'DialogFormItineraties',
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
      body: {}
    }
  },

  methods: {
    handleClose() {
      this.$emit('onClickButtonDialog', { dialog: false, reload: false })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
