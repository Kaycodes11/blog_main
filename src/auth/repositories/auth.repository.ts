import { EntityRepository, Repository } from "typeorm";
import { User } from "../../users/entities/user.entity";

@EntityRepository()
export class UserRepository extends Repository<User>{
  //  some custom repository methods now this can be used directly within auth.service.ts
  //  to get custom repository use entityManager.getCustomRepository or getCustomRepository()

  findJustByName(firstName: string, surName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName =:firstName", {firstName})
      .andWhere("user.surName =:surName", {surName}).getMany();
  }
}
