const express = require("express");
const Task = require("../models/tasks");
const auth = require('../auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Proposal = require("../models/proposal");
const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    Proposal.find()
    .populate({
        path: 'task'
      })
      .populate({
        path: 'proposedBy'
      })
      .then(proposal => {
        if (proposal == null) throw new Error("Not posted proposel yet.");
        res.json(proposal);
      })
      .catch(next);

  })
  .post(auth.verifyUser, (req, res, next) => {
    let proposal = new Proposal(req.body);
    proposal.proposedBy = req.user._id;
    proposal.save()
    .then(proposal => {
        res.statusCode = 201;
        res.json(proposal);
    })
    .catch(next);
  })

  router.route('/:id')
  .get((req, res, next) => {
        Proposal.find({ task: req.params.id })
        .populate({
          path: 'proposedBy'
        })
          .then((task) => {
            res.json(task);
          }).catch(next);
  })

module.exports = router;