import React, { Component } from 'react';
import { Spin, Alert, Pagination } from 'antd';

import MovieCard from '../MovieCard/MovieCard';

import './MovieList.scss';
export default class MovieList extends Component {
  state = {
    page: 1,
    value: 3,
  };

  onChangePagination = (page) => {
    this.setState({ page: page });
    this.props.changeStatePage(page);
  };
  // findVote = (id) => {
  //   const { voteSaveSearch } = this.props;
  //   const data = voteSaveSearch.find((el) => el.id === id);
  //   console.log(data);
  //   return data.rating;
  // };
  render() {
    const { moviesData, loading, error, result, pageNumber, page, onChangeVote } = this.props;
    let pagination =
      !!moviesData.length && !loading && !error ? (
        <Pagination
          className="pagination"
          current={page}
          total={pageNumber}
          defaultPageSize={1}
          showSizeChanger={false}
          onChange={this.onChangePagination}
        />
      ) : null;
    let resultMessage = result ? (
      <Alert
        type="error"
        message="The movies was not found for this request"
        showIcon="true"
        className="movielist__error"
      />
    ) : null;

    return (
      <div>
        <div className="movielist">
          {resultMessage}
          {!error ? (
            loading ? (
              <Spin size="large" className="movielist__spin" />
            ) : (
              moviesData.map((data) => {
                return (
                  <MovieCard
                    key={data.id}
                    id={data.id}
                    loading={loading}
                    title={data.original_title}
                    logo={data.poster_path}
                    overview={data.overview}
                    voteAverage={data.vote_average}
                    date={data.release_date}
                    genre={data.genre_ids}
                    onChangeVote={onChangeVote}
                    vote={data.rating}
                  />
                );
              })
            )
          ) : (
            <Alert type="error" message="Connection refused" showIcon="true" className="movielist__error" />
          )}
        </div>
        <div className="pagination">{pagination}</div>
      </div>
    );
  }
}
