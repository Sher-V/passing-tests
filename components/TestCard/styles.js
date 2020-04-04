import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  container: {
    width: "100%"
  },
  card: {
    marginBottom: theme.spacing(5)
  },
  delete: {
    marginLeft: "auto"
  }
}));
