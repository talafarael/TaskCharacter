export type RedisCacheKey = {
  namespace: string;
  fieldType: string;
  keyValue: string;
  index?: boolean;
};

export type RedisCacheOptions<T> = {
  ttl?: number;
  indexs?: T[];
};

export type RedisCacheIndexOptions<T> = {
  ttl?: number;
  index: T;
};
