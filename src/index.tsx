import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import * as serviceWorker from './serviceWorker';
import AppPagination from "./tsx/AppPagination";

ReactDOM.render(
  <React.StrictMode>
    <AppPagination url={"https://api.rawg.io/api/games?limit=30&page=1&page_size=30&search=assasin"}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
