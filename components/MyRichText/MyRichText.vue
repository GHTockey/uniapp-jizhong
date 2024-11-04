<template>
	<view>
		<view class="shopevaluate">
			<view class="shopevaluate-goou">
				<rich-text class='richText' :nodes="neirong"></rich-text>
			</view>
		</view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			material_id: 0,
			materialInfo: {},
			neirong: '',
		}
	},
	onLoad(option) {
		if (!option.material_id) {
			uni.showToast({
				title: '参数错误',
				icon: 'none'
			})
			return false;
		}
		this.material_id = option.material_id;
		this.getdata();
	},
	methods: {
		getdata() {
			this.$H.post('/Material/materialdetail', {
				material_id: this.material_id
			}, {
				token: true
			}).then(res => {
				console.log(res);
				this.materialInfo = res;
				this.neirong = res.details_text.replace(/\<img/gi, '<img class="maximg" ')
			})
		},
	}
}
</script>

<style>
.maximg {
	max-width: 100%;
}
</style>