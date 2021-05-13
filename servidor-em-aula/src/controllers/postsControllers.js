const postsJson = require("../models/posts.json")

const getAll = (request, response) => {
    response.status(200).json(postsJson)
}

const getById = (request, response) => {
    const idRequerido = request.params.id
    const postFiltrado = postsJson.find(posts => posts.id == idRequerido)
    response.status(200).send(postFiltrado)
}

const createPost = (request, response) => {
    let tituloRequerido = request.body.titulo
    let conteudoRequerido = request.body.conteudo
    let etiquetasRequeridas = request.body.etiquetas

    let newPost = {
        id: Math.random().toString(32).substr(2, 6),
        dataCriacao: new Date(),
        titulo: tituloRequerido,
        conteudo: conteudoRequerido,
        etiquetas: etiquetasRequeridas
    }

    postsJson.push(newPost)

    response.status(201).json([{
        "mensagem": "Novo post Criado",
        newPost
    }])
}

const replacePost = (request, response) => {
    const idRequerido = request.params.id
    const postBody = request.body
    const postFiltrado = postsJson.find(posts => posts.id == idRequerido)

    const indice = postsJson.indexOf(postFiltrado)

    //postAtualizado.id = idRequerido
    //postBody.dataCriacao = postFiltrado.dataCriacao

    postsJson.splice(indice, 1, postBody)

    let postAtualizado ={
        id: postFiltrado.id,
        dataCriacao = postFiltrado.dataCriacao,
        titulo: postBody.titulo,
        conteudo: postBody.conteudo,
        etiquetas: postBody.etiquetas
    }



    response.status(200).json([{
        "mensagem": "Seu post foi atualizado com sucesso",
        postAtualizado
    }])

}

const updateTitle = (request, response) => {
    const idRequerido = request.params.id
    let newTitle = request.body.titulo
    const postFiltrado = postsJson.find(posts => posts.id == idRequerido)

    postFiltrado.titulo = newTitle

    response.status(200).json([{
        "mensagem": "Titulo atualizado com sucesso",
        postFiltrado
    }])

}

const updateAnything = (request, response)=>{
    const idRequerido = request.params.id
    const atualizacaoBody = request.body
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    let listaDeChaves = Object.keys(atualizacaoBody)
    listaDeChaves.forEach((chave)=>{
        postFiltrado[chave] = atualizacaoBody[chave]
    })

    response.status(200).json([{
        "mensagem":"Post Atualizado com Sucesso",
        postFiltrado
    }])
}

const deletePost = (request, response) => {
    const idRequerido = request.params.id
    const postFiltrado = postsJson.find(posts => posts.id == idRequerido)

    const indice = postsJson.indexOf(postFiltrado)
    postsJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Seu post foi deletado com sucesso",
        postsJson
    }])
}

module.exports = {
    getAll,
    getById,
    createPost,
    replacePost,
    deletePost
}