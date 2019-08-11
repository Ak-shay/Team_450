var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://team450:QBni1KVLaoIor4RfSV3ouCIxquWz37rTA6aQM4Jre0r8gBUukJw9mzulNR09XFJ6cK0zjrohiPkiZmGYUY0TAw%3D%3D@team450.documents.azure.com:10255/?ssl=true", { useNewUrlParser: true }, function (err, client) {
  client.close();
});

// var app = express();

// app.listen(process.env.port | 8080);