import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withRedux from "next-redux-wrapper";
import fetch from "isomorphic-unfetch";
import Container from "@material-ui/core/Container";
import Link from "next/link";
import makeStore from "../redux/store";
import { connect } from "react-redux";
import { deleteTest, getTests, increment, setFOO } from "../redux/actions";
import { GET_TESTS } from "../redux/constants";
import IndexLayout from "../components/IndexLayout";

let Index = ({ tests, getTests, deleteTest }) => {
  useEffect(() => {
    getTests();
  }, []);
  return (
    <>
      {tests.map(test => (
        <Grid key={test.id} item>
          <Card>
            <CardContent>
              <Typography>{test.name}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => deleteTest(test.id)}>Delete test</Button>
              <Link passHref={true} href={"/test/[id]"} as={`/test/${test.id}`}>
                <a>Edit test</a>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Link passHref={true} href={"/test/[id]"} as={`/test/new`}>
        <Button>Create new test</Button>
      </Link>
    </>
  );
};

Index.getLayout = page => <IndexLayout>{page}</IndexLayout>;

const mapStateToProps = state => {
  return {
    tests: state.reducer.tests
  };
};

export default connect(mapStateToProps, { getTests, deleteTest })(Index);
