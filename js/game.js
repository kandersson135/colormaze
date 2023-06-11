  $(document).ready(function() {
    var gameboard = $('#gameboard');
    var levelCounter = $('#level span');
    var currentLevel = 1;
    var tiles = [];
    var heroPosition = 0;
    var totalTiles = 25;
    var coloredTiles = 0;
    var timerInterval;
    var timeRemaining = 10;
    var customGameboards = [
      /*
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      */
      [// Level 1
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2]
      ],
      [// Level 2
        [0, 0, 0, 0, 0],
        [2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 3
        [0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 4
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 5
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2]
      ],
      [// Level 6
        [0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 7
        [0, 2, 0, 0, 0],
        [0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 8
        [0, 0, 0, 0, 2],
        [0, 0, 2, 0, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 2, 0, 0],
        [2, 0, 0, 0, 2]
      ],
      [// Level 9
        [0, 2, 2, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 2, 2, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 10
        [0, 0, 0, 0, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2]
      ],
      [// Level 11
        [0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0],
        [0, 2, 2, 2, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 12
        [0, 0, 0, 0, 2],
        [0, 0, 2, 0, 0],
        [2, 2, 2, 2, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 13
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 2, 0, 0]
      ],
      [// Level 14
        [0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 2, 0, 0, 0],
        [2, 2, 0, 0, 0]
      ],
      [// Level 15
        [0, 0, 0, 0, 2],
        [0, 0, 2, 0, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 2, 0, 0, 2]
      ],
      [// Level 16
        [0, 0, 0, 0, 0],
        [2, 2, 2, 2, 0],
        [0, 0, 0, 2, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 17
        [0, 0, 2, 2, 2],
        [0, 0, 0, 2, 2],
        [0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0],
        [2, 2, 0, 0, 0]
      ],
      [// Level 18
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [2, 2, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 19
        [0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [2, 2, 0, 0, 2],
        [2, 2, 0, 0, 2]
      ],
      [// Level 20
        [0, 0, 0, 0, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 2, 2, 2]
      ],
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
      ],
      [// Level 31
        [0, 0, 0, 0, 0],
        [2, 0, 0, 2, 0],
        [2, 0, 0, 2, 0],
        [2, 0, 0, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 32
        [0, 2, 2, 2, 2],
        [0, 2, 2, 2, 2],
        [0, 2, 2, 2, 2],
        [0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2]
      ],
      [// Level 33
        [0, 2, 0, 0, 0],
        [0, 0, 0, 2, 0],
        [0, 0, 0, 2, 0],
        [0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 34
        [0, 0, 0, 0, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 35
        [0, 2, 2, 2, 2],
        [0, 0, 2, 0, 0],
        [2, 0, 2, 0, 0],
        [2, 0, 0, 0, 0],
        [2, 2, 2, 2, 2]
      ],
      [// Level 36
        [0, 2, 2, 0, 2],
        [0, 0, 0, 0, 2],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2]
      ],
      [// Level 37
        [0, 0, 0, 2, 2],
        [0, 0, 0, 0, 2],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0],
        [2, 2, 0, 0, 0]
      ],
      [// Level 38
        [0, 2, 2, 2, 2],
        [0, 0, 2, 0, 0],
        [2, 0, 0, 0, 0],
        [2, 2, 0, 0, 0],
        [2, 2, 2, 2, 0]
      ],
      [// Level 39
        [0, 0, 0, 0, 2],
        [0, 2, 2, 0, 0],
        [0, 0, 2, 2, 0],
        [2, 0, 0, 2, 0],
        [2, 2, 0, 0, 0]
      ],
      [// Level 40
        [0, 0, 0, 2, 2],
        [0, 0, 0, 0, 0],
        [0, 0, 2, 2, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2]
      ],
      [// Level 41
        [0, 2, 2, 2, 2],
        [0, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2]
      ],
      [// Level 42
        [0, 2, 2, 2, 2],
        [0, 0, 0, 0, 2],
        [0, 0, 2, 0, 2],
        [0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2]
      ],
      [// Level 43
        [0, 0, 0, 0, 2],
        [0, 0, 2, 0, 2],
        [2, 2, 0, 0, 2],
        [0, 0, 0, 2, 2],
        [0, 0, 0, 0, 0]
      ],
      [// Level 44
        [0, 0, 0, 2, 2],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0],
        [0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 45
        [0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0],
        [0, 2, 0, 2, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 46
        [0, 2, 0, 0, 2],
        [0, 2, 0, 0, 2],
        [0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [2, 2, 2, 0, 0]
      ],
      [// Level 47
        [0, 2, 2, 0, 0],
        [0, 2, 2, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 2, 0, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 48
        [0, 0, 2, 2, 2],
        [2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2]
      ],
      [// Level 49
        [0, 2, 0, 0, 2],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0]
      ],
      [// Level 50
        [0, 0, 0, 0, 0],
        [0, 3, 3, 2, 0],
        [0, 2, 0, 2, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0]
      ],
    ];

    // Clickspark
   	clickSpark.setParticleCount(5);
    clickSpark.setParticleImagePath('img/clickspark-square.png');
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

      // Reset timer
      resetTimer();

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
          clickSpark.fireParticles($('.hero'));

          if (currentLevel > customGameboards.length) {
            currentLevel = 1; // Reset level to 1
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
        case 37: // Left arrow
          if (heroPosition % 5 !== 0) {
            newPosition = heroPosition - 1;
            moveHero(newPosition);
          }
          break;
        case 38: // Up arrow
          if (heroPosition >= 5) {
            newPosition = heroPosition - 5;
            moveHero(newPosition);
          }
          break;
        case 39: // Right arrow
          if (heroPosition % 5 !== 4) {
            newPosition = heroPosition + 1;
            moveHero(newPosition);
          }
          break;
        case 40: // Down arrow
          if (heroPosition < 20) {
            newPosition = heroPosition + 5;
            moveHero(newPosition);
          }
          break;
      }
    });

    $("html").onSwipe(function(results){
      if(results.up == true) {
        if (heroPosition >= 5) {
          newPosition = heroPosition - 5;
          moveHero(newPosition);
        }
      }

      if(results.right == true) {
        if (heroPosition % 5 !== 4) {
          newPosition = heroPosition + 1;
          moveHero(newPosition);
        }
      }

      if(results.down == true) {
        if (heroPosition < 20) {
          newPosition = heroPosition + 5;
          moveHero(newPosition);
        }
      }

      if(results.left == true) {
        if (heroPosition % 5 !== 0) {
          newPosition = heroPosition - 1;
          moveHero(newPosition);
        }
      }

    });

    function initGame() {
      $('#gameboard').hide();
      $('#level').hide();
      $('#timer').hide();
    }

    // Start the game when the start button is clicked
    $('#start-button').click(function() {
      $('#gameboard').fadeIn(1500);
      $('#level').fadeIn(1500);
      $('#timer').fadeIn(1500);
      $('#game-title').hide();
      $('#how-to-play').hide();
      createCustomGameboard();
      //$(this).prop('disabled', true);
      $(this).hide();
    });

    initGame();

    // Start the custom game
    //createCustomGameboard();
  });
