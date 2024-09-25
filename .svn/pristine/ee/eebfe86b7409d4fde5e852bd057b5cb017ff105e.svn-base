import {
	ref
} from 'vue';

const baseURL = 'https://saas.jizhongkeji.com';

// 请求拦截器数组
const requestInterceptors = [];
// 响应拦截器数组
const responseInterceptors = [];

const request = (url, method = 'GET', data = {}, headers = {}) => {
	return new Promise((resolve, reject) => {
		// 请求拦截器
		let modifiedHeaders = {
			...headers
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