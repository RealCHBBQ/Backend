const db = require('../helpers/database')
const dbMongo = require('../helpers/mongodb')

//list all the articles in the database
exports.getAll = async function getAll () {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM dogs;"
  let data = await db.run_query(query)  
  return data
}


//get a single article by its id  
exports.getById = async function getById (id) {
  let query = "SELECT * FROM dogs WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

exports.deleteById = async function deleteById (id) {
  let query = "Delete FROM dogs WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}



//create a new article in the database
exports.add = async function add (article) {  
  let keys = Object.keys(article)
  let values = Object.values(article)  
  keys = keys.join(',')   
  let parm = ''
  for(i=0; i<values.length; i++){ parm +='?,'}
  parm=parm.slice(0,-1)
  let query = `INSERT INTO dogs (${keys}) VALUES (${parm})`
  try{
    await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

exports.update = async function update (article,id) {  
    
  //console.log("article " , article)
 // console.log("id ",id)
  let keys = Object.keys(article)
  let values = Object.values(article)  
  let updateString=""
  for(i=0; i<values.length;i++){updateString+=keys[i]+"="+"'"+values[i]+"'"+"," }
 updateString= updateString.slice(0, -1)
 // console.log("updateString ", updateString)
  let query = `UPDATE dogs SET ${updateString} WHERE ID=${id} RETURNING *;`
  try{
   await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

exports.getAllMongo =  async function getAllMongo (page, limite, order) {
  let data = await dbMongo.run_query('dogs', {})
  return data
}

exports.getByIdMongo =  async function getByIdMongo (id) {
  let data = await dbMongo.run_query('dogs', {'authorID': parseInt(id)})
  return data
}

exports.addMongo =  async function addMongo (document) {
  let status = await dbMongo.run_insert('dogs', document)
  return status
}

exports.delMongo =  async function delMongo (id) {
  let status = await dbMongo.run_del('dogs',  {'authorID': parseInt(id)})
  return status
}

exports.updateMongo =  async function updateMongo (id,newvalues) {
 //  let keys = Object.keys(newvalues)
  //let values = Object.values(newvalues)  
  let updateString="{$set:"+ JSON.stringify(newvalues)
  updateString+="}"
 // for(i=0; i<values.length;i++){updateString+=keys[i]+"="+"'"+values[i]+"'"+"," }
// updateString= updateString.slice(0, -1)
 console.log("updateString ", updateString)
  let status = await dbMongo.run_update('dogs',{'authorID':parseInt(id)},newvalues)
  return status
}

