import {useStyles} from "../Form/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {Field} from "react-final-form";
import RadioGroup from "@material-ui/core/RadioGroup";
import {FormControlLabel, IconButton} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import {TextField} from "mui-rff";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import React from "react";

export const renderRadios = ({ fields, right_answer }) => {
    const classes = useStyles();
    return (
        <>
            <FormControl fullWidth>
                <FormLabel component="legend" required>
                    Ответы
                </FormLabel>
                <Field name={right_answer}>
                    {props => (
                        <RadioGroup {...props.input}>
                            {fields.map((name, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        className={classes.label}
                                        control={<Radio color={"primary"} />}
                                        value={fields.value[index].answer}
                                        label={
                                            <>
                                                <TextField
                                                    name={`${name}.answer`}
                                                    fullWidth
                                                    required
                                                    label={`Ответ ${index + 1}`}
                                                />
                                                <IconButton onClick={() => fields.remove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        }
                                    />
                                );
                            })}
                        </RadioGroup>
                    )}
                </Field>
            </FormControl>
            <Button
                style={{ marginTop: "25px" }}
                fullWidth
                variant={"contained"}
                color={"primary"}
                onClick={() => fields.push({ answer: "", is_right_answer: false })}
            >
                Добавить ответ
            </Button>
        </>
    );
};
