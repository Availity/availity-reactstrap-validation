import 'bootstrap-css';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createHistory } from 'history';
import { Router, RouterContext, match, useRouterHistory } from 'react-router';
import routes from './routes';
import Helmet from 'react-helmet';

// Client render (optional):
if (typeof document !== 'undefined') {
  const history = useRouterHistory(createHistory)({ basename: window.basename });
  const outlet = document.getElementById('app');
  const gotoTop = () => window.scrollTo(0, 0);
  ReactDOM.render(<Router onUpdate={gotoTop} history={history} routes={routes} />, outlet);
}

// Exported static site renderer:
export default (locals, callback) => {
  const basename = locals.basename.substr(0, locals.basename.length - 1);
  match({ routes, location: locals.path, basename }, (error, redirectLocation, renderProps) => {

    if (redirectLocation && redirectLocation.pathname) {
      const url = redirectLocation.pathname;
      callback(null, `<!DOCTYPE html>
        <html lang="en">
        <head>
          <link rel="canonical" href="${basename}${url}" />
          <meta http-equiv="content-type" content="text/html; charset=utf-8" />
          <meta http-equiv="refresh" content="0;url=${basename}${url}" />
        </head>
        </html>`);
    }

    const body = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
    const head = Helmet.rewind();
    callback(null, `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta charset="utf-8" />
        ${head.title.toString()}
        ${head.meta.toString()}
        <link rel="shortcut icon" href="${basename}/assets/favicon.ico" />
        <link rel="stylesheet" href="${basename}/assets/style.css" />
        <link rel="stylesheet" href="${basename}/assets/docs.css" />
      </head>
      <body>
        <div id="app">${body}</div>
        <script src="${basename}/assets/prism.js" data-manual></script>
        <script>window.basename = '${basename}';</script>
        <script src="${basename}/bundle.js"></script>
      </body>
      </html>`);
  });
};
