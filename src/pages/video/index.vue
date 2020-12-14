<template>
  <view class="tabs">
    <view class="tabs-title">
      <view class="tabs-title-text">
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
    <view class="tabs-content">
      <view v-if="current < 4">
        <video-list :query="items[current]"></video-list>
      </view>
      <view v-if="current === 4">
        <video-category :query="items[current]"></video-category>
      </view>
    </view>
  </view>
</template>

<script>
// 注意此处导入组件的时候必须采用驼峰命名 否则找不到对应的组件
import videoList from './video-com/video-list'
import videoCategory from './video-com/video-category'
import { uniSegmentedControl } from '@dcloudio/uni-ui'

const a = 0
export default {
  components: { videoList, videoCategory, uniSegmentedControl },
  data() {
    return {
      items: [
        {
          title: '推荐',
          url: '/videoimg/v1/videowp/featured',
          queryParams: { limit: 30, skip: 0, order: 'hot' }
        },
        {
          title: '娱乐',
          url: '/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',
          queryParams: { limit: 30, skip: 0, order: 'new' }
        },
        {
          title: '最新',
          url: '/videoimg/v1/videowp/videowp',
          queryParams: { limit: 30, skip: 0, order: 'new' }
        },
        {
          title: '热门',
          url: '/videoimg/v1/videowp/videowp',
          queryParams: { limit: 30, skip: 0, order: 'hot' }
        },
        {
          title: '分类',
          url: '/videoimg/v1/videowp/category',
          queryParams: {}
        }
      ],
      current: 0
    }
  },
  onLoad() {},
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      }
    }
  }
}
</script>

<style lang="scss">
.tabs {
  .tabs-title {
    position: relative;
    padding: 20rpx;
    color: $theme-color;
    .tabs-title-text {
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
  .tabs-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
