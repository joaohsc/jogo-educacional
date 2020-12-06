var tela = 1;
var bg_instrucao, bg_menu, bg_creditos;
function setup() {
  createCanvas(768, 500);
  bg_menu = loadImage('media/menu_bg.png');
  bg_creditos = loadImage('media/Créditos.png');
  bg_instrucao = loadImage('media/instruções.png')
  bg_instrucao = loadImage('media/instruções.png')
  bg_go_success = loadImage('media/bg-gameover-success.png')
  bg_go_erro = loadImage('media/bg-gameover-erro.png')
  bg_jogo = loadImage('media/bg-jogo.png')
}

function draw() {
  // tela do menu
  if (tela == 1) {
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
  else if (tela == 4) {    
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

function jogo_principal(){
    background(bg_jogo);
    menu_voltar()

}

function menu_botao(x, y, largura, altura, texto, textoy) {
  // evento de hover
  colorText=240
  if (mouseX > x && mouseX < (x + largura) && mouseY > y && mouseY < (y + altura)){    
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
  colorText=240
  if (mouseX > x && mouseX < (x + largura) && mouseY > y && mouseY < (y + altura)){    
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