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

  $('#how-to-button').click(function() {
    swal("Game instructions", "Color Maze is an exciting puzzle game where you control a character through a maze. The goal is to color all the tiles by guiding the character over them. But be careful! There are holes in the ground that you must avoid, otherwise you'll have to start over. \n\n The character can only move in four directions: up, down, left, and right. Each time you complete a level, a new maze is generated for you to explore.");
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
      	location.reload();
      }
    });
  });

  $('#credits-button').click(function() {
    swal("Credits", "This game is created by Kim Andersson.\nSpecial thanks to Annie, Ester, Ebba and Alva for level designs.");
  });
});
