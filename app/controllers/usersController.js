// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../models/usersModel');
const log = require('../config/logger');

// Get all users
const getAllUsers = async (req, res) => {
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
    console.log('Successfully fetched users');
    return res.status(200).json(users);
  } catch (err) {
    log.error('Error fetchin users', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
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
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('user', user);
    return res.status(200).json(user);
  } catch (err) {
    log.error('Error fetching user', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Search user by(username and displayname)
const searchUser = async (req, res) => {
  try {
    const { username, displayname } = req.query;

    if (!username && !displayname) {
      return res
        .status(400)
        .json({ message: 'Provide a username or displayname to search' });
    }

    const users = await User.findAll({
      where: {
        [Op.or]: [
          username ? { username: { [Op.like]: `%${username}%` } } : null,
          displayname
            ? { displayname: { [Op.like]: `%${displayname}%` } }
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
const updateUserProfile = async (req, res) => {
  try {
    console.log(`Received request to update user with ID: ${req.params.id}`);

    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const { displayname, profilePicture, bio } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      log.warn(`User with ID ${id} not found`);
      return res.status(404).json({ message: 'User not found' });
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
const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      displayname,
      profilePicture,
      dateOfBirth,
    } = req.body;

    if (!username || !email || !password || !displayname || !dateOfBirth) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      console.log('user name already exists', username);
      return res.status(400).json({ message: 'user name already taken' });
    }
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      console.log('Email already registeres', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      displayname,
      profilePicture,
      dateOfBirth,
    });

    console.log(`User registered successfullt ${username}`);

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        userId: newUser.userId,
        username: newUser.username,
        email: newUser.email,
        displayname: newUser.displayname,
        profilePicture: newUser.profilePicture,
        dateOfBirth: newUser.dateOfBirth,
      },
    });
  } catch (err) {
    log.error(`Error registering user `, err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) {
      log.warn('Invalid login attempt');
      return res.status(401).json({ message: 'Ivalid email or password' });
    }

    // const token = jwt.sign(
    //   { userId: user.userId, username: user.username },
    //   process.env.JWT_SECRET,
    //   { expiresIn: process.env.JWT_EXPIRES }
    // );

    console.log(`User logged in ${user.username}`);

    return res.status(200).json({
      message: 'Login succefull',
      // token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        displayname: user.displayname,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    log.error(`Error registering user `, err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  searchUser,
  updateUserProfile,
  registerUser,
  loginUser,
};
