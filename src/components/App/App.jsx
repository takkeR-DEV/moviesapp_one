/*
2. Сделать отображение тегов
3. Сделать переключение Search Rated
4.Пофиксить текст,название и круг рейтинга
5.Сделать Ретинг звездочек

*/
/* eslint-disable */
import React, { Component } from 'react';
import { debounce } from 'lodash';

import Header from '../Header/Header';
import Search from '../Search/Search';
import MovieList from '../MovieList/MovieList';
import MoviesApi from '../../service/Movies';

import './App.scss';

export default class App extends Component {
  api = new MoviesApi('809a67e0d0a61d8139c5fb080216f70d');

  state = {
    moviesData: [],
    moviesRateData: [],
    loading: null,
    error: false,
    result: false,
    pageNumber: 1,
    page: 1,
    value: '',
    active: 'search',
    update: false,
    pageVote: 1,
    allPageVote: 1,
    voteRes: 0,
  };
  async componentDidMount() {
    await this.api.getSession();
    const data = await this.api.getRatedMovies();
    this.setState(() => {
      return { moviesRateData: data.results, allPageVote: data.total_pages, pageVote: data.page };
    });
  }
  async componentDidUpdate() {
    const { update } = this.state;
    if (update) {
      const data = await this.api.getRatedMovies();
      this.setState(() => {
        return { moviesRateData: data.results, update: false };
      });
    }
  }
  onChangeVote = (id, vote) => {
    console.log(this.state.moviesData);
    this.api.postMoviesRate(vote, id).then((el) => {
      if (el.success) {
        this.setState({ update: true });
      }
    });
  };
  searchDeb = debounce(
    (event) => {
      this.onChangeInputSearchMovies(event);
    },
    1000,
    {
      maxWait: Infinity,
    }
  );
  onActive = (e) => {
    this.setState({ active: e });
  };
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  changeStateValue = (value) => {
    console.log(value);
    this.setState({
      value: value,
    });
  };

  changeStatePage = (value) => {
    this.setState(
      {
        page: value,
      },
      () => {
        if (value) {
          this.setState(
            {
              loading: true,
              error: false,
              result: false,
            },
            () => {
              this.api
                .getSerchMovies(this.state.value, this.state.page)
                .then((el) => {
                  this.setState(() => {
                    const newData = [...el.results];
                    let res = null;
                    newData.length === 0 ? (res = true) : (res = false);
                    return {
                      moviesData: newData,
                      pageNumber: el.total_pages,
                      loading: false,
                      result: res,
                    };
                  });
                })
                .catch(this.onError);
            }
          );
        }
      }
    );
  };
  onChangeInputSearchMovies = (event) => {
    if (!event.target.value) {
      this.setState({
        moviesData: [],
      });
    }
    if (event.target.value) {
      this.setState(
        {
          page: 1,
          loading: true,
          error: false,
          result: false,
        },
        () => {
          this.api
            .getSerchMovies(event.target.value, this.state.page)
            .then((el) => {
              console.log(el);
              this.setState(() => {
                const newData = [...el.results];
                let res = null;
                newData.length === 0 ? (res = true) : (res = false);
                return {
                  moviesData: newData,
                  pageNumber: el.total_pages,
                  loading: false,
                  result: res,
                };
              });
            })
            .catch(this.onError);
        }
      );
    }
  };

  render() {
    const { moviesData, loading, error, result, pageNumber, page, active, moviesRateData, allPageVote } = this.state;
    return (
      <main className="wrapper">
        <Header setActive={this.onActive} active={active} />
        {active === 'search' ? (
          <Search searchDeb={this.searchDeb} changeStateValue={this.changeStateValue} active={active} />
        ) : null}
        <MovieList
          page={page}
          moviesData={active === 'search' ? moviesData : moviesRateData}
          loading={loading}
          error={error}
          result={result}
          pageNumber={active === 'search' ? pageNumber : allPageVote}
          changeStatePage={this.changeStatePage}
          onChangeVote={this.onChangeVote}
        />
      </main>
    );
  }
}
