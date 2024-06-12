
const getlocalstorage = () => JSON.parse(localStorage.getItem('db_tarefa')) ?? []
const setlocalstorage = (dbtarefa) => localStorage.setItem("db_tarefa", JSON.stringify(dbtarefa))

//CRUD - Delete
const deletar = (index) => {
    const dbtarefa = ledados()
    dbtarefa.splice(index,1)
    setlocalstorage(dbtarefa)
}

//CRUD - Update
const editartarefa = (index, tarefa) => {
    const dbtarefa  = ledados()
    dbtarefa[index] = tarefa
    setlocalstorage(dbtarefa)
}

//CRUD - Read
const ledados = () => getlocalstorage()

//CRUD - Create
const criaratividade = (tarefa) =>{
    const dbtarefa = getlocalstorage()
    dbtarefa.push(tarefa)
    setlocalstorage(dbtarefa)
}

//Interação com layout
//por que a função reportValidity() não funcionou

//salvando nova tarefa
const salvartarefa = () => {
    const atividade = {
        tarefa: document.getElementById('tarefacadastrada').value
    }
    const index = document.getElementById('tarefacadastrada').dataset.index
    if(index == 'new'){
        criaratividade(atividade)
        atualizatabela()
    }
    else{
       editartarefa(index, atividade)
       atualizatabela()

    }
}
//criando nova linha para colocar outra tarefa
const crialinha =  (atividade, index) => {
    const nova_linha = document.createElement('tr')
    nova_linha.innerHTML = 
    //inserindo elementos html de forma que so irá aparecer quando for adicionado nova tarefa
    `
    <td>${atividade.tarefa}</td>
    <td>
        <button type="button" id ="editar-${index}" >Editar</button>
        <button type="button" id ="remover-${index}" >Remover</button>
    </td>
    `
    //adiciona nova linha assim que acionada
    document.querySelector('#tbtarefa>tbody').appendChild(nova_linha)
}

//limpando a tabela apos ser atualizado a pagina
const limpartabela = () =>{
    const linhas = document.querySelectorAll('#tbtarefa>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

//atualiza a tabela adicionando uma nova linha atraves da função
const atualizatabela = () =>{
    const dbtarefa = ledados()
    limpartabela()
    dbtarefa.forEach(crialinha)
}

atualizatabela()

//atualiza os dados do cliente
const preenchercampo = (atividade) =>{
    document.getElementById('tarefacadastrada').value = atividade.tarefa 
    document.getElementById('tarefacadastrada').dataset.index = atividade.index  
}

//para editar a tarefa
const edittarefa = (index) => {
    const atividade = ledados()[index]
    atividade.index = index
    preenchercampo(atividade)
}

//para diferenciar as ações dos botões e será direcionado a qual item da tabela
const editarremover = (event) => {
    if(event.target.type == 'button'){
         const [action, index] = event.target.id.split('-')

         if(action == 'editar'){
            edittarefa(index)

         }
         else{
            const atividade = ledados()[index]
            const resposta = confirm(`Deseja realmenete excluir a tarefa?`)
            if(resposta){
            deletar(index)
            atualizatabela()
            }
         }
    }
}
//Configuração dos botões
document.getElementById('btn-salvar').addEventListener('click', salvartarefa)

document.querySelector('#tbtarefa>tbody').addEventListener('click', editarremover)