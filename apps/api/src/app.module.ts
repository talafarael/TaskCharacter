import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { CharactersModule } from './characters/characters.module';
import config from './config/config';
import { validate } from './config/env.validation';
import { StatsModule } from './stats/stats.module';
import { ScheduledTimeModule } from './scheduled-time/scheduled-time.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [config],
      validate,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    TasksModule,
    CharactersModule,
    StatsModule,
    ScheduledTimeModule,
  ],
})
export class AppModule { }
