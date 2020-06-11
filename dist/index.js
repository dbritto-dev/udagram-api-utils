"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_typescript_1 = require("sequelize-typescript");
exports.createPgSequelize = (pgSQLUri, { models, modelPaths }) => new sequelize_typescript_1.Sequelize(pgSQLUri, {
    models,
    modelPaths,
    dialect: "postgres",
    storage: ":memory:",
});
exports.createApp = ({ corsOriginWhitelist = [], }) => {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cors_1.default({
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
    }));
    return app;
};
const generateTBodyFragment = (router, baseURL) => router.stack
    .map((r) => `
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
      `)
    .join("");
exports.routerToTable = (router) => {
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
