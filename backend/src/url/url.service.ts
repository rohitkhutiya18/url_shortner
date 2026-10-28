import { randomInt } from "crypto";
import { appDataSource } from "../config/db.config.js";
import { baseAlgo } from "../utils/baseAlgoritm.js";
import { urlEntity } from "./url.entity.js";
import { redisClient } from "../utils/redis.js";
export const urlRepository = appDataSource.getRepository(urlEntity);

export const addUrl = async function (args: { url: string; aliase?: string }) {
  if (!args.url) {
    throw new Error("url is required");
  }

  const existingUrl = await urlRepository.findOne({
    where: [{ originalUrl: args.url }, { shortUrl: args.aliase }],
  });

  if (
    existingUrl?.aliase &&
    existingUrl?.aliase === args.aliase &&
    existingUrl?.originalUrl !== args.url
  ) {
    throw new Error("Aliase is already in use for a different URL");
  }

  if (existingUrl) {
    if (args.aliase) {
      Object.assign(existingUrl, {
        aliase: args.aliase,
        shortUrl: args.aliase,
      });
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
    create.aliase = args.aliase;
  }
  await urlRepository.save(create);
  return create;
};

export const getOgUrl = async function (key: string) {
  const cacheKey = `url:${key}`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const getData = await urlRepository
    .createQueryBuilder("url")
    .where("url.shortUrl = :key", { key })
    .getOne();

  if (getData) {
    await redisClient.set(cacheKey, JSON.stringify(getData), {
      EX: 3600,
    });
  }

  return getData;
};

export const getAllUrl = async function () {
  const getData = await urlRepository.find();
  return getData;
};
