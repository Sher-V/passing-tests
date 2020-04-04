import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

export default ({ children }) => (
  <Container maxWidth={"md"}>
    <Grid container direction={"column"} alignItems={"center"} style={{flex: 1}}>
      {children}
    </Grid>
  </Container>
);
