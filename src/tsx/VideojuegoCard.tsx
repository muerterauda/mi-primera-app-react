import * as React from "react";
import '../css/VideojuegoCard.css'

type PropsCardVideojuego = {
    urlImage: string,
    nombre: string,
    id: number,
    fechaSalida: Date
}

export default class VideojuegoCard extends React.Component<PropsCardVideojuego> {
    render(){
        return(
            <div className="mt-2">
                <div className="card wcard">
                    <img className="card-img-top" height="160"
                         src={this.props.urlImage}
                         alt={"Portada del videojuego "+this.props.nombre}/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.nombre}</h5>
                        <p className="card-text">Fecha de salida: {this.props.fechaSalida.toLocaleDateString()}</p>
                        <a href="#" className="btn btn-primary">Enlace al juego</a>
                    </div>
                </div>
            </div>
        );
    }
}