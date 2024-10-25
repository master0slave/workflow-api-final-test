import {  Controller,  Get,  Post,  Body,  Patch,  Param,  Delete,  ParseIntPipe,  UseGuards} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemStatus } from './entities/items.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/entities/users.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an item' })
  @ApiBody({
    schema: {
      title: 'CreateItemDto',
      type: 'CreateItemDto',
      example: {
        title: 'Mobile',
        amount: 100,
        quantity: 10,
        status: 'PENDING',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: 200,
    description: 'The items have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOne(+id);
  }

  @Get('status/:status')
  @ApiOperation({
    summary: 'Get items by status (PENDING, APPROVED, REJECTED)',
  })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
    schema: {
      example: {
        message: 'Validation failed (PENDING, APPROVED, REJECTED)',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Items not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findByStatus(@Param('status') status: ItemStatus) {
    return this.itemsService.findByStatus(status);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Patch(':id')
  @ApiOperation({ summary: 'Update an item' })
  @ApiBody({
    schema: {
      title: 'UpdateItemDto',
      type: 'UpdateItemDto',
      example: {
        title: 'Mobile',
        amount: 100,
        quantity: 10,
        status: 'PENDING',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.ADMIN, Role.USER])
  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve an item By Id, Role: ADMIN' })
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.approve(id);
  }
}
