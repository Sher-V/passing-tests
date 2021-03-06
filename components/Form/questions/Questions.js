import { useStyles } from "../styles";
import Paper from "@material-ui/core/Paper";
import { Box, IconButton, Avatar } from "@material-ui/core";
import { Select, TextField } from "mui-rff";
import MenuItem from "@material-ui/core/MenuItem";
import { FieldArray } from "react-final-form-arrays";
import { renderRadios } from "./answers/radios";
import { renderCheckboxes } from "./answers/checkboxes";
import { renderFields } from "./answers/fields";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";

export const renderQuestions = ({ fields }) => {
  const classes = useStyles();

  return (
    <div style={{ marginBottom: "10px" }}>
      {fields.map((name, questionIndex) => {
        const type = fields.value[questionIndex].type;
        return (
          <Paper key={questionIndex} className={classes.paper} elevation={3}>
            <Box className={classes.header}>
              <Avatar
                style={{
                  backgroundColor: "#3f51b5",
                  alignSelf: "center",
                  marginRight: "10px"
                }}
              >
                {questionIndex + 1}
              </Avatar>
              <Select name={`${name}.type`} label={"Тип вопроса"} required>
                <MenuItem value={"single"}>Одиночный выбор</MenuItem>
                <MenuItem value={"multiple"}>Множественный выбор</MenuItem>
                <MenuItem value={"anything"}>Прямое совпадение</MenuItem>
              </Select>
              <IconButton onClick={() => fields.remove(questionIndex)}>
                <ClearIcon />
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
            text: "",
            right_answer: "Ответ",
            answers: [{ answer: "Ответ", is_right_answer: true }]
          })
        }
      >
        Добавить вопрос
      </Button>
    </div>
  );
};
