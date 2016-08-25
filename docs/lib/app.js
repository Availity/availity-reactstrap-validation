import 'bootstrap-css';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, RouterContext, match, browserHistory, createMemoryHistory } from 'react-router';
import routes from './routes';
import Helmet from 'react-helmet';

// Client render (optional):
if (typeof document !== 'undefined') {
  const outlet = document.getElementById('app');
  ReactDOM.render(<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routes} />, outlet)
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    var url;
    const relative = location.pathname.split('/').filter(url => url).map(url => '../').join('');
    console.log(location.pathname, relative);
    if (redirectLocation && redirectLocation.pathname) {
      url = redirectLocation.pathname;
      callback(null, `<!DOCTYPE html>
      <html>
      <head><link rel="canonical" href="${relative}${url}"/>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <meta http-equiv="refresh" content="0;url=${relative}${url}" />
      </head>
      </html>`);
    }
    const body = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
    const head = Helmet.rewind();
    let markup = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          ${head.title.toString()}
          ${head.meta.toString()}
          <link rel=icon href="${relative}/assets/favicon.ico">
          <link rel="stylesheet" href="${relative}assets/style.css"/>
          <link rel="stylesheet" href="${relative}assets/docs.css"/>
        </head>
        <body>
          <div id="app">${body}</div>
          <script src="${relative}assets/prism.js" data-manual></script>
          <script src="${relative}bundle.js"></script>
        </body>
      </html>`;
    callback(null, markup);
  });
};
