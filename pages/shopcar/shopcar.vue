<template>
	<view>
		<!-- 缺省页面 -->
		 <!-- 默认显示404 -->
		<ShoppingCarDefault />
		 <!-- unpublished 管理员暂未发布内容，敬请期待 -->
		 <!-- <ShoppingCarDefault status="unpublished" /> -->
		 <!-- network 网络遇到问题，请检查后再试 -->
		 <!-- <ShoppingCarDefault status="network" /> -->
		 <!-- pay_fail 订单支付失败 -->
		 <!-- <ShoppingCarDefault status="pay_fail" /> -->
		 <!-- no_permission 当前用户该功能的操作权限 -->
		 <!-- <ShoppingCarDefault status="no_permission" /> -->
		 <!-- empty 购物车内暂无商品，快去选购吧 -->
		 <!-- <ShoppingCarDefault status="empty" /> -->





		 <TabBar class="fixed-bottom" :isAppMode="true" />
	</view>
</template>

<script setup>
	
</script>

<style>
	       
</style>
