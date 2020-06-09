import express, { Application } from "express";
import cors from "cors";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

export const createPgSequelize = (
  pgSQLUri: string,
  { models, modelPaths }: SequelizeOptions
): Sequelize =>
  new Sequelize(pgSQLUri, {
    models,
    modelPaths,
    dialect: "postgres",
    storage: ":memory:",
  });

export type AppConfig = {
  corsOriginWhitelist: Array<string>;
};

export const createApp = ({
  corsOriginWhitelist = [],
}: AppConfig): Application => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization",
      ],
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: corsOriginWhitelist,
    })
  );

  return app;
};
