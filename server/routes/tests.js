const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Test = require("../models/Test");
const Question = require("../models/Question");

router.get("/", (req, res) => {
  //console.log(req);
  return Test.findAll({
    raw: true
  })
    .then(tests => res.json(tests))
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res) =>
  Test.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
);

router.post("/", (req, res) =>
  Test.create(
    {
      name: req.body.testName
    },
    {
      raw: true
    }
  )
    .then(test => {
      req.body.questions.forEach(question =>
        Question.create({
          type: question.type,
          text: question.text,
          answers: question.answers,
          right_answer: question.right_answer,
          test_id: test.get({ plain: true }).id
        })
      );
      res.sendStatus(200);
    })
    .catch(err => console.log(err))
);

router.put("/", (req, res) => {
  Test.update(
    {
      name: req.body.testName
    },
    {
      where: {
        id: req.body.id
      }
    }
  )
    .then(async () => {
      await Question.destroy({
        where: {
          test_id: req.body.id
        }
      });
      await req.body.questions.forEach(question =>
        Question.create({
          type: question.type,
          text: question.text,
          answers: question.answers,
          right_answer: question.right_answer,
          test_id: req.body.id
        })
      );
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

router.get("/:id", (req, res) =>
  Question.findAll({
    raw: true,
    where: {
      test_id: req.params.id
    }
  })
    .then(questions => res.json(questions))
    .catch(err => console.log(err))
);

module.exports = router;
