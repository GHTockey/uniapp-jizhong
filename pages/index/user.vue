<template>
	<view class="show">
		<form @submit="form_submit">
			<view class="form_item flex_row_space_bt">

				<button class="choose_avatar_btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar"
					@click="chooseavatar">
					<image lazy-load class="user_avatar" mode="aspectFill"
						:src="`${userInfo.wx_image ? userInfo.wx_image : 'https://saas.jizhongkeji.com/static/jzkj/images/default_avatar.png'}`">
					</image>
				</button>
				<view class="form_lable">点击上方图标设置头像</view>
			</view>
			<view class="form_item flex_row_space">
				<view style="margin-right: 20rpx;flex:none;">您的名字</view>
				<input class="form_input" type="text" confirm-type="done" name="username" :value="userInfo.user_name"
					placeholder="请输入您的姓名全称" placeholder-class="nickname_placeholder" />
			</view>
			<view class="form_item flex_row_space">
				<view style="margin-right: 20rpx;flex:none;">商家名称</view>
				<input class="form_input" type="text" confirm-type="done" name="usercompany" :value="userInfo.company"
					placeholder="请输入营业执照名称" placeholder-class="nickname_placeholder" />
			</view>
			<view class="form_item flex_row_space">
				<view style="margin-right: 20rpx;flex:none;">手机号码</view>
				<input class="form_input" type="text" confirm-type="done" name="userphone" :value="userInfo.phone"
					placeholder="请输入您的手机号码" placeholder-class="nickname_placeholder" />
			</view>
			<!-- <button form-type="submit"
				style="width: 696rpx;height: 80rpx;font-weight: 500;font-size: 30rpx;border-radius: 30rpx;background-color: #FF4F26;color: #ffffff;margin-top:300rpx">确认提交</button> -->
			<button form-type="submit" style="margin: 0 30rpx; margin-top:300rpx;"
				class="tce_theme_btn text-[30rpx] h-[80rpx] rounded-[30rpx] flex justify-center items-center">确认提交</button>
		</form>
	</view>
</template>

<script>
import { useTempStore } from '@/stores/temp';
import { storeToRefs } from 'pinia';
import { request } from '@/utils/request';
import { onLoad } from '@dcloudio/uni-app';
export default {
	data() {
		return {
			userInfo: {},
			// userInfo: storeToRefs(useTempStore()).user,
			use_new_Profile: 1,
			tijiaozhong: false,
			form_type: '', // edit 编辑，其他注册
		}
	},
	mounted() {
		// console.log(111, useTempStore().user);
		// this.userInfo = useTempStore().user 
	},
	onLoad(options) {
		// console.log(
		// 	this.tijiaozhong
		// );
		if (options?.form_type) {
			this.form_type = options.form_type
		}

		// this.onLogin(user => {
		// 	this.setData({
		// 		userInfo: user
		// 	})
		// 	this.get_app_version()
		// })
		this.userInfo = storeToRefs(useTempStore()).user
		this.get_app_version()
	},
	methods: {
		//获取当前sdk的版本
		get_app_version: function (e) {
			function compareVersion(v1, v2) {
				v1 = v1.split('.')
				v2 = v2.split('.')
				const len = Math.max(v1.length, v2.length)

				while (v1.length < len) {
					v1.push('0')
				}
				while (v2.length < len) {
					v2.push('0')
				}
				for (let i = 0; i < len; i++) {
					const num1 = parseInt(v1[i])
					const num2 = parseInt(v2[i])
					if (num1 > num2) {
						return 1
					} else if (num1 < num2) {
						return -1
					}
				}
				return 0
			}
			const version = uni.getSystemInfoSync().SDKVersion
			const use_new_Profile = compareVersion(version, '2.21.2') >= 0 ? '1' : '0'
			// this.setData({
			// 	'use_new_Profile': use_new_Profile
			// })
			this.use_new_Profile = use_new_Profile
		},
		//低版本基础库授权头像
		chooseavatar(e) {
			if (this.use_new_Profile == 0) {
				uni.getUserProfile({
					desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log('头像授权的结果', res)
						if (res.userInfo) {
							// this.data.userInfo.nickname = res.userInfo.nickName
							console.log('当前用户', this.userInfo)
							// this.setData({
							// 	'userInfo.wx_image': res.userInfo.avatarUrl
							// })
							this.userInfo.wx_image = res.userInfo.avatarUrl
						}
					},
					fail: res => {
						console.log(res);
					}
				})
			} else {
				return
			}
		},
		//新版本基础库上传头像
		onChooseAvatar(e) {
			if (this.use_new_Profile == 1) {
				console.log('选择头像', e.detail)
				// this.setData({
				// 	'userInfo.wx_image': e.detail.avatarUrl,
				// })
				this.userInfo.wx_image = e.detail.avatarUrl
			} else {
				return
			}
		},
		form_submit: async function (e) {
			// console.log(this.tijiaozhong, 333);
			// return
			if (this.tijiaozhong) {
				console.log('正在提交');
				return
			}
			this.tijiaozhong = true
			console.log('表单提交', e.detail);

			try {
				uni.showLoading({
					title: '处理中',
				})
				let res = await request('/WxAppCustomer/edit_user_info', 'post', {
					user_name: e.detail.value.username || '',
					phone: e.detail.value.userphone || '',
					company: e.detail.value.usercompany || '',
					wx_image: this.userInfo.wx_image || '',
				})
				uni.hideLoading()
				this.on_save_success(res)
			} catch (error) {
				this.tijiaozhong = false
				uni.showToast({
					title: '加载数据失败',
					icon: 'none'
				})
			}
		},
		on_save_success(res_data) {
			if (res_data.code == 0) {
				// getApp().globalData.user = res_data.data.user;
				useTempStore().setUser(res_data.data.user)
				uni.showToast({
					title: '成功',
					icon: 'none'
				})
				// this.data.form_type === 'edit'
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
				return
			} else {
				this.tijiaozhong = false

				uni.showToast({
					title: res_data.msg,
					icon: 'none',
					mask: true,
				})
			}
		},
	}
}
</script>

<style scoped lang="scss">
button::after {
	border: none;
}

.choose_avatar_btn {
	box-sizing: border-box;
	background-color: transparent;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0;
	margin: 0;
	line-height: unset;
	width: 150rpx;
	height: 150rpx;
	margin-top: 100rpx;
}

.user_avatar {
	width: 150rpx;
	height: 150rpx;
}

.flex_row_space_bt {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-bottom: 2rpx solid #EDEDED;
	font-size: 30rpx;
}

.flex_row_space {
	display: flex;
	margin: 10rpx 40rpx;
	padding: 20rpx 0;
	border-bottom: 2rpx solid #EDEDED;
}

.form_lable {
	color: gray;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
}
</style>