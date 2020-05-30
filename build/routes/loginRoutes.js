"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// миддлвара, проверяющая зашел ли пользователь с логином и паролем
function requireAuth(req, res, next) {
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
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n        <form method=\"POST\">\n            <div>\n                <label>Email</label>\n                <input name=\"email\" />\n            </div>\n            <div>\n                <label>Password</label>\n                <input name=\"password\" type=\"password\" />\n            </div>\n            <button>Submit</button>\n        </form>\n    ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email == 'hi@hi.com' && password == 'artem') {
        // отмечаем пользователя, как успешно прошедшего проверку паролем и логином
        req.session = { loggedIn: true };
        // перенаправляем пользователя обратно на главную страницу
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
});
router.get('/', function (req, res) {
    // первое условие - это type guard
    if (req.session && req.session.loggedIn) {
        res.send("\n            <div>\n                <div>You are logged in</div>\n                <a href=\"/logout\">Logout</a>\n            </div>\n        ");
    }
    else {
        res.send("\n            <div>\n                <div>You are not logged in</div>\n                <a href=\"/login\">Login</a>\n            </div>\n        ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
// вторым аргументов мы передаем миддлвару
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcom to protected route, logged in user');
});
