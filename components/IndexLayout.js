import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

export default ({ children }) => (
  <Container>
    <Grid container direction={"column"}>
      {children}
    </Grid>
  </Container>
);
