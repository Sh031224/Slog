type Combine<T, K> = T & Omit<K, keyof T>;
