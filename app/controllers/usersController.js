const { Op } = require('sequelize');
const User = require('../models/usersModel');
const log = require('../config/logger');

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'userId',
        'username',
        'displayname',
        'email',
        'profilePicture',
        'bio',
        'dateOfBirth',
        'followers',
        'dateJoined',
      ],
    });
    log.info('Successfully fetched users');
    return res.status(200).json(users);
  } catch (err) {
    log.error('Error fetchin users', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: [
        'userId',
        'username',
        'displayname',
        'email',
        'profilePicture',
        'bio',
        'dateOfBirth',
        'followers',
        'dateJoined',
      ],
    });

    if (!user) {
      log.warn(`User with ID ${id} not found`);
      res.status(404).json({ message: 'User not found' });
    }

    log.info('user', user);
    return res.status(200).json(user);
  } catch (err) {
    log.error('Error fetching user', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { username, displayname } = req.querry;

    if (!username || !displayname) {
      return res
        .status(400)
        .json({ message: 'Provide a username or displayname to search' });
    }

    const users = await User.findAll({
      where: {
        [Op.or]: [
          username ? { username: { [Op.iLike]: `%${username}%` } } : null,
          displayname
            ? { displayname: { [Op.iLike]: `%${displayname}%` } }
            : null,
        ].filter(Boolean),
      },
      attributes: ['userId', 'username', 'displayname', 'profilePicture'],
    });

    if (users.length === 0) {
      log.warn('No users found');
      return res.status(404).json({ message: 'No users found' });
    }

    log.info(`Search successful: Found ${users.length} user(s)`);
    return res.status(200).json(users);
  } catch (err) {
    log.error('Erroe searchin user', err.message);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};

// Update uers profile
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { displayname, profilePicture, bio } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      log.warn(`User with ID ${id} not found`);
      res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      displayname: displayname || user.displayname,
      profilePicture: profilePicture || user.profilePicture,
      bio: bio || user.bio,
    });

    console.log(`User with ID ${id} was updated`);
    return res.status(202).json(user);
  } catch (err) {
    log.error(`Error updating user `, err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Register a User
