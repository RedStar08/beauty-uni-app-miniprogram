<template>
  <view class="content">
    <home-album></home-album>
    <home-category></home-category>
    <home-new></home-new>
    <home-recommend></home-recommend>
  </view>
</template>

<script>
// 注意此处导入组件的时候必须采用驼峰命名 否则找不到对应的组件
import homeAlbum from './home-com/home-album'
import homeCategory from './home-com/home-category'
import homeNew from './home-com/home-new'
import homeRecommend from './home-com/home-recommend'
const a = 0
export default {
  data() {
    return {
      title: 'Hello'
    }
  },
  components: { homeAlbum, homeCategory, homeNew, homeRecommend },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
}
</style>
