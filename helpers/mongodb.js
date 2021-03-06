const mongoClient = require("mongodb").MongoClient
const mongoAuth =  require('../config')

const mongo_username = mongoAuth.configMongo.user
const mongo_password = mongoAuth.configMongo.pwd

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongoAuth.configMongo.host}`  
const DATABASE_NAME = mongoAuth.configMongo.dbname

exports.run_query = async function run_query(collection,query) {  
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).find(query).toArray() 
  return result
}

exports.run_insert = async function run_insert(collection,document) {  
    const dbClient = await mongoClient.connect(CONNECTION_URI)
    const result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(document)
    return {"status":201, "description": "Data insert successfully"}
}

exports.run_del = async function run_del(collection,query) {  
    const dbClient = await mongoClient.connect(CONNECTION_URI)
    const result = await dbClient.db(DATABASE_NAME).collection(collection).remove(query)
    return {"status":201, "description": "Data removed successfully"}
}

exports.run_update = async function run_update(collection,query,newvalues) {  
    const dbClient = await mongoClient.connect(CONNECTION_URI)
 //console.log("collection ", collection)
 // console.log("query ", query)
    const result = await dbClient.db(DATABASE_NAME).collection(collection).replaceOne(query,newvalues)
    return {"status":201, "description": "Data updated successfully"}
}