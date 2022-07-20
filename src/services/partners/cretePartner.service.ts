import { Partner } from "../../entities/partner.entity";
import { IPartnerCreate } from "../../interfaces/partners";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const createPartnerService = async ({
  name,
  description,
  logo,
}: IPartnerCreate) => {
  if (!name || !description || !logo) {
    throw new AppError(422, "Missing name or description");
  }

  const partnerRepository = AppDataSource.getRepository(Partner);
  const partners = await partnerRepository.find();
  const partnerAlreadyExists = partners.find(
    (partner) => partner.name === name
  );
  if (partnerAlreadyExists) {
    throw new AppError(409, "Partner already exists");
  }

  const partner = new Partner();
  partner.name = name;
  partner.description = description;
  partner.logo = logo;

  partnerRepository.create(partner);
  await partnerRepository.save(partner);

  return partner;
};

export default createPartnerService