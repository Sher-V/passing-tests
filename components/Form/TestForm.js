import React from "react";
import { Field, FieldArray, Fields, reduxForm } from "redux-form";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { IconButton, InputLabel, Paper, RadioGroup } from "@material-ui/core";
import subm from "../subm";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { compose } from "redux";
import { connect } from "react-redux";
import { useStyles } from "./styles";
import {
  renderAnswers,
  renderQuestions,
  renderSelectField,
  renderTextArea
} from "./FormComponents";

const TestForm = props => {
  const { handleSubmit, questions } = props;
  const classes = useStyles();
  //if (questions.length) return "Loading";

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FieldArray name={"questions"} component={renderQuestions} />
      <button type={"submit"}>submit</button>
    </form>
  );
};

const mapStateToProps = (state, props) => {
  return {
    initialValues: state.testReducer.test,
    questions: state.testReducer.test.questions
  };
};

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: "testForm",
    onSubmit: subm,
    enableReinitialize: true
  })
)(TestForm);

{
  /* {questions.map(question => {
          return (
              <Paper className={classes.paper} elevation={3}>
              <Field
                label="Тип вопроса"
                name="type"
                component={renderSelectField}
              />
              <Field
                label="Текст вопроса"
                name="text"
                component={renderTextArea}
              />
              <FieldArray name={"answers"} component={renderAnswers} />
              </Paper>
          );
        })}*/
}
{
  /*   <Field label="Тип вопроса" name="type" component={renderSelectField} />
        <Field label="Текст вопроса" name="text" component={renderTextArea} />
        <FieldArray name={"answers"} component={renderAnswers} />*/
}
