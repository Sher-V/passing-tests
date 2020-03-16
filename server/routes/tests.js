const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Test = require("../models/Test");
const Question = require("../models/Question");
const Answer = require("../models/Answer");

// get all tests
router.get("/", (req, res) =>
  Test.findAll({
    raw: true
  })
    .then(tests => res.json(tests))
    .catch(err => console.log(err))
);

// delete test by Id
router.delete("/:id", (req, res) =>
  Test.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
);

// create new test
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

// update test
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

// get test by id
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id, {
      raw: true
    });
    const questions = await Question.findAll({
      raw: true,
      where: {
        test_id: req.params.id
      }
    });
    const answers = [];
    for (const question of questions) {
      await Answer.findAll({
        raw: true,
        where: {
          question_id: question.id
        }
      }).then(newAnswers => answers.push(newAnswers));
    }
    res.json({
      title: test.title,
      questions,
      answers
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
