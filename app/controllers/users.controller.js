const { subscribers } = require('../models');
const db = require("../models");
const Users = db.users;
const Movies = db.movies;
const Subscribers = db.subscribers;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    //check email
    const duplicateEmail = await Users.findOne({where: {email: req.body.email}});

    if(duplicateEmail) {
      throw {
        message: 'This email already exist.'
      };
    }

    const user = await Users.create({
      full_name: req.body.full_name,
      email: req.body.email,
      password: req.body.password
    });

    return res.status(201).send({
      success: true,
      id: user.dataValues.id
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.subscribeToMovie = async (req, res) => {
  try {
    if(!req.body.user_id || !req.body.movie_id) {
      throw {
        message: 'User id and movie id are reuired params.'
      }
    }

    const user = await Users.findOne({where: {id: req.body.user_id}});

    if(!user) {
      throw {
        message: 'User id is wrong.'
      };
    }

    const movie = await Movies.findOne({where: {id: req.body.movie_id}});

    if(!movie) {
      throw {
        message: 'Movie id is wrong.'
      };
    }

    const checkSubscription = await Subscribers.findOne({
      where: {
        user_id: req.body.user_id,
        movie_id: req.body.movie_id,
      }
    })

    if(checkSubscription) {
      throw {
        message: 'You have already subscribed!'
      }
    }
    
    await Subscribers.create({
        user_id: req.body.user_id,
        movie_id: req.body.movie_id,
    })

    return res.status(201).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.getSubscribedMovie = async (req, res) => {
  try {
    const user = await Users.findOne({where: {id: req.params.user_id}});

    if(!user) {
      throw {
        message: 'User id is wrong.'
      };
    }
    
    const movies = await Subscribers.findAll({
      where: {
        user_id: user.id
      },
      include: [Movies],
    })

    return res.status(200).send({
      success: true,
      movies
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    if(!req.body.user_id || !req.body.movie_id) {
      throw {
        message: 'User id and movie id are reuired params.'
      }
    }

    const user = await Users.findOne({where: {id: req.body.user_id}});

    if(!user) {
      throw {
        message: 'User id is wrong.'
      };
    }

    const movie = await Movies.findOne({where: {id: req.body.movie_id}});

    if(!movie) {
      throw {
        message: 'Movie id is wrong.'
      };
    }

    const subscription = await Subscribers.findOne({
      where: {
        user_id: req.body.user_id,
        movie_id: req.body.movie_id,
      }
    })

    if(!subscription) {
      throw {
        message: 'User does not have subscription!'
      }
    }
    
    await Subscribers.destroy({
      where: {
        id: subscription.id
      }
    });

    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message
    });
  }
};