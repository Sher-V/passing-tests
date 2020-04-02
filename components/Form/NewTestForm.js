import React from "react";
import { Form, Field } from "react-final-form";
import Button from "@material-ui/core/Button";
import { useStyles } from "./styles";
import SaveIcon from "@material-ui/icons/Save";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { renderQuestions } from "./newtestformhelpers";
import { validate } from "./validation";

const NewTestForm = ({ initialValues }) => {
  const classes = useStyles();
  //if (!loaded && type !== "new") return <div>Loading</div>;
    debugger
  return (
    <Form
      onSubmit={values => {
        // submit values
        //console.log(values);
      }}
      mutators={{ ...arrayMutators }}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, saveTest }) => {
        return (
          <form className={classes.form} onSubmit={handleSubmit}>
            <FieldArray
              name={"questions"}
              component={renderQuestions}
            />
            <Button
              color={"primary"}
              variant={"contained"}
              fullWidth
              type={"submit"}
              endIcon={<SaveIcon />}
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
