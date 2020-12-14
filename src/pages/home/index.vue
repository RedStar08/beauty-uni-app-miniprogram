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
      <view v-if="current === 0">
        <home-recommend></home-recommend>
      </view>
      <view v-if="current === 1">
        <home-category></home-category>
      </view>
      <view v-if="current === 2">
        <home-new></home-new>
      </view>
      <view v-if="current === 3">
        <home-album></home-album>
      </view>
    </view>
  </view>
</template>

<script>
// 注意此处导入组件的时候必须采用驼峰命名 否则找不到对应的组件
import homeAlbum from './home-com/home-album'
import homeCategory from './home-com/home-category'
import homeNew from './home-com/home-new'
import homeRecommend from './home-com/home-recommend'
import { uniSegmentedControl } from '@dcloudio/uni-ui'

const a = 0
export default {
  data() {
    return {
      items: [
        {
          title: '推荐'
        },
        {
          title: '分类'
        },
        {
          title: '最新'
        },
        {
          title: '专辑'
        }
      ],
      current: 1
    }
  },
  components: { homeAlbum, homeCategory, homeNew, homeRecommend, uniSegmentedControl },
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
