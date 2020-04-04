import { makeStyles } from "@material-ui/core/styles";

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
  title: {
    margin: "0 auto",
    display: "block",
    textAlign: "center"
  },
  titleLabel: {},
  input: {
    borderBottom: "0"
  },
  avatar: {
    backgroundColor: "#3f51b5",
    color: "white",
    marginTop: "0px",
    marginRight: "5px",
    alignSelf: "center",
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  label: {
    "& .MuiFormControlLabel-label": {
      display: "flex",
      width: "100%"
    }
  },
  formControlLabel: {
    "& .MuiFormControlLabel-label": {
      display: "flex",
      width: "100%"
    }
  }
}));
