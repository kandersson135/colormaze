  $(document).ready(function() {
    var gameboard = $('#gameboard');
    var levelCounter = $('#level');
    var currentLevel = 1;
    var tiles = [];
    var heroPosition = 0;
    var totalTiles = 25;
    var coloredTiles = 0;
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

      // Generate tiles
      for (var i = 0; i < totalTiles; i++) {
        var tile = $('<div class="tile"></div>');
        tiles.push(tile);
        gameboard.append(tile);
      }

      // Set hero position
      heroPosition = 0;
      tiles[heroPosition].addClass('hero');
      //tiles[heroPosition].css('background-color', tileBackgroundColor());

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
            //tiles[holePosition].css('background-color', getRandomColor());
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
        //tiles[position].css('background-color', tileBackgroundColor());
        coloredTiles++;

        // Check if all non-hole tiles are colored
        if (coloredTiles === totalTiles - $('.hole').length) {
          currentLevel++;
          clickSpark.fireParticles($('.hero'));

          if (currentLevel > customGameboards.length) {
            currentLevel = 1; // Reset level to 1
          }
          setTimeout(function(){
            levelCounter.text("Lvl: " + currentLevel + "/20");
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

    function initGame() {
      $('#gameboard').hide();
      $('#level').hide();
    }

    // Start the game when the start button is clicked
    $('#start-button').click(function() {
      $('#gameboard').fadeIn(1500);
      $('#level').fadeIn(1500);
      $('#game-title').hide();
      $('#how-to-play').hide();
      createCustomGameboard();
      //$(this).prop('disabled', true);
      $(this).hide();
    });

    //initGame();

    // Start the custom game
    createCustomGameboard();
  });
