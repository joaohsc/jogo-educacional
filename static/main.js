var tela = 1;
var bg_instrucao, bg_menu, bg_creditos, bg_go_success, bg_go_erro, bg_jogo;
var hover_sound;
// variáveis do jogo
var pontos = 0;
var nivel = 1;
var vidas = 3;
// 0 - jogo rodando; 1 - acerto; 2 - erro;
var codigo_acerto = 0;
var tempo_vetor = [20, 30, 40, 60]
var contador_tempo = 0;
var tempo_atual = 0;
var pausar_tempo = false;

var pontuacao_maxima=4000;
var pontos_nivel=500;
var barreira_pontos_default = 1000;
var barreira_pontos = barreira_pontos_default;

// Números
var operacoes = ['+', '-', 'x', '÷']
var numero_a, numero_b, resultado;
var frutas_vetor = ['banana', 'maca', 'pera', 'laranja'];
var cesta_fruta = {};
var frutas_list = [];
let message_elem;

function preload() {
  //Backgrounds
  bg_menu = loadImage('media/menu_bg.png');
  bg_creditos = loadImage('media/creditos.png');
  bg_instrucao = loadImage('media/instrucoes.png')
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
  wrong_sound = loadSound('media/sound/wrong');
  correct_sound = loadSound('media/sound/correct');
  menu_sound = createAudio('media/sound/menu_sound.mp3');
  ingame_sound = createAudio('media/sound/ingame_sound.mp3');
  loose_sound = createAudio('media/sound/loose_sound.mp3');
  win_sound = createAudio('media/sound/win_sound.mp3');
}

function setup() {
  message_elem = document.getElementById('alerta');
  createCanvas(1080, 703);
  frameRate(30)
  jogo_calculo()
}

function draw() {
  // tela do menu
  // trocar
  if (tela == 1) {
    win_sound.stop()
    loose_sound.stop()
    ingame_sound.stop()
    menu_sound.loop()
    cursor(ARROW)    
    background(bg_menu);
    xmenu=465;
    largura=146; 
    altura=60
    btn_trocar_tela('Iniciar',xmenu,315, 4, largura, altura)
    btn_trocar_tela('Instruções',xmenu,425, 2, largura, altura)
    btn_trocar_tela('Créditos',xmenu,535, 3, largura, altura)
  }
  // Instruções
  else if (tela == 2) {
    cursor(ARROW)
    background(bg_instrucao);
    btn_trocar_tela('Voltar',816,590, 1, 146, 60)
  }
  // credito
  else if (tela == 3) {
    cursor(ARROW)
    background(bg_creditos);
    btn_trocar_tela('Voltar',816,595, 1, 146, 60)
  }
  // Jogo
  // trocar
  else if (tela == 4) {
    win_sound.stop()
    loose_sound.stop()
    menu_sound.stop()
    ingame_sound.loop()
    jogo_principal()
  }
  // gameover sucesso
  else if (tela == 5) {
    ingame_sound.stop()
    win_sound.loop()
    background(bg_go_success);
    game_over()
  }
  // gameover Falha
  else if (tela == 6) {
    ingame_sound.stop()
    loose_sound.loop()
    background(bg_go_erro);
    game_over()
  }
}

function btn_trocar_tela(texto,x,y, cod_tela, largura, altura) {
  // evento de hover
  colorText = 240
  if (mouseX > (x-largura/3) && mouseX < (x + largura) 
    && mouseY > (y-altura/3) && mouseY < (y + altura)) {
    cursor(HAND);
    colorText='#853e3a'
    if (mouseIsPressed) {
      tela = cod_tela;
      if(cod_tela==4 || cod_tela==1){
        finalizar_jogo();
        jogo_calculo();
      }
    }
  }
  // texto do botão
  textAlign(CENTER);
  textSize(20);
  fill(colorText);
  noStroke();
  textStyle(BOLD);
  text(texto, x+70, y+40)
}

function game_over(){
  textAlign(LEFT)
  textSize(30)
  textStyle(BOLD);
  cursor(ARROW)

  // nível
  fill(240)
  text(nivel, 280, 400)
  // Pontuação
  text(pontos, 640, 400)
  largura = 200 
  altura = 80
  btn_trocar_tela('Jogar novamente',250,580, 4, largura, altura);
  btn_trocar_tela('Ir para o Menu',690, 580, 1, largura, altura);
}

//funções principais
function jogo_principal() {
  cursor(ARROW)
  background(bg_jogo);

  if (nivel > 4) {
    nivel--;
    tela = 5;
  } else if (vidas == 0) {
    tela = 6;
  } else {    
    btn_trocar_tela('Finalizar',82,535, 1, 146, 60)    
    jogo_placar();

    // cestas
    textSize(30)
    textAlign(CENTER)
    image(cesta_fruta['imagem'], 490, 120)
    text(numero_a + ' ' + operacoes[nivel - 1] + ' ? ', 545, 270)
    image(cesta_fruta['imagem'], 760, 120)
    text(resultado, 815, 270)

    // frutas   
    var frutax = 408
    var frutay = 420
    var numeroy = 510
    for (i = 0; i < frutas_list.length; i++) {
      jogo_fruta(frutas_list[i].imagem, frutax, frutay, frutax + 22, numeroy, frutas_list[i].valor)
      frutax += 155
    }
    if (!pausar_tempo) {
      contador_tempo++
      segundos = parseInt(contador_tempo / 30)
      tempo_atual = tempo_vetor[nivel - 1] - segundos
      if (tempo_atual == 0) {
        vidas--;
      }
    }
  }
}

