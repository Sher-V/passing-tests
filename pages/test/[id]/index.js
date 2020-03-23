import TestForm from "../../../components/Form/TestForm";
import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getTest, resetTest } from "../../../redux/actions";

const Test = ({ getTest, resetTest }) => {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!isNaN(id)) getTest(id);
    else resetTest();
  }, []);

  return <TestForm id={id} />;
};

Test.getLayout = page => <Container maxWidth={"md"}>{page}</Container>;

export default connect(null, { getTest, resetTest })(Test);
