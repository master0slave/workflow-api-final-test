import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from './entities/items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Items ])],
  controllers: [ItemController],
  providers: [ItemsService],
})
export class ItemModule {}
