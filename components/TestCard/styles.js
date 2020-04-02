import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: theme.spacing(10)
  },
  card: {
    marginBottom: theme.spacing(5)
  },
  delete: {
    marginLeft: "auto"
  }
}));
