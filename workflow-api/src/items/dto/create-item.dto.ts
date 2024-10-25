import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ItemStatus } from '../entities/items.entity';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(ItemStatus, { message: 'status must be one of PENDING, APPROVED, or REJECTED' })
  status: ItemStatus;
}
