<template>
  <view class="message-bar-container">
    <!-- 头部 -->
    <view class="bar-header">
      <slot name="barHeader">
        <view>
          <!-- 图标 -->
          <image class="icon-img" src="../../static/icon/wuliu.png" />
          <!-- 标题 -->
          <text class="title">物流消息</text>
        </view>
        <!-- 时间 -->
        <text class="time">今天 12:00:00</text>
      </slot>
    </view>
    <!-- 内容 -->
    <view class="content">
      <slot name="content">
        <!-- 编号 -->
        <text>订单编号：1234567890</text>
        <!-- 方式 -->
        <text>发货方式：快递</text>
        <!-- 时间 -->
        <text>发货时间：2024-05-01 12:00:00</text>
      </slot>
    </view>
    <!-- 底部 -->
    <view class="footer">
      <slot name="footer">
        <view class="footer-item">查看</view>
      </slot>
    </view>
  </view>
</template>

<script setup>

</script>

<style scoped lang="less">
.message-bar-container {
  height: 355.56rpx;
  background: #ffffff;
  border-radius: 13.89rpx;
  box-shadow: 0px 2.08rpx 4.17rpx 0px rgba(0, 0, 0, 0.05);
  padding: 29.17rpx;
  box-sizing: border-box;

  .bar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22.22rpx;

    >view {
      display: flex;
      align-items: center;

      .icon-img {
        width: 38.89rpx;
        height: 38.89rpx;
      }
  
      .title {
        border: 0.69rpx solid rgba(0, 0, 0, 0.00);
        font-size: 27.78rpx;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 500;
        color: #181818;
        margin-left: 11.11rpx;
      }
    }


    .time {
      font-size: 23.61rpx;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #6a6a6a;
    }
  }

  .content {
    height: 187.5rpx;
    border-top: 1.39rpx dashed #333333;
    border-bottom: 1.39rpx dashed #333333;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 25rpx;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #353535;
  }

  .footer {
    margin-top: 19.44rpx;

    .footer-item {
      font-size: 25rpx;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #0e63d3;
    }
  }
}
</style>