<template>
  <view v-if="recommendList.length">
    <scroll-view class="recommend" scroll-y @scrolltolower="handleScrolltolower">
      <!-- 推荐开始 -->
      <view class="recommend-row">
        <navigator
          class="recommend-item"
          v-for="item in recommendList"
          :key="item.id"
          :url="`/pages/album/index?id=${item.target}`"
        >
          <image mode="widthFix" :src="item.thumb"></image>
        </navigator>
      </view>
      <!-- 推荐结束 -->
      <!-- 月份开始 -->
      <view class="months">
        <!-- 月份标题 -->
        <view class="month-title">
          <view class="month-info">
            <view class="month-date">
              <text>{{ months.DD }}/</text>{{ months.MM }}月
            </view>
            <view class="month-text"> {{ months.title }} </view>
          </view>
          <view class="month-more">更多 ></view>
        </view>
        <!-- 月份内容 -->
        <view class="month-content">
          <view class="month-item" v-for="item in months.items" :key="item.id">
            <goto-detail :imageInfo="item">
              <image
                mode="aspectFill"
                :src="item.thumb + item.rule.replace('$<Height>', 360)"
              ></image>
            </goto-detail>
          </view>
        </view>
      </view>
      <!-- 月份结束 -->
      <!-- 热门开始 -->
      <view class="hots">
        <view class="hots-title">
          <text>热门</text>
        </view>
        <view class="hots-content">
          <view class="hots-item" v-for="item in hotsList" :key="item.id">
            <image mode="widthFix" :src="item.thumb"></image>
          </view>
        </view>
      </view>
      <!-- 热门结束 -->
    </scroll-view>
  </view>
</template>

<script>
import moment from 'moment/min/moment.min.js'
import gotoDetail from '@/components/goto-detail'

export default {
  components: { gotoDetail },
  data() {
    return {
      recommendList: [],
      months: {},
      hotsList: [],
      queryParams: { limit: 30, order: 'hot', skip: 0 },
      hasMore: true
    }
  },
  mounted() {
    uni.setNavigationBarTitle({ title: '推荐' })
    this.getRecommendList()
  },
  methods: {
    async getRecommendList() {
      const result = await this.request({ url: '/v3/homepage/vertical', data: this.queryParams })
      const { res, code } = result.data
      if (code !== 0)
        return uni.showToast({ title: '请求数据失败', icon: 'none', duration: 1000, mask: true })
      // console.log(res)
      if (this.recommendList.length === 0) {
        // 推荐模块
        this.recommendList = res.homepage[1].items
        // 月份模块
        this.months = res.homepage[2]
        // console.log(this.months)
        // moment 处理时间
        this.months.MM = moment(this.months.stime).format('MM')
        this.months.DD = moment(this.months.stime).format('DD')
      }
      if (res.vertical.length === 0) {
        return (this.hasMore = false)
      }
      // 热门模块
      this.hotsList = [...this.hotsList, ...res.vertical]
    },
    handleScrolltolower() {
      if (this.hasMore) {
        this.queryParams.skip += this.queryParams.limit
        this.getRecommendList()
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
.recommend {
  height: calc(100vh - 56px);
}
// 推荐
.recommend-row {
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  .recommend-item {
    width: 50%;
    padding: 5rpx;
  }
}
// 月份
.months {
  .month-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 20rpx;
    font-size: 30rpx;
    font-weight: 600;
    color: $theme-color;
    .month-info {
      display: flex;
      align-items: center;
      .month-date {
        text {
          font-size: 34rpx;
        }
      }
      .month-text {
        color: #666;
        font-size: 36rpx;
        padding: 0 20rpx;
      }
    }
  }
  .month-content {
    display: flex;
    flex-wrap: wrap;
    .month-item {
      width: 33.33%;
      image {
        border: 5rpx solid #fff;
      }
    }
  }
}
// 热门
.hots {
  .hots-title {
    padding: 20rpx;
    font-size: 36rpx;
    font-weight: 550;
    color: $theme-color;
    text {
      padding-left: 40rpx;
      border-left: 10rpx solid currentColor;
    }
  }
  .hots-content {
    display: flex;
    flex-wrap: wrap;
    .hots-item {
      width: 33.33%;
      image {
        border: 5rpx solid #fff;
      }
    }
  }
}
</style>
