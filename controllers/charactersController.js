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

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    return res.status(200).json(characters);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

router.post('/', async (req, res) => {
  try {
    const character = await Character.create({ ...req.body });
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

    return res.status(200).json(character);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

router.get('/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findById(characterId);

    return res.status(200).json(character);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

router.delete('/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;

    const character = await Character.findByIdAndDelete(characterId);
    return res.status(200).json(character);
  } catch (error) {
    return res.status(406).json({ message: mongoErrorHandler(error) });
  }
});

module.exports = router;
