import { Router, Request, Response, NextFunction, request } from 'express';

// это значит, что интерфейс будет иметь все те же значения, что и интерфейс-родитель + свои
// мы не можеи изменять родительский файл, потому что при сборке проекта он откатится к первозданному виду
interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

// миддлвара, проверяющая зашел ли пользователь с логином и паролем
function requireAuth(req: Request, res: Response, next: NextFunction): void {
    // первое условие - это type guard
    if (req.session && req.session.loggedIn) {
        // вызывается следующая миддлвара
        next();
        // рекомендуется писать return на след строке, чтобы понять другим программистам, что функция ничего не может вернуть
        return;
    }

    res.status(403); // статус, означащий, что доступ запрещен
    res.send('Not permitted');
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
    res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email" />
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" />
            </div>
            <button>Submit</button>
        </form>
    `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    if (email && password && email == 'hi@hi.com' && password == 'artem') {
        // отмечаем пользователя, как успешно прошедшего проверку паролем и логином
        req.session = { loggedIn: true };
        // перенаправляем пользователя обратно на главную страницу
        res.redirect('/');
    } else {
        res.send('Invalid email or password');
    }
});

router.get('/', (req: Request, res: Response) => {
    // первое условие - это type guard
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/logout">Logout</a>
            </div>
        `);
    } else {
       res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/login">Login</a>
            </div>
        `); 
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
});

// вторым аргументов мы передаем миддлвару
router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcom to protected route, logged in user');
});

export { router }; // экспортируем с помощью {} потому что делаем это не на той же строке, что и объявление!