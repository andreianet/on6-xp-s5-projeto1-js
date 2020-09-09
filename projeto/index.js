console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

const readline = require('readline-sync')
const db = require('./database')
const { produtos } = require('./database')


//console.table(produtos)
//Listar no console uma tabela contendo os produtos em ordem crescente de preço (do menor ao maior)
produtos.sort(function (a,b) {
    return a.preco - b.preco
})
console.table(produtos)
console.log('--------------------------------------')


//Receber via terminal as entradas de `id` e `quantidade` dos produtos a serem adquiridos.
function compra(){
    const idProduto   = parseInt(readline.question("Digite o ID do produto: "))
    const qtdeProduto = parseInt(readline.question("Digite a quantidade do produto desejado: "))
    let novaCompra    = readline.question("Deseja continuar comprando, S ou N: ")


    if (novaCompra === 'S') {
        return compra()    
        //console.log(`${valorCompra}`)
    }else if (novaCompra === 'N') {
        // calcular o desconto
//Perguntar se a cliente possue cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto
        //const subTotal = 0
        let desconto    = parseInt(readline.question("Posui cupom de desconto: "))
        if (desconto >= 15) {
            console.log('Cupom inválido!')
        }else{
            console.log("Cupom valido!")
            //return (subTotal*desconto/100 `${subTotal}`).parseFloat()
            sTotal()
        }        
        return 'Compra Finalizada!!'
    }
}
console.log(compra())


//Total da compra - //- Calcular o valor do subtotal (sem considerar o desconto)
const subtotal = produtos.reduce(sTotal, 0);
function sTotal(total, produtos) {
    return (produtos.preco * qtdeProduto)
}
sTotal()
//const valorfinal []
//const valorfinal = (acumulador, produto) => + produto.preco

//Com total e desconto
function Total(){
    const valorCompra = parseFloat(sTotal * desconto/100).toFixed(2)
    return valorCompra
    //console.log(`${idProduto}`)
    //console.log(`${valorCompra}`)
}
console.log(Total())

