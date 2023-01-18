import React, { Component } from 'react';
import { Input } from 'antd';
import './Search.scss';
export default class Search extends Component {
  state = {
    inputValue: '',
  };

  changeInput = (event) => {
    this.setState({ inputValue: event.target.value });
    this.props.changeStateValue(event.target.value);
    this.props.searchDeb(event);
  };
  render() {
    return (
      <div className="search">
        <Input
          value={this.state.inputValue}
          className="search__input"
          onChange={this.changeInput}
          placeholder="Введите название фильма"
          autoFocus
          required
        />
      </div>
    );
  }
}
