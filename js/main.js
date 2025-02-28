$(document).ready(function() {
  // var g1 = localStorage.getItem("g1");
  // var g2 = localStorage.getItem("g2");
  // var g3 = localStorage.getItem("g3");
  // var g4 = localStorage.getItem("g4");
  // var g5 = localStorage.getItem("g5");
  // var g6 = localStorage.getItem("g6");
  // var g7 = localStorage.getItem("g7");
  // var g8 = localStorage.getItem("g8");
  // var g9 = localStorage.getItem("g9");
  // var g10 = localStorage.getItem("g10");
  // var g11 = localStorage.getItem("g11");
  // var g12 = localStorage.getItem("g12");
  var currentYear = new Date().getFullYear();

  // Iterate through localstorage and check if completed
  for (let i = 1; i <= 12; i++) {
    let gValue = localStorage.getItem(`g${i}`);
    const $element = $(`#g${i}`);

    const number = gValue === null ? 0 : parseInt(gValue);
    $element.text(number);

    if (number === 10 || (i === 12 && number === 21)) {
      $element.parent().parent().addClass('completed');
    }
  }

  // Lock all levels except first one
  var divs = $('.one-fourth:not(:first)');
  divs.each(function(index) {
    $(this).addClass('locked');
  });

  // Check if previous level is completed and unlock the next level
  for (var i = 1; i <= 11; i++) {
    if ($('#g' + i).text() == 10 || $('#g12').text() == 21) {
      $('#g' + i).parent().parent().nextAll('.one-fourth:first').removeClass('locked');
    }
  }

  // Timer switch
  // Set initial state based on localStorage
  var isEnabled = localStorage.getItem('timerEnabled') === 'true';
  $('#toggle-switch').prop('checked', isEnabled);

  // Handle switch change event
  $('#toggle-switch').change(function() {
    isEnabled = $(this).prop('checked');
    localStorage.setItem('timerEnabled', isEnabled);
  });

  // How-to-button
  $('#how-to-button').click(function() {
    swal("Game instructions", "Color Maze is an exciting puzzle game where you control a block through a maze. The goal is to color all the tiles by guiding the block over them. But be careful! There are obstacles that you must avoid, otherwise you'll have to start over. \n\n The block can only move in four directions: up, down, left, and right. You control the block using WASD or the arrow keys on your keyboard.");
  });

  // Reset game button click
  $('#reset-button').click(function() {
    swal({
      title: "Reset Game?",
      text: "Do you really want to reset the game?",
      buttons: true,
    }).then((willReset) => {
      if (willReset) {
        for (let i = 1; i <= 12; i++) {
          localStorage.removeItem(`g${i}`);
        }
        location.reload();
      }
    });
  });

  // Credits buttons
  $('#credits-button').click(function() {
    swal("Credits © " + currentYear, "This game is created by Kim Andersson.\n\nSpecial thanks to Annie, Ester, Ebba and Alva for contributing with level designs.");
  });

  // Element click to open page
  $('.one-fourth').click(function(){
    var url = $(this).data('url');
    window.location.href = url;
  });

  // Disable right click
	document.addEventListener("contextmenu", function (e) {
		e.preventDefault();
	}, false);

  // Activate slick slider
  // $('.slick-slider').slick({
  //   autoplay: false,
  //   dots: true,
  //   arrows: false,
  //   customPaging: function(slider, i) {
  //     return '<span class="custom-dot"></span>';
  //   }
  // });
});
