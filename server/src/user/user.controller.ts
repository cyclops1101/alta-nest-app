import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    return this.userService.create(data);
  }

  @Get()
  findAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('cursor') cursor: Prisma.UserWhereUniqueInput,
    @Query('where') where: Prisma.UserWhereInput,
    @Query('orderBy') orderBy: Prisma.UserOrderByWithRelationInput,
  ): Promise<User[]> {
    return this.userService.find({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const pid: Prisma.UserWhereUniqueInput = { id };
    return this.userService.findOne(pid);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Prisma.UserUpdateInput) {
    const pid: Prisma.UserWhereUniqueInput = { id };
    return this.userService.update({ where: pid, data });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const pid: Prisma.UserWhereUniqueInput = { id };
    return this.userService.remove(pid);
  }
}
