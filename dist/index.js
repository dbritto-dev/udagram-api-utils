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
