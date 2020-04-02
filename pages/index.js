import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { deleteTest, getTests } from "../redux/actions";
import { connect } from "react-redux";
import IndexLayout from "../components/IndexLayout";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { TestCard } from "../components/TestCard/TestCard";

const useStyles = makeStyles(theme => ({
  button: {
    lineHeight: "2"
  }
}));

let Index = ({ tests, getTests, deleteTest }) => {
  const classes = useStyles();

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div>
      {tests.map((test, index) => (
        <TestCard key={index} test={test} deleteTest={deleteTest} />
      ))}
      <Link passHref={true} href={"/test/[id]"} as={`/test/new`}>
        <Button
          className={classes.button}
          color={"primary"}
          endIcon={<CreateIcon />}
          fullWidth
        >
          Создать новый тест
        </Button>
      </Link>
    </div>
  );
};

Index.getLayout = page => <IndexLayout>{page}</IndexLayout>;

const mapStateToProps = state => {
  return {
    tests: state.reducer.tests
  };
};

export default connect(mapStateToProps, { getTests, deleteTest })(Index);
