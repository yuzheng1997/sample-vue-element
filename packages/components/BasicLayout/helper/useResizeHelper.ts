import { BasicLayoutPorps } from "@sample-vue-element/types/colSpan";
import { debounce } from "lodash-es";
import { ComponentPublicInstance, onMounted, onUnmounted, ref } from "vue";
export const useResizeHelper = (props: BasicLayoutPorps) => {
	const rowRef = ref<ComponentPublicInstance | Element | null>(null);
	let currentDomSize = ref("lg");
	let resizeObserver: ResizeObserver | null;
	// 获取组件实例
	const registerRowRef = (
		ref: Element | ComponentPublicInstance | null,
		refs: Record<string, any>
	) => {
		rowRef.value = ref;
	};
	const getElement = () => {
		return rowRef.value ? (rowRef.value as ComponentPublicInstance).$el : null;
	};
	// 获取当前dom的大小
	const debounceCb = debounce(
		(entries: ResizeObserverEntry[]) => {
			const [entry] = entries;
			const {
				contentRect: { width },
			} = entry;
			if (width >= 1920) {
				currentDomSize.value = "xl";
			} else if (width >= 1200) {
				currentDomSize.value = "lg";
			} else if (width >= 992) {
				currentDomSize.value = "md";
			} else if (width >= 768) {
				currentDomSize.value = "sm";
			} else {
				currentDomSize.value = "xs";
			}
		},
		1000,
		{
			leading: true,
		}
	);
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
		currentDomSize,
	};
};
