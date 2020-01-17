<template>
  <el-dialog :visible.sync="visible" width="350px" class="custorm-dialog" top="25vh">
    <SilderValidate trigger="always" ref="slider" @success="success" />
  </el-dialog>
</template>
<script>
import SilderValidate from '@/components/common/SilderValidate'
export default {
  components: {
    SilderValidate
  },
  data() {
    return {
      visible: false,
      first: true,
      successFn: null
    }
  },
  methods: {
    show() {
      this.visible = true
      if (!this.first) {
        this.$refs.slider.reset()
      }
      this.first = false
    },
    close() {
      this.visible = false
    },
    success(sliderToken) {
      if (typeof this.successFn === 'function') {
        this.successFn(sliderToken)
      }
      setTimeout(this.close, 500)
    },
    validate() {
      this.show()
      return new Promise((resolve, reject) => {
        this.successFn = resolve
      })
    }
  }
}
</script>
<style lang="less">
.custorm-dialog {
  .el-dialog__body {
    height: 50px;
    padding: 200px 25px 25px 25px;
  }
}
</style>
