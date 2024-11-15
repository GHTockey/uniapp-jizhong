import { defineStore } from 'pinia';
import { request } from '@/utils/request.js';

export const useTempStore = defineStore('temp', {
    state: () => ({
        business: {},
        user: {},
        fuid: '',
    }),

    actions: {
        setBusiness(business) {
            this.business = business;
        },
        setUser(user) {
            this.user = user;
        },
        setFuid(fuid) {
            this.fuid = fuid;
        },


        async getUserInfoApi() {
            const systemRes = uni.getSystemInfoSync();
            if (systemRes.uniPlatform == 'web') {
                // 临时测试
                console.log('h5 环境');
                let res = await request('/WxAppCustomer/on_login', 'post', {
                    code: '0f3rdall2IQwqe4dxjnl2cdmwu2rdalv',
                    wx_open_id_storage: 'oPyg85Y9gzaTO9wgTmeApQMqmhRY'
                })
                if (res.code == 0) {
                    this.setUser(res.data.user)
                    this.setBusiness(res.data.user.business)
                } else {
                    uni.showToast({
                        title: res.msg,
                        icon: 'error'
                    });
                }
            }

            // #ifdef MP-WEIXIN
            console.log('小程序环境');
            wx.login({
                success: async (res) => {
                    // console.log('wx.login res', res)
                    if (res.code) {
                        // console.log(this);
                        let reqRes = await request('/WxAppCustomer/on_login', 'post', {
                            code: res.code
                        })
                        this.setUser(reqRes.data.user)
                        this.setBusiness(reqRes.data.user.business)
                    } else {
                        console.log('登录失败！' + res.errMsg)
                        wx.showLoading({
                            title: '登录失败！请重启再试',
                            mask: true
                        })
                    }
                },
                fail(res) {
                    console.log('登录失败！fail', res)
                    wx.showLoading({
                        title: '登录失败！请重启再试',
                        mask: true
                    })
                }
            })
            // #endif
        }
    }
});
