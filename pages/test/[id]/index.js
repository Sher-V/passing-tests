import TestForm from "../../../components/Form/TestForm";
import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import {
  saveTest,
  getTest,
  resetTest,
  createTest,
  updateTest
} from "../../../redux/actions";
import NewTestForm from "../../../components/NewForm/NewTestForm";

const Test = ({
  initialValues,
  getTest,
  resetTest,
  createTest,
  updateTest,
  created
}) => {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!isNaN(id)) getTest(id);
    else resetTest();
  }, []);

  if (created) router.push("/");

  return (
    <NewTestForm
      initialValues={initialValues}
      saveTest={(id === "new" && createTest) || updateTest}
      id={id}
    />
  );
};

Test.getLayout = page => <Container maxWidth={"md"}>{page}</Container>;

export default connect(
  state => ({
    initialValues: state.testReducer.test,
    created: state.testReducer.created
  }),
  { getTest, resetTest, createTest, updateTest }
)(Test);
