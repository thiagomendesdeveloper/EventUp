import React, { useState } from 'react';
import { Container, Alert, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../config';

export const CadastrarAnuncio = () => {

    const [anuncio, setAnuncio] = useState({
        titulo: "",
        descricao: ""
    })

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        mensagem: ''
    });

    const valorInput = e => setAnuncio({...anuncio, [e.target.name]: e.target.value });

    const cadAnunco = async e => {
        e.preventDefault();
        // console.log(anuncio);

        setStatus({
            formSave: true,
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/cadastrar", anuncio, { headers })
        .then((response) => {
            // console.log(response.data);
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
        .catch(() => {
            setStatus({
                formSave: false,
                type: 'error',
                mensagem: 'Erro: tente mais tarde!'
            });
            // console.log("erro tente mais tarde");
        })
    }

    return (
        <div>
            <Container>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h1>Cadastrar Anúncios</h1>
                </div>
                <div className="p-2">
                    <Link to="/" className="btn btn-outline-info btn-sm">Listar</Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.mensagem}</Alert> : ""}

            <Form onSubmit={cadAnunco}>
                <FormGroup>
                    <Label>Título</Label>
                    <Input type="text" name="titulo" placeholder="titulo do anuncio" onChange={valorInput}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" placeholder="descricão do anuncio" onChange={valorInput}></Input>
                </FormGroup>

                {/* <Button type="submit" outline color="success">Cadastrar</Button> */}
            
                {status.formSave ? <Button type="submit" outline color="danger" disabled>Salvando...
                <Spinner size="sm" color="danger" /> </Button> :<Button type="submit" outline color="success">Cadastrar</Button>}
            
            </Form>
            </Container>
        </div>
    );
};