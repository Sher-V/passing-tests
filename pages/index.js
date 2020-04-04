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
import IndexLayout from "../layouts/IndexLayout";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { TestCard } from "../components/TestCard/TestCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

let Index = ({ loading, error, tests, getTests, deleteTest }) => {
  useEffect(() => {
    getTests();
  }, []);

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <Alert severity="error">
        <AlertTitle>Ошибка</AlertTitle>
        Что-то пошло не так...
      </Alert>
    );

  return (
    <React.Fragment>
      {tests.map((test, index) => (
        <TestCard key={index} test={test} deleteTest={deleteTest} />
      ))}
      <Link passHref={true} href={"/test/[id]"} as={`/test/new`}>
        <Button color={"primary"} endIcon={<CreateIcon />} fullWidth>
          Создать новый тест
        </Button>
      </Link>
    </React.Fragment>
  );
};

Index.getLayout = page => <IndexLayout>{page}</IndexLayout>;

const mapStateToProps = state => {
  return {
    tests: state.reducer.tests,
    error: state.reducer.error,
    loading: state.reducer.loading
  };
};

export default connect(mapStateToProps, { getTests, deleteTest })(Index);
