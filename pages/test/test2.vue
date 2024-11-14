<template>
	<view>
		<view @click="updAaa">{{ aaa }}</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			aaa: true
		}
	},
	methods: {
		updAaa() {
			this.aaa = !this.aaa
		}
	},
	computed: {
		bbb() {
			return this.aaa ? 'true' : 'false'
		}
	},
	mounted() {
		console.log('test2 mounted', this.aaa)
	}
}
</script>

<style></style>
