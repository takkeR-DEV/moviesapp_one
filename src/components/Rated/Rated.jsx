import { Rate } from 'antd';
import React, { Component } from 'react';

export default class Rated extends Component {
  state = {
    voteRate: 0,
  };
  render() {
    return <Rate />;
  }
}
