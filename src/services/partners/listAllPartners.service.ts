import { AppDataSource } from "../../data-source";
import { Partner } from "../../entities/partner.entity";

const listAllPartnersService = async () => {
  const partnerRepository = AppDataSource.getRepository(Partner);

  return partnerRepository
    .createQueryBuilder("partner")
    .select([
      "partner.id",
      "partner.name",
      "partner.description",
      "partner.logo",
      "partner.created_at",
      "partner.updated_at",
      "partner.active",
    ])
    .getMany();
};

export default listAllPartnersService;
