import React from 'react';

import Pagination from "./Pagination";
import VideojuegoCard from "./VideojuegoCard";

type PropsAppPagination = {
    url: string
}

type StateVideojuegos = {
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
        this.state = {
            totalVideojuegos: 0,
            currentVideojuegos: [],
            currentPage: 0,
            totalPages: 0,
            isLoaded: false,
            error: null
        };
    }

    componentDidMount() {
        fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    let lista = result.results;
                    let metadataI = result;
                    delete metadataI['results']
                    this.setState({
                        currentVideojuegos: lista,
                        currentPage: 1,
                        totalVideojuegos: metadataI['count'],
                        totalPages: Math.ceil(metadataI['count'] / 30),
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

    onPageChanged(data: any) {
        this.setState({isLoaded: false})
        let newUrl = "https://api.rawg.io/api/games?limit=30&page=" + data['currentPage'].toString() + "&page_size=30&search=assasin";
        fetch(newUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    let lista = result.results;
                    this.setState({
                        currentVideojuegos: lista,
                        currentPage: data['currentPage'],
                        isLoaded: true,
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
        }else {
            if (this.state.currentVideojuegos.length === 0) {
                return (
                    <div>
                        <h1>No hay videojuegos</h1>
                    </div>)
            } else {
                let a = (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-8 offset-2">
                                <div
                                    className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2>
                                            <strong
                                                className="text-secondary">{this.state.totalVideojuegos}</strong> Videojuegos
                                        </h2>

                                        {this.state.currentPage && (
                                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{this.state.currentPage}</span> / <span
                                                className="font-weight-bold">{this.state.totalPages}</span>
                </span>
                                        )}

                                    </div>

                                    <div className="d-flex flex-row py-4 align-items-center">
                                        <Pagination totalRecords={this.state.totalVideojuegos} pageLimit={30}
                                                    pageNeighbours={1}
                                                    onChange={this.onPageChanged}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="card-deck">
                                        {!this.state.isLoaded && <h2>Cargando...</h2>}
                                        {this.state.isLoaded && this.state.currentVideojuegos.map((v, index) => <VideojuegoCard
                                            urlImage={v['background_image']}
                                            nombre={v['name']}
                                            fechaSalida={v['released']}
                                            id={v['id']} key={index}/>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                return a;
            }
        }
    }

}