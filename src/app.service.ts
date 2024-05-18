import { Injectable, OnModuleInit } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

import { Permission } from './common/permissions/permission-type';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async onModuleInit() {
    await this.createPermissions();
    await this.createCeoRole();
    await this.createSellerRole();
    await this.createUserRole();
  }

  async createPermissions() {
    for (const key of Object.keys(Permission)) {
      const dbPermission = await this.permissionRepository.findByName(
        Permission[key].name,
      );
      if (!dbPermission) {
        await this.permissionRepository.directCreate({
          _id: new ObjectId(),
          name: Permission[key].name,
          title: Permission[key].title,
        });
      }
    }
  }

  async createCeoRole() {
    const allPermission = await this.permissionRepository.findAll();
    const permissionIds =
      allPermission?.map(({ _id }) => _id.toHexString()) || [];

    const ceoRole = await this.roleRepository.findByName('CEO');

    if (!ceoRole) {
      await this.roleRepository.directCreate({
        _id: new ObjectId(),
        name: 'CEO',
        title: 'مدیر ارشد',
        permissions: permissionIds,
      });
    }
  }

  async createSellerRole() {
    const sellerRole = await this.roleRepository.findByName('SELLER');
    const createSellerPermission =
      await this.permissionRepository.findByName('createSeller');
    const updateSellerPermission =
      await this.permissionRepository.findByName('updateSeller');
    const deleteSellerPermission =
      await this.permissionRepository.findByName('deleteSeller');
    if (!sellerRole) {
      await this.roleRepository.directCreate({
        _id: new ObjectId(),
        name: 'SELLER',
        title: 'فروشنده',
        permissions: [
          createSellerPermission.getId(),
          updateSellerPermission.getId(),
          deleteSellerPermission.getId(),
        ],
      });
    }
  }

  async createUserRole() {
    const userRole = await this.roleRepository.findByName('USER');
    const createUserPermission =
      await this.permissionRepository.findByName('createUser');
    const updateUserPermission =
      await this.permissionRepository.findByName('updateUser');
    const deleteUserPermission =
      await this.permissionRepository.findByName('deleteUser');
    if (!userRole) {
      await this.roleRepository.directCreate({
        _id: new ObjectId(),
        name: 'USER',
        title: 'کاربر ساده',
        permissions: [
          createUserPermission.getId(),
          updateUserPermission.getId(),
          deleteUserPermission.getId(),
        ],
      });
    }
  }
}
