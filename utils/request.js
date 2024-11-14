import { ref } from 'vue';
import { useTempStore } from '@/stores/temp';

const uniSystemInfo = uni.getSystemInfoSync();
const baseURL = 'https://saas.jizhongkeji.com/jzkj';
// const baseURL = 'https://a.plant360.cn/asaas';

// 请求拦截器数组
const requestInterceptors = [];
// 响应拦截器数组
const responseInterceptors = [];


// 项目写完了，就是原小程序项目我能看到的功能或者说能操作的我都写出来了


const request = (url, method = 'GET', data = {}, headers = {}) => {
	const tempStore = useTempStore();
	// console.log('tempStore user', tempStore);

	// 绑定 fuid
	data.fuid = tempStore.fuid;

	if (uniSystemInfo.uniPlatform == 'web') {
		// console.log('h5 环境 请求操作');
		data = {
			...data,
			wx_open_id: tempStore.user.wx_open_id || 'oPyg85Y9gzaTO9wgTmeApQMqmhRY',
			wx_appid: tempStore.user.authorizer_appid || 'wx184d389f8e1603d4',
			user_id: tempStore.user.id || 10662,
		}
	} else if (uniSystemInfo.uniPlatform == 'mp-weixin') {
		// console.log('小程序环境 请求操作');
		data = {
			...data,
			wx_open_id: tempStore.user.wx_open_id || 'oPyg85Y9gzaTO9wgTmeApQMqmhRY',
		}
	}

	return new Promise((resolve, reject) => {
		// 请求拦截器
		let modifiedHeaders = {
			...headers,
			['Content-Type']: 'application/x-www-form-urlencoded' // php 表单提交
		};
		requestInterceptors.forEach(interceptor => {
			const result = interceptor({
				url,
				method,
				data,
				headers: modifiedHeaders
			});
			if (result) {
				url = result.url || url;
				method = result.method || method;
				data = result.data || data;
				modifiedHeaders = result.headers || modifiedHeaders;
			}
		});

		uni.request({
			url: `${baseURL}${url}`,
			method,
			data,
			header: modifiedHeaders,
			success: (res) => {
				// 响应拦截器
				responseInterceptors.forEach(interceptor => {
					res = interceptor(res) || res;
				});

				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					reject(res);
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
};

// 添加请求拦截器
const addRequestInterceptor = (interceptor) => {
	requestInterceptors.push(interceptor);
};

// 添加响应拦截器
const addResponseInterceptor = (interceptor) => {
	responseInterceptors.push(interceptor);
};

export {
	request,
	addRequestInterceptor,
	addResponseInterceptor
};