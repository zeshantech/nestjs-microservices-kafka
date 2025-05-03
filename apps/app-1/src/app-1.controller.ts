import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { App1Service } from './app-1.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@Controller()
export class App1Controller {
  constructor(private readonly app1Service: App1Service) {}

  @MessagePattern('get.users')
  getUsers(): Promise<UserResponseDto[]> {
    return this.app1Service.findAll();
  }

  @MessagePattern('get.user')
  getUser(@Payload() data: { id: string }): Promise<UserResponseDto> {
    return this.app1Service.findOne(data.id);
  }

  @MessagePattern('create.user')
  createUser(
    @Payload() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.app1Service.create(createUserDto);
  }

  @MessagePattern('update.user')
  updateUser(
    @Payload() data: { id: string } & UpdateUserDto,
  ): Promise<UserResponseDto> {
    const { id, ...updateUserDto } = data;
    return this.app1Service.update(id, updateUserDto);
  }

  @MessagePattern('delete.user')
  deleteUser(@Payload() data: { id: string }): Promise<{ success: boolean }> {
    return this.app1Service.remove(data.id);
  }
}
