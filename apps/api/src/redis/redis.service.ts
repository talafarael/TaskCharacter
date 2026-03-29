import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import {
  RedisCacheIndexOptions,
  RedisCacheKey,
  RedisCacheOptions,
} from './types/redis.type';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  createCacheKey(keyParam: RedisCacheKey): string {
    const { namespace, fieldType, keyValue, index } = keyParam;
    return index
      ? `${namespace}:${fieldType}:${keyValue}`
      : `${namespace}:${index}:${fieldType}:${keyValue}`;
  }

  async del(key: string): Promise<boolean> {
    return this.cacheManager.del(key);
  }

  async set<TData>(
    keyParam: RedisCacheKey,
    value: TData,
    opts?: RedisCacheOptions<keyof TData>,
  ): Promise<'OK' | TData | undefined> {
    const key = this.createCacheKey(keyParam);
    return await this.cacheManager.set(key, value, opts?.ttl);
  }

  async addIndexing<TData>(
    keyParam: RedisCacheKey,
    value: TData,
    key: string,
    opts: RedisCacheIndexOptions<keyof TData>,
  ): Promise<string | undefined> {
    if (!(value instanceof Object)) return;

    const indexKey = this.createCacheKey({
      ...keyParam,
      fieldType: String(opts.index),
      keyValue: String(value[opts.index]),
    });

    return await this.cacheManager.set(indexKey, key, opts?.ttl);
  }

  async getByIndex<TData>(keyParam: RedisCacheKey): Promise<TData | undefined> {
    const key = this.createCacheKey(keyParam);
    return await this.cacheManager.get(key);
  }

  async getByIndexes<TData>(
    keyParam: RedisCacheKey,
  ): Promise<TData | undefined> {
    const indexKey = this.createCacheKey(keyParam);
    const key = await this.cacheManager.get(indexKey);
    if (!key) return;
    return await this.cacheManager.get(String(key));
  }
}
