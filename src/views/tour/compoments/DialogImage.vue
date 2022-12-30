<template>
  <el-dialog
    :title="dialog.titleName"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-carousel height="500px">
      <el-carousel-item v-for="img in listImages" :key="img">
        <el-image :src="url + img.url" :fit="contain" style="width: 100%; height: 100%;" />
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>

<script>

import BASE_URL from '@/constant/domain'
import i18n from '@/lang/i18n'

export default {
  name: 'DialogImage',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    listImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      url: BASE_URL,
      dialog: { titleName: i18n.t('list_image') },
      contain: 'contain',
      images: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('onClickButtonDialogImage', { dialog: false, reload: false })
    }
  }
}
</script>

<style scoped>

</style>
