import React from 'react';

import Pagination from "./Pagination";
import VideojuegoCard from "./VideojuegoCard";
import '../css/AppPagination.css'

type PropsAppPagination = {
    url: string
}
//?limit=30&page=1&page_size=30&search=assasin
type StateVideojuegos = {
    limit: number,
    search: string,
    totalVideojuegos: number,
    currentVideojuegos: [],
    currentPage: number,
    totalPages: number
    isLoaded: boolean,
    error: any
}

export default class AppPagination extends React.Component<PropsAppPagination, StateVideojuegos> {

    constructor(props: PropsAppPagination) {
        super(props);
        this.onPageChanged = this.onPageChanged.bind(this)
        this.onInputSearch = this.onInputSearch.bind(this)
        this.state = {
            limit: 30,
            search: '',
            totalVideojuegos: 0,
            currentVideojuegos: [],
            currentPage: 0,
            totalPages: 0,
            isLoaded: false,
            error: null
        };
    }

    componentDidMount() {
        fetch(this.props.url + '?limit=' + this.state.limit.toString() + '&page=1&page_size=' + this.state.limit.toString() + '&search=' + this.state.search)
            .then(res => res.json())
            .then(
                (result) => {
                    let lista = result.results;
                    let count = result['count'];
                    if(typeof lista === 'undefined') lista = []
                    if(typeof count === 'undefined') count = 0
                    this.setState({
                        currentVideojuegos: lista,
                        currentPage: 1,
                        totalVideojuegos: count,
                        totalPages: Math.ceil(count / this.state.limit),
                        isLoaded: true,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    onInputSearch(e:any) {
        this.setState({
            currentVideojuegos: [],
            isLoaded: false,
            currentPage:0,
            totalVideojuegos:0,
            totalPages:0,
            search: e.target.value
        })
        this.componentDidMount();
    }

    onPageChanged(data: any) {
        this.setState({isLoaded: false})
        let newUrl = this.props.url + '?limit=' + this.state.limit.toString() + '&page=' + data['currentPage'].toString() + '&page_size=' + this.state.limit.toString() + '&search=' + this.state.search;
        fetch(newUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    let lista = result.results;
                    let count = result['count'];
                    if(typeof lista === 'undefined') lista = []
                    if(typeof count === 'undefined') count = 0
                    this.setState({
                        totalVideojuegos: count,
                        totalPages: Math.ceil(count / this.state.limit),
                        currentVideojuegos: lista,
                        currentPage: data['currentPage'],
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        currentVideojuegos: [],
                        error
                    });
                }
            )
    }

    render() {
        if (this.state.error) {
            return (<div>Error: {this.state.error.message}</div>)
        } else {
            if (this.state.currentVideojuegos.length === 0) {
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-8 offset-2">
                                <div
                                    className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <input className="form-control mr-sm-2 tam" type="search" placeholder="B&uacute;queda"
                                               aria-label="Search"  onChange={this.onInputSearch}/>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                        <h2><strong
                                            className="text-secondary">0</strong> Videojuegos
                                        </h2>

                                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  P&aacute;gina <span className="font-weight-bold">0</span> / <span
                                                className="font-weight-bold">0</span></span>
                                    </div>
                                </div>

                                <div className="row">
                                    <h1>No hay videojuegos</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-8 offset-2">
                                <div
                                    className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <input className="form-control mr-sm-2 tam" type="search" placeholder="B&uacute;queda"
                                               aria-label="Search" onChange={this.onInputSearch}/>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                        <h2><strong
                                            className="text-secondary">{this.state.totalVideojuegos}</strong> Videojuegos
                                        </h2>

                                        {this.state.currentPage && (
                                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  P&aacute;gina <span className="font-weight-bold">{this.state.currentPage}</span> / <span
                                                className="font-weight-bold">{this.state.totalPages}</span>
                </span>
                                        )}

                                    </div>

                                    <div className="d-flex flex-row py-4 align-items-center">
                                        <Pagination totalRecords={this.state.totalVideojuegos} pageLimit={this.state.limit}
                                                    pageNeighbours={1}
                                                    onChange={this.onPageChanged}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="card-deck">
                                        {!this.state.isLoaded && <h2>Cargando...</h2>}
                                        {this.state.isLoaded && this.state.currentVideojuegos.map((v, index) =>
                                            <VideojuegoCard
                                                urlImage={v['background_image']}
                                                nombre={v['name']}
                                                fechaSalida={v['released']}
                                                id={v['id']} key={index}/>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

}