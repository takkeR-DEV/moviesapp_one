import React, { Component } from 'react';
import { Card, Tag, Rate, Spin } from 'antd';
import { format } from 'date-fns';

import 'antd/dist/reset.css';
import './MovieCard.scss';

export default class MovieCard extends Component {
  state = {
    img: null,
    vote: 3,
  };

  render() {
    const { title, logo, overview, voteAverage, date, genre, onChangeVote, id, vote } = this.props;
    let color = voteAverage > 7 ? '#66E900' : voteAverage >= 5 ? '#E9D100' : voteAverage >= 3 ? '#E97E00' : '#E90000';
    if (!this.state.img) {
      let image = new Image();
      image.src = logo;
      image.onload = () => {
        this.setState({ img: true });
      };
    }
    const imageLoader = this.state.img ? <img src={logo} /> : <Spin className="spin" size="large" />;
    return (
      <Card className="card">
        <div className="card__image">{imageLoader}</div>
        <div className="card__all">
          <div className="card__info">
            <div className="header">
              <div className="header__title">
                <h5>{title}</h5>
              </div>
              <div className="header__rate" style={{ border: `2px solid ${color}` }}>
                <span>{voteAverage.toFixed(1)}</span>
              </div>
            </div>
            <p>{date ? format(new Date(date), 'MMMM d, yyyy') : 'none'}</p>
            <div className="header__tags">
              {' '}
              {genre.map((el) => (
                <Tag key={el.id}>{el.name}</Tag>
              ))}
            </div>
          </div>
          <p className="card__text">{overview}</p>
          <Rate count={10} value={vote} allowHalf={true} onChange={onChangeVote.bind(this, id)} />
        </div>
      </Card>
    );
  }
}
