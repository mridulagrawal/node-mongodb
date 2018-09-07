const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

//1. .remove() remove using query or remove all by passing emty obj
Todo.remove({}).then((res) => {
    console.log(res);
});

//2. .findOneAndRemove()
Todo.findOneAndRemove({ _id: '5b91ffbda24c052cb425c796' }).then((todo) => {
    console.log(todo);
})

//3. .findByIdAndRemove()
Todo.findByIdAndRemove('5b91ffbda24c052cb425c796').then((todo) => {
    console.log(todo);
})