import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TestForm from "../../components/Form/TestForm";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import {
  createTest,
  getTest,
  resetTest,
  updateTest
} from "../../redux/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const Test = ({
  initialValues,
  getTest,
  resetTest,
  createTest,
  updateTest,
  loading,
  created,
  error
}) => {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (created) {
      resetTest();
      router.push("/");
    } else if (!isNaN(id)) getTest(id);
    else resetTest();
  }, [created]);

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <Alert severity="error">
        <AlertTitle>Ошибка</AlertTitle>
        Что-то пошло не так...
      </Alert>
    );

  return (
    <TestForm
      initialValues={initialValues}
      saveTest={(id === "new" && createTest) || updateTest}
      id={id}
    />
  );
};

Test.getLayout = page => (
  <Container maxWidth={"md"}>
    <Grid container justify={"center"}>
      {page}
    </Grid>
  </Container>
);

export default connect(
  state => ({
    initialValues: state.testReducer.test,
    created: state.testReducer.created,
    loading: state.testReducer.loading,
    error: state.testReducer.error
  }),
  { getTest, resetTest, createTest, updateTest }
)(Test);
