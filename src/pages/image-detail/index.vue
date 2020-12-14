<template>
  <view>
    <!-- 用户部分开始 -->
    <view class="user">
      <view class="user-img">
        <image mode="widthFix" :src="imageInfo.user.avatar"></image>
      </view>
      <view class="user-desc">
        <view class="user-name">{{ imageInfo.user.name }}</view>
        <view class="user-time">{{ imageInfo.fromNow }}</view>
      </view>
    </view>
    <!-- 用户部分结束 -->
    <!-- 大图开始 -->
    <view class="big-image">
      <image mode="widthFix" :src="imageInfo.bigImg"></image>
    </view>
    <!-- 大图结束 -->
    <!-- 点赞开始 -->
    <view class="rank-handle">
      <view class="like"> <text class="iconfont icondianzan"></text>{{ imageInfo.rank }} </view>
      <view class="star"> <text class="iconfont iconshoucang"></text>收藏 </view>
    </view>
    <!-- 点赞结束 -->
  </view>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
  data() {
    return {
      imageInfo: {}
    }
  },
  mounted() {
    this.getUserInfo()
    // id=5d5f8e45e7bce75ae7fb8278
    this.getComment('5d5f8e45e7bce75ae7fb8278')
  },
  methods: {
    getUserInfo() {
      let app = getApp()
      this.imageInfo = app.globalData.imageInfo
      this.imageInfo.bigImg = this.imageInfo.thumb + this.imageInfo.rule.replace('$<Height>', 360)
      this.imageInfo.fromNow = moment(this.imageInfo.atime * 1000).fromNow()
      // console.log(this.imageInfo)
    },
    async getComment(id) {
      const result = await this.request({ url: `/v2/wallpaper/wallpaper/${id}/comment` })
      const { res, code } = result.data
      if (code !== 0)
        return uni.showToast({ title: '请求数据失败', icon: 'none', duration: 1000, mask: true })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  padding: 20rpx;
  display: flex;
  align-items: center;
  .user-img {
    padding: 0 20rpx;
    width: 120rpx;
    image {
      border-radius: 50%;
    }
  }
  .user-desc {
    padding: 10prx 0;
    .user-name {
      color: #000;
      font-size: 36rpx;
      font-weight: 600;
    }
    .user-time {
      color: #999;
    }
  }
}
.big-image {
  padding: 10rpx 0;
  width: 100vw;
}
.rank-handle {
  display: flex;
  padding: 10rpx;
  border-bottom: 2rpx solid #ccc;
  .like {
    flex: 1;
    text-align: center;
  }
  .star {
    flex: 1;
    text-align: center;
  }
  text {
    padding: 0 10rpx;
  }
}
</style>
