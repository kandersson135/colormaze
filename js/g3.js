$(document).ready(function() {
  var gameboard = $('#gameboard');
  var levelCounter = $('#level span');
  var g3 = localStorage.getItem("g3");
  var timerEnabled = localStorage.getItem('timerEnabled');
  var success = new Audio('audio/success.mp3');
  var fail = new Audio('audio/fail.mp3');
  var ticktock = new Audio('audio/ticktock.wav');
  success.volume = 0.3;
  fail.volume = 0.3;
  ticktock.volume = 0.3;
  var currentLevel = 1;
  var tiles = [];
  var heroPosition = 0;
  var totalTiles = 25;
  var coloredTiles = 0;
  var timerInterval;
  var timeRemaining = 10;
  var customGameboards = [
    [// Level 21
      [0, 2, 0, 0, 0],
      [0, 2, 0, 2, 0],
      [0, 2, 0, 0, 0],
      [0, 2, 2, 2, 0],
      [0, 0, 0, 0, 0]
    ],
    [// Level 22
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    [// Level 23
      [0, 2, 0, 0, 0],
      [0, 2, 0, 2, 0],
      [0, 0, 0, 2, 0],
      [0, 2, 2, 2, 0],
      [0, 0, 0, 0, 0]
    ],
    [// Level 24
      [0, 2, 2, 2, 2],
      [0, 2, 2, 2, 2],
      [0, 2, 2, 2, 2],
      [0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0]
    ],
    [// Level 25
      [0, 2, 0, 0, 0],
      [0, 2, 2, 2, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0]
    ],
    [// Level 26
      [0, 0, 0, 0, 0],
      [0, 2, 2, 2, 0],
      [0, 2, 2, 2, 0],
      [0, 0, 2, 0, 0],
      [2, 0, 0, 0, 2]
    ],
    [// Level 27
      [0, 0, 0, 2, 2],
      [2, 0, 0, 0, 2],
      [2, 0, 2, 0, 2],
      [2, 0, 0, 0, 2],
      [2, 2, 2, 2, 2]
    ],
    [// Level 28
      [0, 0, 0, 2, 2],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 2, 2],
      [0, 0, 0, 0, 2],
      [0, 0, 0, 0, 2]
    ],
    [// Level 29
      [0, 0, 0, 0, 0],
      [0, 0, 2, 2, 0],
      [0, 0, 2, 2, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    [// Level 30
      [0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 2, 0, 0],
      [2, 0, 0, 0, 2]
    ]
  ];

  if (g3 === null) {
    currentLevel = 1;
  } else {
    currentLevel = g3;
    levelCounter.text(currentLevel);
  }

  // Clickspark
  clickSpark.setParticleCount(5);
  clickSpark.setParticleImagePath('img/clickspark-green.png');
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
        }
      }
    }
  }

  // Move the hero
  function moveHero(position) {
    tiles[heroPosition].removeClass('hero');
    tiles[position].addClass('hero');

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
        localStorage.setItem("g3", currentLevel);

        if (currentLevel > customGameboards.length) {
          localStorage.setItem("g3", 10);
          window.location = "index.html";
        }
        setTimeout(function(){
          levelCounter.text(currentLevel);
          createCustomGameboard();
        },200);

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

  // Handle button clicks
  $('#d-left').click(function() {
    if (heroPosition % 5 !== 0) {
      var newPosition = heroPosition - 1;
      moveHero(newPosition);
    }
  });

  $('#d-up').click(function() {
    if (heroPosition >= 5) {
      var newPosition = heroPosition - 5;
      moveHero(newPosition);
    }
  });

  $('#d-right').click(function() {
    if (heroPosition % 5 !== 4) {
      var newPosition = heroPosition + 1;
      moveHero(newPosition);
    }
  });

  $('#d-down').click(function() {
    if (heroPosition < 20) {
      var newPosition = heroPosition + 5;
      moveHero(newPosition);
    }
  });

  // Start the custom game
  createCustomGameboard();
});
