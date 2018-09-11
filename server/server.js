const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');
var mongoose = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
var app = express();

app.use(bodyParser.json());

//POST: create todo by specific user
app.post('/todos', authenticate, (req, res) => {

    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET: get all todos of specific user using token
app.get('/todos', authenticate, (req, res) => {

    Todo.find({ _creator: req.user._id }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    })
});

//GET: gwt specific todo by id
app.get('/todos/:id', authenticate, (req, res) => {

    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOne({
        _id: id,
        _creator: req.user.id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({ todo });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

//DELETE: delete todo of specific user
app.delete('/todos/:id', authenticate, (req, res) => {

    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove({
        _id: id,
        _creator: req.user.id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        return res.status(200).send({ todo });
    }).catch((e) => {
        return res.status(400).send(e);
    });
});

//UPDATE: update todo of specific user
app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user.id
    }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

//POST: users sign up api
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

//POST: user login
app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((e) => {
        return res.status(400).send();
    });
});


//GET: user profile with authentication middleware
app.get('/users/me', authenticate, (req, res) => {
    return res.send(req.user);
});

//DELETE: logout api delete token
app.delete('/users/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        return res.status(200).send();
    }, () => {
        return res.status(400).send();
    })
});

app.listen(3000, () => {
    console.log('server started at port: 3000');
});
