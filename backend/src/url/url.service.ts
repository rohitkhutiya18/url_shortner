import { randomInt } from "crypto";
import { appDataSource } from "../config/db.config.js";
import { baseAlgo } from "../utils/baseAlgoritm.js";
import { urlEntity } from "./url.entity.js";
export const urlRepository = appDataSource.getRepository(urlEntity);

export const addUrl = async function (args: { url: string; aliase?: string }) {
  if (!args.url) {
    throw new Error("url is required");
  }

  const existingUrl = await urlRepository.findOne({
    where: { originalUrl: args.url },
  });

  if (existingUrl) {
    if (args.aliase) {
      Object.assign(existingUrl, { aliase: args.aliase , shortUrl: args.aliase });
      await urlRepository.save(existingUrl);
      return existingUrl;
    }
    return existingUrl;
  }

  const create = urlRepository.create({
    originalUrl: args.url,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  if (!args.aliase) {
    const randomNo = Math.ceil(randomInt(1000, 10000) * 100000);
    const shortUrl = await baseAlgo(Number(randomNo));
    create.shortUrl = shortUrl;
  } else {
    create.shortUrl = args.aliase;
  }
  await urlRepository.save(create);
  return create;
};

export const getOgUrl = async function (key: string) {
  const getData = await urlRepository.createQueryBuilder("url")
    .where("url.shortUrl = :key", { key })
    .getOne();

  return getData;
};

export const getAllUrl = async function () {
  const getData = await urlRepository.find();
  return getData;
};
