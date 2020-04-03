import React from "react";
import { Form, Field } from "react-final-form";
import Button from "@material-ui/core/Button";
import { useStyles } from "../Form/styles";
import SaveIcon from "@material-ui/icons/Save";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { renderQuestions } from "./newtestformhelpers";
import { validate } from "../Form/validation";
import { TextField } from "mui-rff";

const NewTestForm = ({ initialValues, saveTest }) => {
  const classes = useStyles();
  //if (!loaded && type !== "new") return <div>Loading</div>;
  return (
    <Form
      onSubmit={values => {
        saveTest(values);
        console.log(values);
      }}
      mutators={{ ...arrayMutators }}
      // validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine }) => {
        return (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label={"Название теста"}
              placeholder={"Название"}
              required
              name={"title"}
            />
            <FieldArray name={"questions"} component={renderQuestions} />
            <Button
              color={"primary"}
              variant={"contained"}
              fullWidth
              type={"submit"}
              endIcon={<SaveIcon />}
              disabled={submitting || pristine}
            >
              Сохранить
            </Button>
          </form>
        );
      }}
    />
  );
};

export default NewTestForm;