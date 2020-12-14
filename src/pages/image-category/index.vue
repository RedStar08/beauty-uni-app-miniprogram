<template>
  <view class="cate">
    <view class="cate-title">
      <view class="cate-title-text">
        <!-- 分段器 - tab组件 -->
        <uni-segmented-control
          :current="current"
          :values="items.map((v) => v.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="var(--themeColor)"
        ></uni-segmented-control>
      </view>
      <view class="iconfont iconsearch"></view>
    </view>
    <!-- 主题内容 -->
    <view class="cate-content">
      <!-- 滑动组件 -->
      <scroll-view class="cate-image" enable-flex scroll-y @scrolltolower="handleScrolltolower">
        <view class="image-item" v-for="item in vertical" :key="item.id">
          <image mode="widthFix" :src="item.thumb"></image>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui'

const a = 0
export default {
  data() {
    return {
      items: [
        {
          title: '最新'
        },
        {
          title: '热门'
        }
      ],
      current: 0,
      id: '',
      queryParams: { limit: 30, skip: 0, order: 'new' },
      vertical: [],
      hasMore: true
    }
  },
  components: { uniSegmentedControl },
  onLoad(options) {
    this.id = options.id
    this.getCateImage(this.id)
  },
  methods: {
    onClickItem(e) {
      // 切换 tab 并发请求
      if (this.current !== e.currentIndex) {
        // 切换索引
        this.current = e.currentIndex
        // 重置查询参数
        this.queryParams = { limit: 30, skip: 0, order: 'new' }
        // 清空数据
        this.hasMore = true
        this.vertical = []
        // 重新发起请求
        this.getCateImage(this.id)
      }
    },
    // 异步请求数据
    async getCateImage(id) {
      this.queryParams.order = this.current === 0 ? 'new' : 'hot'
      // 发起请求
      const result = await this.request({
        url: `/v1/vertical/category/${id}/vertical`,
        data: this.queryParams
      })
      const { res, code } = result.data
      if (code !== 0)
        return uni.showToast({ title: '请求数据失败', icon: 'none', duration: 1000, mask: true })
      // console.log(res)
      // 查看是否继续存在
      if (res.vertical.length === 0) return (this.hasMore = false)
      // 存在那么继续拼接
      this.vertical = [...this.vertical, ...res.vertical]
    },
    // 触底事件触发
    handleScrolltolower() {
      console.log('触底事件触发')
      if (this.hasMore) {
        this.queryParams.skip += this.queryParams.limit
        this.getCateImage(this.id)
      } else {
        return uni.showToast({
          title: '哎呀，木有更多数据了...',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }
  }
}
</script>

<style lang="scss">
.cate {
  .cate-title {
    position: relative;
    padding: 20rpx;
    color: $theme-color;
    .cate-title-text {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      right: 8%;
      transform: translateY(-55%);
      padding: 20rpx;
      font-size: 36rpx;
    }
  }
  .cate-content {
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
}
</style>
