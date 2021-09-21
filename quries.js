const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '1q2w3e4r5t',
  port: 5432,
});

var controller = {
  createUser: function (request, response, callback) {
    const { name, email, phone, password } = request.body;
    console.log(request.body);
    pool.query('INSERT INTO public.register_details (name, email, phone, password) \
    VALUES ($1, $2, $3, $4)', [name, email, phone, password], function(error, results) { 
      if (error) {
        return callback(error, results);
      }
       callback(error, results);
    });
  },

  showUser: function(req, res){return new Promise((resolve, reject)=>{
    pool.query("select * from public.register_details limit 5", function(error, data){
      if(error){
        reject(error)
      }
      console.log(data.rows)
        resolve(data.rows)
    })
  }).catch(function(){
    reject("something wrong");
  })
}
}

module.exports = controller;

