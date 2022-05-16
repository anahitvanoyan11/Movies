module.exports = app => {
  const moviesController = require("../controllers/movies.controller.js");
  var router = require("express").Router();
  // Create a new Movie
  router.post("/", moviesController.create);
  // Retrieve all Movies
  router.get("/", moviesController.findAll);
  // Retrieve a single movie with id
  router.get("/:movie_id", moviesController.findOne);
  // Update a single movie with id
  router.put("/:movie_id", moviesController.update);
  // Delete a single movie with id
  router.delete("/:movie_id", moviesController.delete);

  // Create a new Season for movie
  router.post("/season", moviesController.createSeason);
  // Retrieve all Seasons
  router.get("/", moviesController.findAllSeasons);
  // Retrieve a single season with id
  router.get("/:season_id", moviesController.findOneSeason);
  // Update a single season with id
  router.put("/:season_id", moviesController.updateSeason);
  // Delete a single season with id
  router.delete("/:season_id", moviesController.deleteSeason);

  // Create a new Episode for session
  router.post("/episode", moviesController.createEpisode);
  // Retrieve all Episodes
  router.get("/", moviesController.findAllSeasons);
  // Retrieve a episode season with id
  router.get("/:episode_id", moviesController.findOneEpisode);
  // Update a episode season with id
  router.put("/:episode_id", moviesController.updateEpisode);
  // Delete a episode season with id
  router.delete("/:episode_id", moviesController.deleteEpisode);

  app.use('/api/movie', router);
};
