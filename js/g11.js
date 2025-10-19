$(document).ready(function() {
  var gameboard = $('#gameboard');
  var levelCounter = $('#level span');
  var g11 = localStorage.getItem("g11");
  var timerEnabled = localStorage.getItem('timerEnabled');
  var success = new Audio('audio/success.mp3');
  var fail = new Audio('audio/fail.mp3');
  var ticktock = new Audio('audio/ticktock.wav');
  var pop = new Audio('audio/pop.mp3');
  var whooshIn = new Audio('audio/whoosh-in.mp3');
  var whooshOut = new Audio('audio/whoosh-out.mp3');
  success.volume = 0.3;
  fail.volume = 0.3;
  ticktock.volume = 0.3;
  pop.volume = 0.3;
  whooshIn.volume = 0.3;
  whooshOut.volume = 0.3;
  var currentLevel = 1;
  var tiles = [];
  var heroPosition = 0;
  var totalTiles = 25;
  var coloredTiles = 0;
  var timerInterval;
  var timeRemaining = 10;
  var customGameboards = [ // Level design by Alva N
    [// Level 101
      [0, 2, 2, 2, 2],
      [0, 0, 0, 0, 2],
      [2, 0, 2, 0, 2],
      [2, 0, 0, 0, 2],
      [2, 2, 2, 2, 2]
    ],
    [// Level 102
      [0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    [// Level 103
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 2, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 0, 2, 0]
    ],
    [// Level 104
      [0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2],
      [2, 2, 0, 0, 2]
    ],
    [// Level 105
      [0, 2, 0, 0, 0],
      [0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [2, 0, 0, 2, 2],
      [2, 0, 0, 2, 2]
    ],
    [// Level 106
      [0, 0, 2, 0, 0],
      [0, 0, 2, 2, 0],
      [0, 2, 0, 0, 0],
      [0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    [// Level 107
      [0, 2, 0, 0, 0],
      [0, 2, 0, 2, 0],
      [0, 2, 2, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    [// Level 108
      [0, 0, 0, 2, 2],
      [2, 2, 0, 2, 2],
      [2, 0, 0, 0, 0],
      [2, 0, 2, 0, 0],
      [2, 0, 0, 0, 0]
    ],
    [// Level 109
      [0, 2, 0, 0, 2],
      [0, 2, 0, 0, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    [// Level 110
      [0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0],
      [2, 0, 3, 0, 0],
      [2, 2, 2, 2, 2],
      [2, 2, 2, 2, 2]
    ]
  ];

  if (g11 === null) {
    currentLevel = 1;
  } else {
    currentLevel = g11;
    levelCounter.text(currentLevel);
  }

  // Clickspark
  clickSpark.setParticleCount(5);
  clickSpark.setParticleImagePath('img/clickspark-beach.png');
  clickSpark.setParticleRotationSpeed(12);
  clickSpark.setAnimationType('explosion');
  clickSpark.setParticleSize(12);
  clickSpark.setParticleSpeed(8);
  clickSpark.setParticleDuration(300);

  // Create a new custom gameboard for the current level
  function createCustomGameboard() {
    gameboard.empty();
    tiles = [];
    coloredTiles = 0;

    // Reset timer if timer is enabled
    if (timerEnabled === 'true') {
      resetTimer();
    } else {
      $('#timer').hide();
    }

    // Generate tiles
    for (var i = 0; i < totalTiles; i++) {
      var tile = $('<div class="tile"></div>');
      tiles.push(tile);
      gameboard.append(tile);
    }

    // Set hero position
    heroPosition = 0;
    tiles[heroPosition].addClass('hero');

    // Color the first tile
    tiles[heroPosition].addClass('colored');
    coloredTiles++;

    // Get the custom gameboard for the current level
    var currentGameboard = customGameboards[currentLevel - 1];

    // Set custom obstacles and holes
    for (var row = 0; row < currentGameboard.length; row++) {
      for (var col = 0; col < currentGameboard[row].length; col++) {
        if (currentGameboard[row][col] === 1) {
          var obstaclePosition = row * 5 + col;
          tiles[obstaclePosition].addClass('obstacle');
        } else if (currentGameboard[row][col] === 2) {
          var holePosition = row * 5 + col;
          tiles[holePosition].addClass('hole');
        } else if (currentGameboard[row][col] === 3) {
          var trollPosition = row * 5 + col;
          tiles[trollPosition].addClass('troll');
        } else if (currentGameboard[row][col] === 4) {
          var fishPosition = row * 5 + col;
          tiles[fishPosition].addClass('fish');
        }
      }
    }
  }

  // Move the hero
  function moveHero(position) {
    tiles[heroPosition].removeClass('hero');
    tiles[position].addClass('hero');

    pop.currentTime = 0; // rewind to start so rapid moves don't overlap incorrectly
    pop.play();

    // Check if the target tile is already colored
    if (tiles[position].hasClass('colored')) {
      restartLevel(); // Restart the current level
      return;
    }

    heroPosition = position;

    // Check if the hero fell into a hole
    if (tiles[position].hasClass('hole')) {
      restartLevel(); // Restart the current level
      return;
    }

    // Color the tile if not already colored
    if (!tiles[position].hasClass('colored')) {
      tiles[position].addClass('colored');

      coloredTiles++;

      // Check if all non-hole tiles are colored
      if (coloredTiles === totalTiles - $('.hole').length) {
        currentLevel++;

        success.play();
        ticktock.pause();
        ticktock.currentTime = 0;

        clickSpark.fireParticles($('.hero'));

        // Save current level to localstorage
        if (currentLevel > customGameboards.length) {
          localStorage.setItem("g11", 10);
          setTimeout(function(){
            window.location = "index.html";
          },800);
        } else {
          localStorage.setItem("g11", currentLevel);
        }

        // Slide off and slide in gameboard
        setTimeout(function(){
          $('#gameboard').animate({ left: '+=50px' }, 200, function() {  // Bounce to the right
            whooshOut.currentTime = 0;
            whooshOut.play();
            $(this).animate({ left: '-1000px' }, 500, function() {  // Slide to the left
              whooshIn.currentTime = 0;
              whooshIn.play();

              // Reset position off-screen to the right
              $(this).css('left', '1000px').animate({ left: '0' }, 500);  // Slide in from the right
            });
          });
        },300);

        // create new level
        setTimeout(function(){
          levelCounter.text(currentLevel);
          createCustomGameboard();
        },1000); // },200);
      }
    }
  }

  // Restart the current level
  function restartLevel() {
    $('#gameboard').addClass('shake');

    fail.play();
    ticktock.pause();
    ticktock.currentTime = 0;

    setTimeout(function(){
      $('#gameboard').removeClass('shake');
    },300);

    createCustomGameboard();
  }

    // Function to reset the timer
   function resetTimer() {
     clearInterval(timerInterval);
     timeRemaining = 10;
     updateTimerDisplay();
     startTimer();
   }

    // Function to start the timer
    function startTimer() {
      updateTimerDisplay();

      // Start the countdown interval
      timerInterval = setInterval(function() {
        timeRemaining--; // Decrease the time remaining
        updateTimerDisplay(); // Update the timer display

        if (timeRemaining === 4) {
          ticktock.play();
        }

        if (timeRemaining <= 0) {
          // Time's up, restart the level
          clearInterval(timerInterval); // Clear the interval
          restartLevel(); // Restart the current level
        }
      }, 1000); // Run the interval every 1 second (1000 milliseconds)
    }

    // Function to update the timer display
    function updateTimerDisplay() {
      var timerElement = $('#timer span');
      timerElement.text(timeRemaining);
    }

  // Handle keyboard events
  $(document).keydown(function(e) {
    var newPosition;

    switch (e.which) {
      case 65: // A key
      case 37: // Left arrow
        if (heroPosition % 5 !== 0) {
          newPosition = heroPosition - 1;
          moveHero(newPosition);
        }
        break;
      case 87: // W key
      case 38: // Up arrow
        if (heroPosition >= 5) {
          newPosition = heroPosition - 5;
          moveHero(newPosition);
        }
        break;
      case 68: // D key
      case 39: // Right arrow
        if (heroPosition % 5 !== 4) {
          newPosition = heroPosition + 1;
          moveHero(newPosition);
        }
        break;
      case 83: // S key
      case 40: // Down arrow
        if (heroPosition < 20) {
          newPosition = heroPosition + 5;
          moveHero(newPosition);
        }
        break;
    }
  });

  // handle touch events
  var touchStartX, touchStartY, touchEndX, touchEndY;

  $(document).on('touchstart', function(e) {
    touchStartX = e.originalEvent.touches[0].clientX;
    touchStartY = e.originalEvent.touches[0].clientY;
  });

  $(document).on('touchend', function(e) {
    touchEndX = e.originalEvent.changedTouches[0].clientX;
    touchEndY = e.originalEvent.changedTouches[0].clientY;

    var dx = touchEndX - touchStartX;
    var dy = touchEndY - touchStartY;

    // Check if swipe was mostly horizontal or vertical
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 30 && heroPosition % 5 !== 4) {
        // Swipe right
        moveHero(heroPosition + 1);
      } else if (dx < -30 && heroPosition % 5 !== 0) {
        // Swipe left
        moveHero(heroPosition - 1);
      }
    } else {
      // Vertical swipe
      if (dy > 30 && heroPosition < 20) {
        // Swipe down
        moveHero(heroPosition + 5);
      } else if (dy < -30 && heroPosition >= 5) {
        // Swipe up
        moveHero(heroPosition - 5);
      }
    }
  });

  // Detect backspace key press
  $(document).keydown(function(e) {
    if (e.keyCode == 8) { // Check if the pressed key is the backspace key
      window.location.href = "/colormaze/"; // Navigate to index.html
    }
  });

  //Disable right click
	document.addEventListener("contextmenu", function (e) {
		e.preventDefault();
	}, false);

  // Start the custom game
  createCustomGameboard();
});
