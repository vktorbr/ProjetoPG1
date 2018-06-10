
canvas.addEventListener('mousedown', e => {
    var ponto = new Ponto(e.offsetX, e.offsetY);
    id = gamb(ponto);
    if(id === -1){
      pControle.push(ponto);
      desenhar();
    } else {
      move = true;
    }
  });
  
  canvas.addEventListener('mouseup', e => {move = false});
  
  canvas.addEventListener('mousemove', e => {
    if(move){
      pControle[id].x = e.offsetX;
      pControle[id].y = e.offsetY;
      desenhar();
    }
  });
  
  canvas.addEventListener('dblclick', e => {
    var ponto = new Ponto(e.offsetX, e.offsetY);
    id = gamb(ponto);
    if(id !== -1){
      pControle.splice(id, 1);
      desenhar();
    }
  });
  
  var barraClick = false;
  
  barra.addEventListener('mousedown', e =>{barraClick = true});
  
  barra.addEventListener('mousemove', e => {
    
    if(pControle.length > 1){
      desenhaComDerivada();
    }else{
      alert("Insira um ponto antes!");
    }
  });
  
  function desenhaComDerivada(){
    var posicaoBarra = barra.value;
      
      if(barraClick && (posicaoBarra <= mtBarra)){
        desenhar();
        
        var d1Curva = curvaDerivada(pControle);
        desenharVetorDerivadas(posicaoBarra, d1Curva, 'red');
  
        var d1Pontos = pontoDerivada(pControle, pControle.length-1);
        
        if(d1Pontos.length > 1){
          var d2Curva = curvaDerivada(d1Pontos);
          desenharVetorDerivadas(posicaoBarra, d2Curva, 'blue'); 
        }
      }
  }
  
  barra.addEventListener('mouseup', e =>{barraClick = false});