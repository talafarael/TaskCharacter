import { RedisService } from '../redis.service';
import { RedisCacheDecoraterKey, RedisCacheKey } from '../types/redis.type';

export function Cached<T extends Object | string>(
  cacheKey: RedisCacheDecoraterKey<T>,
  opts?: { ttl?: number },
) {
  return function(
    _target: object,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;
    const { valueField } = cacheKey;

    descriptor.value = async function(
      this: { redisService: RedisService },
      ...args: T[]
    ) {
      let keyParam: RedisCacheKey = {
        ...cacheKey,
        keyValue: String(args[0][valueField]),
      };

      const hit = await this.redisService.get(keyParam);

      if (hit !== undefined) return hit;
      const result = await original.apply(this, args);
      await this.redisService.set(keyParam, result, {
        ttl: opts?.ttl,
        indexs: cacheKey.indexs,
      });
      return result;
    };
    return descriptor;
  };
}
