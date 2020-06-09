import express from "express";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
export declare const createPgSequelize: (pgSQLUri: string, { models, modelPaths }: SequelizeOptions) => Sequelize;
export declare type AppConfig = {
    corsOriginWhitelist: Array<string>;
};
export declare const createApp: ({ corsOriginWhitelist, }: AppConfig) => express.Application;
