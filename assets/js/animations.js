$(function() {
  function drawLine(startPoint, endPoint, complete, currentLevel) {
    var counter = 0;

    //moving horizontally
    if(startPoint.x != endPoint.x) {
      var delta = startPoint.x < endPoint.x ? 1 : -1;
      var drawLoop = setInterval(function() {
        ctx.moveTo(startPoint.x + counter, startPoint.y);
        counter += delta;

        ctx.lineTo(startPoint.x + counter, startPoint.y);
        ctx.stroke();

        if(startPoint.x + counter == endPoint.x) {
          clearInterval(drawLoop);
          complete(endPoint, false, currentLevel);
        }
      }, 5);
    }
    //moving vertically
    else if (startPoint.y != endPoint.y) {
      var delta = startPoint.y < endPoint.y ? 1 : -1;

      var drawLoop = setInterval(function() {
        ctx.moveTo(startPoint.x, startPoint.y + counter);
        counter += delta;

        ctx.lineTo(startPoint.x, startPoint.y + counter);
        ctx.stroke();

        if(startPoint.y + counter == endPoint.y) {
          clearInterval(drawLoop);

          complete(endPoint, true, currentLevel);
        }
      }, 5);
    }
  }
  function drawChain(startPoint, startWithX, currentLevel) {
    if(currentLevel < 5) {
      if(startWithX) {
        //fixed y
        var X = Math.round(Math.max(Math.random() * c.width, c.width/10));
        var endPoint = { x: X, y: startPoint.y };
      } else {
        //fixed x
        var Y = Math.round(Math.max(Math.random() * c.height, c.height/10));
        var endPoint   = { x: startPoint.x, y: Y };
      }

      drawLine(startPoint, endPoint, drawChain, currentLevel + 1);
    } else {
      if(Math.random() > 0.2) {
        startChains(1);
      }
    }
  }
  function startChains(numChains) {
    for(var i = 0; i < numChains; i++) {
      //pick a starting point, either X or Y
      if(Math.random() > 0.5) {
        var Y = Math.round(Math.random() * c.height);

        var startX = Math.random() > 0.5 ? 0 : c.width;
        var startPoint = { x: startX, y: Y };
        var varyX = true;
      } else {
        var X = Math.round(Math.random() * c.width);

        var startY = Math.random() > 0.5 ? 0 : c.height;
        var startPoint = { x: X, y: startY };
        var varyX = false;
      }

      drawChain(startPoint, false, varyX);
    }
  }
  
  
  var c = document.getElementById("canvas");
  c.width = $("#canvas").width();
  c.height = $("#canvas").height();
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.strokeStyle = "#5A90CE";

  startChains(5);
});

