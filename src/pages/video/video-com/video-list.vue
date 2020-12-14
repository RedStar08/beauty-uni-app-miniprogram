<template>
  <view class="video">
    <!-- 滑动组件 -->
    <scroll-view class="video-image" enable-flex scroll-y @scrolltolower="handleScrolltolower">
      <view
        class="image-item"
        v-for="item in videowp"
        :key="item.id"
        @click="handleVideoDetail(item)"
      >
        <image mode="widthFix" :src="item.img"></image>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    query: Object
  },
  data() {
    return {
      videowp: [],
      hasMore: true
    }
  },
  mounted() {
    uni.setNavigationBarTitle({ title: '视频列表' })
    // 首次加载
    this.getVideoList()
  },
  watch: {
    // 监听查询参数的改变
    query() {
      // 清空数据
      this.hasMore = true
      this.videowp = []
      // 重新发送请求
      this.getVideoList()
    }
  },
  methods: {
    // 异步请求获取数据
    async getVideoList() {
      const { url, queryParams } = this.query
      const result = await this.request({ url, data: queryParams })
      const { res, code } = result.data
      if (code !== 0)
        return uni.showToast({ title: '请求数据失败', icon: 'none', duration: 1000, mask: true })
      // console.log(res)
      if (res.videowp.length === 0) return (this.hasMore = false)
      // 新旧数据合并
      this.videowp = [...this.videowp, ...res.videowp]
    },
    // 触底事件触发
    handleScrolltolower() {
      // console.log('触底事件触发')
      if (this.hasMore) {
        this.query.queryParams.skip += this.query.queryParams.limit
        this.getVideoList()
      } else {
        return uni.showToast({
          title: '哎呀，木有更多数据了...',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    },
    // 跳转到视频详情页面
    handleVideoDetail(item) {
      const app = getApp()
      app.globalData.videoInfo = item
      uni.navigateTo({ url: '/pages/video-play/index' })
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  overflow: hidden;
  scroll-view {
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    height: calc(100vh - 56px);
    .image-item {
      width: 33.33%;
      image {
        border: 5rpx solid #fff;
      }
    }
  }
}
</style>
