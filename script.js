class Ponto {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  calcularDistancia(ponto){
    return Math.sqrt(Math.pow(this.x - ponto.x, 2) + Math.pow(this.y - ponto.y, 2));
  }
}

var pControle = [];
var raio = 5;
var curvaBezier = [];
var move = false;
var id = -1;
var nAvaliacao = Number(prompt("Informe o Número de Avaliações: ", ""));

var t = 1/nAvaliacao;
var mtBarra = 1/t - 1;

var canvas = document.getElementById('canvas');
var contexto = canvas.getContext('2d');
var barra = document.getElementById("barra");
barra.min = 0;
barra.max = mtBarra;
barra.value = 0;

var verPontos = true;
function bPontos(checkbox){
  if(!checkbox.checked) verPontos = false;
  else verPontos =true;
  desenhar();
  barraClick=true;
  if(pControle.length > 1){
    desenhaComDerivada();
  }
}

var verPoligonais = true;
function bPoligonais(checkbox){
  if(!checkbox.checked) verPoligonais = false;
  else verPoligonais = true;
  desenhar();
  barraClick=true;
  if(pControle.length > 1){
    desenhaComDerivada();
  }
}

var verCurva = true;
function bCurva(checkbox){
  if(!checkbox.checked) verCurva = false;
  else verCurva = true;
  desenhar();
  barraClick=true;
  if(pControle.length > 1){
    desenhaComDerivada();
  }
}

function pontoDerivada(pontos, grau){
  var dPontos = [];

  for(var i = 0; i < grau; i++){
    var x = pontos[i+1].x - pontos[i].x;
    var y = pontos[i+1].y - pontos[i].y;
    dPontos.push(new Ponto(x,y));
  } 
  return dPontos;
}

function curvaDerivada(pontos){
  var grau = pontos.length - 1;
  var dPontos = [];
  var curvaDerivada = [];
  
  dPontos = pontoDerivada(pontos, grau);
  curvaDerivada = deCasteljau(dPontos);
  return curvaDerivada;
}

function Interpolacao(pontos, t){
  var proximoPonto = [];
  for(var i = 0; i < pontos.length - 1; i++){
    var x = (1 - t) * pontos[i].x + t * pontos[i + 1].x;
    var y = (1 - t) * pontos[i].y + t * pontos[i + 1].y;
    proximoPonto.push(new Ponto(x,y)); 
  }
  if(proximoPonto.length === 1) return proximoPonto[0];
  else return Interpolacao(proximoPonto, t);
}

function deCasteljau(pontos){
  var curva = [];
  
  if(pontos.length > 1){
    for(var i = 0; i <= 1; i += t){
      curva.push(Interpolacao(pontos, i));
    }
  }else{
    for(var i = 0; i <= 1; i += t){
      curva.push(pontos[0]);
    }
  }
  return curva;
}

function gamb(ponto){
  for(var i in pControle){
    if(pControle[i].calcularDistancia(ponto) <= 2 * raio) return i;
  }
  return -1;
}

function limparCanvas(){
  contexto.clearRect(0, 0, canvas.width, canvas.height);
}

function desenharPoligonais(pontos, corLinha, larguraLinha){
  for (var i = 0; i < pontos.length - 1; i++) {
    contexto.beginPath();
    contexto.larguraLinha = larguraLinha;
    contexto.strokeStyle = corLinha;
    contexto.moveTo(pontos[i].x, pontos[i].y);
    contexto.lineTo(pontos[i + 1].x, pontos[i + 1].y);
    contexto.stroke();
    contexto.closePath();
  }
}

function desenharPontos(){
  for(var i in pControle){
    contexto.beginPath();
    contexto.arc(pControle[i].x, pControle[i].y, raio, 0, 2 * Math.PI);
    contexto.fillStyle = 'white';
    contexto.fill();
    contexto.closePath();
  }
}

function desenhar(){
  limparCanvas();
  curvaBezier = deCasteljau(pControle);
  if(verCurva) desenharPoligonais(curvaBezier, 'rgb(217, 255, 0)', 1);
  if(verPoligonais) desenharPoligonais(pControle, 'white', 2);
  if(verPontos) desenharPontos();
}

function desenharVetorDerivadas(posicaoBarra, curvaDerivada, corLinha){
  contexto.beginPath();
  contexto.larguraLinha = 1;
  contexto.strokeStyle = corLinha;
  contexto.moveTo(curvaBezier[posicaoBarra].x, curvaBezier[posicaoBarra].y);
  contexto.lineTo(curvaBezier[posicaoBarra].x + curvaDerivada[posicaoBarra].x, curvaBezier[posicaoBarra].y + curvaDerivada[posicaoBarra].y);
  contexto.stroke();
  contexto.closePath();
}