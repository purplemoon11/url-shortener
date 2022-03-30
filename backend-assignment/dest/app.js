"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const shortener_1 = require("./controller/shortener");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const createShortUrl_Schemas_1 = __importDefault(require("./schemas/createShortUrl.Schemas"));
const app = (0, express_1.default)();
//dotenv config
dotenv_1.default.config();
//paring
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
//mongoose.connection
//mongodb+srv://node:<password>@cluster0.rkk5m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose_1.default.connect(`mongodb+srv://node:${process.env.MONGO_DB_PASSWORD}@cluster0.rkk5m.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`);
//Running the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
//connecting to frontend
app.use((0, cors_1.default)({
    origin: `${process.env.corsOrigin}`
}));
//routess /Test Cases
app.post('/api/url', (0, validateResource_1.default)(createShortUrl_Schemas_1.default), shortener_1.createShortUrl);
app.get('/:shortId', shortener_1.redirect);
