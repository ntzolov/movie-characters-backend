const Character = require('../models/Character');

module.exports = charactersQueryLogic = async (query) => {
  const search = query.search || '';
  const category = query.category;
  const sort = query.sort;
  const userId = query.userId;

  let characters;

  if (category === 'liked') {
    if (sort === 'nameAZ') {
      characters = await Character.find({ usersLiked: userId, name: { $regex: search, $options: 'i' } }).sort({ name: 1 });
    } else if (sort === 'nameZA') {
      characters = await Character.find({ usersLiked: userId, name: { $regex: search, $options: 'i' } }).sort({ name: -1 });
    } else if (sort === 'mostLiked') {
      characters = await Character.find({ usersLiked: userId, name: { $regex: search, $options: 'i' } }).sort({ likes: -1 });
    } else {
      characters = await Character.find({ usersLiked: userId, name: { $regex: search, $options: 'i' } });
    }
  } else if (category === 'favorites') {
    if (sort === 'nameAZ') {
      characters = await Character.find({ usersFavorited: userId, name: { $regex: search, $options: 'i' } }).sort({ name: 1 });
    } else if (sort === 'nameZA') {
      characters = await Character.find({ usersFavorited: userId, name: { $regex: search, $options: 'i' } }).sort({ name: -1 });
    } else if (sort === 'mostLiked') {
      characters = await Character.find({ usersFavorited: userId, name: { $regex: search, $options: 'i' } }).sort({
        likes: -1,
      });
    } else {
      characters = await Character.find({ usersFavorited: userId, name: { $regex: search, $options: 'i' } });
    }
  } else if (category === 'my characters') {
    if (sort === 'nameAZ') {
      characters = await Character.find({ _ownerId: userId, name: { $regex: search, $options: 'i' } }).sort({ name: 1 });
    } else if (sort === 'nameZA') {
      characters = await Character.find({ _ownerId: userId, name: { $regex: search, $options: 'i' } }).sort({ name: -1 });
    } else if (sort === 'mostLiked') {
      characters = await Character.find({ _ownerId: userId, name: { $regex: search, $options: 'i' } }).sort({ likes: -1 });
    } else {
      characters = await Character.find({ _ownerId: userId, name: { $regex: search, $options: 'i' } });
    }
  } else {
    if (sort === 'nameAZ') {
      characters = await Character.find({ name: { $regex: search, $options: 'i' } }).sort({ name: 1 });
    } else if (sort === 'nameZA') {
      characters = await Character.find({ name: { $regex: search, $options: 'i' } }).sort({ name: -1 });
    } else if (sort === 'mostLiked') {
      characters = await Character.find({ name: { $regex: search, $options: 'i' } }).sort({ likes: -1 });
    } else {
      characters = await Character.find({ name: { $regex: search, $options: 'i' } });
    }
  }

  return characters;
};
