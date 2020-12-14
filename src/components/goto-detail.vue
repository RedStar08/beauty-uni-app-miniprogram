<template>
  <view class="goto-detail" @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    imageInfo: Object
  },
  methods: {
    handleClick() {
      // 保存当前图片信息
      const app = getApp()
      app.globalData.imageInfo = this.imageInfo
      // 跳转到图片详情页面
      uni.navigateTo({ url: '/pages/image-detail/index' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
