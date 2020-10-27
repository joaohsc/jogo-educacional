var tela = 1

function setup() {
  createCanvas(300, 300);
}

function draw() {
  // tela do menu
  if (tela == 1) {
    background(20);
    menu_botao(50, 85, 200, 50, 'Iniciar', 120);
    menu_botao(50, 145, 200, 50, 'Informações', 180);
  }
  // instruções
  else if (tela == 2) {
    background(20);
    textAlign(CENTER);
    textSize(26);
    fill(240);
    noStroke();
    text('Tela 2', 150, 120)
  }
  // jogo
  else if (tela == 3) {
    background(20);
    textAlign(CENTER);
    textSize(26);
    fill(240);
    noStroke();
    text('Tela 3', 150, 120)
  }
}

function menu_botao(x, y, largura, altura, texto, textoy) {
  // evento de hover
  if (mouseX > x && mouseX < (x + largura) && mouseY > y && mouseY < (y + altura)){
    stroke(200);
    fill(20);
    rect(x, y, largura, altura, 15);
    if (mouseIsPressed && texto == 'Iniciar') {
      tela = 2;
    } else if (mouseIsPressed && texto == 'Informações') {
      tela = 3;
    }
  }
  // texto do botão
  textAlign(CENTER);
  textSize(26);
  fill(240);
  noStroke();
  text(texto, 150, textoy)
}
