const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Test = require("../models/Test");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const sequilize = require("sequelize");
const { saveQuestions } = require("./helpers");
const { QueryTypes } = require("sequelize");

// get all tests
router.get("/", async (req, res, next) => {
  try {
    const tests = await Test.findAll({
      raw: true
    });
    res.json(tests);
  } catch (e) {
    next(e);
  }
});

// delete test by Id
router.delete("/:id", async (req, res, next) => {
  try {
    await Test.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

// create new test
router.post("/", async (req, res, next) => {
  try {
    const test = await Test.create({
      title: req.body.title
    });
    await saveQuestions(req.body.questions, test.id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  try {
    await Test.update(
      {
        title: req.body.title
      },
      {
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
    await saveQuestions(req.body.questions, req.body.id);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// get test by id
router.get("/:id", async (req, res, next) => {
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
  } catch (e) {
    next(e);
  }
});

module.exports = router;
