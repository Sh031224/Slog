type Combine<T, K> = T & Omit<K, keyof T>;

type ValueOfIterable<T extends Iterable<any>> = T extends Iterable<infer E>
  ? E
  : never;
