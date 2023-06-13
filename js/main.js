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

  // Reset game button click
  $('#reset-button').click(function() {
    localStorage.removeItem("g1");
    localStorage.removeItem("g2");
    localStorage.removeItem("g3");
    localStorage.removeItem("g4");
    localStorage.removeItem("g5");
    localStorage.removeItem("g6");
  	location.reload();
  });
});