function jogo_calculo() {
  numero_a = parseInt(random(1, 10))
  numero_b = parseInt(random(1, 10))
  if (nivel == 2) {
    while (numero_b > numero_a) {
      numero_b = parseInt(random(1, 10))
    }
  } else if (nivel == 4) {
    while (numero_a % numero_b != 0) {
      numero_b = parseInt(random(1, 10))
    }
  }
  resultado = calcular_valores(nivel, numero_a, numero_b)

  fruta_random = random(frutas_vetor)
  recuperar_cesta_fruta_imagem(fruta_random);

  montar_frutas();
}

function montar_frutas() {
  posicao_resposta = parseInt(random(0, 4))
  for (i = 0; i < 4; i++) {
    var fruta_obj = {};
    fruta_obj['nome'] = cesta_fruta['nome'];
    fruta_obj['imagem'] = recuperar_fruta_imagem(cesta_fruta['nome']);
    if (i == posicao_resposta) {
      fruta_obj['valor'] = numero_b
    } else {
      valor_random = parseInt(random(1, 10))
      if (valor_random == numero_b) {
        while (valor_random == numero_b) {
          valor_random = parseInt(random(1, 10))
        }
      }
      fruta_obj['valor'] = valor_random
    }

    frutas_list.push(fruta_obj)
  }
}

function calcular_valores(nivel, a, b) {
  switch (nivel) {
    case 1:
      return a + b;
    case 2:
      return a - b;
    case 3:
      return a * b;
    case 4:
      return a / b

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

  if (validar_hover(x, y, largura, altura)) {
    cursor(HAND);
    var limiteFruta = y - 20
    var limiteTexto = textoy - 20
    while (y > limiteFruta && textoy > limiteTexto) {
      y = y - 1
      textoy = textoy - 1
    }

    mouseClicked = function () {
      if (validar_hover(x, y, largura, altura)) {
        if (numero_b == valor) {
          pontos += pontos_nivel;
          if (pontos<pontuacao_maxima) {
            correct_sound.play();
            pausar_tempo = true;
            message_elem.classList.add('alerta__sucesso');
            message_elem.innerText = 'Acertou!';
            setTimeout(function () { message_elem.classList.remove('alerta__sucesso'); }, 1000);            
          }
          iniciar_rodada();          
        } else {
          if (vidas > 1) {
            wrong_sound.play();
            message_elem.classList.add('alerta__falha');
            message_elem.innerText = 'Tente novamente!';
            setTimeout(function () { message_elem.classList.remove('alerta__falha'); }, 2000);
          }
          vidas--
        }
      }
    }
  }

  textSize(30)
  fill(240)
  textAlign(CENTER)
  noStroke();
  image(fruta, x, y)
  text(valor, textox, textoy)
}

function validar_hover(x, y, largura, altura) {
  return mouseX > (x - (largura / 3)) && mouseX < (x + ((largura / 4) * 3))
    && mouseY > (y - (altura / 3)) && mouseY < (y + ((altura / 4) * 3));
}

function jogo_placar() {

  textAlign(LEFT)
  textSize(30)
  textStyle(BOLD); 

  //tempo
  color_tempo=240
  if (tempo_atual <= 10) {
    if (tempo_atual % 2 == 0) {
      color_tempo='#ff4545'
    }
  }
  fill(color_tempo)
  text(tempo_atual, 960, 70)
  // nível
  fill(240)
  noStroke();
  text(nivel, 150, 85)
  // tentativas
  recuperar_tentativas(vidas)
  // Pontuação
  text(pontos, 90, 335)
  atualizar_nivel()
}

function iniciar_rodada() {
  pausar_tempo = false
  cesta_fruta = {};
  frutas_list = [];
  contador_tempo = 0;
  tempo_atual = 0;
  jogo_placar();
  jogo_calculo();
}

function atualizar_nivel() {
  if (pontos >= barreira_pontos) {
    barreira_pontos += barreira_pontos_default;
    nivel += 1;      
  }
}

function recuperar_tentativas(vidas) {
  var x = 80
  for (i = 0; i < vidas; i++) {
    image(maca_vida, x, 175)
    x += 40
  }
}

function finalizar_jogo() {
  pausar_tempo = false
  pontos = 0;
  nivel = 1;
  vidas = 3;
  contador_tempo = 0;
  tempo_atual = 0;
  barreira_pontos = barreira_pontos_default
  cesta_fruta = {};
  frutas_list = [];
}

