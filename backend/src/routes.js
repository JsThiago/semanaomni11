const express = require('express');
const routes = express.Router();
const OngControlle = require('./controller/OngController')
const IncidentController = require('./controller/IncidentController')
const ProfileController = require('./controller/ProfileController')
const SessionController = require('./controller/SessionController')

routes.post('/sessions', SessionController.create)

routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', ProfileController.index);

routes.post('/ongs', OngControlle.create)
routes.get('/ongs', OngControlle.index)

module.exports = routes;