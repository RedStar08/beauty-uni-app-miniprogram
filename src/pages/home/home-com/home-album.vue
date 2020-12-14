<template>
  <view class="album">
    <scroll-view class="scroll-view" scroll-y @scrolltolower="handleScrolltolower">
      <!-- banner 部分开始 -->
      <swiper class="album-swiper" indicator-dots autoplay circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image mode="widthFix" :src="item.thumb"></image>
        </swiper-item>
      </swiper>
      <!-- banner 部分结束 -->
      <!-- album 列表部分开始 -->
      <view class="album-list">
        <navigator
          class="album-item"
          v-for="item in album"
          :key="item.id"
          :url="`/pages/album/index?id=${item.id}`"
        >
          <view class="item-image">
            <image :src="item.cover"></image>
          </view>
          <view class="item-info">
            <view class="item-name">{{ item.name }}</view>
            <view class="item-desc">{{ item.desc }}</view>
            <view class="item-star">
              <view class="star">+ 关注</view>
            </view>
          </view>
        </navigator>
      </view>
      <!-- album 列表部分结束 -->
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryParams: { limit: 30, order: 'new', skip: 0 },
      hasMore: true,
      banner: [],
      album: []
    }
  },
  mounted() {
    uni.setNavigationBarTitle({ title: '专辑' })
    this.getAlbumList()
  },
  methods: {
    async getAlbumList() {
      const result = await this.request({ url: '/v1/wallpaper/album', data: this.queryParams })
      const { res, code } = result.data
      if (code !== 0)
        return uni.showToast({ title: '请求数据失败', icon: 'none', duration: 1000, mask: true })
      // console.log(res)
      // banner 部分
      if (this.banner.length === 0) {
        this.banner = res.banner
      }
      // 列表部分
      if (res.album.length === 0) {
        return (this.hasMore = false)
      }
      this.album = [...this.album, ...res.album]
    },
    handleScrolltolower() {
      // console.log('触底事件触发')
      if (this.hasMore) {
        this.queryParams.skip += this.queryParams.limit
        this.getAlbumList()
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

<style lang="scss" scoped>
/*  图片比例 640 * 284
    高度 = 750rpx / 640 * 284
*/
.album-swiper {
  width: 100vw;
  height: 750rpx / 640 * 284;
  image {
    width: 100%;
    height: 100%;
  }
}
// 列表
.scroll-view {
  height: calc(100vh - 56px);
}
.album-list {
  padding: 16rpx;
  .album-item {
    display: flex;
    padding: 20rpx 0;
    .item-image {
      flex: 1;
      image {
        // 图片 427 * 240
        width: 200rpx;
        height: 240rpx;
      }
    }
    .item-info {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 28rpx;
      font-weight: 550;
      .item-name {
        padding: 0 20rpx;
        color: #000;
      }
      .item-desc {
        // 单行解决方法
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // 多行解决方法
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 24rpx;
      }
      .item-star {
        display: flex;
        justify-content: flex-end;
        .star {
          width: 120rpx;
          padding: 6rpx;
          color: $theme-color;
          border: 5rpx solid $theme-color;
        }
      }
    }
  }
}
</style>
