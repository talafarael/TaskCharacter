export type RedisCacheKey = {
  namespace: string;
  fieldType: string;
  keyValue: string;
  index?: string;
};

export type RedisCacheDecoraterKey<T> = {
  namespace: string;
  fieldType: string;
  valueField: keyof T;

  indexSearch?: string;
  indexs: (keyof T)[];
};

export type RedisCacheOptions<T> = {
  ttl?: number;
  indexs?: T[];
};

export type RedisCacheIndexOptions<T> = {
  ttl?: number;
  index: T;
};
