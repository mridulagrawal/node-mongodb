const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('connection falied');
    }

    console.log('connection established');
    const db = client.db('TodoApp')

    //TODO: google: mongodb update operators
    //findOneAndUpdate
    db.collection('Todos').findOneAndUpdate(
        {
            _id: new ObjectID('5b8f9f4e329782d770fb2b6f')
        },
        {
            $set: { completed: true },
            $inc: { "age": 1 }
        },
        {
            returnOriginal: false
        }
    ).then((result) => {
        console.log(result);
    });
    
    client.close();
});