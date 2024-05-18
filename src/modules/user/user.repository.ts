import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, PipelineStage } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { escapeRegex } from '@/common/utils/escape-regx.util';
import { DeleteUserInput } from '@/modules/user/dto/delete-user.dto';
import {
  FindUserByEmailInput,
  FindUserByIdInput,
  FindUserByPhoneInput,
} from '@/modules/user/dto/find-user.dto';
import {
  SearchUserInput,
  SearchUserOutput,
} from '@/modules/user/dto/search-user.dto';
import {
  UpdatePasswordInput,
  UpdateUserInput,
} from '@/modules/user/dto/update-user.dto';
import { TUser, UserEntity } from '@/modules/user/entity/user.entity';
import { UserEntityFactory } from '@/modules/user/entity/user.factory';
import { UserModel } from '@/modules/user/model/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<TUser>,
    protected readonly userEntityFactory: UserEntityFactory,
  ) {}

  public async findById({ id }: FindUserByIdInput): Promise<UserModel | null> {
    const user = await this.userModel.findById(id).exec();
    return this.userEntityFactory.createFromEntity(user);
  }

  async findUsersByRole(roleId: string): Promise<UserEntity[]> {
    return this.userModel.find({ roles: roleId }).exec();
  }

  public async findByEmail(
    { email }: FindUserByEmailInput,
    isPasswordSelected?: boolean,
  ): Promise<UserModel | null> {
    const user = await this.userModel
      .findOne({ email: email })
      .select(isPasswordSelected ? '+password' : undefined)
      .exec();
    return this.userEntityFactory.createFromEntity(user);
  }

  public async findByPhoneAndIsVerified(
    { phone }: FindUserByPhoneInput,
    isPasswordSelected?: boolean,
  ): Promise<UserModel | null> {
    const user = await this.userModel
      .findOne({ $and: [{ phone: phone }, { isVerified: true }] })
      .select(isPasswordSelected ? '+password' : undefined)
      .exec();
    return this.userEntityFactory.createFromEntity(user);
  }

  public async findByPhone(phone: string): Promise<UserModel | null> {
    const user = await this.userModel.findOne({ phone: phone }).exec();
    return this.userEntityFactory.createFromEntity(user);
  }

  public async findByEmailAndIsVerified(
    { email }: FindUserByEmailInput,
    isPasswordSelected?: boolean,
  ): Promise<UserModel | null> {
    const user = await this.userModel
      .findOne({ $and: [{ email: email }, { isVerified: true }] })
      .select(isPasswordSelected ? '+password' : undefined)
      .exec();
    return this.userEntityFactory.createFromEntity(user);
  }

  async search({
    count: inputCount,
    page: inputPage,
    text,
    email,
    phone,
    displayName,
    roles,
    permissions,
    isVerified,
  }: SearchUserInput): Promise<SearchUserOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;

    const safeText = text ? escapeRegex(text) : text;

    let isVerifiedFilter: PipelineStage[] = [];
    if (isVerified || isVerified === false) {
      isVerifiedFilter = [
        {
          $match: { isVerified },
        },
      ];
    }

    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(text && {
            $or: [
              { $text: { $search: text } },
              { phone: { $regex: safeText } },
            ],
          }),

          ...(displayName && { displayName: displayName }),
          ...(email && { email: email }),
          ...(phone && { phone: phone }),
          ...(roles && { roles: { $in: roles } }),
          ...(permissions && { permissions: { $in: permissions } }),
        },
      },
      ...isVerifiedFilter,
      {
        $sort: { _id: -1 },
      },
      {
        $facet: {
          results: [{ $skip: (page - 1) * count }, { $limit: count }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];

    const searchResults = await this.userModel.aggregate(pipeline);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  public async create(userInput: UserModel): Promise<void> {
    const user = new this.userModel(this.userEntityFactory.create(userInput));
    await user.save();
  }

  public async createWithPhone(phone: string): Promise<UserModel> {
    const user = new this.userModel({ _id: new ObjectId(), phone: phone });
    await user.save();
    return this.userEntityFactory.createFromEntity(user);
  }

  public async createUserWithGoogle(
    email: string,
    displayName: string,
    googleId: string,
  ): Promise<UserModel> {
    const user = new this.userModel({
      _id: new ObjectId(),
      email: email,
      displayName: displayName,
      googleId: googleId,
    });
    await user.save();
    return this.userEntityFactory.createFromEntity(user);
  }

  public async update({
    userId,
    ...restOfArgs
  }: UpdateUserInput): Promise<void> {
    await this.userModel
      .findByIdAndUpdate(userId, { ...restOfArgs }, { new: true })
      .exec();
  }

  public async updatePassword({
    userId,
    password,
  }: UpdatePasswordInput): Promise<void> {
    await this.userModel
      .findByIdAndUpdate(
        userId,
        { password: password, isVerified: true },
        { new: true },
      )
      .exec();
  }

  public async delete({ userId }: DeleteUserInput): Promise<void> {
    await this.userModel.findByIdAndDelete(userId).exec();
  }

  public async removeRoleFromUsers(roleId: string) {
    await this.userModel.updateMany({}, { $pull: { roles: roleId } });
  }
}
