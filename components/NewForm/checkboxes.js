import { useStyles } from "./styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import React from "react";
import { Checkbox, FormControlLabel, IconButton } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { TextField } from "mui-rff";
import DeleteIcon from "@material-ui/icons/Delete";
import { Field } from "react-final-form";

export const renderCheckboxes = ({ fields }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <FormControl fullWidth>
        <FormLabel component="legend" required>
          Ответы
        </FormLabel>
        {fields.map((name, index) => {
          return (
            <FormControlLabel
              key={index}
              className={classes.label}
              control={
                <Field
                  name={`${name}.is_right_answer`}
                  type={"checkbox"}
                  render={props => <Checkbox {...props.input} />}
                />
              }
              value={fields.value[index].right_answer}
              label={
                <React.Fragment>
                  <TextField
                    name={`${name}.answer`}
                    fullWidth
                    required
                    label={`Ответ ${index + 1}`}
                  />
                  <IconButton onClick={() => fields.remove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              }
            />
          );
        })}
      </FormControl>
      <Button
        style={{ marginTop: "25px" }}
        fullWidth
        color={"primary"}
        onClick={() => fields.push({ answer: "", is_right_answer: false })}
      >
        Добавить ответ
      </Button>
    </React.Fragment>
  );
};
