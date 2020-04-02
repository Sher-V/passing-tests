import { useStyles } from "./styles";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { Checkboxes, Radios, Select, TextField } from "mui-rff";
import MenuItem from "@material-ui/core/MenuItem";
import { FieldArray } from "react-final-form-arrays";

const renderFields = ({ fields }) =>
  fields.map((name, index) => (
    <div key={index} style={{ display: "flex" }}>
      <TextField name={`${name}.answer`} />
    </div>
  ));

export const renderQuestions = ({
  fields,
  ...other
}) => {
  const classes = useStyles();
  return (
    <div style={{ marginBottom: "10px" }}>
      {fields.map((name, questionIndex) => {
        const type = fields.value[questionIndex].type;
        const answers = fields.value[questionIndex].answers.map(
          (elem, answerIndex) => {
            return {
              label: (
                <TextField
                  name={`${name}.answers[${answerIndex}].answer`}
                  fullWidth
                  required
                />
              ),
              value: elem.answer
            };
          }
        );

        return (
          <Paper key={questionIndex} className={classes.paper} elevation={3}>
            <Select name={`${name}.type`} label={"Тип вопроса"} required>
              <MenuItem value={"single"}>Одиночный выбор</MenuItem>
              <MenuItem value={"multiple"}>Множественный выбор</MenuItem>
              <MenuItem value={"anything"}>Прямое совпадение</MenuItem>
            </Select>
            <TextField
              name={`${name}.text`}
              label="Текст вопроса"
              rows={6}
              fullWidth
              multiline
              required={true}
              placeholder="Текст вопроса"
              variant={"outlined"}
            />
            {
              {
                single: (
                  <Radios
                    formControlProps={{ fullWidth: true }}
                    formControlLabelProps={{
                      className: classes.formControlLabel
                    }}
                    name={`${name}.right_answer`}
                    label={"Ответы"}
                    data={answers}
                  />
                ),
                multiple: (
                  <Checkboxes
                    formControlProps={{ fullWidth: true }}
                    formControlLabelProps={{
                      className: classes.formControlLabel
                    }}
                    label={"Ответы"}
                    name={`${name}.right_answer`}
                    data={answers}
                  />
                ),
                anything: (
                  <FieldArray
                    name={`${name}.answers`}
                    component={renderFields}
                  />
                )
              }[type]
            }
          </Paper>
        );
      })}
    </div>
  );
};
