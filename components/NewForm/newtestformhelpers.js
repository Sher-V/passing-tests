import { useStyles } from "../Form/styles";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { Checkboxes, Radios, Select, TextField } from "mui-rff";
import MenuItem from "@material-ui/core/MenuItem";
import { FieldArray } from "react-final-form-arrays";
import Button from "@material-ui/core/Button";
import { renderRadios } from "./radios";
import { renderFields } from "./fields";
import { renderCheckboxes } from "./checkboxes";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Box, IconButton } from "@material-ui/core";

export const renderQuestions = ({ fields, ...other }) => {
  const classes = useStyles();
  return (
    <div style={{ marginBottom: "10px" }}>
      {fields.map((name, questionIndex) => {
        const type = fields.value[questionIndex].type;
        return (
          <Paper key={questionIndex} className={classes.paper} elevation={3}>
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Select name={`${name}.type`} label={"Тип вопроса"} required>
                <MenuItem value={"single"}>Одиночный выбор</MenuItem>
                <MenuItem value={"multiple"}>Множественный выбор</MenuItem>
                <MenuItem value={"anything"}>Прямое совпадение</MenuItem>
              </Select>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
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
                  <FieldArray
                    name={`${name}.answers`}
                    right_answer={`${name}.right_answer`}
                    component={renderRadios}
                  />
                ),
                multiple: (
                  <FieldArray
                    name={`${name}.answers`}
                    component={renderCheckboxes}
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
      <Button
        style={{ marginTop: "25px" }}
        fullWidth
        variant={"contained"}
        color={"primary"}
        onClick={() =>
          fields.push({
            type: "single",
            text: "Новый вопрос",
            right_answer: "Ответ",
            answers: [
              { answer: "Ответ", is_right_answer: true }
            ]
          })
        }
      >
        Добавить вопрос
      </Button>
    </div>
  );
};
