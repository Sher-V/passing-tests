import TestForm from "../../../components/Form/TestForm";
import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getTest, resetTest } from "../../../redux/actions";
import NewTestForm from "../../../components/NewForm/NewTestForm";

const Test = ({ initialValues, getTest, resetTest }) => {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!isNaN(id)) getTest(id);
    else resetTest();
  }, []);

  return <NewTestForm initialValues={initialValues} id={id} />;
};

Test.getLayout = page => <Container maxWidth={"md"}>{page}</Container>;

export default connect(
  state => ({
    initialValues: state.testReducer.test
  }),
  { getTest, resetTest }
)(Test);
