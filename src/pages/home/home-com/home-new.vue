<template>
  <view>最新</view>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    uni.setNavigationBarTitle({ title: '最新' })
  }
}
</script>

<style lang="scss" scoped>
</style>
