import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelFactory } from '@/common/repositories/model.factory';
import { CreateRoleInput } from '@/modules/auth/components/role/dto/create-role.dto';
import { RoleModel } from '@/modules/auth/components/role/model/role.model';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

@Injectable()
export class RoleModelFactory implements ModelFactory<RoleModel> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create({
    name,
    title,
    permissions,
  }: CreateRoleInput): Promise<RoleModel> {
    const role = new RoleModel(
      new ObjectId().toHexString(),
      name,
      title,
      permissions,
    );
    await this.roleRepository.create(role);
    return role;
  }
}
