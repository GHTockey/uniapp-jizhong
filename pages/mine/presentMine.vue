<template>
	<view class="present_mine_container">
		

		<!-- 底部TabBar -->
		<TabBar v-model:selectedIndex="selectedIndex" class="fixed-bottom" />
	</view>
</template>

<script setup>
import { ref } from 'vue';

const selectedIndex = ref(2)
</script>

<style scoped lang="scss">
.present_mine_container {
	background-color: #f6f8fe;
	height: calc(100vh - $nav-height);
}
</style>
