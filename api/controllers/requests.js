const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Request, User, Building } = db;

//    GET    /api/requests
//    POST   /api/requests
//    GET    /api/requests/:id
//    PUT    /api/reqeusts/:id
//    DELETE /api/requests/:id
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /micro_posts comes from the file ./Request.js

router.get("/", passport.isAuthenticated(), async (req, res) => {
    const userId = req.user.user_id;
    //const user = await User.findByPk(userId);
    const buildingInfo = Building.findOne({include: {model: User, where: {user_id: userId}}});
    Request.findAll({where:{building_id: buildingInfo.building_id}}).then((allRequests) => res.json(allRequests));
});

router.post("/", passport.isAuthenticated(),(req, res) => {
  let { content } = req.body;

  Request.create({ content })
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Request.findByPk(id).then((mpost) => {
    if (!mpost) {
      return res.sendStatus(404);
    }

    res.json(mpost);
  });
});

router.put("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Request.findByPk(id).then((mpost) => {
    if (!mpost) {
      return res.sendStatus(404);
    }

    mpost.content = req.body.content;
    mpost
      .save()
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Request.findByPk(id).then((mpost) => {
    if (!mpost) {
      return res.sendStatus(404);
    }

    mpost.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;