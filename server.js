// Configurando o servidor
const express = require("express")
const server = express()

// Configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//Habilitar body do formulário
server.use(express.urlencoded({ extended: true }))

// Configurar a conexao com banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

// Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, // Boleano (verdadeiro ou falso) / para nao armazenar cache
})



// Configurar apresentacao da página
server.get ("/", function(req, res) {
    const donors = []
    return res.render("index.html", { donors })
})

server.post ("/", function(req, res) {
    //Pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    // Se o nome for vazio
    // Se o email for vazio
    // Se blood for vazio
    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.")

    }})

    // Adicionando novos valores no Banco de dados
    const query = `
        INSERT INTO donors ("name", "email", "blood") 
        VALUES ($1, $2, $3)` 

    const values = [ name, email, blood ]

    db.query(query, values, function (err) {
        //Fluxo de erro  
        if (err) return res.send("Erro no banco de dados")
    
        // Fluxo ideal
    return res.redirect("/")
})

//Ligar o servidor e permitir acesso na porta 3000
server.listen(3000, function() {
    console.log("Iniciei o servidor")
})