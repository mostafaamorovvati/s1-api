import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { CreatePermissionInput } from '@/modules/auth/components/permission/dto/create-permission.dto';
import { PermissionModel } from '@/modules/auth/components/permission/model/permission.model';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';

@Injectable()
export class PermissionModelFactory implements ModelFactory<PermissionModel> {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create({
    name,
    title,
  }: CreatePermissionInput): Promise<PermissionModel> {
    const permission = new PermissionModel(
      new ObjectId().toHexString(),
      name,
      title,
    );
    await this.permissionRepository.create(permission);
    return permission;
  }
}
