<template>
    <view v-if="is_loading" class="list_page">
        <view class="search_input_box">
            <view class="input_box1">
                <image lazy-load class="search_icon" style="width: 30rpx;height: 30rpx;margin-right: 15rpx;"
                    src="https://saas.jizhongkeji.com/static/jzkj/images/search.png" mode="aspectFit"
                    v-if="!search_str || search_str.length == 0" />

                <input hold-keyboard="true" class="search_input" confirm-type="search" type="text" placeholder="输入关键词"
                    @input="change_search_str" name="search_str" placeholder-class="input_placeholder_class"
                    @confirm="to_search" v-model="search_str" />
            </view>

            <view class="sousuo" @click="to_search_v">搜索</view>
        </view>

        <!-- <view style="height: 20rpx;"></view> -->

        <!-- <view class="top_change">
    <view wx:for="{{type_list}}" bind:tap="to_change" data-typeindex="{{index}}" class="{{type_index==index ? 'type_name_active type_name':'type_name'}}" wx:key="index">
      <view> {{item.name}}</view>
      <view class="line"></view>
    </view>
  </view> -->

        <view @click="to_choose" :data-id="item.id" v-for="item in store_list" :key="item.id" class="item_store">
            <view class="image_uris">
                <!-- <view class="dianzan" catch:tap="to_dianzan" data-dianzanid="{{item.id}}">
        <image wx:if="{{item.is_shoucang == 0}}" lazy-load="{{true}}" class="xin_with" mode="aspectFit" src="https://saas.jizhongkeji.com/static/jzkj/images/xin_with.png"></image>
        <image wx:if="{{item.is_shoucang == 1}}" lazy-load="{{true}}" class="xin_with" mode="aspectFit" src="https://saas.jizhongkeji.com/static/jzkj/images/xin_withred.png"></image>
      </view> -->

                <image style="width: 100%;height: 100%;" mode="aspectFill" :src="item.image_uris_arr[0]"></image>
                <view @click.stop.prevent="to_shop(item.id)" class="bottom_img">
                    <view>门店详情</view>
                    <image lazy-load class="arrow_icon" mode="aspectFit"
                        src="https://saas.jizhongkeji.com/static/jzkj/images/arrow_right.png"></image>
                </view>
            </view>

            <view class="right_item">
                <view>{{ item.shop_name }}</view>
                <view class="address_detail"><text v-if="item.distance > 0" style="color: #000000;">{{
                    item.distance }}km</text> | {{ item.address_detail }}</view>
                <view class="start_time">{{ item.start_time }}-{{ item.end_time }}</view>
            </view>

        </view>


        <view class="kong_box" v-if="is_kong">
            <image class="kong_img" src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png"></image>
            <view>换个搜索词试试</view>
        </view>
    </view>
</template>


<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request';
import { onLoad } from '@dcloudio/uni-app';


const is_loading = ref(false);
const type_list = ref([
    { id: 1, name: '附近门店', },
    { id: 2, name: '收藏', }
]);
const type_index = ref(0);
const store_list = ref([]);
const search_str = ref('');
const is_kong = ref(false);

const gps = ref();
const yuan_list = ref([]);
const appointent_list = ref();


onLoad(options => {
    uni.showLoading({
        title: 'loading',
    })
    get_user_location();
})


function to_shop(shopid) {
    // console.log('/pages/index/shop_detail?id=' + shopid);
    // return
    uni.navigateTo({
        url: '/pages/index/shop_detail?id=' + shopid,
    })
}
function get_user_location(e) {
    //获取当前用户的坐标
    gps.value = '';

    uni.getLocation({
        type: 'wgs84',
        success: (res) => {
            gps.value = [res.latitude, res.longitude].join(',')
            console.log('获取的位置', res);
            get_store_list()
        },
        complete: (res) => {
            console.log('获取的位置', res);
            get_store_list()
        },
    })
}
async function get_store_list(type, name) {
    let res = await request('/WxAppCustomer/store_list', 'post', {
        gps: gps.value || '',
        type: type_index.value || '',
        name: search_str.value || '',
    })
    if (res.code == 1) {
        uni.showToast({
            title: res.msg,
            icon: 'none',
            mask: true
        })
    } else {
        uni.hideLoading();
        // this.setData({
        //     store_list: res.data.store_list,
        //     yuan_list: res.data.store_list,
        //     is_loading: true,
        // })
        store_list.value = res.data.store_list;
        yuan_list.value = res.data.store_list;
        is_loading.value = true;

        if (store_list.value.length <= 0) {
            is_kong.value = true;
        }
    }
}
async function to_choose(e) {
    let shop_id = e.currentTarget.dataset.id;

    let res = await request('/WxAppCustomer/choose_shop', 'post', { shop_id: shop_id || 0 })
    if (res.code == 1) {
        uni.showToast({
            title: res.msg,
            icon: 'none',
            mask: true
        })
    } else {
        uni.navigateBack();
    }
}
async function to_dianzan(e) {
    let shop_id = e.currentTarget.dataset.dianzanid;

    let res = await request('/WxAppCustomer/collect_shop', 'post', { shop_id: shop_id || 0 })
    if (res.code == 1) {
        uni.showToast({
            title: res.msg,
            icon: 'none',
            mask: true
        })
    } else {
        let store = store_list.value.find((m) => {
            return m.id == shop_id
        })
        if (store) {
            store.is_shoucang = res.data.is_shoucang;

            // this.setData({
            //     store_list: this.data.store_list
            // })
        }
    }
}
function to_search(e) {
    search_str.value = e.detail.value
    if (!search_str.value || search_str.value == '') {
        uni.showToast({
            title: '请输入关键词',
            icon: 'none'
        })
        return
    }

    store_list.value = [];
    get_store_list()
}
function change_search_str(e) {
    if (e.detail.value.length == 0) {
        // this.setData({
        //     search_str: '',
        //     appointent_list: [],
        //     is_kong: false,
        // })
        search_str.value = '';
        appointent_list.value = [];
        is_kong.value = false;
        get_store_list()
    } else {
        search_str.value = e.detail.value
    }
}
function to_search_v(e) {
    console.log('333', search_str.value);
    if (!search_str.value || search_str.value == '') {
        uni.showToast({
            title: '请输入关键词',
            icon: 'none'
        })
        return
    }

    store_list.value = [];
    get_store_list()
}
function to_change(index) {
    // let index = e.currentTarget.dataset.typeindex

    // this.setData({
    //     type_index: index,
    // });
    type_index.value = index;
    get_store_list();
}
</script>



