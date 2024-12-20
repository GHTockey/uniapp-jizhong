import { defineStore } from 'pinia';
import { request } from "@/utils/request.js";

export const useTabBarStore = defineStore('tabBar', {
    state: () => {
        return {
            selectedIndex: 0, // 当前选中的tabbar索引
            list: [
                {
                    "selected_icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/tab1.png",
                    "icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab1.png",
                    "path": "pages/index/index",
                    "text": "首页"
                },
                {
                    "selected_icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/tab2.png",
                    "icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab2.png",
                    "path": "pages/product/menu",
                    "text": "商品"
                },
                {
                    "selected_icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/tab3.png",
                    "icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab3.png",
                    "path": "pages/shopcar/shopcar",
                    "text": "购物车"
                },
                {
                    "selected_icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/tab4.png",
                    "icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab4.png",
                    "path": "pages/mine/mine",
                    "text": "我的"
                }
                // {
                //     "selected_icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/tab1.png",
                //     "icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab1.png",
                //     "path": "pages/index/index",
                //     "text": "首页"
                // },
                // {
                //     "selected_icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/tab2.png",
                //     "icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab2.png",
                //     "path": "pages/coupon/couponCenter",
                //     "text": "领券中心"
                // },
                // {
                //     "selected_icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/tab2.png",
                //     "icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab2.png",
                //     "path": "pages/notify/notifyList",
                //     "text": "消息列表"
                // },
                // {
                //     "selected_icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/tab2.png",
                //     "icon_path": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab2.png",
                //     "path": "pages/test/test",
                //     "text": "测试页面"
                // },
            ]
        }
    },
    actions: {
        // 获取
        async getTabBarListApi() {
            let res = await request('/WxAppConfig/app_tabbar_list', 'post')
            if (res.code == 0) {
                this.list = res.data.tabbar_list
            } else {
                console.log('获取tabbar列表失败', res);
                // uni.showToast({
                //     title: res.msg,
                //     icon: 'error'
                // });
            }
        }
    }
})