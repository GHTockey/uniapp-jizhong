<!-- 气泡提示 BubbleTips -->
<template>
  <view class="bubble-tips-container">
    <view ref="bubbleTipsItem" class="bubble-tips-item" :style="bubbleTipsItemStyle" :class="{ 'is-show': !itemDataShow }">
      <!-- 头像 -->
      <image :src="itemDataShow?.img" />
      <!-- 文字 -->
      <text>{{ itemDataShow?.text }}</text>
    </view>
  </view>
  <!-- <button @click="nextItem">nextItem{{ isAnimating }}</button> -->
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  // 传进来的数据
  itemData: {
    type: Object
  },
  // 动画时间
  duration: {
    type: Number,
    default: 300
  },
  // 停留时间
  stayTime: {
    type: Number,
    default: 1000
  }
});

const bubbleTipsItem = ref(null); // 此方法在小程序中不可用
const isAnimating = ref(false);
const bubbleTipsItemStyle = ref({
  transition: `all ${props.duration}ms`,
});
const itemDataShow = ref();


watch(() => props.itemData, () => {
  nextItem(props.itemData);
}, { deep: true });

function nextItem(itemData) {
  // console.log('ref el', bubbleTipsItem.value.$el);
  // console.log('itemDataTemp', itemDataTemp.value);

  // uni.createSelectorQuery().in(instance).select('.bubble-tips-item').boundingClientRect(res => {
  //   console.log(res);
  // }).exec();

  // bubbleTipsItemStyle.value.transform = `translateY(-${100}%)`;
  // return;


  if (isAnimating.value) return;
  isAnimating.value = true;
  // console.log('isAnimating', isAnimating.value);

  // 让当前项执行离场动画
  // bubbleTipsItem.value.$el.style.transform = `translateY(-${100}%)`;
  // bubbleTipsItem.value.$el.style.opacity = 0;
  bubbleTipsItemStyle.value.transform = `translateY(-${100}%)`;
  bubbleTipsItemStyle.value.opacity = 0;


  // 离场动画结束后
  setTimeout(() => {
    // bubbleTipsItem.value.$el.style.transition = 'none'; // 不显示动画
    // bubbleTipsItem.value.$el.style.transform = `translateY(100%)`; // 移动到底部等待进场
    bubbleTipsItemStyle.value.transition = 'none';
    bubbleTipsItemStyle.value.transform = `translateY(100%)`;
    // 在这里更新数据
    itemDataShow.value = itemData;
  }, props.duration);


  // 进场动画
  setTimeout(() => {
    // bubbleTipsItem.value.$el.style.transition = `all ${props.duration}ms`; // 重新显示动画
    // bubbleTipsItem.value.$el.style.transform = `translateY(0)`; // 往上移动
    // bubbleTipsItem.value.$el.style.opacity = 1;
    bubbleTipsItemStyle.value.transition = `all ${props.duration}ms`;
    bubbleTipsItemStyle.value.transform = `translateY(0)`;
    bubbleTipsItemStyle.value.opacity = 1;
    isAnimating.value = false;
  }, props.duration * 2);
}


</script>

<style lang="scss" scoped>
.is-show {
  opacity: 0;
}

.bubble-tips-container {
  position: fixed;
  top: 170rpx;
  left: 35rpx;
  z-index: 9999;
  width: 371.53rpx;
  height: 55.56rpx;
  // overflow: hidden;
  // border: 1PX solid red;

  .bubble-tips-item {
    background-color: rgba(81, 81, 81, 0.6);
    width: 100%;
    height: 100%;
    border-radius: 27.78rpx;
    display: flex;
    align-items: center;
    padding: 4.17rpx;
    box-sizing: border-box;

    >image {
      width: 47.22rpx;
      height: 47.22rpx;
      background-color: #d33a3d;
      border-radius: 50%;
    }

    >text {
      margin-left: 14rpx;
      flex: 1;
      font-size: 23.61rpx;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>