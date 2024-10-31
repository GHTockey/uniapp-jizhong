<template>
	<view>
		<picker :class="{ 'empty': value_show }" :header-text="headertext" :mode="mode" @change="bindchange"
			@columnchange="bindcolumnchange" @cancel="bindcancel" :range="range" :range-key="rangeKey"
			:value="picker_select" :disabled="disabled" :end="end" :start="start">

			<view :style="`text-align: ${align};`">{{ value_show ? value_show : placeholder }}</view>
		</picker>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';

const picker_select = ref([-1]);
const tceValue = ref('');
const value_show = ref('');


const emit = defineEmits(['change']);
const props = defineProps({
	// 占位提示语
	placeholder: { type: String, value: '请选择' },
	// 安卓手机选择的时候标题
	headertext: { type: String, value: '' },
	// 支持普通的array、Object Array
	range: { type: Array, value: [] },

	value: { type: String, value: '' },

	// 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
	rangeKey: { type: String, value: '' },
	// 当 range 是一个 Object Array 时，通过 rangeValue 来指定 Object 中 value 的值作为选择器value
	rangeValue: { type: String, value: '' },
	disabled: { type: Boolean, value: false },
	mode: { type: String, value: 'selector' },
	align: { type: String, value: 'left' },
	end: { type: String, value: null, },
	start: { type: String, value: null, },
})

// console.log(props.value, 123);

function bindchange(e) {
	// console.log('bindchange', e);
	let value_show_temp = '';
	let value = '';
	if (props.mode == 'region') {
		value_show_temp = e.detail.value.join(',')
		value = e.detail.value

		picker_select.value = value;
		tceValue.value = value
		value_show.value = value_show_temp

	} else if (props.mode == 'date') {
		value_show_temp = e.detail.value
		value = e.detail.value

		picker_select.value = value;
		tceValue.value = value
		value_show.value = value_show_temp
	} else {
		// e.detail.value 单列的时候，是字符串
		if (e.detail.value >= 0) {
			if (props.rangeKey) {
				value_show_temp = props.range[e.detail.value][props.rangeKey];
			} else {
				value_show_temp = props.range[e.detail.value]
			}

			if (props.rangeValue) {
				value = props.range[e.detail.value][props.rangeValue];
			} else {
				value = props.range[e.detail.value]
			}
		}

		picker_select.value = [e.detail.value]
		tceValue.value = value
		value_show.value = value_show_temp
	}

	// console.log('bindchange', e);
	// console.log('bindchange value_show', value_show_temp);
	// console.log('bindchange value', value);

	emit('change', {
		index: e.detail.value,
		value: tceValue.value,
		value_show: value_show_temp,
	})
}

function bindcancel(e) {
	// console.log('bindcancel', e);
	// this.data.selecting_year = -1;
	// this.data.selecting_month = -1;
}

function bindcolumnchange(e) {

}


watch(() => props.mode, (val, val2) => {
	console.log('observers mode', val, val2);
})
watch([() => props.value, () => props.range, () => props.rangeKey, () => props.rangeValue], ([value, range, rangeKey, rangeValue]) => {
	if (props.mode == 'date') {
		value_show.value = value;
		picker_select.value = value;
		return;
	}

	if (props.mode == 'region') {
		value_show.value = value;
		picker_select.value = value ? value.split(',') : [];
		return;
	}
	if (!value || !range || range.length == 0) {
		value_show.value = '';
		picker_select.value = [-1];
		return;
	}

	var index = range.findIndex(m => {
		if (rangeValue) {
			return m[rangeValue] == value;
		} else {
			return m == value;
		}
	});

	if (index == -1) {
		value_show.value = '';
		picker_select.value = [-1];
		return;
	}
	var value_show_temp = '';
	if (rangeKey) {
		value_show_temp = range[index][rangeKey];
	} else {
		value_show_temp = range[index];
	}

	value_show.value = value_show_temp;
	picker_select.value = [index];
})
</script>

<style lang="scss">
.empty {
	opacity: 0.8;
	color: #9B9B9B;
}
</style>