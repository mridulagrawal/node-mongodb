const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { ObjectID } = require('mongodb');

//the following id is not correct
var id = '690c660b037a62ad034b36f';

if (!ObjectID.isValid(id)) {
    console.log('not valid ID');
}

Todo.find({
    _id: id
}).then((todos) => {
    if (todos.length<1) {
        return console.log('Todos not found');
    }
    console.log("Todos: ", todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    if (!todo) {
        return console.log('id not found');
    }
    console.log("Todo: ", todo);
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('id not found');
    }
    console.log("Todo: ", todo);
}).catch((e) => {
    console.log(e);
});