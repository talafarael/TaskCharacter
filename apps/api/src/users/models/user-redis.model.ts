import { User } from '@prisma/client';
import { RedisCacheDecoraterKey } from '../../redis/types/redis.type';
import { CachedOptions } from '../../redis/types/cached.type';

export enum UserFieldRedisKey {
  ID = 'id',
  EMAIL = 'email',
}
export const getUserRedisKey: Omit<
  RedisCacheDecoraterKey<User>,
  'fieldType' | 'valueField'
> = {
  namespace: 'user',
  // fieldType: 'id',
  // valueField: 'id',
  // indexSearch: 'email',
  indexs: ['email'],
};

export const getUserRedisKeys: Record<
  UserFieldRedisKey,
  CachedOptions<User>
> = {
  [UserFieldRedisKey.ID]: {
    cacheKey: {
      ...getUserRedisKey,
      fieldType: 'id',
      valueField: 'id',
    },
    opts: {
      ttl: 60 * 60,
      indexs: ['email'],
    },
  },
  [UserFieldRedisKey.EMAIL]: {
    ...getUserRedisKey,
    fieldType: 'email',
    valueField: 'email',
  },
};
