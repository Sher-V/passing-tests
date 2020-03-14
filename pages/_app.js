import withRedux from "next-redux-wrapper";
import makeStore from "../redux/store";
import { Provider } from "react-redux";
import React from "react";
import App from "next/app";
import withReduxSaga from "next-redux-saga";
import { getTests } from "../redux/actions";
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider } from "@material-ui/core";
import getMuiTheme from "material-ui/styles/getMuiTheme";

function MyApp({ Component, pageProps, store }) {
  const getLayout = Component.getLayout || (page => page);

  return (
    <Provider store={store}>{getLayout(<div><Component {...pageProps} /></div>)}</Provider>
  );
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withRedux(makeStore)(withReduxSaga(MyApp));
