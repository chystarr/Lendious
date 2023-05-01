const express = require("express");
const router = express.Router();
const db = require("../models");
const { Request } = db;

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

router.get("/", (req, res) => {
  Request.findAll({}).then((allPosts) => res.json(allPosts));
});

router.post("/", (req, res) => {
  let { content } = req.body;

  Request.create({ content })
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Request.findByPk(id).then((mpost) => {
    if (!mpost) {
      return res.sendStatus(404);
    }

    res.json(mpost);
  });
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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