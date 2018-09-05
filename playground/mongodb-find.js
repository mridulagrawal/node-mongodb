const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    //if error exists while connecting
    if (err) {
        return console.log('connection falied');
    }
    //if connection success
    console.log('connection established');
    const db = client.db('TodoApp')

    //using find method of mongodb
    /*
    db.collection('Todos').find({ completed: false }).toArray().then((docs) => {
        console.log('TODOS');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        if (err) {
            return console.log('Unable to insert', err);
        }
    });
    */

    //using count method of mongodb
    db.collection('Todos').find().count().then((count) => {
        console.log('TODOS: ', count);
    }, (err) => {
        if (err) {
            return console.log('Unable to insert', err);
        }
    });
    client.close();
});