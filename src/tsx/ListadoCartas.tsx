import * as React from "react";
import '../css/ListadoCartas.css'

type Props = {
    url: string;
}

type Data = {
    error: any,
    isLoaded: boolean,
    metadata: {},
    items: []
}



export default class ListadoCartas extends React.Component<Props, Data> {
    private listadoCartas: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            metadata: {},
            items: []
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
                        isLoaded: true,
                        items: lista,
                        metadata: metadataI
                    });
                },
                // Nota: es importante manejar errores aquí y no en
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, metadata, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let btns;
            // if(metadata["previous"] === null){
            //
            // }else{
            //
            // }
            return (
                <div className="container">
                    <div className="row">

                    </div>
                    <div className="row">
                    {items.map(item => (
                        <div className="col-3 mt-2">
                            <div className="card wcard">
                                <img className="card-img-top" height="160" src={item['background_image']} alt="Portada videojuego" />
                                <div className="card-body">
                                    <h5 className="card-title">{item['name']}</h5>
                                    <p className="card-text">{item['released']}</p>
                                    <a href="#" className="btn btn-primary">Link to game</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            );
        }
    }
}