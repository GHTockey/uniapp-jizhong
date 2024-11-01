<template>
  <view class="message-bar-container">
    <!-- 头部 -->
    <view class="message-bar-header">
      <view class="icon-title-box">
        <!-- 图标 -->
        <image class="icon-img" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/wuliu.png" />
        <!-- 标题 -->
        <text class="message-bar-title">物流消息</text>
      </view>
      <!-- 时间 -->
      <text class="message-bar-time">今天 12:00:00</text>
    </view>
    <!-- 内容 -->
    <view class="message-bar-content">
      <!-- 编号 -->
      <text>订单编号：1234567890</text>
      <!-- 方式 -->
      <text>发货方式：快递</text>
      <!-- 时间 -->
      <text>发货时间：2024-05-01 12:00:00</text>
    </view>
    <!-- 底部 -->
    <view class="message-bar-footer">
      <view class="message-bar-footer-item">查看</view>
    </view>
  </view>
</template>

<script setup>

</script>

<style lang="less">
.message-bar-container {
  height: 355.56rpx;
  background: #ffffff;
  border-radius: 13.89rpx;
  box-shadow: 0px 2.08rpx 4.17rpx 0px rgba(0, 0, 0, 0.05);
  padding: 29.17rpx;
  box-sizing: border-box;

  .message-bar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22.22rpx;
    // background-color: #00ff62;

    >.icon-title-box {
      display: flex;
      align-items: center;

      .icon-img {
        width: 38.89rpx;
        height: 38.89rpx;
      }

      .message-bar-title {
        border: 0.69rpx solid rgba(0, 0, 0, 0.00);
        font-size: 27.78rpx;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 500;
        color: #181818;
        margin-left: 11.11rpx;
      }
    }


    .message-bar-time {
      font-size: 23.61rpx;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #6a6a6a;
    }
  }

  .message-bar-content {
    height: 187.5rpx;
    border-top: 1.39rpx dashed #33333385;
    border-bottom: 1.39rpx dashed #33333385;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 25rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #353535;
  }

  .message-bar-footer {
    margin-top: 19.44rpx;

    .message-bar-footer-item {
      font-size: 25rpx;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #0e63d3;
    }
  }
}
</style>