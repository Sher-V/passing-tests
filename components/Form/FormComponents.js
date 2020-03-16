import TextField from "@material-ui/core/TextField";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import {
  Avatar,
  Checkbox,
  IconButton,
  InputLabel,
  RadioGroup
} from "@material-ui/core";
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
import FormGroup from "@material-ui/core/FormGroup";

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
  meta: { touched, error },
  index
}) => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Avatar className={classes.avatar}>{index + 1}</Avatar>
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

export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => {
  return <TextField {...input} fullWidth required label={label} />;
};

const renderRadioGroup = ({ input, fields, ...rest }) => {
  const classes = useStyles();
  return (
    <>
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
