const db = require('../helpers/database');

exports. getById = async function getById (signupcode) {
let query = "SELECT * FROM signupcode WHERE signupcode = ?"
let values = [signupcode]
let data = await db.run_query (query, values)
return data
}

exports. getAll = async function getAll (limit=10, OFFSET=1) {
let query = "SELECT * FROM signupcode ;"
let data = await db.run_query (query) ;
return data
}

