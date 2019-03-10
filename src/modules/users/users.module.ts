import { MiddlewareConsumer, Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';

@Module({
  imports: [
    CommonModule,
    AuthModule
  ],
  controllers: [
    UsersController
  ]
})
export class UsersModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .with('UsersModule')
      .forRoutes(UsersController);
  }
}