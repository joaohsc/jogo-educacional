var tela = 1;
var bg_instrucao, bg_menu, bg_creditos, bg_go_success, bg_go_erro, bg_jogo;
var hover_sound;
// variáveis do jogo
var pontos = 0;
var nivel = 1;
var vidas = 3;
var tempo = [20, 30, 40, 50]
var barreira_pontos = 1000

// Números
var operacoes = ['+', '-', 'x', '÷']
var numero_a, numero_b, resultado;
var frutas_vetor = ['banana', 'maca', 'pera', 'laranja'];
var cesta_fruta = {};
var frutas_list = [];

function preload() {
  //Backgrounds
  bg_menu = loadImage('media/menu_bg.png');
  bg_creditos = loadImage('media/Créditos.png');
  bg_instrucao = loadImage('media/instruções.png')
  bg_go_success = loadImage('media/bg-gameover-success.png')
  bg_go_erro = loadImage('media/bg-gameover-erro.png')
  bg_jogo = loadImage('media/bg-jogo.png')

  //fruits
  banana = loadImage('media/banana.png')
  pera = loadImage('media/pera.png')
  maca = loadImage('media/maca.png')
  maca_vida = loadImage('media/maca-vida.png')
  laranja = loadImage('media/laranja.png')

  //basket
  cest_banana = loadImage('media/cesta-banana.png')
  cest_pera = loadImage('media/cesta-pera.png')
  cest_maca = loadImage('media/cesta-maca.png')
  cest_laranja = loadImage('media/cesta-laranja.png')

  soundFormats('mp3', 'ogg');
  hover_sound = loadSound('media/sound/hover_sound');
}

function setup() {
  createCanvas(1080, 703);
  frameRate(60)
  jogo_calculo()
}

function draw() {
  // tela do menu
  // trocar
  if (tela == 4) {
    background(bg_menu);
    menu_botao(311, 217, 146, 60.31, 'Iniciar', 255);
    menu_botao(311, 297, 146, 60.31, 'Informações', 335);
    menu_botao(311, 377, 146, 60.31, 'Créditos', 415);
  }
  // Instruções
  else if (tela == 2) {
    background(bg_instrucao);
    menu_voltar()
  }
  // credito
  else if (tela == 3) {
    background(bg_creditos);
    menu_voltar()
  }
  // Jogo
  // trocar
  else if (tela == 1) {
    jogo_principal()
  }
  // gameover sucesso
  else if (tela == 5) {
    background(bg_go_success);
  }
  // gameover Falha
  else if (tela == 6) {
    background(bg_go_erro);
  }
}

//funções compartilhadas
function menu_botao(x, y, largura, altura, texto, textoy) {
  // evento de hover
  colorText = 240
  if (mouseX > x && mouseX < (x + largura) && mouseY > y && mouseY < (y + altura)) {
    colorText = '#853e3a'
    if (mouseIsPressed && texto == 'Iniciar') {
      tela = 4;
    } else if (mouseIsPressed && texto == 'Informações') {
      tela = 2;
    } else if (mouseIsPressed && texto == 'Créditos') {
      tela = 3;
    }
  }
  // texto do botão
  textAlign(CENTER);
  textSize(20);
  fill(colorText);
  noStroke();
  textStyle(BOLD);
  text(texto, 385, textoy)
}

function menu_voltar() {
  x = 540
  y = 340
  largura = 146
  altura = 60.31
  // evento de hover
  colorText = 240
  if (mouseX > x && mouseX < (x + largura) && mouseY > y && mouseY < (y + altura)) {
    stroke(200);
    fill('#853e3a');
    rect(x, y, largura, altura, 15);
    if (mouseIsPressed) {
      tela = 1;
    }
  }
  // texto do botão
  textAlign(CENTER);
  textSize(20);
  fill(colorText);
  noStroke();
  textStyle(BOLD);
  text('Voltar', 612, 378)
}

//funções principais
function jogo_principal() {
  background(bg_jogo);

  if (nivel > 4) {
    tela = 5
  } else {
    jogo_placar();

    // cestas
    textSize(30)
    textAlign(CENTER)
    image(cesta_fruta['imagem'], 490, 120)
    text(numero_a + ' ' + operacoes[nivel - 1] + ' ? ', 545, 270)
    image(cesta_fruta['imagem'], 760, 120)
    text(resultado, 815, 270)

    // frutas   
    var frutax = 415
    var frutay = 420
    var numeroy = 510
    for(i=0; i<frutas_list.length; i++){
      jogo_fruta(frutas_list[i].imagem, frutax, frutay, frutax+22, numeroy, frutas_list[i].valor)
      frutax+=155
    }
    
  }
}

