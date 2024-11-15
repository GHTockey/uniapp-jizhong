import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', {
	// 状态
	state: () => {
		return {
			var1: '123123321'
		}
	},

	// 计算属性
	getters: {
		// 获取屏幕高度
		getWindowHeight: () => {
			return uni.getSystemInfoSync().windowHeight
		},
		// 是否是苹果移动端
		isIos: () => {
			return /(iPhone|iPad|iPod|iOS)/i.test(uni.getSystemInfoSync().model)
		},
		// 当前宿主环境  [mp-weixin, web]
		getPlatform: () => {
			return uni.getSystemInfoSync().uniPlatform;
		}
	},

	// 方法
	actions: {
		increment() {
			this.counter++
		},
		randomizeCounter() {
			this.counter = Math.round(100 * Math.random())
		}
	}
});