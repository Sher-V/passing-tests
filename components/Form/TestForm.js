import React from "react";
import { Field, FieldArray, Fields, reduxForm } from "redux-form";
import subm from "../subm";
import Button from "@material-ui/core/Button";
import { compose } from "redux";
import { connect } from "react-redux";
import { useStyles } from "./styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {
  renderField,
  renderSelectField,
  renderTextArea
} from "./FormComponents";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import {
  Checkbox,
  FormGroup,
  IconButton,
  RadioGroup,
  TextField
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { saveTest } from "../../redux/actions";

const renderCheckBox = field => {
  return <Checkbox {...field.input} />;
};
const renderOptions = ({
  fields,
  meta: { error, submitFailed },
  ...others
}) => {
  const classes = useStyles();
  return (
    <>
      {fields.map((field, index) => {
        return (
          <FormControlLabel
            key={index}
            className={classes.label}
            value={fields.get(index).answer}
            label={
              <>
                <Field
                  name={`${field}.answer`}
                  component={renderField}
                  label={`Ответ ${index + 1}`}
                />
                <IconButton onClick={() => fields.remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
            control={
              (others.type === "multiple" && (
                <Field
                  name={`${field}.is_right_answer`}
                  component={renderCheckBox}
                  type={"checkbox"}
                />
              )) || <Radio color={"primary"} />
            }
          />
        );
      })}
      <Button
        style={{ marginTop: "25px" }}
        fullWidth
        variant={"contained"}
        color={"primary"}
        onClick={() => fields.push("")}
      >
        Добавить ответ
      </Button>
    </>
  );
};

const renderFields = ({ fields, meta: { error, submitFailed }, ...others }) => {
  return (
    <>
      {fields.map((field, index) => (
        <div key={index} style={{ display: "flex" }}>
          <Field
            name={`${field}.answer`}
            component={renderField}
            label={`Ответ ${index + 1}`}
          />
          <IconButton onClick={() => fields.remove(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}{" "}
      <Button
        style={{ marginTop: "25px" }}
        fullWidth
        variant={"contained"}
        color={"primary"}
        onClick={() => fields.push("")}
      >
        Добавить ответ
      </Button>
    </>
  );
};

const renderAnswers = fields => {
  return (
    <FormControl fullWidth>
      <FormLabel component="legend" required>
        Ответы
      </FormLabel>
      {(fields.type === "single" && (
        <RadioGroup {...fields.questions[fields.index].right_answer.input}>
          <FieldArray name={fields.names[0]} component={renderOptions} />
        </RadioGroup>
      )) ||
        (fields.type === "multiple" && (
          <FormGroup>
            <FieldArray
              name={fields.names[0]}
              component={renderOptions}
              type={fields.type}
            />
          </FormGroup>
        )) ||
        (fields.type === "anything" && (
          <FieldArray
            name={fields.names[0]}
            component={renderFields}
            type={fields.type}
          />
        ))}
    </FormControl>
  );
};

const renderQuestions = ({ fields, meta: { error, submitFailed } }) => {
  const classes = useStyles();
  return fields.map((field, index) => {
    return (
      <Paper key={index} className={classes.paper} elevation={3}>
        <Field
          label="Тип вопроса"
          name={`${field}.type`}
          component={renderSelectField}
          index={index}
        />
        <Field
          label="Текст вопроса"
          name={`${field}.text`}
          component={renderTextArea}
        />
        <Fields
          names={[`${field}.answers`, `${field}.right_answer`]}
          component={renderAnswers}
          index={index}
          type={fields.get(index).type}
        />
      </Paper>
    );
  });
};

const renderTitle = ({ input, label, type, meta: { touched, error } }) => {
  const classes = useStyles();
  return (
    <TextField
      label={"Название теста"}
      required
      classes={{ root: classes.title }}
      InputLabelProps={{
        classes: {
          root: classes.titleLabel
        }
      }}
      {...input}
    />
  );
};

const TestForm = props => {
  const { handleSubmit, test, saveTest } = props;
  const classes = useStyles();
  return (
    <div>
      <Typography>{test.title}</Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit(fields => saveTest(fields))}
      >
        <Field name={"title"} component={renderTitle} />
        <FieldArray name={"questions"} component={renderQuestions} />
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    initialValues: state.testReducer.test,
    test: state.testReducer
  };
};

export default compose(
  connect(mapStateToProps, { saveTest }),
  reduxForm({
    form: "testForm",
    enableReinitialize: true
  })
)(TestForm);
