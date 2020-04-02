import { TextField } from "mui-rff";
import Button from "@material-ui/core/Button";
import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

export const renderFields = ({ fields }) => {
  return (
    <FormControl fullWidth>
      <FormLabel component="legend" required>
        Ответы
      </FormLabel>
      {fields.map((name, index) => (
        <div key={index} style={{ display: "flex" }}>
          <TextField name={`${name}.answer`} label={`Ответ ${index + 1}`} required/>
          <IconButton onClick={() => fields.remove(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button
        style={{ marginTop: "25px" }}
        fullWidth
        variant={"contained"}
        color={"primary"}
        onClick={() => fields.push({ answer: "", is_right_answer: true })}
      >
        Добавить ответ
      </Button>
    </FormControl>
  );
};
