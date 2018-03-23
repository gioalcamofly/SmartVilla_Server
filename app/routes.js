var AuthenticationController = require('./controllers/authentication'),
    TodoController = require('./controllers/todos'),
    SenderController = require('./controllers/sender'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router(),
        senderRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.get('/list', requireAuth, AuthenticationController.userList);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);

    todoRoutes.get('/', requireAuth, TodoController.getTodos);
    todoRoutes.post('/', requireAuth, TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, TodoController.deleteTodo);

    // Sender Routes
    apiRoutes.use('/messages', senderRoutes);

    senderRoutes.post('/', requireAuth, SenderController.storeMessage);

    // Set up routes
    app.use('/api', apiRoutes);

}