function jogo_calculo() {
  numero_a = parseInt(random(1, 100))
  numero_b = parseInt(random(1, 100))

  resultado = calcular_valores(nivel, numero_a, numero_b)

  console.log(numero_b);
  fruta_random = random(frutas_vetor)
  recuperar_cesta_fruta_imagem(fruta_random);
  
  posicao_resposta = parseInt(random(0, 4))
  for (i = 0; i < 4; i++) {
    var fruta_obj = {};
    fruta_obj['nome'] = cesta_fruta['nome'];
    fruta_obj['imagem'] = recuperar_fruta_imagem(cesta_fruta['nome']);
    if (i == posicao_resposta) {      
      fruta_obj['valor'] = numero_b      
    } else {
      valor_random = parseInt(random(1, 100))
      if (valor_random == numero_b) {
        while (valor_random == numero_b) {
          valor_random = parseInt(random(1, 100))
        }
      }
      fruta_obj['valor'] = valor_random
    }

    frutas_list.push(fruta_obj)
  }
}

function calcular_valores(nivel, a, b){
  switch(nivel){
    case 1:
      return a+b;
    case 2:
      return a-b;
    case 3:
      return a*b;
    case 4:
      return a/b
  }
}

function recuperar_fruta_imagem(nome) {
  switch (nome) {
    case 'banana':
      return banana
    case 'maca':
      return maca
    case 'pera':
      return pera
    case 'laranja':
      return laranja
  }
}

function recuperar_cesta_fruta_imagem(nome) {
  switch (nome) {
    case 'banana':
      cesta_fruta['nome'] = 'banana'
      cesta_fruta['imagem'] = cest_banana
      break;
    case 'maca':
      cesta_fruta['nome'] = 'maca'
      cesta_fruta['imagem'] = cest_maca
      break;
    case 'pera':
      cesta_fruta['nome'] = 'pera'
      cesta_fruta['imagem'] = cest_pera
      break;
    case 'laranja':
      cesta_fruta['nome'] = 'laranja'
      cesta_fruta['imagem'] = cest_laranja
      break;
  }
}

function jogo_fruta(fruta, x, y, textox, textoy, valor) {
  largura = 150
  altura = 130
  if (mouseX > (x-(largura/3)) && mouseX < (x + ((largura/4)*3))
    && mouseY > (y-(altura/3)) && mouseY < (y + ((altura/4)*3))) {
    // hover_sound.play()
    cursor(HAND);
    var limiteFruta = y-20
    var limiteTexto = textoy-20
    while(y>limiteFruta && textoy>limiteTexto){      
      y = y-1
      textoy = textoy-1      
    }

    mouseClicked = function () {
      hover_sound.play()      
      if (numero_b == valor) {
        pontos += 500;
        cesta_fruta = {};
        frutas_list = [];
        jogo_placar()
        jogo_calculo();
      }
    };
  }
  
  textSize(30)
  fill(240)
  textAlign(CENTER)
  noStroke();
  image(fruta, x, y)
  text(valor, textox, textoy)  
}

function jogo_placar() {
  fill(240)
  noStroke();
  textAlign(LEFT)
  textSize(30)
  textStyle(BOLD);
  cursor(ARROW)

  //tempo
  text(tempo[nivel - 1], 960, 70)
  // nível
  text(nivel, 150, 85)
  // tentativas
  recuperar_tentativas(vidas)
  // Pontuação
  text(pontos, 90, 335)
  atualizar_nivel()

}

function atualizar_nivel(){
  if (pontos >= barreira_pontos) {
    nivel += 1;
    barreira_pontos += 1000;
  }
}

function restar_placar() {
  pontos = 0;
  nivel = 1;
  vidas = 3;
  barreira_pontos = 2000
}

function recuperar_tentativas(vidas) {
  var x = 80
  for (i = 0; i < vidas; i++) {
    image(maca_vida, x, 175)
    x += 40
  }
}

