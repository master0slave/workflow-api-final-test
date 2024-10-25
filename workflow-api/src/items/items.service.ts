import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Items, ItemStatus } from './entities/items.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Items) private itemRepository: Repository<Items>
  ) { }


  create(createItemDto: CreateItemDto) {
    console.log('createItemDto', createItemDto);
    return this.itemRepository.save(createItemDto);
  }

  findAll() {
    return this.itemRepository.find();
  }

  findOne(id: number) {
    return this.itemRepository.findOneBy({ id });
  }

  // Find items by status
  async findByStatus(status: ItemStatus) {
    return this.itemRepository.findBy({ status });
  }
  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepository.save({
      id, ...updateItemDto
    })
  }

  async remove(id: number) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return this.itemRepository.remove(item);
  }
  async approve(id: number) {
    // id should not empty
    if (!id) {
      throw new NotFoundException(`id should not empty`)
    }

    // item should found
    const item = await this.itemRepository.findOneBy({ id })
    if (!item) {
      throw new NotFoundException(`not found: id={}`)
    }

    // prepare items
    // const approveItem = {...item, status: ItemStatus.APPROVED}
    // return await this.itemRepository.save(approveItem)

    item.status = ItemStatus.APPROVED

    return await this.itemRepository.save(item)
  }
}
