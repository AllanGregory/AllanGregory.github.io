window.onload = function()
{
    var stage = document.getElementById('stage');
    var context = stage.getContext("2d");
    document.addEventListener("keydown", keyPush); //Esperando um evento: nesse caso, o evento de uma tecla a ser pressionada

    //Setar um intervalo para a função ser chamada novamente
    setInterval(game, 60);

    const velocidade = 1; //Definindo quantas casas a cobra vai andar quando o game for atualizado (chamar a função game())

    var velocidadeX = velocidadeY = 0;
    var pontoX = 10; //Ponto X de início da cobra
    var pontoY = 10; //Ponto Y de início da cobra
    var tamanhoPeca = 20; //Tamanho de cada quadrado que preencherá o tabuleiro (stage)
    var quantidadePeca = 20; //Quantas peças vão ter no tabuleiro
    var frutaX = frutaY = 15; //Definindo a posição da maça (ou fruta qualquer) de início

    var rastroCobra = []; //O rastro da cobra não contém nada por enquanto
    caudaCobra = 5;

    function game()
    {
        pontoX += velocidadeX;
        pontoY += velocidadeY;

        //Se a cobra chegar no canto do tabuleiro, eu volto para o outro lado, para ela reaparecer
        if (pontoX < 0)
        {
            pontoX = quantidadePeca - 1;
        }

        if (pontoX > quantidadePeca - 1)
        {
            pontoX = 0;
        }

        if (pontoY < 0)
        {
            pontoY = quantidadePeca - 1;
        }

        if (pontoY > quantidadePeca - 1)
        {
            pontoY = 0;
        }

        context.fillStyle = "black"; //Definindo a cor do meu stage
        context.fillRect(0, 0, stage.width, stage.height); //Pintando o quadrado do meu stage

        context.fillStyle = "red"; //Pintando a fruta no tabuleiro
        context.fillRect(frutaX * tamanhoPeca, frutaY * tamanhoPeca, tamanhoPeca, tamanhoPeca); //Pintando a fruta nos pontos X e Y com o tamanho da peça que definimos acima

        context.fillStyle = "gray"; //Pintando a cobra
        
        //Pintando o rastro da cobra
        for (var indice = 0; indice < rastroCobra.length; indice++)
        {
            context.fillRect(rastroCobra[indice].x * tamanhoPeca, rastroCobra[indice].y * tamanhoPeca, tamanhoPeca - 1, tamanhoPeca - 1);

            //Verificando se alguma posição do rastro está na cauda da cobra, pois assim é game over, houve uma colisão no próprio corpo da cobra
            if (rastroCobra[indice].x == pontoX && rastroCobra[indice].y == pontoY)
            {
                velocidadeX = velocidadeY = 0; //Parando a cobra
                caudaCobra = 5;
            }
        }

        //Adicionando no array de rastro a posição que a cobra estiver andando no próximo ciclo para ser desenhado
        rastroCobra.push({x:pontoX,y:pontoY}); //Adiciona no último elemento do array

        while (rastroCobra.length > caudaCobra)
        {
            rastroCobra.shift(); //Se o rastro for maior que a cauda, retiramos o primeiro elemento do array
        }

        //Reposicionando a fruta caso a cobra coma uma das frutas
        if (frutaX == pontoX && frutaY == pontoY)
        {
            caudaCobra++;
            frutaX = Math.floor(Math.random() * quantidadePeca);
            frutaY = Math.floor(Math.random() * quantidadePeca);
        }
    }

    function keyPush(event)
    {
        switch (event.keyCode)
        {
            case 37: //Esquerda (left)
                velocidadeX = -velocidade;
                velocidadeY = 0;
                break;
            case 38: //Cima (up)
                velocidadeX = 0;
                velocidadeY = -velocidade;
                break;
            case 39: //Direita (right)
                velocidadeX = velocidade;
                velocidadeY = 0;
                break;
            case 40: //Baixo (down)
                velocidadeX = 0;
                velocidadeY = velocidade;
                break;
            default:
                break;
        }
    }
}