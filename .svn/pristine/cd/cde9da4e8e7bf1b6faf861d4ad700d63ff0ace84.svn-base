<template>
  <view class="logistics-notify-container">
    <!-- 空状态 -->
    <view class="empty-state" v-if="false">
      <image src="../../static/images/logistics-empty.png" />
      <text class="txt">当前暂未收到消息</text>
      <!-- 返回按钮 -->
      <view class="back-btn">返回</view>
    </view>

    <!-- 消息列表 -->
    <view style="height: 30rpx;"></view>
    <MessageBar class="message-bar" v-for="item in 3" :key="item" />

    <view class="no-more">我是有底线的~</view>
  </view>
</template>

<script setup>
import { useSystemStore } from '@/stores/system.js';

const systemStore = useSystemStore()

uni.setNavigationBarTitle({
	title: "物流消息"
})
</script>

<style scoped lang="less">
.message-bar {
  margin-bottom: 30rpx;
}

.logistics-notify-container {
  // :style="`min-height: ${systemStore.getWindowHeight-44}px`"
  min-height: calc(100vh - 44px);
  background-color: #f8f9fa;
  position: relative;
  padding-bottom: 100rpx;
  box-sizing: border-box;

  .no-more {
    position: absolute;
    bottom: 50rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;

    font-size: 25rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #b0b0b0;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 208rpx;
    left: 50%;
    transform: translateX(-50%);


    >.txt {
      opacity: 0.9;
      font-size: 27.78rpx;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      color: #b2b2b2;
      margin-top: 42rpx;
    }

    >image {
      width: 207.64rpx;
      height: 208.33rpx;
    }

    .back-btn {
      margin-top: 250rpx;
      width: 194.44rpx;
      height: 62.5rpx;
      opacity: 0.9;
      border: 1.39rpx solid #333333;
      border-radius: 32.64rpx;

      font-size: 29.17rpx;
      line-height: 62.5rpx;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: center;
      color: #333333;
    }
  }
}
</style>