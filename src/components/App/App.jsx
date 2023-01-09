import React, { Component } from 'react';

import CardList from '../CardList/CardList';
export default class App extends Component {
  render() {
    return (
      <>
        <div>
          <div className="">
            <CardList />
          </div>
          <div>Hello</div>
        </div>
      </>
    );
  }
}
