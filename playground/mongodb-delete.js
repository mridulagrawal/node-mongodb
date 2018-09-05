const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('connection falied');
    }

    console.log('connection established');
    const db = client.db('TodoApp')

    //deleteMany
    /*
    db.collection('Todos').deleteMany({ text: "eat lunch"}).then((result) => {
        console.log(result);
    });
    */

    //deleteOne
    /*
    db.collection('Todos').deleteOne({ text: "eat lunch" }).then((result) => {
        console.log(result);
    });
    */

    //findOneAndDelete
    /*
    db.collection('Todos').findOneAndDelete({ completed: true }).then((result) => {
        console.log(result);
    });
    */

    client.close();
});