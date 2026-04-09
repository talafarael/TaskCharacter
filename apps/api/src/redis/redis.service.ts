import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import {
  RedisCache,
  RedisCacheSearchKey,
  RedisSetCache,
} from './types/redis.type';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private createCacheKey<T>(keyParam: RedisCacheSearchKey<T>): string {
    const { namespace, fieldType, keyValue, useIndex } = keyParam;
    return useIndex
      ? `${namespace}:index:${String(fieldType)}:${keyValue}`
      : `${namespace}:${String(fieldType)}:${keyValue}`;
  }

  async del(key: string): Promise<boolean> {
    return this.cacheManager.del(key);
  }

  async set<TData>(
    data: RedisSetCache<TData>,
  ): Promise<'OK' | TData | undefined> {
    const { keyParam, value, options } = data;
    const typeValue = value[keyParam.fieldType];
    if (!typeValue) {
      return;
    }
    const key = this.createCacheKey({
      ...keyParam,
      keyValue: String(typeValue),
      useIndex: false,
    });
    const createdCache = await this.cacheManager.set(key, value, options?.ttl);

    await this.setByIndexes<TData>(data, key);

    return createdCache;
  }

  private async setByIndexes<TData>(
    data: RedisSetCache<TData>,
    keyValue: string,
  ) {
    const { keyParam, value, options } = data;
    for (const index of keyParam.indexes ?? []) {
      const typeValue = value[index];
      if (!typeValue) continue;
      const indexKey = this.createCacheKey({
        ...keyParam,
        fieldType: index,
        useIndex: true,
        keyValue: String(typeValue),
      });
      await this.cacheManager.set(indexKey, keyValue, options?.ttl);
    }
  }

  async get<TData>(data: RedisCache<TData>): Promise<TData | undefined> {
    const { searchKeyParam } = data;
    const key = this.createCacheKey<TData>(searchKeyParam);
    return await this.getByKey(key, data);
  }

  private async getByKey<TData>(
    key: string,
    data: RedisCache<TData>,
  ): Promise<TData | undefined> {
    if (!data.searchKeyParam.useIndex) {
      return await this.cacheManager.get(key);
    }
    return await this.getByIndex<TData>(key);
  }

  async getByIndex<TData>(keyIndex: string): Promise<TData | undefined> {
    const key = await this.cacheManager.get(keyIndex);
    if (!key) return;
    return await this.cacheManager.get(String(key));
  }
}
