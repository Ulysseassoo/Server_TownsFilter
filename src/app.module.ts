import { Module } from '@nestjs/common';
import { TownsModule } from './towns/towns.module';

@Module({
  imports: [TownsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
