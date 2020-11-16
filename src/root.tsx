import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import euiDarkVars from '@elastic/eui/dist/eui_theme_dark.json';
import euiLightVars from '@elastic/eui/dist/eui_theme_light.json';
import Routes from './routes';

export interface IRootProps {}

export default function Root(props: IRootProps) {
  return (
    <ThemeProvider
      theme={() => ({
        eui: euiLightVars,
        darkMode: false,
      })}
    >
      <Router>
        <Switch>
          <Route path="/" component={Routes} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
