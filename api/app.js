const express = require("express");
const cors = require("cors");
const upload = require('./middlewares/uploadimgAnuncio');
const fs = require('fs');
const path = require('path');
const Anuncio = require("./models/Anuncio");
const app = express();

//const db = require('./models/db');

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, "public", "upload")))

app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-type, Authorization");
    app.use(cors());
    next();
})

app.get('/', async (req, res) => { 
    await Anuncio.findAll({order: [['id', 'DESC']]}).then
    (function(anuncios){
        res.json({ anuncios });
    })
})

app.get('/visualizar/:id', async (req, res) => {
    // res.send("ID: "+req.params.id);
    await Anuncio.findByPk(req.params.id)
    .then(anuncio => {
        if(anuncio.imagem){
            var endImagem = "http://localhost:8080/files/anuncios/" + anuncio.imagem
        }else{
            var endImagem = "http://localhost:8080/files/anuncios/defaul-img.png"
        }

        return res.json({
            error:false,
            anuncio,
            endImagem
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "erro: anuncio não encontrado"
            })
        })
    })
    
});

app.post('/cadastrar', async (req,res) => {
    
    await sleep(3000);

    function sleep(ms){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };
    
    const resultCad = await Anuncio.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "anúncio cadastrado com sucesso"
        })
    }).catch(function(erro){
        res.send("erro Anuncio não cadastrado")
        return res.status(400).json({
            error:true,
            message: "erro: Anuncio não cadastrado"
        })
    });
})

app.put('/editar', async (req,res) => {

    await sleep(3000);

    function sleep(ms){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };

    await Anuncio.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "anuncio editado com sucesso"
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "erro: anuncio não editado"
            })
        })
    })
})

app.put('/editar-anuncio-img/:id',  upload.single('imagem'), async (req,res) => {
    
    await sleep(3000);

    function sleep(ms){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };
    
    if(req.file){
        await Anuncio.findByPk(req.params.id).then(anuncio => {
            console.log(anuncio.dataValues.imagem);
            const imgAntiga = "./public/upload/anuncios" + anuncio.dataValues.imagem;
            fs.access(imgAntiga, (err) => {
                if(!err){
                    fs.unlink(imgAntiga, () => {})
                }
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Anuncio não encontrado"
            });
        })

        await Anuncio.update({imagem: req.file.filename},{where: {id: req.params.id}})
        .then(function(){
            return res.json({
                error: false,
                message: "imagem do anúncio editado com sucesso!"
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "imagem do anúncio NÃO editado com sucesso!"
            });
        })
    }else{
        return res.status(400).json({
            error: true,
            message: "erro: selecione uma imagem valida!"
        });
    }
});

app.delete('/apagar/:id', async (req,res) => {
    await Anuncio.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "anuncio deletado com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message: "anuncio não deletado"
        })
    })
})

app.listen(8080, () => console.log("rodando"));