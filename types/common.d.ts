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

declare type NullableRecord<T = any> = Record<string, T> | null;
declare type Recordable<T = any> = Record<string, T>;

declare type FunctionAble<T = any> = (...args) => T | T
