"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginRoutes_1 = require("./routes/loginRoutes");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = express_1.default();
// по дефолту request в express не имеет свойство body, чтобы решить эту проблему понадобится миддлвара - bodyParser
// она смотрит в HTTP request и прикрепляет к express request свойтво body оттуда
app.use(body_parser_1.default.urlencoded({ extended: true }));
// миддлвара, которая сохраняет данные о пользовательской сессии
// та же ситуация, что и с bodyParser - по дефолту request не имеет значения session, это миддлвара его добавляет 
app.use(cookie_session_1.default({ keys: ['last'] })); // передаем слово last, но это не важно, важно чтобы это просто была строка
app.use(loginRoutes_1.router);
app.listen(3000, function () {
    console.log('Listening on port 3000');
});
