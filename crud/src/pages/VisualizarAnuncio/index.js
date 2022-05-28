import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {api} from '../../config';
import { Link } from 'react-router-dom';
import { Container, Alert } from 'reactstrap';

export const VisualizarAnuncio = (props) => {

    // console.log(props.match.params.id)

    const [data, setData] = useState([]);
    const [dataimg, setDataImg] = useState();

    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    // para criar a conecção com a API
    useEffect(() => {

        const getAnuncio = async () => {
            await axios.get(api + "/visualizar/" + id)
            .then((response) => {
                //console.log(response.data.anuncio);
                setData(response.data.anuncio);
                setDataImg(response.data.endImagem);
            })
            .catch(() => {
                setStatus({
                    type: "error",
                    mensagem: "erro tente mais tarde"
                })
                //console.log("erro tente mais tarde");
            })
        }

        getAnuncio();
    },[id])

    return(
            <div>
                <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>visualizar Evento</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/" className="btn btn-outline-info btn-sm mr-1">Listar</Link>
                        <Link to={"/editar-anuncio/" + data.id} className="btn btn-outline-warning btn-sm mr-1">Editar</Link>
                        <Link to={"/editar-anuncio-img/" + data.id} className="btn btn-outline-warning btn-sm mr-1">Editar Imagem</Link>
                    </div>
                </div>
                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ""}

                <dl className="row">
                    <dt className="col-sm-3">Imagem</dt>
                    <dd className="col-sm-9">{<img src={dataimg} alt="Imagem do Anuncio" width="150" height="150" />}</dd>
                
                    <dt className="col-sm-3">ID</dt>
                    <dd className="col-sm-9">{data.id}</dd>

                    <dt className="col-sm-3">Titulo</dt>
                    <dd className="col-sm-9">{data.titulo}</dd>

                    <dt className="col-sm-3">Descrição</dt>
                    <dd className="col-sm-9">{data.descricao}</dd>
                </dl>
                </Container>
            </div>
    );
};