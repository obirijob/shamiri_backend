"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const journalRouter = express_1.default.Router();
journalRouter.get('/', (_, res) => {
    res.json('GET route');
});
exports.default = journalRouter;
