<template>
  <view>
    <view class="category">
      <navigator
        class="category-item"
        v-for="item in category"
        :key="item.id"
        :url="'/pages/image-category/index?id=' + item.id"
      >
        <image mode="aspectFill" :src="item.cover"></image>
        <view class="category-name">{{ item.name }}</view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      category: []
    }
  },
  mounted() {
    uni.setNavigationBarTitle({ title: '分类' })
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const result = await this.request({ url: '/v1/vertical/category' })
      const { res, code } = result.data
      if (code !== 0)
        return uni.showToast({ title: '请求数据失败', icon: 'none', duration: 1000, mask: true })
      // console.log(res)
      this.category = res.category
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: calc(100vh - 56px);
  .category-item {
    position: relative;
    width: 33.33%;
    height: 25%;
    image {
      height: 100%;
      border: 5rpx solid #fff;
    }
    .category-name {
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 20rpx;
      color: #eee;
      font-size: 36rpx;
    }
  }
}
</style>
