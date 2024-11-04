import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleToUser } from 'src/entities';
import { RoleToUserController } from './roleuser.controller';
import { RoleToUserService } from './roleuser.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleToUser])],
  controllers: [RoleToUserController],
  providers: [RoleToUserService],
  exports: [TypeOrmModule],
})
export class RoleToUserModule {}
