import express, { Application, Router } from "express";
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

const generateTBodyFragment = (router: Router, baseURL: string) =>
  router.stack
    .map(
      (r) => `
        <tr>
          <td style="padding: 4px 8px; border: 1px solid;">
            ${Object.keys(r.route.methods)[0].toUpperCase()}
          </td>
          <td style="padding: 4px 8px; border: 1px solid;">
            <mark style="background: #eee; color: crimson;">
              ${baseURL}/${r.route.path.slice(1)}
            </mark>
          </td>
        </tr>
      `
    )
    .join("");

export const routerToTable = (router: Router) => {
  return `
    <table style="width: 42rem; border: 1px solid; font-family: monospace; font-size: 16px; border-collapse: collapse;">
      <thead>
        <tr style="text-align: left;">
          <th style="padding: 4px 8px; border: 1px solid; width: 10rem;">Method</th>
          <th style="padding: 4px 8px; border: 1px solid;">URI</th>
        </tr>
      </thead>
      <tbody>
        ${router.stack
          .filter((r) => r.name === "router")
          .map((r) => [r.handle, r.regexp.source.slice(2, -11)])
          .map(([router, baseURL]) => generateTBodyFragment(router, baseURL))
          .join("")}
      </tbody>
    <table>
  `;
};
