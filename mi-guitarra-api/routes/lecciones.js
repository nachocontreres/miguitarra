var express = require('express');
var router = express.Router();
var LeccionService = require('../services/service.leccion');

router.get('/', async function(req, res, next)
{
	try
	{
		const lecciones = await LeccionService.todas();
		return res.json({ lecciones });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;