import { RedisService } from '../redis.service';
import {
  RedisCache,
  RedisCacheDecorator,
  RedisSetCache,
} from '../types/redis.type';

export function Cached<T extends Object | string>(
  data: RedisCacheDecorator<T>,
) {
  return function (
    _target: object,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const { searchKeyParam } = data;
    const original = descriptor.value;
    const { fieldType } = searchKeyParam;

    descriptor.value = async function (
      this: { redisService: RedisService },
      ...args: T[]
    ) {
      const keyParam: RedisCache<T> = {
        ...data,
        searchKeyParam: {
          ...data.searchKeyParam,
          keyValue: String(args[0][fieldType]),
        },
      };

      const hit = await this.redisService.get(keyParam);

      if (hit !== undefined) return hit;
      const result = await original.apply(this, args);
      const setData: RedisSetCache<T> = {
        ...keyParam,
        value: result,
      };
      await this.redisService.set(setData);
      return result;
    };
    return descriptor;
  };
}
