import React from 'react';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (start: number, stop: number, step: number) => (Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step))).map(String);

type PropsPaginacion = {
    totalRecords: number,
    pageLimit: number,
    pageNeighbours: number,
    onChange: any
}

type StatePagination = {
    currentPage: number
}

export default class Pagination extends React.Component<PropsPaginacion, StatePagination> {
    private totalPages : number;
    public static defaultProps = {
        pageLimit: 30,
        pageNeighbours: 0
    };

    constructor(props: PropsPaginacion) {
        super(props);
        this.totalPages = Math.ceil(this.props.totalRecords / this.props.pageLimit);
        this.state = { currentPage: 1 };
    }

    componentDidMount() {
        this.gotoPage(1);
    }

    gotoPage(page: number) {
        let currentPage = Math.max(0, Math.min(page, this.totalPages))
        const data = {
            currentPage: currentPage
        }
        this.setState({ currentPage }, () => this.props.onChange(data));
    }

    handleClick(page: string, evt: any){
        evt.preventDefault();
        this.gotoPage(parseInt(page));
    }

    handleMoveLeft(evt: any){
        evt.preventDefault();
        this.gotoPage(this.state.currentPage - (this.props.pageNeighbours * 2) - 1);
    }

    handleMoveRight(evt: any){
        evt.preventDefault();
        this.gotoPage(this.state.currentPage + (this.props.pageNeighbours * 2) + 1);
    }

    fetchPageNumbers(){

        const totalNumbers = this.props.pageNeighbours * 2 +3;
        const totalBlocks = totalNumbers + 2;

        if (this.totalPages > totalBlocks) {
            const startPage = Math.max(2, this.state.currentPage - this.props.pageNeighbours);
            const endPage = Math.min(this.totalPages - 1, this.state.currentPage + this.props.pageNeighbours);
            let pages = range(startPage, endPage, 1);

            const hasLeftSpill  = startPage > 2;
            const hasRightSpill = (this.totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1,1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset,1);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return ["1", ...pages, this.totalPages.toString()];
        }

        return range(1, this.totalPages, 1).map(String);
    }

    render() {
        if (!this.props.totalRecords || this.totalPages === 1) return null;
        const pages = this.fetchPageNumbers();

        return (
            <React.Fragment>
                <nav aria-label="Paginacion de videojuegos">
                    <ul className="pagination">
                        { pages.map((page, index) => {

                            if (page === LEFT_PAGE) return (
                                <li key={index} className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous" onClick={(e) =>this.handleMoveLeft(e)}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                            );

                            if (page === RIGHT_PAGE) return (
                                <li key={index} className="page-item">
                                    <a className="page-link" href="#" aria-label="Next" onClick={(e) => this.handleMoveRight(e)}>
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            );

                            return (
                                <li key={index} className={`page-item${ this.state.currentPage === parseInt(page) ? ' active' : ''}`}>
                                    <a className="page-link" href="#" onClick={ (e) => this.handleClick(page, e) }>{ page }</a>
                                </li>
                            );

                        }) }
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}
