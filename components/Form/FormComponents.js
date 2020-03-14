import TextField from "@material-ui/core/TextField";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { IconButton, InputLabel, RadioGroup } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "./styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import Radio from "@material-ui/core/Radio";
import { Field, FieldArray, Fields } from "redux-form";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

export const renderTextArea = ({
  label,
  input,
  meta: { touched, invalid, error }
}) => {
  return (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      required
      variant={"outlined"}
      fullWidth
      multiline
      rows={6}
      {...input}
    />
  );
};

export const renderSelectField = ({
  label,
  input,
  meta: { touched, error }
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FormControl fullWidth error={touched && error}>
        <InputLabel required>{label}</InputLabel>
        <Select {...input}>
          <MenuItem value={"single"}>Одиночный выбор</MenuItem>
          <MenuItem value={"multiple"}>Множественный выбор</MenuItem>
          <MenuItem value={"anything"}>Прямое совпадение</MenuItem>
        </Select>
      </FormControl>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </div>
  );
};

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return <TextField {...input} fullWidth required label={label} />;
};

const renderRadioGroup = ({ input, fields, ...rest }) => {
  const classes = useStyles();
  return (
    <RadioGroup {...rest.right_answer}>
      {fields.map((field, index) => {
        return (
          <FormControlLabel
            key={index}
            className={classes.label}
            value={fields.get(index)}
            label={
              <>
                <Field
                  name={field}
                  component={renderField}
                  label={`Ответ ${index + 1}`}
                />
                <IconButton onClick={() => fields.remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
            control={<Radio color={"primary"} />}
          />
        );
      })}
    </RadioGroup>
  );
};

export const renderAnswers = ({
  fields,
  meta: { error, submitFailed },
  initialValues
}) => {
  return (
    <FormControl fullWidth>
      <FormLabel component="legend" required>
        Ответы
      </FormLabel>
      <Field
        name={"right_answer[0]"}
        component={renderRadioGroup}
        fields={fields}
      />
      <Button
        style={{ marginTop: "25px" }}
        fullWidth
        variant={"contained"}
        color={"primary"}
        onClick={() => fields.push("")}
      >
        Добавить ответ
      </Button>
    </FormControl>
  );
};

const renderAnsw = fields => {
  return (
    <FormControl fullWidth>
      <FormLabel component="legend" required>
        Ответы
      </FormLabel>
      <FieldArray
        name={fields.names[0]}
        component={renderRadioGroup}
        right_answer={fields.questions[fields.index].right_answer[0].input}
      />
      <Button
        style={{ marginTop: "25px" }}
        fullWidth
        variant={"contained"}
        color={"primary"}
        onClick={() => fields.push("")}
      >
        Добавить ответ
      </Button>
    </FormControl>
  );
};

export const renderQuestions = ({ fields, meta: { error, submitFailed } }) => {
  const classes = useStyles();
  return fields.map((field, index) => {
    return (
      <Paper key={index} className={classes.paper} elevation={3}>
        <Field
          label="Тип вопроса"
          name={`${field}.type`}
          component={renderSelectField}
        />
        <Field
          label="Текст вопроса"
          name={`${field}.text`}
          component={renderTextArea}
        />
        <Fields
          names={[`${field}.answers`, `${field}.right_answer[0]`]}
          component={renderAnsw}
          index={index}
        />
        {/*        <FieldArray name={`${field}.answers`} component={renderAnswers} />*/}
      </Paper>
    );
  });
};
