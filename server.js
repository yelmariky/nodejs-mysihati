var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
var data = require('./data');
//adding keycloak
const keycloak = require('./config/keycloak-config.js').initKeycloak();
app.use(keycloak.middleware());
app.use(bodyParser.json());
/*app.use(cors({
  origin: '*'
}));
*/
app.set('port', process.env.PORT || 3001);

app.get('/api/habits', keycloak.protect(), function (req, res) {
  res.send(data.habits);
});

app.listen(app.get('port'), keycloak.protect(), function () {
  console.log('Server is running on port ' + app.get('port'));
});
