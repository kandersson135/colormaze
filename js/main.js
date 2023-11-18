$(document).ready(function() {
  var g1 = localStorage.getItem("g1");
  var g2 = localStorage.getItem("g2");
  var g3 = localStorage.getItem("g3");
  var g4 = localStorage.getItem("g4");
  var g5 = localStorage.getItem("g5");
  var g6 = localStorage.getItem("g6");
  var g7 = localStorage.getItem("g7");
  var g8 = localStorage.getItem("g8");
  var g9 = localStorage.getItem("g9");
  var g10 = localStorage.getItem("g10");
  var g11 = localStorage.getItem("g11");
  var g12 = localStorage.getItem("g12");

  if (g1 === null) {
    $('#g1').text(0);
  } else {
    if (parseInt(g1) === 10) {
      $('#g1').text(g1);
      $('#g1').parent().parent().addClass('completed');
    } else {
      $('#g1').text(g1);
    }
  }

  if (g2 === null) {
    $('#g2').text(0);
  } else {
    if (parseInt(g2) === 10) {
      $('#g2').text(g2);
      $('#g2').parent().parent().addClass('completed');
    } else {
      $('#g2').text(g2);
    }
  }

  if (g3 === null) {
    $('#g3').text(0);
  } else {
    if (parseInt(g3) === 10) {
      $('#g3').text(g3);
      $('#g3').parent().parent().addClass('completed');
    } else {
      $('#g3').text(g3);
    }
  }

  if (g4 === null) {
    $('#g4').text(0);
  } else {
    if (parseInt(g4) === 10) {
      $('#g4').text(g4);
      $('#g4').parent().parent().addClass('completed');
    } else {
      $('#g4').text(g4);
    }
  }

  if (g5 === null) {
    $('#g5').text(0);
  } else {
    if (parseInt(g5) === 10) {
      $('#g5').text(g5);
      $('#g5').parent().parent().addClass('completed');
    } else {
      $('#g5').text(g5);
    }
  }

  if (g6 === null) {
    $('#g6').text(0);
  } else {
    if (parseInt(g6) === 10) {
      $('#g6').text(g6);
      $('#g6').parent().parent().addClass('completed');
    } else {
      $('#g6').text(g6);
    }
  }

  if (g7 === null) {
    $('#g7').text(0);
  } else {
    if (parseInt(g7) === 10) {
      $('#g7').text(g7);
      $('#g7').parent().parent().addClass('completed');
    } else {
      $('#g7').text(g7);
    }
  }

  if (g8 === null) {
    $('#g8').text(0);
  } else {
    if (parseInt(g8) === 10) {
      $('#g8').text(g8);
      $('#g8').parent().parent().addClass('completed');
    } else {
      $('#g8').text(g8);
    }
  }

  if (g9 === null) {
    $('#g9').text(0);
  } else {
    if (parseInt(g9) === 10) {
      $('#g9').text(g9);
      $('#g9').parent().parent().addClass('completed');
    } else {
      $('#g9').text(g9);
    }
  }

  if (g10 === null) {
    $('#g10').text(0);
  } else {
    if (parseInt(g10) === 10) {
      $('#g10').text(g10);
      $('#g10').parent().parent().addClass('completed');
    } else {
      $('#g10').text(g10);
    }
  }

  if (g11 === null) {
    $('#g11').text(0);
  } else {
    if (parseInt(g11) === 10) {
      $('#g11').text(g11);
      $('#g11').parent().parent().addClass('completed');
    } else {
      $('#g11').text(g11);
    }
  }

  if (g12 === null) {
    $('#g12').text(0);
  } else {
    if (parseInt(g12) === 21) {
      $('#g12').text(g12);
      $('#g12').parent().parent().addClass('completed');
    } else {
      $('#g12').text(g12);
    }
  }

  // Lock all levels except first one
  var divs = $('.one-fourth:not(:first)');
  divs.each(function(index) {
    $(this).addClass('locked');
  });

  // Check if previous level is completed and unlock the next level
  for (var i = 1; i <= 11; i++) {
    if ($('#g' + i).text() == 10) {
      $('#g' + i).parent().parent().nextAll('.one-fourth:first').removeClass('locked');
    }
  }

  $('#how-to-button').click(function() {
    swal("Game instructions", "Color Maze is an exciting puzzle game where you control a block through a maze. The goal is to color all the tiles by guiding the block over them. But be careful! There are obstacles that you must avoid, otherwise you'll have to start over. \n\n The block can only move in four directions: up, down, left, and right. Each time you complete a level, a new maze is generated for you to explore.");
  });

  // Reset game button click
  $('#reset-button').click(function() {
    swal({
      title: "Reset Game?",
      text: "Do you really want to reset the game?",
      buttons: true,
    })
    .then((willReset) => {
      if (willReset) {
        localStorage.removeItem("g1");
        localStorage.removeItem("g2");
        localStorage.removeItem("g3");
        localStorage.removeItem("g4");
        localStorage.removeItem("g5");
        localStorage.removeItem("g6");
        localStorage.removeItem("g7");
        localStorage.removeItem("g8");
        localStorage.removeItem("g9");
        localStorage.removeItem("g10");
        localStorage.removeItem("g11");
        localStorage.removeItem("g12");
      	location.reload();
      }
    });
  });

  $('#credits-button').click(function() {
    swal("Credits", "This game is created by Kim Andersson.\n\nSpecial thanks to Annie, Ester, Ebba and Alva for contributing with level designs.");
  });
});
