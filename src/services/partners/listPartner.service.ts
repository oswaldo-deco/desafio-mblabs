import { AppDataSource } from "../../data-source";
import { Partner } from "../../entities/partner.entity";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";

const listPartnerService = async (id: string) => {
  const partnerRepository = AppDataSource.getRepository(Partner);

  const partners = await partnerRepository.find();

  if (!checkId(partners, id)) {
    throw new AppError(404, "Partner not found");
  }

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
    .where({ id: id }).getOne();
};

export default listPartnerService;
