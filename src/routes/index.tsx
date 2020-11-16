import * as React from 'react';
import { EuiButton, EuiEmptyPrompt, EuiErrorBoundary } from '@elastic/eui';
import { Helmet } from 'react-helmet';
import { getTheme, Theme, themeConfig } from '../lib/theme';
import { ReactElement } from 'react';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Chrome from '../components/chrome';
import Login from './login';
import Ext from './ext';
import ExtForm from './ext/form';
import ExtList from './ext/list';

export interface IAppProps {
  children?: any;
}

const pathPrefix = process.env.PUBLIC_URL;

function themeLink(theme: Theme): ReactElement {
  let disabledProps = {};

  if (theme.id !== getTheme()) {
    disabledProps = {
      disabled: true,
      'aria-disabled': true,
    };
  }
  return (
    <link
      rel="stylesheet"
      href={`${pathPrefix}/${theme.publicPath}`}
      data-name="eui-theme"
      data-theme-name={theme.name}
      data-theme={theme.id}
      key={theme.id}
      {...disabledProps}
    />
  );
}

function NoMatch() {
  // let location = useLocation();

  return (
    <EuiEmptyPrompt
      iconType="editorStrike"
      title={<h2>Ack! There&apos;s nothing here.</h2>}
      body={
        <React.Fragment>
          <p>You found a page that doesn&apos;t exist.</p>
        </React.Fragment>
      }
      actions={
        <Link to="/">
          <EuiButton color="primary" fill>
            Go Home
          </EuiButton>
        </Link>
      }
    />
  );
}

export default function App(props: IAppProps) {
  // const location = useLocation();
  const loggedIn = true;
  return (
    <>
      <Helmet>
        {themeConfig.availableThemes.map(each => themeLink(each))}
      </Helmet>
      <EuiErrorBoundary>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/ext" /> : <Redirect to="/login" />}
          </Route>
          <Route exact={true} path="/login" component={Login} />
          <Chrome>
            <Switch>
              <Route exact={true} path="/ext" component={Ext} />
              <Route path="/ext/list" component={ExtList} />
              <Route path="/ext/form" component={ExtForm} />
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Chrome>
        </Switch>
      </EuiErrorBoundary>
    </>
  );
}
