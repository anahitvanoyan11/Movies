module.exports = app => {
  const usersController = require("../controllers/users.controller.js");
  var router = require("express").Router();
  // Create a new User
  router.post("/", usersController.create);
  
  //Subscribe user to some movie
  router.post("/movie", usersController.subscribeToMovie);

  //Get user subscribed movies
  router.get("/:user_id/movie", usersController.getSubscribedMovie);

  //Delete subscription
  router.delete("/movie", usersController.deleteSubscription);

  app.use('/api/user', router);
};
