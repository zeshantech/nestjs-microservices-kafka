export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly age?: number;
  readonly isActive?: boolean;
}

export class UpdateUserDto {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
  readonly age?: number;
  readonly isActive?: boolean;
}

export class UserResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly age?: number;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
