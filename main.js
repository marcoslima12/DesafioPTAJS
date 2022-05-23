//recuperação do primeiro elemento de classe "character"
const character = document.getElementsByClassName("character")[0]; 
//recuperação do primeiro elemento de classe "container-character"
const containerCharacter = document.getElementsByClassName("container-character")[0]; 

//configura a velocidade de movimentação do personagem em 10 
const VELOCITY = 10;

//atribui à constante SCREEN-WIDTH a largura da tela a partir das  informações presentes no objeto window.screen 
const SCREEN_WIDTH = screen.width;
//atribui à constante SCREEN-HEIGHT a altura da tela a partir das  informações presentes no objeto window.screen 
const SCREEN_HEIGHT = screen.height;


//Inicializa as coordenadas X e Y do personagem 
let xPosition = 500;
let yPosition = 300;

//atribui a constante keysAvaiable uma lista de comandos válidos
const keysAvaiable = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]

//cria um array "directions" com as direções que o personagem pode ter
const directions = ["turnUp", "turnLeft", "turnRight", "turnDown"];

// o addEventListener espera por um evento de "keydown"
// Quando esse evento ocorre, ele executa a arrow function abaixo 
window.addEventListener("keydown", (event) => {
    //atribui a key o valor da tecla pressionado pelo usuário através do "event.key"
    const key  = event.key;

    //atribui a constante keyPressedAvaiable o booleano retornado referente ao método some
    // que verifica se no array de "keysAvaiable", algum dos valores é igual ao "key"
    // ou seja, se a tecla pressionada pelo usuário corresponde a alguma tecla válida do array
    const keyPressedAvaiable =  keysAvaiable.some((currentKey) => {
        return currentKey === key;
    })

    //se o retorno do some foi false, signfica que a tecla pressionada não é válida
    //se não é válida, simplesmente retorna e não executa nada
    if(!keyPressedAvaiable) return;

    directions.forEach((direction) => { //realiza um for no array "directions"
       
        //verifica a direção atual do personagem e "remove a classe" para poder adicionar a nova direção (pelo classList.add mais abaixo)
        if(character.classList.contains(direction)) character.classList.remove(direction);
    })

    //cada IF vai tratar um caso diferente direção do bonequinho
    //Esse trata do caso do usuáro teclar o arrowup
    let temp;
    if(key === "ArrowUp"){
        //atribuo o valor 0 a variavel temp 
        temp = 0;
        character.classList.add("turnUp");
        //atribui a temp o valor atual da posicao em y
        temp = yPosition;
        //atualiza (e atribui) com a novo posicao que o boneco vai estar
        temp -= VELOCITY;
        //aqui ele verifica se essa nova posicao que ele vai estar ultrapassa a "barreira"
        // se não ultrapassar, ou seja, se nessa nova posicão o boneco não sair da tela...
        if(temp >= 0){
            //aí sim podemos atualizar a posição fazendo essa atribuição 
            yPosition -= VELOCITY;
        } 

    }

    
    if(key === "ArrowDown"){
        //zero a variavel temp para utilizá-la novamente
        temp = 0;
        //mudo a direção do character 
        character.classList.add("turnDown");
        //nas duas próximas linhas, basicamente a variavel temp se torna igual a variavel yPosition. Não utilizmaos a yPosition diretamente 
        // a fim de não causar nenhum problema pois ela é uma variavel importante para o codigo
        temp = yPosition;
        temp += VELOCITY;
        //verificamos se temp ultrapassa o tamanho da altura da janela do usuario 
        // somei 80 para a comparação pois a tela estava sempre "um pouco maior" do que apresentada no meu browser.
        //Com essa comparação "para mais", consegui resolver esse problema, inclusive pra caso a janela mudasse de tamanho
        if(temp + 80 < window.innerHeight){
            //caso a posicao em analise não ultrapasse a barreira, atualizamos a posicação oficialmente
            yPosition += VELOCITY;
        } 
    }

    if(key === "ArrowLeft"){
        // zero a variavel temp
        temp = 0;
        //mudo a direção do personagem ao mudar sua classe para "left"
        character.classList.add("turnLeft");
        // como ja feito antes, utilizamos de temp para fazer a verificação, igualando-a a variavel da posicao de x
        temp = xPosition;
        temp -= VELOCITY;
        if(temp >= 0){
            ////caso a posicao em analise não ultrapasse a barreira, atualizamos a posicação oficialmente
            xPosition -= VELOCITY;
        }
        
    }

    if(key === "ArrowRight"){
        //zeramos temp para utilizarmos ela novamente
        temp = 0;
        //mudamos a direção do personagem
        character.classList.add("turnRight");
        //  // como ja feito antes, utilizamos de temp para fazer a verificação, igualando-a a variavel da posicao de x
        temp = xPosition;
        temp += VELOCITY;
        //como falado anteriormente, fiz essa verificação com a soma de 80 porque quando mudamos o tamanho da tela 
        //às vezes o boneco ultrapassava os limites. Com essa soma esse problema foi resolvido. 
        if(temp + 80 < window.innerWidth){
            //caso a posicao em analise não ultrapasse a barreira, atualizamos a posicação oficialmente
            xPosition += VELOCITY;
        }
    }

    //as próximas duas linhas realizam a atualização da posição do personagem alterando diretamente pelo Javascript os valores do CSS.
    containerCharacter.style.top = `${yPosition}px`;
    containerCharacter.style.left = `${xPosition}px`
});
