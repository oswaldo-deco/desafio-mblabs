import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";
import { Partner } from "../../entities/partner.entity";
import { IPartnerUpdate } from "../../interfaces/partners";

const updatePartnerService = async ({
  id,
  name,
  description,
  logo,
  active
}: IPartnerUpdate) => {
  const partnerRepository = AppDataSource.getRepository(Partner);

  const partners = await partnerRepository.find();

  if (!checkId(partners, id)) {
    throw new AppError(404, "Partner not found");
  }

  const partnerAlreadyExists = partners.find(
    (partner) => partner.name === name
  );
  if (partnerAlreadyExists) {
    throw new AppError(409, "Partner already exists");
  }

  await partnerRepository.update(id, {
    name: name,
    description: description,
    logo: logo,
    active: active
  });

  return {
    message: "Partner successfully updated",
    UpdatedInfo: {
      name: name,
      description: description,
      logo: logo,
      active: active
    }
  };
};

export default updatePartnerService; 