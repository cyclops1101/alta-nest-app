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
import { Prisma, User } from '@/generated-client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    return this.userService.create(data);
  }

  @Get()
  findMany(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('cursor') cursor: Prisma.UserWhereUniqueInput,
    @Query('where') where: Prisma.UserWhereInput,
    @Query('orderBy') orderBy: Prisma.UserOrderByWithRelationInput,
  ): Promise<User[]> {
    return this.userService.findMany({
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
    return this.userService.findUnique(pid);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Prisma.UserUpdateInput) {
    const pid: Prisma.UserWhereUniqueInput = { id };
    return this.userService.update({ where: pid, data });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const pid: Prisma.UserWhereUniqueInput = { id };
    return this.userService.delete(pid);
  }
}
