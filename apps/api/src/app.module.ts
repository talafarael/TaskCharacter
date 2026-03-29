import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuestTemplatesModule } from './quest-templates/quest-templates.module';
import { CharactersModule } from './characters/characters.module';
import config from './config/config';
import { validate } from './config/env.validation';
import { StatsModule } from './stats/stats.module';
import { ScheduledTimeModule } from './scheduled-time/scheduled-time.module';
import { QuestsModule } from './quests/quests.module';
import { RedisModule } from './redis/redis.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [config],
      validate,
    }),
    CacheModule.registerAsync(RedisOptions),
    AuthModule,
    UsersModule,
    PrismaModule,
    QuestTemplatesModule,
    CharactersModule,
    StatsModule,
    ScheduledTimeModule,
    QuestsModule,
    RedisModule,
  ],
})
export class AppModule { }
