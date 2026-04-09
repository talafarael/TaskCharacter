export type RedisCache<T> = {
  keyParam: RedisCacheKey<T>;
  searchKeyParam: RedisCacheSearchKey<T>;
  options: RedisCacheOptions;
};

export type RedisSetCache<T> = RedisCache<T> & {
  value: T;
};

export type RedisCacheKey<T> = {
  namespace: string;
  fieldType: keyof T;
  // keyValue: string;

  indexes: (keyof T)[];
};

export type RedisCacheSearchKey<T> = {
  namespace: string;
  fieldType: keyof T;
  useIndex: boolean;
  keyValue: string;
};

export type RedisCacheOptions = {
  ttl?: number;
};

export type RedisCacheDecorator<T> = {
  keyParam: RedisCacheKey<T>;
  searchKeyParam: Omit<RedisCacheSearchKey<T>, 'keyValue'>;
  options: RedisCacheOptions;
};
