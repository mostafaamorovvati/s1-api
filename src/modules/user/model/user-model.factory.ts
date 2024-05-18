import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { CreateUserInput } from '@/modules/user/dto/create-user.dto';
import { UserModel } from '@/modules/user/model/user.model';
import { UserRepository } from '@/modules/user/user.repository';

@Injectable()
export class UserModelFactory implements ModelFactory<UserModel> {
  constructor(private readonly userRepository: UserRepository) {}

  async create({
    displayName,
    email,
    phone,
    password,
    isVerified,
    refreshToken,
    permissions,
    roles,
  }: CreateUserInput): Promise<UserModel> {
    const user = new UserModel(
      new ObjectId().toHexString(),
      displayName,
      email,
      phone,
      isVerified,
      password,
      refreshToken,
      permissions,
      roles,
    );
    await this.userRepository.create(user);
    user.sendSms(displayName);
    return user;
  }
}
