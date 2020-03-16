import withRedux from "next-redux-wrapper";
import makeStore from "../redux/store";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import App from "next/app";
import withReduxSaga from "next-redux-saga";

function MyApp({ Component, pageProps, store }) {
  const getLayout = Component.getLayout || (page => page);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      {getLayout(
        <div>
          <Component {...pageProps} />
        </div>
      )}
    </Provider>
  );
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withRedux(makeStore)(withReduxSaga(MyApp));
