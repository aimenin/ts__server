import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

// по дефолту request в express не имеет свойство body, чтобы решить эту проблему понадобится миддлвара - bodyParser
// она смотрит в HTTP request и прикрепляет к express request свойтво body оттуда
app.use(bodyParser.urlencoded({ extended: true }));
// миддлвара, которая сохраняет данные о пользовательской сессии
// та же ситуация, что и с bodyParser - по дефолту request не имеет значения session, это миддлвара его добавляет 
app.use(cookieSession({ keys: ['last'] })); // передаем слово last, но это не важно, важно чтобы это просто была строка
app.use(router);

app.listen(3000, () => {
    console.log('Listening on port 3000');
})