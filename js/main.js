$(document).ready(function() {
  var g1 = localStorage.getItem("g1");
  var g2 = localStorage.getItem("g2");
  var g3 = localStorage.getItem("g3");
  var g4 = localStorage.getItem("g4");
  var g5 = localStorage.getItem("g5");
  var g6 = localStorage.getItem("g6");

  if (g1 === null) {
    $('#g1').text(0);
  } else {
    if (g1 === 10) {
      $('#g1').text(g1);
      $('#g1').parent().parent().addClass('completed');
    } else {
      $('#g1').text(g1);
    }
  }

  if (g2 === null) {
    $('#g2').text(0);
  } else {
    $('#g2').text(g2);
  }

  if (g3 === null) {
    $('#g3').text(0);
  } else {
    $('#g3').text(g3);
  }

  if (g4 === null) {
    $('#g4').text(0);
  } else {
    $('#g4').text(g4);
  }

  if (g5 === null) {
    $('#g5').text(0);
  } else {
    $('#g5').text(g5);
  }

  if (g6 === null) {
    $('#g6').text(0);
  } else {
    $('#g6').text(g6);
  }
});
