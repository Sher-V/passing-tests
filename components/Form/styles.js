import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    form: {
        "& div": {
            marginTop: "10px"
        }
    },
    paper: {
        padding: "10px 20px 30px 20px",
        marginBottom: "50px"
    },
    label: {
        "& .MuiFormControlLabel-label": {
            display: "flex",
            width: "100%"
        }
    }
}));
