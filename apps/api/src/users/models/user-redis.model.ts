import { User } from '@prisma/client';
import { RedisCacheDecoraterKey } from '../../redis/types/redis.type';

export const getUserRedisKeys: RedisCacheDecoraterKey<User> = {
  namespace: 'user',
  fieldType: 'id',
  valueField: 'id',
  indexsFiled: 'email',
};
