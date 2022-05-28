import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Alert,  Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import {api} from '../../config';

export const EditarAnuncio = (props) => {

    console.log(props.match.params.id)

    const [id] = useState(props.match.params.id);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        mensagem: ''
    });

    const EditAnuncio = async e => {
        e.preventDefault();
        // console.log('editar'+ titulo);

        setStatus({
            formSave: true,
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.put(api + '/editar', {id, titulo, descricao}, { headers })
        .then((response) => {
            // console.log(response.data.error);
            // console.log(response.data.message);
            if(response.data.error){
                setStatus({
                    formSave: false,
                    type: 'error',
                    mensagem: response.data.message
                });
            }else{
                setStatus({
                    formSave: false,
                    type: 'success',
                    mensagem: response.data.message
                });
            }
        })
        .catch( () => {
            setStatus({
                formSave: false,
                type: 'error',
                mensagem: 'Erro: tente mais tarde!'
            });
        })
    }

    useEffect(() => {

        const getAnuncio = async () => {
            await axios.get(api + "/visualizar/" + id)
            .then((response) => {
                // console.log(response.data.anuncio);
                setTitulo(response.data.anuncio.titulo);
                setDescricao(response.data.anuncio.descricao);
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

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Editar Evento</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/" className="btn btn-outline-info btn-sm mr-1">Listar</Link>
                        <Link to={"/visualizar-anuncio/"+ id} className="btn btn-outline-primary btn-sm">Visualizar</Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.mensagem}</Alert> : ""}

                <Form onSubmit={EditAnuncio}>
                <FormGroup>
                    <Label>Título</Label>
                    <Input type="text" name="titulo" placeholder="titulo do anuncio" value={titulo} onChange={e => setTitulo(e.target.value)}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" placeholder="descricão do anuncio" value={descricao} onChange={e => setDescricao(e.target.value)}></Input>
                </FormGroup>

                {/* <Button type="submit" outline color="success">Cadastrar</Button> */}
            
                {status.formSave ? <Button type="submit" outline color="warning" disabled>Salvando...
                <Spinner size="sm" color="warning" /> </Button> :<Button type="submit" outline color="warning">Salvar</Button>}
            
            </Form>

            </Container>
        </div>
    )
}