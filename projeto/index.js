console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

const readline = require('readline-sync')
const db = require('./database')
const { produtos } = require('./database')

//Listar no console uma tabela contendo os produtos em ordem crescente de preço (do menor ao maior)
produtos.sort(function (a, b) {
    return a.preco - b.preco
})
console.table(produtos)
console.log('--------------------------------------')

const array = new Array() //irá lista o novo pedido

//depois do NÂO ---- cria a classe pedido e trás as informações dentro da tabela  da compra.
class Pedido {
    constructor(array) {
        this.listaProdutos = array
        this.valorCupom = 0
        this.dataPedido = new Date()
    }
    calcSubtotal() {
        //Total da compra - //- Calcular o valor do subtotal (sem considerar o desconto)        
        this.valorCupom = this.listaProdutos.reduce((acumulador, item) => acumulador + (item.preco * item.qtdeProduto), 0);
        parseInt(this.valorCupom)
    }
    datePedido(){
        const op = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        this.dataPedido = this.dataPedido.toLocaleDateString('pt-BR', op)
    }
    
}
//Receber via terminal as entradas de `id` e `quantidade` dos produtos a serem adquiridos.
//Create function compra()
function compra() {
    const idProduto   = parseInt(readline.question('Digite o ID do produto: ')) 
    const qtdeProduto = parseInt(readline.question("Digite a quantidade do produto desejado: "))
    
    const procurar = produto => produto.id === idProduto
    const produtoEncontrado = produtos.find(procurar)

    //VALIDANDO
    if (!idProduto) {
        console.log("Error - Produto não encontrado")        
    }else{
        const prodPedido = { ...produtoEncontrado, qtde: qtdeProduto}
        array.push(prodPedido) //atribuindo numa nova lista os pedidos
    } 
    
    //Verificando uma nova compra
    const novaCompra = readline.question("Deseja continuar comprando, S ou N: ")
    if (novaCompra === 'S') {
        return compra()
        return procurar() 

    } else if (novaCompra === 'N') {
        // calcular o desconto fora do IF
        //Perguntar se a cliente possue cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto        
        const cupdesconto = readline.question("Possui cupom de desconto? Digite o valor : ")
        if (cupdesconto > 0 && cupdesconto >= 15) {
            console.log('Cupom inválido!')
        } else { 
                      
            console.log("Cupom Valido!")            
        }
        return 'Compra Finalizada!!'
    }
}
compra()

const pedido = new Pedido(array)
console.table(pedido.listaProdutos)


//Trazendo a data - Exemplo: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
pedido.datePedido()
console.log(`Pedido realizado em : ${pedido.dataPedido}`)


console.log('-----------------TOTAIS FINAIS DA COMPRA-----------------')

//Subtotal - 
pedido.calcSubtotal()
console.log(`O SubTotal da sua compra é ${pedido.valorCupom.toFixed(2)}`)

//valor do cupom
console.log('Cupom informado: ' + parseInt(compra.cupdesconto))

//Desconto
const desconto = parseInt(pedido.calcSubtotal * (compra.cupdesconto/ 100))
console.log(`Valor do desconto é ${desconto.toFixed(2)}`)

//Total da Compra
const totaldaCompra = parseInt(pedido.calcSubtotal - desconto)
console.log(`Valor total da sua compra é ${totaldaCompra.toFixed(2)}`)






