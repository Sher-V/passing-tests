const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Test = require("../models/Test");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const sequilize = require("sequelize");
const { QueryTypes } = require("sequelize");

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
router.post("/", (req, res) => {
  Test.create(
    {
      title: req.body.title
    },
    {
      raw: true
    }
  )
    .then(test => {
      req.body.questions.forEach((question, questionIndex) =>
        Question.create(
          {
            type: question.type,
            text: question.text,
            test_id: test.get({ plain: true }).id
          },
          { raw: true }
        ).then(question =>
          req.body.questions[questionIndex].answers.forEach(answer =>
            Answer.create({
              answer: answer.answer,
              is_right_answer: answer.is_right_answer,
              question_id: question.get({ plain: true }).id
            })
          )
        )
      );
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

// update test
router.put("/", (req, res) => {
  Test.update(
    {
      title: req.body.title
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
    const questions = await db.query(
      `SELECT q.*, (SELECT jsonb_agg(row_to_json(a)) from answers a WHERE a.question_id = q.id) answers FROM questions q WHERE test_id = ${req.params.id}`,
      { type: QueryTypes.SELECT }
    );
    res.json({
      title: test.title,
      questions
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
