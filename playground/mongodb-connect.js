const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('connection falied');
    }

    console.log('connection established');
    const db = client.db('TodoApp')
    db.collection('Todos').insertOne({
        text: 'hey',
        completed: false,
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert', err);
        }
        // console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());

    });
    client.close();
});