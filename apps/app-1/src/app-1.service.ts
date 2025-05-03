import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@Injectable()
export class App1Service {
  private readonly users: Map<string, UserResponseDto> = new Map();

  // For demo purposes, create some mock users
  constructor() {
    // Add some mock data
    const user1 = this.createMockUser('John Doe', 'john@example.com');
    const user2 = this.createMockUser('Jane Smith', 'jane@example.com');
    this.users.set(user1.id, user1);
    this.users.set(user2.id, user2);
  }

  private createMockUser(name: string, email: string): UserResponseDto {
    const now = new Date();
    return {
      id: uuidv4(),
      name,
      email,
      age: Math.floor(Math.random() * 30) + 20,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
  }

  async findAll(): Promise<UserResponseDto[]> {
    return Array.from(this.users.values());
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const id = uuidv4();
    const now = new Date();

    const newUser: UserResponseDto = {
      id,
      name: createUserDto.name,
      email: createUserDto.email,
      age: createUserDto.age,
      isActive: createUserDto.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };

    this.users.set(id, newUser);
    return newUser;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.findOne(id);

    const updatedUser: UserResponseDto = {
      ...existingUser,
      ...updateUserDto,
      updatedAt: new Date(),
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const exists = this.users.has(id);
    if (!exists) {
      throw new Error(`User with ID ${id} not found`);
    }

    this.users.delete(id);
    return { success: true };
  }
}
