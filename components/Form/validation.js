export const validate = values => {
/*    console.log("hey")
    console.log(values)*/
    const errors = {};
    if (!values.type) {
        errors.type = 'Required';
    }
    if (!values.text) {
        errors.text = 'Required';
    }
    return errors;
};
