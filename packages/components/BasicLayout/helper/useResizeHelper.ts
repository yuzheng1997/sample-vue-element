import { BasicLayoutPorps } from "@sample-vue-element/types";
import { debounce } from "lodash-es";
import { ComponentPublicInstance, onMounted, onUnmounted, ref } from "vue";
export const useResizeHelper = (props: BasicLayoutPorps) => {
	const rowRef = ref<ComponentPublicInstance | Element | null>(null);
	let resizeObserver: ResizeObserver | null;
	const registerRowRef = (
		ref: Element | ComponentPublicInstance | null,
		refs: Record<string, any>
	) => {
		rowRef.value = ref;
	};
	const getElement = () => {
		return rowRef.value ? (rowRef.value as ComponentPublicInstance).$el : null;
	};
	const debounceCb = debounce((entries: ResizeObserverEntry[]) => {
		const [entry] = entries;
		const {
			contentRect: { width },
		} = entry;
		console.log(width);
	}, 1000);
	// 没必要做响应式
	if (props.collapsable) {
		resizeObserver = new ResizeObserver(debounceCb);
	}
	onMounted(() => {
		const el = getElement();
		resizeObserver && resizeObserver.observe(el);
	});
	onUnmounted(() => {
		const el = getElement();
		resizeObserver && resizeObserver.unobserve(el);
	});
	return {
		registerRowRef,
	};
};
