import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from './persistence/typeorm-config.service';
import { TownsModule } from './towns/towns.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TownsModule,
  ],
})
export class AppModule {}
