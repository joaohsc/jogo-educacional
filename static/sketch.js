var tela = 1;
var bg_instrucao, bg_menu, bg_creditos;
function setup() {
  createCanvas(768, 500);
  bg_menu = loadImage('media/menu_bg.png');
  bg_creditos = loadImage('media/Créditos.png');
  bg_instrucao = loadImage('media/instruções.png')
}

function draw() {
  // tela do menu
  if (tela == 1) {
    background(bg_menu);
    menu_botao(311, 217, 146, 60.31, 'Iniciar', 255);
    menu_botao(311, 297, 146, 60.31, 'Informações', 335);
    menu_botao(311, 377, 146, 60.31, 'Créditos', 415);
  }
  // instruções
  else if (tela == 2) {
    background(20);
    menu_voltar()
  }
  // jogo
  else if (tela == 3) {
    background(bg_instrucao);
    menu_voltar()
  }
  else if (tela == 4) {
    background(bg_creditos);  
    menu_voltar()  
  }
}

function menu_botao(x, y, largura, altura, texto, textoy) {
  // evento de hover
  colorText=240
  if (mouseX > x && mouseX < (x + largura) && mouseY > y && mouseY < (y + altura)){    
    colorText = '#853e3a'
    if (mouseIsPressed && texto == 'Iniciar') {
      tela = 2;
    } else if (mouseIsPressed && texto == 'Informações') {
      tela = 3;
    } else if (mouseIsPressed && texto == 'Créditos') {
      tela = 4;
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