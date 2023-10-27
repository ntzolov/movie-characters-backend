const Character = require('../models/Character');
const charactersQueryLogic = require('../utils/charactersQueryLogic');
const { mongoErrorHandler } = require('../utils/mongoErrorHandler');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const characters = await charactersQueryLogic(req.query);

    if (!characters.length) {
      characters.push({ error: 'Not characters found!' });
    }

    res.setHeader('Access-Control-Allow-Origin', 'https://movie-characters.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth');
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    res.setHeader('Access-Control-Allow-Credentials', true);

    return res.status(200).json(characters);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const character = await Character.create({ ...req.body });

    res.setHeader('Access-Control-Allow-Origin', 'https://movie-characters.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth');
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    res.setHeader('Access-Control-Allow-Credentials', true);

    return res.status(200).json(character);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

router.put('/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const characterBody = { ...req.body };

    await Character.findByIdAndUpdate(characterId, characterBody, { runValidators: true });
    const character = await Character.findById(characterId);

    res.setHeader('Access-Control-Allow-Origin', 'https://movie-characters.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth');
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    res.setHeader('Access-Control-Allow-Credentials', true);

    return res.status(200).json(character);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

router.get('/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findById(characterId);

    res.setHeader('Access-Control-Allow-Origin', 'https://movie-characters.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth');
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    res.setHeader('Access-Control-Allow-Credentials', true);

    return res.status(200).json(character);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

router.delete('/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findByIdAndDelete(characterId);

    res.setHeader('Access-Control-Allow-Origin', 'https://movie-characters.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth');
    res.setHeader('access-control-expose-headers', 'Set-Cookie');
    res.setHeader('Access-Control-Allow-Credentials', true);

    return res.status(200).json(character);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

module.exports = router;
