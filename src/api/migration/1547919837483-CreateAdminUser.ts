import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../models/entity/User";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();
    const userRepository = getRepository(User);

    user.username = "admin";
    user.password = "admin";
    user.hashPassword();
    user.role = "ADMIN";
    await userRepository.save(user);

  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
