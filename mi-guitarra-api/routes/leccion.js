var express = require('express');
var router = express.Router();
var LeccionService = require('../services/service.leccion');

/* GET customer listing. */
router.get('/', async function(req, res, next)
{
	res.json({error: "Id de leccion invalido."});
});

router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const leccion = await LeccionService.create(body);

		return res.status(201).json({ leccion: leccion });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

router.get('/:id', async (req, res, next) =>
{
	try
	{
		const leccion = await LeccionService.retrieve(req.params.id);

		return res.json({ leccion: leccion });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the customer by uid */
router.put('/:id', async (req, res, next) =>
{
	try
	{
		const leccion = await LeccionService.update(req.params.id, req.body);

		return res.json({ leccion: leccion });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the customer from the customer list by uid */
router.delete('/:id', async (req, res, next) =>
{
	try
	{
		const leccion = await LeccionService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;