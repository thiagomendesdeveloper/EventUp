import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {api} from '../../config';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';

export const EditarAnuncioimg = (props) => {

    const [id] = useState(props.match.params.id);
    const [imagem, setImaagem] = useState('');
    const [EndImagem,setEndImagem] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        mensagem: ''
    });

    const editarAnuncioImg = async e => {
        e.preventDefault();

        setStatus({formSave: true});

        // console.log("editar a imagem")

        const formData = new FormData();
        formData.append('imagem', imagem);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.put(api + "/editar-anuncio-img/" + id , formData, {headers})
        .then((response) => {
            if(response.data.error){
                setStatus({
                    formSave: false,
                    type: "error",
                    mensagem: response.data.message
                })
            }else{
                setStatus({
                    formSave: false,
                    type: "success",
                    mensagem: response.data.message
                });
            }
        }).catch(() => {
            setStatus({
                formSave: false,
                type: "success",
                mensagem: 'erro: imagem do anuncio não editado com sucesso!'
            })
        })
    }

    useEffect(() => {

        const getAnuncio = async () => {
            await axios.get(api + "/visualizar/" + id)
            .then((response) => {
                // console.log(response.data.anuncio);
                setEndImagem(response.data.endImagem);
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
                        <h1>Editar Imagem do Anúncios</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/" className="btn btn-outline-info btn-sm mr-1">Listar</Link>
                        <Link to={"/visualizar-anuncio/"+ id} className="btn btn-outline-primary btn-sm">Visualizar</Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.mensagem}</Alert> : ""}

                <Form onSubmit={editarAnuncioImg}>
                    <FormGroup>
                        <Label>Imagem</Label>
                        <Input type="file" name="imagem" onChange={e => setImaagem(e.target.files[0])}/>
                    </FormGroup>

                    <FormGroup>
                        {imagem ? <img src={URL.createObjectURL(imagem)} alt="imagem do anuncio" width="150" height="150" /> : <img src={EndImagem} alt="imagem do anuncio" width="150" height="150" />}
                    </FormGroup>

                    {status.formSave ? <Button type="submit" outline color="warning" disabled>Salvando...
                    <Spinner size="sm" color="warning" /> </Button> :<Button type="submit" outline color="warning">Salvar</Button>}
                </Form>

            </Container>
        </div>
    )
  
};