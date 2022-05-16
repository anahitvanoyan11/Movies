const db = require("../models");
const Movies = db.movies;
const Seasons = db.seasons;
const Episodes = db.episodes;
const Op = db.Sequelize.Op;

//Movies
exports.create = async (req, res) => {
  try {
    const movie = await Movies.create({
      name: req.body.name,
    });

    return res.status(201).send({
      success: true,
      id: movie.dataValues.id
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    if(req.query.limit) {
      req.query.limit = +req.query.limit;
    }
    else {
      req.query.limit = 10;
    }

    if(req.query.page) {
      req.query.page = +req.query.page;
    }
    else {
      req.query.page = 1;
    }
    const movies = await Movies.findAndCountAll({
      offset: (req.query.page - 1) * req.query.limit,
      limit: req.query.limit,
      order: [['updatedAt', 'DESC']]
    });

    return res.status(200).send({
      success: true,
      movies
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const movie = await Movies.findOne({
      where: {
        id: req.params.movie_id,
      },
      include: ['seasons']
    });

    return res.status(200).send({
      success: true,
      movie
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    if(!req.body.name) {
      throw {
        message: 'You can edit only name and it is required param.'
      }
    }

    const movie = await Movies.findOne({where: {
      id: req.params.movie_id
    }});

    if(!movie) {
      throw {
        message: 'Movie id is wrong'
      }   
    }

    movie.name = req.body.name;

    await movie.save();
    return res.status(200).send({
      success: true,
      movie
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Movies.destroy({where: {
      id: req.params.movie_id
    }});

    return res.status(200).send({
      success: true
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

//Seasons
exports.createSeason = async (req, res) => {
  try {
    const season = await Seasons.create({
      name: req.body.name,
      movie_id: req.body.movie_id
    });

    return res.status(201).send({
      success: true,
      id: season.dataValues.id
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.findAllSeasons = async (req, res) => {
  try {
    if(req.query.limit) {
      req.query.limit = +req.query.limit;
    }
    else {
      req.query.limit = 10;
    }

    if(req.query.page) {
      req.query.page = +req.query.page;
    }
    else {
      req.query.page = 1;
    }

    const seasons = await Seasons.findAndCountAll({
      where: {movie_id: req.params.movie_id},
      offset: (req.query.page - 1) * req.query.limit,
      limit: req.query.limit,
      order: [['updatedAt', 'DESC']]
    });

    return res.status(200).send({
      success: true,
      seasons
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.findOneSeason = async (req, res) => {
  try {
    const season = await Movies.findOne({
      where: {
        id: req.params.season_id,
      },
      include: ['episodes']
    });

    return res.status(200).send({
      success: true,
      season
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.updateSeason = async (req, res) => {
  try {
    if(!req.body.name) {
      throw {
        message: 'You can edit only name and it is required param.'
      }
    }

    const season = await Movies.findOne({where: {
      id: req.params.season_id
    }});

    if(!season) {
      throw {
        message: 'Season id is wrong'
      }   
    }

    season.name = req.body.name;

    await season.save();
    return res.status(200).send({
      success: true,
      season
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.deleteSeason = async (req, res) => {
  try {
    await Seasons.destroy({where: {
      id: req.params.season_id
    }});

    return res.status(200).send({
      success: true
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

//Episodes
exports.createEpisode = async (req, res) => {
  try {
    const season = await Seasons.findOne({
      where: {
        id: req.body.season_id
      },
      include: [Episodes]
    })

    if(!season) {
      throw {
        message: 'Season iid is wrong'
      };
    }

    if(season.episodes.length > 23) {
      throw {
        message: 'Every season can has lass than 23 episodes.'
      };
    }

    const episode = await Episodes.create({
      name: req.body.name,
      season_id: req.body.season_id
    });

    return res.status(201).send({
      success: true,
      id: episode.dataValues.id
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.findAllEpisodes = async (req, res) => {
  try {
    if(req.query.limit) {
      req.query.limit = +req.query.limit;
    }
    else {
      req.query.limit = 10;
    }

    if(req.query.page) {
      req.query.page = +req.query.page;
    }
    else {
      req.query.page = 1;
    }

    const episodes = await Seasons.findAndCountAll({
      where: {season_id: req.params.season_id},
      offset: (req.query.page - 1) * req.query.limit,
      limit: req.query.limit,
      order: [['updatedAt', 'DESC']]
    });

    return res.status(200).send({
      success: true,
      episodes
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.findOneEpisode = async (req, res) => {
  try {
    const episode = await Episodes.findOne({
      where: {
        id: req.params.episode_id,
      }
    });

    return res.status(200).send({
      success: true,
      episode
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    if(!req.body.name) {
      throw {
        message: 'You can edit only name and it is required param.'
      }
    }

    const episode = await Movies.findOne({where: {
      id: req.params.episode_id
    }});

    if(!episode) {
      throw {
        message: 'Episode id is wrong'
      }   
    }

    episode.name = req.body.name;

    await episode.save();
    return res.status(200).send({
      success: true,
      episode
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    await Episodes.destroy({where: {
      id: req.params.episode_id
    }});

    return res.status(200).send({
      success: true
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};
