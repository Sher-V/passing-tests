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
      req.body.questions.forEach(
        async (question, questionIndex) =>
          await Question.create(
            {
              type: question.type,
              text: question.text,
              test_id: test.get({ plain: true }).id
            },
            { raw: true }
          ).then(question =>
            req.body.questions[questionIndex].answers.forEach(
              async answer =>
                await Answer.create({
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

router.put("/", async (req, res) => {
  try {
    // await Test.destroy({
    //   where: {
    //     id: req.body.id
    //   }
    // });
    // const test = await Test.create(
    //   {
    //     title: req.body.title
    //   },
    //   {
    //     raw: true
    //   }
    // );
    const test = await Test.update(
      {
        title: req.body.title
      },
      {
        raw: true,
        where: {
          id: req.body.id
        }
      }
    );
    await Question.destroy({
      where: {
        test_id: req.body.id
      }
    });

    for (const question of req.body.questions) {
      const createdQuestion = await Question.create(
        {
          type: question.type,
          text: question.text,
          test_id: req.body.id
        },
        { raw: true }
      );
      for (const answer of question.answers) {
        await Answer.create({
          answer: answer.answer,
          is_right_answer: answer.is_right_answer,
          question_id: createdQuestion.get({ plain: true }).id
        });
      }
    }
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
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
      id: test.id,
      title: test.title,
      questions
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
