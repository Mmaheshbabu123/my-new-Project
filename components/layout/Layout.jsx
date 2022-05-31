import Head from "next/head";
import { useState } from "react";
import Header from './Header/Header';
import Breadcrum from './Header/Breadcrum';


// Component imports remain the same

// Style objects already defined
const requiredField = {
  firstName: false,
  lastName: false
}

export const Layout = props => {
  
  return(
    <div className="container-fluid p-0 pb-5 full-header-sticky">

      <Head>
        <html lang="nl" />
        <meta name="robots" content="noindex" />
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <a href="#main-content" className="visually-hidden focusable skip-link">
          Overslaan en naar de inhoud gaan
        </a>
      </Head>
      <header className="header-sticky-position position-sticky">
        <Header />
        <Breadcrum breadcrum={props.breadcrum} />
      </header>
      <main role="main">
        <div className="visually-hidden"><a id="main-content" tabIndex="-1"></a></div>
        <div className="container-fluid px-5 py-3">
          {props.children}
        </div>
      </main>
    </div>
  );
};


export default Layout;