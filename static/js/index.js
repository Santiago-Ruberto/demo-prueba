import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material';
import GA4React from "ga-4-react";
import Cookies from 'js-cookie';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";




function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}
Cookies.set("trackId", makeid(12));

const GATrackId = "G-0NY3CS1TML"
let ga4react;
let ga4Global;

if (!GA4React.isInitialized() && GATrackId && process.env.NODE_ENV !== 'local') {
  ga4react = new GA4React(GATrackId);

  ga4react.initialize().then(
    (ga4) => {
      ga4Global = ga4
      ga4.pageview(window.location.pathname);
    },
    (err) => {
      console.error(err);
    }
  );
}
//console.log(process.env.NODE_ENV, 'aca')
const eventTrackGA = (category, action, label) => {
  if (process.env.NODE_ENV !== 'development') {
    if (ga4Global) {
      ga4Global.event(action, label, category)
    }
  }
}

/*if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: "https://0ff4bc9c4a944f26b1c1ab80b612217f@o972761.ingest.sentry.io/6582003",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.1,
  });
}*/

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App eventTrackGA={eventTrackGA} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