<style>
.list_page {
    width: 100%;
    box-sizing: border-box;
    padding: 0 29rpx;
    display: flex;
    flex-direction: column;
}

.item_store {
    width: 100%;
    border-radius: 6rpx 6rpx 6rpx 6rpx;
    border: 1rpx solid #E5E5E5;
    box-sizing: border-box;
    padding: 22rpx 25rpx;
    display: flex;
    margin-top: 30rpx;
    font-weight: bold;
    font-size: 29rpx;
    color: #1D1D1D;
}

.image_uris {
    position: relative;
    width: 158rpx;
    height: 185rpx;
    border-radius: 11rpx 11rpx 11rpx 11rpx;
    margin-right: 30rpx;
    flex: none;
    overflow: hidden;
}

.right_item {
    display: flex;
    flex-direction: column;
}

.address_detail {
    margin-top: 18rpx;
    font-weight: normal;
    font-size: 25rpx;
    color: #909090;
}

.start_time {
    font-weight: normal;
    font-size: 25rpx;
    color: #212121;
    margin-top: 10rpx;
}

.bottom_img {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 64rpx;
    background-color: #ECECEC;
    z-index: 10;
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 24rpx;
    color: #3D3D3D;
    box-sizing: border-box;
    justify-content: center;
}

.arrow_icon {
    height: 32rpx;
    width: 14rpx;
    flex: none;
    margin-left: 10rpx;
    margin-top: 3rpx;
}

.dianzan {
    position: absolute;
    left: 0;
    top: 0;
    width: 47rpx;
    height: 47rpx;
    background: rgb(0, 0, 0, 0.4);
    border-radius: 11rpx 0rpx 11rpx 0rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.xin_with {
    width: 25rpx;
    height: 22rpx;
    flex: none;
}

.top_change {
    display: flex;
    align-items: center;
    font-size: 31rpx;
    color: #A0A0A0;
}

.type_name {
    margin-right: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.type_name_active {
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
}

.type_name .line {
    width: 50%;
    height: 4rpx;
    background-color: transparent
}

.type_name_active .line {
    width: 50%;
    height: 4rpx;
    background-color: #FF4F26
}



.search_input_box {
    position: sticky;
    top: 0rpx;
    box-sizing: border-box;
    width: 100%;
    /* padding: 0 29rpx; */
    z-index: 100;
    padding-top: 30rpx;
    height: 130rpx;
    /* background-color: #F5F5F5; */
    display: flex;
    align-items: center;
    padding-bottom: 30rpx;
}


.search_input {
    /* background-color: #fff; */
}

.sousuo {
    height: 60rpx;
    padding: 0rpx 30rpx;
    font-size: 28rpx;
    text-align: center;
    background-color: #09C161;
    color: #fff;
    flex: none;
    border-radius: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    margin-left: 20rpx;
}


.kong_box {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-weight: 500;
    font-size: 28rpx;
    color: #838383;
    margin-top: 260rpx;
}

.kong_img {
    width: 238.89rpx;
    height: 127.78rpx;
    flex: none;
    margin-bottom: 15rpx;
}

.input_box1 {
    display: flex;
    align-items: center;
    background-color: #F5F5F5;
    width: 80%;
    height: 100%;
    border-radius: 15rpx;
    font-size: 30rpx;
    padding: 0 30rpx;
}
</style>