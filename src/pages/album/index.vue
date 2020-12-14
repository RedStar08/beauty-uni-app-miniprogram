<template>
  <view class="album">
    <!-- 封面开始 -->
    <view class="album-cover">
      <image mode="widthFix" :src="album.lcover"></image>
      <view class="album-title">
        <view class="album-name">{{ album.name }}</view>
        <view class="album-star">关注专辑</view>
      </view>
    </view>
    <!-- 封面结束 -->
    <!-- 详情开始 -->
    <view class="album-detail">
      <view class="album-user">
        <image mode="widthFix" :src="album.user.avatar"></image>
        <text>{{ album.user.name }}</text>
      </view>
      <view class="album-desc">{{ album.desc }}</view>
    </view>
    <!-- 详情结束 -->
    <!-- 专辑-瀑布流开始 -->
    <view class="wallpaper">
      <view class="wallpaper-item" v-for="item in wallpaper" :key="item.id">
        <goto-detail :imageInfo="item">
          <image mode="scaleToFill" :src="item.thumb + item.rule.replace('$<Height>', 360)"></image>
        </goto-detail>
      </view>
    </view>
    <!-- 专辑-瀑布流结束 -->
  </view>
</template>

<script>
import gotoDetail from '@/components/goto-detail'
export default {
  components: { gotoDetail },
  data() {
    return {
      id: '',
      queryParams: { limit: 30, order: 'new', skip: 0, first: 1 },
      wallpaper: [],
      album: {},
      hasMore: true
    }
  },
  onLoad(options) {
    // console.log(options)
    this.id = options.id
    // this.id = '5d5f8e45e7bce75ae7fb8278'
    this.getAlbumDetail()
  },
  onReachBottom() {
    // console.log('触底事件触发')
    if (this.hasMore) {
      this.queryParams.first = 0
      this.queryParams.skip += this.queryParams.limit
      this.getAlbumDetail()
    } else {
      return uni.showToast({
        title: '哎呀，木有更多数据了...',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  methods: {
    async getAlbumDetail() {
      const result = await this.request({
        url: `/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.queryParams
      })
      const { res, code } = result.data
      if (code !== 0)
        return uni.showToast({ title: '请求数据失败', icon: 'none', duration: 1000, mask: true })
      // console.log(res)
      // album 详情部分
      if (!this.album.id) {
        this.album = res.album
      }
      if (res.wallpaper.length === 0) {
        this.hasMore = false
      }
      // 内容图片部分
      this.wallpaper = [...this.wallpaper, ...res.wallpaper]
    }
  }
}
</script>

<style lang="scss" scoped>
.album {
  /* 封面 */
  .album-cover {
    overflow: hidden;
    position: relative;
    image {
      width: 100%;
    }
    .album-title {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      width: 100%;
      padding: 30rpx;
      .album-name {
        font-size: 36rpx;
      }
      .album-star {
        text-align: center;
        width: 160rpx;
        padding: 10rpx;
        background-color: $theme-color;
      }
    }
  }
  /* 详情 */
  .album-detail {
    padding: 20rpx;
    font-size: 24rpx;
    .album-user {
      display: flex;
      align-items: center;
      image {
        width: 60rpx;
      }
      text {
        color: #000;
        font-size: 30rpx;
        padding: 0 20rpx;
        font-weight: 550;
      }
    }
    .album-desc {
      padding: 20rpx;
    }
  }
  /* 瀑布流 */
  .wallpaper {
    display: flex;
    flex-wrap: wrap;
    .wallpaper-item {
      width: 33.33%;
      /* 640 * 360 */
      image {
        height: 33.33vw * 360 / 480;
        border: 5rpx solid #fff;
      }
    }
  }
}
</style>
