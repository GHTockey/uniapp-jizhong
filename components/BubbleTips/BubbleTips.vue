<!-- 气泡提示 BubbleTips -->
<template>
  <view class="bubble-tips-container">
    <TransitionGroup name="fade">
      <view class="bubble-tips-item" v-for="(item, index) in showItemList" :key="item.id">
        <!-- 头像 -->
        <image :src="item.img" />
        <!-- 文字 -->
        <text>{{ item.text }}</text>
      </view>
    </TransitionGroup>
  </view>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  // 传进来的数据
  itemData: {
    type: Object,
    default: () => {
      // return {
      //   id: 0,
      //   img: '',
      //   text: '3333333333333333'
      // }
    }
  }
});

const showItemList = ref([]);


let timer = null;

watch(() => props.itemData, (newData) => {
  // console.log('newData :>> ', newData);
  // 清除定时器
  if (timer) {
    clearTimeout(timer);
    showItemList.value = [];
  }
  // 将传进来的数据添加到 showItemList 中
  setTimeout(() => {
    showItemList.value = [newData];
  }, 500);
  // 设置定时器，三秒后自动移出
  timer = setTimeout(() => {
    showItemList.value = [];
  }, 3000);
});



// onMounted(() => {
//   console.log('bubbleTipsItemEl :>> ', bubbleTipsItemEl.value);
// });

</script>

<style lang="less" scoped>
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

.fade-enter-active,
.fade-leave-active {
  transition: all .3s;
}

// 离开动画
.fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

// 进入动画
.fade-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
</style>