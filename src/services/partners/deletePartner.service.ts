import { AppDataSource } from "../../data-source";
import { Partner } from "../../entities/partner.entity";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";

const deletePartnerService = async (id: string) => {
  const partnerRepository = AppDataSource.getRepository(Partner);

  const partners = await partnerRepository.find();

  if (!checkId(partners,id)) {
    throw new AppError(404, "Partner not found");
  }

  await partnerRepository.delete(id);

  return { message: "Partner deleted with success" }
};

export default deletePartnerService;