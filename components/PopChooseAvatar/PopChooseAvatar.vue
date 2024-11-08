<template>
	<view class="pop_choose_avatar_container pop_bg">
		<view class="ctn">
			<image @click="close" class="close_pop_icon"
				src="https://saas.jizhongkeji.com/static/jzkj/images/close_pop_icon.png" mode="aspectFill" />
			<form @submit="submit">
				<view class="title">获取你的头像、昵称</view>
				<view class="desc">获取用户头像、昵称，主要用于快速注册</view>
				<!-- <button class="input_item chooseAvatarBtn" open-type="chooseAvatar" @click="chooseavatar" > -->
				<button class="input_item chooseAvatarBtn" open-type="chooseAvatar"
					@chooseavatar="onChooseAvatarHandler">
					<view class="label">头像</view>
					<view class="input">
						<image class="user_avatar"
							:src="wx_image || 'https://saas.jizhongkeji.com/static/jzkj/images/default_avatar.png'"
							mode="aspectFill" />
					</view>
					<image class="right" src="https://saas.jizhongkeji.com/static/jzkj/images/right.png"
						mode="widthFix" />
				</button>

				<view class="input_item">
					<view class="label">昵称</view>
					<!-- <input class="input" :disabled="!is_use_new_Profile" @change="nickname_change"
						@input="nickname_input" name="nickname" :value="nickname || ''" type="nickname"
						placeholder="请输入昵称" /> -->
					<input class="input" name="nickname" v-model="nickname" type="nickname" placeholder="请输入昵称" />
					<!-- <button v-if="!is_use_new_Profile" class="nickname_button" open-type="chooseAvatar"
						@click="chooseavatar">
					</button> -->
					<image class="right" src="https://saas.jizhongkeji.com/static/jzkj/images/right.png"
						mode="widthFix" />
				</view>

				<view class="input_item input_item_btn">
					<button class="btn" :class="{ 'disabled': !wx_image || !nickname }" form-type="submit">保存</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { request } from '@/utils/request';
import { useTempStore } from '@/stores/temp';
import { storeToRefs } from 'pinia';

const { user: userInfo } = storeToRefs(useTempStore());

const wx_image = ref('');
const nickname = ref('');

const tijiaozhong = ref(false); // 提交中
const is_use_new_Profile = ref();

const emit = defineEmits(['close']);
// const props = defineProps({
// 	userInfo: {
// 		type: Object,
// 		value: {}
// 	}
// })

onMounted(() => {
	// console.log('props.userInfo', props.userInfo);
	// const tempStore = useTempStore();
	// wx_image.value = tempStore.user ? (tempStore.user.wx_image || '') : ''
	// nickname.value = tempStore.user ? (tempStore.user.nickname || '') : ''

	wx_image.value = userInfo.value.wx_image || ''
	nickname.value = userInfo.value.nickname || ''
})

function close(e) {
	emit('close')
}
async function submit(e) {
	if (tijiaozhong.value) {
		console.log('正在提交');
		return;
	}
	tijiaozhong.value = true;
	console.log('表单提交', e.detail);

	try {
		let res = await request('/WxAppCustomer/edit_wx_image_nickname', 'post', {
			wx_image: wx_image.value,
			nickname: nickname.value,
		})
		console.log('提交结果[后端返回]', res);
		tijiaozhong.value = false;

		if (res.code == 0) {
			// getApp().globalData.user = res.data.user;
			userInfo.value = res.data.user
			uni.showToast({
				title: '成功',
				icon: 'none'
			})
			emit('submit')
			return
		} else {
			uni.showToast({
				title: res.msg,
				icon: 'none',
				mask: true,
			})
		}
	} catch (error) {
		tijiaozhong.value = false
		uni.showToast({
			title: '加载数据失败',
			icon: 'none'
		})
	}
}

function nickname_change(e) {
	if (nickname.value != e.detail.value) {
		nickname.value = e.detail.value
	}
}
function nickname_input(e) {
	if (nickname.value != e.detail.value) {
		nickname.value = e.detail.value
	}
}

//低版本基础库授权头像
function chooseavatar(e) {
	console.log('is_use_new_Profile', is_use_new_Profile.value);
	if (is_use_new_Profile.value) {
		return;
	}
	if (!uni.getUserProfile) return uni.showToast({
		title: 'app/h5 端不支持此方法',
		duration: 2000
	});
	// TODO: 该API仅支持微信小程序端
	uni.getUserProfile({
		desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		success: (res) => {
			console.log('头像授权的结果', res)
			if (res.userInfo) {
				// console.log('当前用户', userInfo.value)
				// this.setData({
				// 	'wx_image': res.userInfo.avatarUrl,
				// 	'nickname': res.userInfo.nickName,
				// })
				wx_image.value = res.userInfo.avatarUrl
				nickname.value = res.userInfo.nickName
			}
		},
		fail: res => {
			console.log(res);
		}
	})

	console.log('wx_image value', wx_image.value);
}
function onChooseAvatar(e) {
	if (!is_use_new_Profile.value) {
		return;
	}
	wx_image.value = e.detail.avatarUrl
}


// watch(props.userInfo, (value) => {
// 	wx_image.value = value ? value.wx_image : ''
// 	nickname.value = value ? value.nickname : ''
// })

// 新版获取头像
function onChooseAvatarHandler(e) {
	// console.log('onChooseAvatarTest', e);
	wx_image.value = e.detail.avatarUrl
}
function onChooseNicknameHandler(e) {
	console.log('onChooseNicknameHandler', e);
	// nickname.value = e.detail.nickName
}
</script>

<style lang="scss">
.pop_bg {
	background-color: rgba(0, 0, 0, .5);
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: 1001;
	display: flex;
	align-items: flex-end;
}

.ctn {
	width: 100%;
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;
	padding: 60rpx 35rpx;
	line-height: 1.6;
	position: relative;
}

.title {
	font-size: 40rpx;
	color: #000;
}

.desc {
	font-size: 28rpx;
	color: #aaa;
	margin-top: 10rpx;
	margin-bottom: 30rpx;
}

.ctn .user_avatar {
	width: 78rpx;
	height: 78rpx;
	border-radius: 6rpx;
}

.ctn .right {
	width: 18rpx;
	height: 31rpx;
}

.input_item {
	border-top: 2rpx solid #ebebeb;
	height: 130rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
}

.nickname_button {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	min-width: 50vw;
	min-height: 130rpx;
	opacity: 0;
	z-index: 1000;
}

.label {
	word-break: keep-all;
	flex: none;
	margin-right: 30rpx;
}

.input_item .input {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
}

.input_item.input_item_btn {
	padding: 30rpx 0;
}

.btn {
	width: 486rpx;
	height: 96rpx;
	background: #FF4F26;
	border-radius: 9rpx 9rpx 9rpx 9rpx;
	margin: 0 auto;
	font-size: 33rpx;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn.disabled {
	background: #F2F2F2;
	color: #C4C4C4;
}

.close_pop_icon {
	position: absolute;
	width: 28rpx;
	height: 28rpx;
	top: 30rpx;
	right: 30rpx;
}

.chooseAvatarBtn {
	background-color: transparent;
	border: unset;
	padding: 0;
	box-shadow: none;
	margin: unset;
	padding: unset;
	font-size: unset;

	&:after {
		border: unset;
	}
}
</style>
