import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(2)
  },
  avatar: {
    backgroundColor: "#3f51b5",
    alignSelf: "center",
    marginRight: "10px"
  },
  form: {
    width: "100%",
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
