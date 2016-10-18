import * as React from 'react';
import { connect } from 'react-redux';

class Root extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className="Root">
        <link rel="stylesheet" href={`file://${__dirname}/root.css`} />

        <h1>Hello World</h1>

      </div>
    );
  }
}

export default connect()(Root);
