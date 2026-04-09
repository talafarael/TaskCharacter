import { RedisCacheDecoraterKey, RedisCacheIndexOptions } from './redis.type';

export type CachedOptions<T> = {
  cacheKey: RedisCacheDecoraterKey<T>;
  opts: RedisCacheIndexOptions<T>;
};
