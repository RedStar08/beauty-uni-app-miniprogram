<template>
  <view class="video">
    <!-- 模糊背景 -->
    <view class="video-img">
      <image :src="videoInfo.img"></image>
    </view>
    <!-- 视频名称 -->
    <view class="video-name">{{ videoInfo.name }}</view>
    <!-- 工具栏部分 -->
    <view class="video-tool">
      <view
        :class="['iconfont', muted ? 'iconjingyin' : 'iconshengyin']"
        @click="handleMuted"
      ></view>
      <view class="iconfont iconzhuanfa">
        <button open-type="share"></button>
      </view>
    </view>
    <!-- 视频部分 -->
    <view class="video-play">
      <video :src="videoInfo.video" object-fit="fill" :muted="muted"></video>
    </view>
    <!-- 下载按钮 -->
    <view class="video-download" @click="handleDownload">
      <text>下载高清</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoInfo: {},
      muted: false
    }
  },
  methods: {
    handleMuted() {
      this.muted = !this.muted
    },
    async handleDownload() {
      // 提示用户
      await uni.showLoading({ title: '下载中...' })
      // 获取下载文件的内存中临时路径
      const { tempFilePath } = (await uni.downloadFile({ url: this.videoInfo.video }))[1]
      // 保存下载的文件
      await uni.saveVideoToPhotosAlbum({ filePath: tempFilePath })
      uni.hideLoading()
      await uni.showToast({ title: '下载完成!', icon: 'none', duration: 1000, mask: true })
    }
  },
  onLoad() {
    const app = getApp()
    // console.log(app.globalData)
    this.videoInfo = app.globalData.videoInfo
  }
}
</script>

<style lang="scss" scoped>
.video {
  position: relative;
  .video-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    image {
      width: 100vw;
      height: 100vh;
      filter: blur(20rpx);
    }
  }
  .video-name {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 20rpx;
    color: #fff;
    font-size: 36rpx;
  }
  .video-tool {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 20rpx 0;
    height: 80rpx;
    color: #fff;
    font-size: 80rpx;
    .iconfont {
      position: relative;
      padding: 10rpx;
      margin: 0 20rpx;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.4);
      button {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  .video-play {
    display: flex;
    justify-content: center;
    align-items: center;
    video {
      width: 70vw;
      height: 70vh;
    }
  }
  .video-download {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40rpx;
    text {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      width: 60vw;
      height: 80rpx;
      border: 1rpx solid #fff;
      border-radius: 40rpx;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
