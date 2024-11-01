<template>
  <view class="notify-container">
    <!-- 顶部空白 -->
    <view style="height: 28rpx;"></view>

    <!-- 底部按钮 -->
    <view class="notify-bottom-btn">
      <text>全部标记为已读</text>
    </view>

    <!-- 通知列表 -->
    <view class="notify-item-box">
      <view class="notify-item">
        <image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/yue.png" />
        <view>
          <text>余额通知</text>
          <!-- <text>暂未收到余额通知</text> -->
          <text>有12条未读通知</text>
          <!-- 时间 -->
          <text class="item-time">13:14:12</text>
          <!-- 消息数量 -->
          <text class="item-num">12</text>
        </view>
      </view>
      <view class="notify-item">
        <image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/wuliu.png" />
        <view>
          <text>物流信息</text>
          <!-- <text>暂未收到物流通知</text> -->
          <text>有12条未读消息</text>
          <!-- 时间 -->
          <text class="item-time">13:14:12</text>
          <!-- 消息数量 -->
          <text class="item-num">12</text>
        </view>
      </view>
      <view class="notify-item">
        <image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/fangke.png" />
        <view>
          <text>访客通知</text>
          <!-- <text>暂未收到访客通知</text> -->
          <text>有888条未读通知</text>
          <!-- 时间 -->
          <text class="item-time">13:14:12</text>
          <!-- 消息数量 -->
          <text class="item-num">12</text>
        </view>
      </view>
      <view class="notify-item">
        <image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/jifen.png" />
        <view>
          <text>积分通知</text>
          <!-- <text>暂未收到积分通知</text> -->
          <text>暂未收到新的通知</text>
          <!-- 时间 -->
          <text class="item-time">13:14:12</text>
          <!-- 消息数量 -->
          <text class="item-num">122</text>
        </view>
      </view>
      <view class="notify-item">
        <image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/yingxiao.png" />
        <view>
          <text>营销通知</text>
          <!-- <text>暂未收到优惠券通知</text> -->
          <text>暂未收到新的通知</text>
          <!-- 时间 -->
          <text class="item-time">13:14:12</text>
          <!-- 消息数量 -->
          <text class="item-num">12</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>

</script>

<style scoped lang="less">
.notify-container {
  background-color: #f8f9fa;
  height: 100vh;
  // height: 100%;


  // 通知列表
  .notify-item-box {
    background-color: #ffffff;
    padding: 0 30rpx;
    // border: 1rpx solid red;

    .notify-item {
      display: flex;
      border-bottom: 1.4rpx dotted rgba(128, 128, 128, 0.664);
      padding: 27.78rpx 0;

      // 最后一个不显示下边框
      &:last-child {
        border-bottom: none;
      }

      >image {
        width: 69.44rpx;
        height: 69.44rpx;
      }

      >view {
        display: flex;
        flex-direction: column;
        margin-left: 27.78rpx;
        flex: 1;
        position: relative;

        // 第一个文字
        >text:nth-child(1) {
          font-size: 27.78rpx;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 500;
          color: #181818;
        }

        // 第二个文字
        >text:nth-child(2) {
          margin-top: 8.33rpx;
          font-size: 23.61rpx;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #6a6a6a;
        }

        .item-time,
        .item-num {
          position: absolute;
          right: 0;
        }

        .item-time {
          font-size: 23.61rpx;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #6a6a6a;
        }

        .item-num {
          bottom: 0;

          font-size: 23rpx;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #ffffff;
          background: #ff2626;
          border-radius: 16.67rpx;
          padding: 0 7rpx;

          display: flex;
          align-items: center;
          justify-content: center;
        }


      }
    }
  }

  // 底部按钮
  .notify-bottom-btn {
    position: fixed;
    bottom: 134rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 347.22rpx;
    height: 69.44rpx;
    opacity: 0.9;
    border: 1.39px solid #333333;
    border-radius: 31.25rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 29.17rpx;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    color: #333333;
  }
}
</style>