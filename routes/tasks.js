const express = require("express");
const Task = require("../models/tasks");
const auth = require('../auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router
  .route("/")
  .get((req, res, next) => {
    Task.find()
      .populate({
        path: 'owner'
      })
      .populate({
        path: 'category'
      })
      .then(task => {
        if (task == null) throw new Error("Not posted jobs yet.");
        res.json(task);
      })
      .catch(next);
  })





  .post(auth.verifyUser, (req, res, next) => {
    let task = new Task(req.body);
    task.owner = req.user._id;
    require("../models/category").findOne({ categoryType: req.categoryType })
      .exec().then((categories) => {

        task.save({
          taskName: req.body.taskName,
          categoryType: categories.categoryType,
          discription: req.body.discription,
          amount: req.body.amount,
          skills: req.body.skills,
          owner: req.user._id,
          files: req.body.files
        })
          .then(task => {
            res.statusCode = 201;
            res.json(task);
          })
      })
      .catch(next);

  })


  .put((req, res, next) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed." });
  })

  .delete(auth.verifyUser, (req, res, next) => {
    Task.deleteMany({ owner: req.user._id })
      .then(response => {
        console.log("task does not belong to yo")
        res.json(response);
      })
      .catch(next);
  });

router.route('/myPost')
  .get(auth.verifyUser, (req, res, next) => {
    Task.find({ owner: req.user._id })
      .populate({
        path: 'owner'
      })
      .populate({
        path: 'assignedTo'
      })
      .then((task) => {
        res.json(task);
      }).catch((err) => next(err))
  });




router.route('/:id')
  .get(auth.verifyUser, (req, res, next) => {

    Task.findOne({ _id: req.params.id })
        .then((task) => {
        res.json(task);
    
      }).catch(next);
  })

  .put((req, res, next) => {
    Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    
      .then((task) => {
        res.json(task);
      }).catch(next);
  })

  .delete(auth.verifyUser, (req, res, next) => {
    Task.findOneAndDelete({ owner: req.user._id, _id: req.params.id })
      .populate({
        path: 'owner'
      })
      .then(response => {
        res.json(response);
      })
      .catch(next);
  });


router.route('/:id/proposal')


  .get((req, res, next) => {
    Task.findById(req.params.id)

      .then((task) => {
        res.json(task.proposal);
      }).catch(next);
  })


  // .post(auth.verifyUser, (req, res, next) => {

  //   Task.findById(req.params.id)
  //     .then((task) => {
  //       task.proposal.unshift
  //         ({
  //           proposalDiscription: req.body.proposalDiscription,
  //           proposedAmount: req.body.proposedAmount,
  //           proposedBy: req.user.id,
  //         });
  //       task.save({})
  //         .then((task) => {
  //           res.json(task);
  //         })
  //     }).catch(next);
  // })


  .post(auth.verifyUser, (req, res, next) => {
    let task = new Task(req.body);
    task.owner = req.user._id;
    require("../models/category").findOne({ categoryType: req.categoryType })
      .exec().then((categories) => {

        task.save({
          taskName: req.body.taskName,
          categoryType: categories.categoryType,
          discription: req.body.discription,
          amount: req.body.amount,
          skills: req.body.skills,
          owner: req.user._id,
          files: req.body.files
        })
          .then(task => {
            res.statusCode = 201;
            res.json(task);
          })
      })
      .catch(next);

  })


  .delete((req, res, next) => {
    Task.findById(req.params.id)
      .then((task) => {
        task.proposal = [];
        task.save()
          .then((task) => {
            res.json(task);
          })
      }).catch(next);
  });

module.exports = router;
