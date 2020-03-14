import TestForm from "../../../components/Form/TestForm";
import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getTest } from "../../../redux/actions";

const Test = ({ getTest }) => {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!isNaN(id)) getTest(id);
  }, []);

  return <TestForm id={id}/>;
};

Test.getLayout = page => <Container maxWidth={"md"}>{page}</Container>;

export default connect(null, { getTest })(Test);
