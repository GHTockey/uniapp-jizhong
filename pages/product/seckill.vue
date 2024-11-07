<template>
	<!-- 背景图片设在此处 -->
	<view class="seckill_container" style="background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/images/money-bg.svg');">

		<HeightBar />
		<NavBar showBack isWhite bgc="transparent" title="" />

		<view class="seckill_header">
			<image mode="aspectFill" class="w-[400rpx] h-[100rpx]" src="../../static/seckill_title.svg"></image>
			<view class="flex items-center text-white gap-1 text-[28rpx]" v-if="!isEmpty">
				<text>距结束: </text>
				<view
					class="w-[45rpx] h-[45rpx] text-[#E62624] bg-white rounded-[14rpx] flex items-center justify-center">
					<text>{{ remainingTime.days }}</text>
				</view>
				<text>天</text>
				<view
					class="w-[45rpx] h-[45rpx] text-[#E62624] bg-white rounded-[14rpx] flex items-center justify-center">
					<text>{{ remainingTime.hours }}</text>
				</view>
				<text>时</text>
				<view
					class="w-[45rpx] h-[45rpx] text-[#E62624] bg-white rounded-[14rpx] flex items-center justify-center">
					<text>{{ remainingTime.minutes }}</text>
				</view>
				<text>分</text>
				<view
					class="w-[45rpx] h-[45rpx] text-[#E62624] bg-white rounded-[14rpx] flex items-center justify-center">
					<text>{{ remainingTime.seconds }}</text>
				</view>
				<text>秒</text>
			</view>
		</view>


		<!-- 商品列表容器 -->
		<view class="seckill_goods_list_container">
			<view class="seckill_goods_list_box">
				<!-- 空状态 -->
				<view class="seckill_goods_list_empty" v-if="isEmpty">
					<image mode="aspectFill" class="w-[239rpx] h-[128rpx]"
						src="https://saas.jizhongkeji.com/static/jzkj/static/images/kong2.svg"></image>
					<text>暂未上架商品</text>
				</view>


				<!-- item -->
				<view class="seckill_goods_list_item" v-for="item in 3" v-else>
					<image mode="aspectFill" class="w-[222rpx] h-[222rpx] rounded-[14rpx]"
						src="https://saas.jizhongkeji.com/static/jzkj/static/images/emp.png"></image>
					<view class="relative flex-1 flex flex-col justify-between">
						<!-- 商品标题 -->
						<text class="line-clamp-1 text-[30rpx] text-[#181818]">欧舒丹甜蜜樱花沐浴沐浴浴欧舒丹甜蜜樱花沐浴沐浴浴</text>
						<!-- 商品描述 -->
						<text class="line-clamp-1 text-[25rpx] text-[#A9A9A9]">欧舒丹甜蜜樱花沐浴沐浴浴欧舒丹甜蜜樱花沐浴沐浴浴</text>
						<!-- 秒杀进度条 -->
						<view class="seckill_goods_list_item_progress">
							<!-- 进度条 -->
							<view class="seckill_goods_list_item_progress_bar w-[50%]"></view>
							<!-- 剩余数量 -->
							<text class="text-[17rpx] text-[#FFFFFF] z-10">剩余100件</text>
							<!-- 相对定位指示器 -->
							<view class="seckill_goods_list_item_progress_indicator z-10 absolute left-[50%]">
								<image mode="aspectFill" class="w-[25rpx] h-[25rpx]" src="../../static/ms_sd.svg">
								</image>
							</view>
						</view>
						<!-- 原价 -->
						<text class="text-[25rpx] text-[#A9A9A9]">原价：￥100</text>
						<!-- 秒杀价 -->
						<view class="text-[#FD463E] text-[41.67rpx] font-bold">
							<text class="text-[25rpx]">￥</text>
							<text>100</text>
							<text class="text-[25rpx]">.00</text>
						</view>

						<!-- 相对定位按钮 -->
						<view class="seckill_goods_list_item_btn" :class="{ disabled: item == 2 }">
							<text>抢购</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- temp 切换状态 -->
		<button @click="isEmpty = !isEmpty">[temp]切换状态</button>
	</view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 结束时间
const endTime = ref(new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2))
// 剩余时间
const remainingTime = ref({
	days: 0,
	hours: 0,
	minutes: 0,
	seconds: 0,
});
let timer; // 定时器
onMounted(() => {
	calculateRemainingTime(); // 初始化剩余时间
	timer = setInterval(calculateRemainingTime, 1000); // 每秒更新一次剩余时间
});

onUnmounted(() => {
	clearInterval(timer); // 组件卸载时清除定时器
});
// 是否空状态
const isEmpty = ref(false);


// 计算结束时间
const calculateRemainingTime = () => {
	const now = new Date();
	const timeDiff = endTime.value - now;

	if (timeDiff > 0) {
		remainingTime.value.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		remainingTime.value.hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
		remainingTime.value.minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
		remainingTime.value.seconds = Math.floor((timeDiff / 1000) % 60);
	} else {
		remainingTime.value.days = 0;
		remainingTime.value.hours = 0;
		remainingTime.value.minutes = 0;
		remainingTime.value.seconds = 0;
	}
};

// 随机生成一个0-100的数字
const randomNum = () => {
	return Math.floor(Math.random() * 100) + 1;
};
</script>

<style scoped lang="scss">
.seckill_container {
	min-height: 100vh;
	background-color: #f4f6fa;
	background-size: 100%;
	background-repeat: no-repeat;


	.seckill_header {
		min-height: 508rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.seckill_goods_list_container {
		padding: 0 30rpx;
		// border: 1px solid rgb(255, 255, 255);
		margin-top: -100rpx;

		.seckill_goods_list_box {
			// width: 691.67rpx;
			min-height: 1070.14rpx;
			// padding: 24rpx;
			// background: #ffffff;
			border-radius: 22.22rpx;
			// border: 1px solid gold;
			display: flex;
			flex-direction: column;
			gap: 20rpx;

			// 空状态
			.seckill_goods_list_empty {
				height: 1070.14rpx;
				background: #ffffff;
				border-radius: 22.22rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 27rpx;
				color: #838383;
				gap: 50rpx;
			}


			// item
			.seckill_goods_list_item {
				// width: 691.67rpx;
				padding: 20rpx;
				height: 255rpx;
				background: #ffffff;
				border-radius: 22.22rpx;
				display: flex;
				align-items: center;
				gap: 20rpx;
				// justify-content: space-between;


				.seckill_goods_list_item_btn {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 131.94rpx;
					height: 68.06rpx;
					opacity: 0.9;
					background: linear-gradient(180deg, #ff4744, #ff1e1a);
					border-radius: 34.03rpx;
					color: white;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.seckill_goods_list_item_btn.disabled {
					background: linear-gradient(180deg, #919191, #535353);
				}
			}

			.seckill_goods_list_item_progress {
				width: 265.28rpx;
				height: 23.61rpx;
				background: #6f6f6f32;
				border-radius: 11.81rpx;
				margin: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: start;
				padding: 0 13rpx;
				position: relative;

				.seckill_goods_list_item_progress_indicator {
					width: 37.5rpx;
					height: 37.5rpx;
					background: linear-gradient(135deg, #fff129, #fca000);
					border: 0.69rpx solid rgba(0, 0, 0, 0.00);
					border-radius: 50%;
					transform: translateX(-50%);
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.seckill_goods_list_item_progress_bar {
					// width: 50%;
					height: 100%;
					border-radius: 11.81rpx 0 0 11.81rpx;
					background: #ff065e;
					position: absolute;
					left: 0;
					top: 0;
				}
			}
		}
	}
}
</style>
