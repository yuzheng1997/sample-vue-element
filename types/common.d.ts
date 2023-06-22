declare type inferPropType<T> = [T] extends [ObjectConstructor]
	? Record<string, any>
	: [T] extends [BooleanConstructor]
	? boolean
	: [T] extends [DateConstructor]
	? Date
	: [T] extends [FunctionConstructor]
	? any
	: any;

declare type inferInstance<T> = {
	-readonly [K in keyof T]?: inferPropType<T[K]>;
};
