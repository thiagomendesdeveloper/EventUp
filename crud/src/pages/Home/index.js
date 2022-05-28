import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Container, Table} from 'reactstrap';
import { Alert } from 'reactstrap';

import {api} from '../../config';
import { Link } from 'react-router-dom';

export const Home = () => {

    const [data,setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const getAnuncios = async () => {
        await axios.get(api)
        .then((respose) => {
            //console.log(respose);
            setData(respose.data.anuncios);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                mensagem: 'Erro: tente mais tarde'
            })
            //console.log("erro: tente mais tarde");
        })
    }

    useEffect( () => {
        getAnuncios();
    },[]);

    const apagarAnuncio = async (idAnuncio) => {
        //console.log(idAnuncio);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.delete(api + "/apagar/" + idAnuncio, { headers })
        .then((response) => {
            // console.log(response.data.error);
            if(response.data.erro){
                setStatus({
                    type: 'error',
                    mensagem: response.data.message
                });
                getAnuncios();
            }else{
                setStatus({
                    type: 'success',
                    mensagem: response.data.message
                });
            }
        })
        .catch(()=>{
            // console.log('erro ao apagar')
            setStatus({
                type: 'error',
                mensagem: 'erro ao apagar'
            });
        })
    }

    return(
        <div>
            <Container>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h1>Evento</h1>
                </div>
                <div className="p-2">
                    <Link to="/cadastrar-anuncio" className="btn btn-outline-success btn-sm">Cadastrar</Link>
                </div>
            </div>

            {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.mensagem}</Alert> : ""}
            
            <Table striped hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th className="text-center">Acões</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.titulo}</td>
                        <td className="text-center">
                            <Link to={"/visualizar-anuncio/"+ item.id} className="btn btn-outline-primary btn-sm mr-1">Visualizar</Link>
                            <Link to={"/editar-anuncio/"+ item.id} className="btn btn-outline-warning btn-sm mr-1">Editar</Link>
                            <span className="btn btn-outline-danger btn-sm mr-1" onClick={() => apagarAnuncio(item.id)}>Apagar</span>
                        </td>
                    </tr>
                ))}
            </tbody>

            </Table>
            </Container>
        </div>
    );
};