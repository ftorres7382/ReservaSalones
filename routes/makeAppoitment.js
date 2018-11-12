var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var db = require("../helpers/mysqlConnection").mysql_pool;


/* GET home page. */
router.get('/', async function(req, res) {

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;
  let parms = { title: 'Appoitment', active: { home: true }};

  //here we can see the admin!
  // console.log(req.cookies.admini[0]);
  if(userName){

    let query =`INSERT INTO User (emailID, name, privilege)` +
      ` SELECT * FROM (SELECT '${email}', '${userName}', ${0}) as nUser`  +
      ` WHERE NOT EXISTS (SELECT emailID FROM User where emailID = '${email}')`;

    db.getConnection(function(err, connection) {

      if (err) throw error;

      connection.query(query, function (error, results, fields) {
        if (error) throw error;

        if (accessToken && userName) {
          parms.user = userName;
          parms.debug = `User: ${userName}\nEmail: ${email}\nAccess Token: ${accessToken}`;
        } else {
          parms.signInUrl = authHelper.getAuthUrl();
          parms.debug = parms.signInUrl;
        }
          res.render('index', parms);
      });
    });
  }else{ //enter here si no nadie se ha autentificado
    res.redirect('/');
  }
});
module.exports = router;