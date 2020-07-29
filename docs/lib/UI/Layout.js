import React from 'react';
import Helmet from 'react-helmet';
import Footer from './Footer';
import Nav from './Nav';

export default ({ children }) => (
  <div className="wrapper">
    <Helmet
      titleTemplate="Availity reactstrap Validation - %s"
      title="Form Validation for reactstrap"
      defaultTitle="Form Validation for reactstrap"
      meta={[
        { name: 'description', content: 'Availity reactstrap Validation - easy to use form validation for reactstrap' },
        { property: 'og:type', content: 'article' },
      ]}
    />
    <Nav />
    {children}
    <Footer />
  </div>
);
