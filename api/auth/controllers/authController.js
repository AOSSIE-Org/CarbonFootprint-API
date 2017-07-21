let email = "xyz@gmail.com"
const uuidv4 = require('uuid/v4');
const random = uuidv4();  // 
// Generate a couple namespace uuids 
const uuidv5 = require('uuid/v5');
console.log("API key is "+uuidv5(email, random));

