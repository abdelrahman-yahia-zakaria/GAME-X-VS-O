var loading = "Signing in Login | Loading ...";
var gamesList = "||X vs O|";

//The '~' symbol is a delay to simulate someone typing
var listGames =
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~# " +
  "L~~~" +
  "i~~~~~~~~~~" +
  "s~~~~" +
  "t~~~~~~~~~ " +
  "G~~~~~~~~~~~~~~~~~~~~~~~" +
  "a~~~~" +
  "m~~~~~~" +
  "e~~~s..";
var gameSelect =
  "~~~~~~~~~~~~~~~~~a" +
  "~~~~~~~~~~b" +
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~d" +
  "~~~~~~~~~~~~~~~~~~~~~~e" +
  "~~~~~~~~~~~~~l" +
  "~~~~~~~~~~~~~~~~r" +
  "~~~~~~~~~~~~~~~~~~~~~~a" +
  "~~~~~~~~~~~~~~~~~~~~~~~~~m" +
  "~~~~~~~~~~~~~~~a" +
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~n";
var gameReady = "GAME READY.";
//letterTime is ms is takes for a letter to display
var letterTime = 11;
var delay = 0;
var players = 0;
var playerLetter = "";
var outputDiv = ".output";
var moveDelay = 300;
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var zeroPlayersPlayed = false;
var onePlayerPlayed = false;

$(document).ready(function () {
  loadScript();
  startGame(delay);
});

function loadScript() {
  displayLine(loading);
  delay = loading.length;

  cursorBlink(3, delay);
  clearScreen(delay + 200);

  delay += 230;
  newLine(listGames);

  cursorBlink(1, delay + listGames.length);

  delay += 210;
  newLine(gamesList);
  delay += gamesList.length - 40;
  cursorBlink(3, delay + 10);

  delay += 220;
  newLine(gameSelect);
  delay += 10 + gameSelect.length;
  cursorBlink(5, delay);

  delay += 310;
  clearScreen(delay);
}

function newLine(input) {
  setTimeout(function () {
    displayLine(input);
  }, delay * letterTime);
}

function displayLine(input) {
  for (letter in input) {
    var output = "";
    if (input[letter] == "|") {
      output = "<br><br>";
    } else if (input[letter] == "~") {
      output = "";
    } else {
      output = input[letter];
    }
    addLetter(output, letter);
  }
}

function clearScreen(wait) {
  setTimeout(function () {
    $(outputDiv).empty();
  }, wait * letterTime);
}

function addLetter(input, delay) {
  setTimeout(function () {
    $(outputDiv).html($(outputDiv).html() + input);
  }, letterTime * delay);
}

function cursorBlink(times, wait) {
  setTimeout(function () {
    for (var i = 1; i <= times; i++) {
      var className = wait.toString();

      setTimeout(function () {
        $(outputDiv).append("<span class='blink'>&#9608;</span>");
        $(".blink").fadeIn(300, function () {
          $(".blink").remove();
        });
      }, 500 * i);
    }
  }, wait * letterTime);
}

function startGame(wait) {
  setTimeout(function () {
    players = 0;
    playerLetter = "";

    $(".resetBottom").hide();
    $(".gameDialogRight").empty();
    $(".output").hide(0, function () {
      screenBounce(300, 90);
      $(".board").height(50);
      $(".board").slideDown(400, function () {
        letterTime = 20;
        delay = 20;
        outputDiv = ".gameDialogRight";
        selectPlayers();
      });
    });
  }, (wait + 10) * letterTime);
}

function screenBounce(ms, pixels) {
  if (pixels > 0) {
    var movement = "+=" + Math.abs(pixels);
  }
  if (pixels < 0) {
    var movement = "-=" + Math.abs(pixels);
  }
  if (Math.abs(pixels) > 1) {
    $(".board").animate({ top: movement }, ms, function () {
      screenBounce(ms - 35, pixels * 0.45 * -1);
    });
  }
}

function selectPlayers() {
  $(".gameDialogRight").empty();
  newLine(gameReady);

  $(".0player").click(function () {
    $(outputDiv).empty();

    if (zeroPlayersPlayed == false) {
      newLine(
        "YOU DON'T WANT IN ON THIS??||\
			 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
				...I SEE HOW IT IS :(||"
      );
      setTimeout(function () {
        loadBottomInfo(0);
        newLine(
          '~~~~~~~~I CHOOSE "O"!!||\
					~~~~~~~~~~~~~~~~~~~~~~~~\
					I.. ~~~~~~~~~UHH.. ~~~~~~~~~~~ALSO CHOOSE "X"!||'
        );
      }, 120 * letterTime);
    } else {
      setTimeout(function () {
        console.log("ZP");
        loadBottomInfo(0);
        newLine(
          "WHEE!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 'FUNTIME' BY MYSELF AGAIN!||\
					~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
					~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(WHY DON'T YOU LIKE ME?)|||\
					~~~~~~~~~~~~~~~~~\
					~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~:)||"
        );
      }, 20 * letterTime);
    }

    setTimeout(function () {
      zeroPlayersPlayed = true;
      noPlayerGame(1);
    }, 2500);
  });

  $(".1player").click(function () {
    players = 1;
    $(outputDiv).empty();
    if (onePlayerPlayed == false) {
      newLine('YOU VS ME.|| ~~~~~~~~~~~~~~~~~~~~~ PLEASE SELECT "X" OR "O"');
    } else {
      newLine('YOU AGAIN???|| ~~~~~~~~~~~~~~~~~~~~~ PLEASE SELECT "X" OR "O"');
    }
    setTimeout(function () {
      onePlayerPlayed = true;
      loadBottomInfo(1);
      playGame();
    }, 20 * letterTime);
  });

  $(".2player").click(function () {
    players = 2;
    $(outputDiv).empty();
    newLine("YOU TWO HAVE FUN NOW...|");
    setTimeout(function () {
      loadBottomInfo(2);
      playGame();
    }, 20 * letterTime);
  });
}

function loadBottomInfo(players) {
  if (players == 0) {
    $(".gameDialogBottom").slideUp(200, function () {
      //$('.resetBottom').slideDown(200);
    });
  } else if (players == 1) {
    $(".letterChoice").text("PLEASE CHOOSE X OR O: ");
    $(".gameDialogBottom").slideUp(200, function () {
      $(".pickLetter").slideDown(200);
    });
  } else {
    $(".letterChoice").text("PLAYER 1, SELECT A LETTER: ");
    $(".gameDialogBottom").slideUp(200, function () {
      $(".pickLetter").slideDown(200);
    });
  }

  $(".X").click(function () {
    playerLetter = "x";
    $(".pickLetter").slideUp(200, function () {
      $(outputDiv).empty();
      if (players == 1) {
        newLine("YOU GO FIRST.|");
      }
      if (players == 2) {
        newLine('"X" GOES FIRST.|');
      }
      if (players == 0) {
        $(".resetBottom").slideDown(200);
      }
    });
  });

  $(".O").click(function () {
    playerLetter = "o";
    $(".pickLetter").slideUp(200, function () {
      $(outputDiv).empty();
      if (players == 1) {
        newLine("I'LL GO FIRST.|");
        setTimeout(function () {
          computerMove();
          drawBoard();
        }, 800);
      }
      if (players == 2) {
        newLine('"O" GOES FIRST.|');
      }
      if (players == 0) {
        $(".resetBottom").slideDown(200);
      }
    });
  });

  $(".reset").click(function () {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    drawBoard(1);
    players = 0;
    playerLetter = "";
    letterTime = 10;
    //moveDelay = 500;
    $(".square").off();
    $(".reset").off();
    $(".O").off();
    $(".X").off();
    $(".0player").off();
    $(".1player").off();
    $(".2player").off();
    $(".reset").off();
    selectPlayers();
    $(".resetBottom").slideUp(100, function () {
      $(".gameDialogBottom").slideDown(100);
    });
  });
}

function computerMove() {
  console.log("********************************");
  console.log("turn for " + playerLetter);

  var sumTest = 0;
  if (playerLetter == "x") {
    sumTest = 2;
  } else {
    sumTest = -2;
  }

  var moveMade = false;

  var topRow = [board[0] + board[1] + board[2], board[0], board[1], board[2]];
  var midRow = [board[3] + board[4] + board[5], board[3], board[4], board[5]];
  var bottomRow = [
    board[6] + board[7] + board[8],
    board[6],
    board[7],
    board[8],
  ];
  var leftColumn = [
    board[0] + board[3] + board[6],
    board[0],
    board[3],
    board[6],
  ];
  var midColumn = [
    board[1] + board[4] + board[7],
    board[1],
    board[4],
    board[7],
  ];
  var rightCol = [board[2] + board[5] + board[8], board[2], board[5], board[8]];
  var diag1 = [board[0] + board[4] + board[8], board[0], board[4], board[8]];
  var diag2 = [board[2] + board[4] + board[6], board[2], board[4], board[6]];

  //go for the kill first
  if (topRow[0] == -sumTest && moveMade == false) {
    if (board[0] == 0) {
      board[0] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[1] == 0) {
      board[1] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[2] == 0) {
      board[2] = -0.5 * sumTest;
      moveMade = true;
    }
  }
  if (midRow[0] == -sumTest && moveMade == false) {
    if (board[3] == 0) {
      board[3] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[4] == 0) {
      board[4] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[5] == 0) {
      board[5] = -0.5 * sumTest;
      moveMade = true;
    }
  }
  if (bottomRow[0] == -sumTest && moveMade == false) {
    if (board[6] == 0) {
      board[6] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[7] == 0) {
      board[7] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[8] == 0) {
      board[8] = -0.5 * sumTest;
      moveMade = true;
    }
  }
  if (leftColumn[0] == -sumTest && moveMade == false) {
    if (board[0] == 0) {
      board[0] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[3] == 0) {
      board[3] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[6] == 0) {
      board[6] = -0.5 * sumTest;
      moveMade = true;
    }
  }
  if (midColumn[0] == -sumTest && moveMade == false) {
    if (board[1] == 0) {
      board[1] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[4] == 0) {
      board[4] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[7] == 0) {
      board[7] = -0.5 * sumTest;
      moveMade = true;
    }
  }
  if (rightCol[0] == -sumTest && moveMade == false) {
    if (board[2] == 0) {
      board[2] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[5] == 0) {
      board[5] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[8] == 0) {
      board[8] = -0.5 * sumTest;
      moveMade = true;
    }
  }
  if (diag1[0] == -sumTest && moveMade == false) {
    if (board[0] == 0) {
      board[0] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[4] == 0) {
      board[4] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[8] == 0) {
      board[8] = -0.5 * sumTest;
      moveMade = true;
    }
  }
  if (diag2[0] == -sumTest && moveMade == false) {
    if (board[2] == 0) {
      board[2] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[4] == 0) {
      board[4] = -0.5 * sumTest;
      moveMade = true;
    }
    if (board[6] == 0) {
      board[6] = -0.5 * sumTest;
      moveMade = true;
    }
  }

  //go for the block second
  if (topRow[0] == sumTest && moveMade == false) {
    console.log(topRow);
    if (board[0] == 0) {
      board[0] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " tr1");
    }
    if (board[1] == 0) {
      board[1] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " tr2");
    }
    if (board[2] == 0) {
      board[2] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " tr3");
    }
  }
  if (midRow[0] == sumTest && moveMade == false) {
    console.log(midRow);
    if (board[3] == 0) {
      board[3] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " mr1");
    }
    if (board[4] == 0) {
      board[4] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " mr2");
    }
    if (board[5] == 0) {
      board[5] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " mr3");
    }
  }
  if (bottomRow[0] == sumTest && moveMade == false) {
    console.log(bottomRow);
    if (board[6] == 0) {
      board[6] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " br1");
    }
    if (board[7] == 0) {
      board[7] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " br2");
    }
    if (board[8] == 0) {
      board[8] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " br3");
    }
  }
  if (leftColumn[0] == sumTest && moveMade == false) {
    console.log(leftColumn);
    if (board[0] == 0) {
      board[0] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " lc1");
    }
    if (board[3] == 0) {
      board[3] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " lc2");
    }
    if (board[6] == 0) {
      board[6] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " lc3");
    }
  }
  if (midColumn[0] == sumTest && moveMade == false) {
    console.log(midColumn);
    if (board[1] == 0) {
      board[1] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " mc1");
    }
    if (board[4] == 0) {
      board[4] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " mc2");
    }
    if (board[7] == 0) {
      board[7] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " mc3");
    }
  }
  if (rightCol[0] == sumTest && moveMade == false) {
    console.log(rightCol);
    if (board[2] == 0) {
      board[2] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " rc1");
    }
    if (board[5] == 0) {
      board[5] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " rc2");
    }
    if (board[8] == 0) {
      board[8] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " rc3");
    }
  }
  if (diag1[0] == sumTest && moveMade == false) {
    console.log(diag1);
    if (board[0] == 0) {
      board[0] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " dd1");
    }
    if (board[4] == 0) {
      board[4] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " dd2");
    }
    if (board[8] == 0) {
      board[8] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " dd3");
    }
  }
  if (diag2[0] == sumTest && moveMade == false) {
    console.log(diag2);
    if (board[2] == 0) {
      board[2] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " du1");
    }
    if (board[4] == 0) {
      board[4] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " du2");
    }
    if (board[6] == 0) {
      board[6] = -0.5 * sumTest;
      moveMade = true;
      console.log(playerLetter + " du3");
    }
  }

  //below is run if no win or block is found for the turn

  //grab center if it's open
  if (moveMade == false && board[4] == 0) {
    board[4] = -0.5 * sumTest;
    moveMade = true;
  }

  //grab a corner if one is open
  if (moveMade == false) {
    var corners = [];
    if (board[0] == 0) {
      corners.push(0);
    }
    if (board[2] == 0) {
      corners.push(2);
    }
    if (board[6] == 0) {
      corners.push(6);
    }
    if (board[8] == 0) {
      corners.push(8);
    }
    if (corners.length > 0) {
      var cornerMove = corners[Math.floor(Math.random() * corners.length)];
      board[cornerMove] = -0.5 * sumTest;
      moveMade = true;
      console.log("corners: " + corners);
      console.log("took corner: " + cornerMove);
    }
  }

  //these moves move next to an opponent letter if one
  //is available (for blocking).
  if (moveMade == false && board[0] == sumTest * 0.5 && board[1] == 0) {
    board[1] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 1 move made");
  }
  if (moveMade == false && board[0] == sumTest * 0.5 && board[1] == 0) {
    board[1] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 2 move made");
  }
  if (moveMade == false && board[1] == sumTest * 0.5 && board[0] == 0) {
    board[0] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 3 move made");
  }
  if (moveMade == false && board[1] == sumTest * 0.5 && board[3] == 0) {
    board[3] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 4 move made");
  }
  if (moveMade == false && board[2] == sumTest * 0.5 && board[1] == 0) {
    board[1] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 5 move made");
  }
  if (moveMade == false && board[2] == sumTest * 0.5 && board[5] == 0) {
    board[5] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 6 move made");
  }
  if (moveMade == false && board[3] == sumTest * 0.5 && board[0] == 0) {
    board[0] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 7 move made");
  }
  if (moveMade == false && board[3] == sumTest * 0.5 && board[6] == 0) {
    board[6] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 8 move made");
  }
  if (moveMade == false && board[5] == sumTest * 0.5 && board[2] == 0) {
    board[2] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 9 move made");
  }
  if (moveMade == false && board[5] == sumTest * 0.5 && board[8] == 0) {
    board[8] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 10 move made");
  }
  if (moveMade == false && board[6] == sumTest * 0.5 && board[7] == 0) {
    board[7] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 11 move made");
  }
  if (moveMade == false && board[6] == sumTest * 0.5 && board[5] == 0) {
    board[5] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 12 move made");
  }
  if (moveMade == false && board[7] == sumTest * 0.5 && board[6] == 0) {
    board[6] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 13 move made");
  }
  if (moveMade == false && board[7] == sumTest * 0.5 && board[8] == 0) {
    board[8] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 14 move made");
  }
  if (moveMade == false && board[8] == sumTest * 0.5 && board[5] == 0) {
    board[5] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 15 move made");
  }
  if (moveMade == false && board[8] == sumTest * 0.5 && board[7] == 0) {
    board[7] = -0.5 * sumTest;
    moveMade = true;
    console.log("bottom 16 move made");
  }

  //if no move has been made at this point somehow, it makes a random one
  if (moveMade == false) {
    var remaining = [];
    for (var i = 0; i < 9; i++) {
      if (board[i] == 0) {
        remaining.push(i);
      }
    }
    var move = remaining[Math.floor(Math.random() * remaining.length)];
    board[move] = -0.5 * sumTest;
    console.log(playerLetter + " random");
  }

  console.log(board[0] + " " + board[1] + " " + board[2]);
  console.log(board[3] + " " + board[4] + " " + board[5]);
  console.log(board[6] + " " + board[7] + " " + board[8]);
}

function checkWin(check) {
  //x is +1, o is -1. The sum for each win is +3 or -3
  var winCheck = 0;
  var topRow = board[0] + board[1] + board[2];
  var midRow = board[3] + board[4] + board[5];
  var bottomRow = board[6] + board[7] + board[8];
  var leftColumn = board[0] + board[3] + board[6];
  var midColumn = board[1] + board[4] + board[7];
  var rightCol = board[2] + board[5] + board[8];
  var diag1 = board[0] + board[4] + board[8];
  var diag2 = board[2] + board[4] + board[6];

  //the sum variable is put into the board because of its sign.
  //This makes sure the correct letters are drawn.
  if (topRow == 3 || topRow == -3) {
    winCheck = topRow;
    board = [topRow, topRow, topRow, 0, 0, 0, 0, 0, 0];
    drawBoard(1);
  }
  if (midRow == 3 || midRow == -3) {
    winCheck = midRow;
    board = [0, 0, 0, midRow, midRow, midRow, 0, 0, 0];
    drawBoard(1);
  }
  if (bottomRow == 3 || bottomRow == -3) {
    winCheck = bottomRow;
    board = [0, 0, 0, 0, 0, 0, bottomRow, bottomRow, bottomRow];
    drawBoard(1);
  }
  if (leftColumn == 3 || leftColumn == -3) {
    winCheck = leftColumn;
    board = [leftColumn, 0, 0, leftColumn, 0, 0, leftColumn, 0, 0];
    drawBoard(1);
  }
  if (midColumn == 3 || midColumn == -3) {
    winCheck = midColumn;
    board = [0, midColumn, 0, 0, midColumn, 0, 0, midColumn, 0];
    drawBoard(1);
  }
  if (rightCol == 3 || rightCol == -3) {
    winCheck = rightCol;
    board = [0, 0, rightCol, 0, 0, rightCol, 0, 0, rightCol];
    drawBoard(1);
  }
  if (diag1 == 3 || diag1 == -3) {
    winCheck = diag1;
    board = [diag1, 0, 0, 0, diag1, 0, 0, 0, diag1];
    drawBoard(1);
  }
  if (diag2 == 3 || diag2 == -3) {
    winCheck = diag2;
    board = [0, 0, diag2, 0, diag2, 0, diag2, 0, 0];
    drawBoard(1);
  }

  if (winCheck > 1) {
    if (players > 0) {
      setTimeout(function () {
        newLine('"X" WINS!|~~~~~~~~~PLAY AGAIN?');
        $(".resetBottom").slideDown();
      }, 900);
      $(".square").off();
    } else {
      newLine('"X" WINS!|~~~~~~~~~PLAY AGAIN?');
      $(".resetBottom").slideDown();
    }

    winCheck = 0;
    playerLetter = "";
    return true;
  }

  if (winCheck < -1) {
    if (players > 0) {
      setTimeout(function () {
        newLine('"O" HAS THIS ONE!|~~~~~~~~~PLAY AGAIN?');
        $(".resetBottom").slideDown();
      }, 900);
      $(".square").off();
    } else {
      newLine('"O" HAS THIS ONE!|~~~~~~~~~PLAY AGAIN?');
      $(".resetBottom").slideDown();
    }

    winCheck = 0;
    playerLetter = "";
    return true;
  }

  //stalemate check
  if ($.inArray(0, board) == -1) {
    if (players != 0) {
      setTimeout(function () {
        newLine(
          "|*~~~~" +
            "S~~~~" +
            "T~~~~" +
            "A~~~~" +
            "L~~~~" +
            "E~~~~" +
            "M~~~~" +
            "A~~~~" +
            "T~~~~" +
            "E~~~~*|"
        );
        $(".square").off();
        setTimeout(function () {
          $(".resetBottom").slideDown();
        }, 500);
      }, 300);
    } else {
      newLine(
        "|*~~~~" +
          "S~~~~" +
          "T~~~~" +
          "A~~~~" +
          "L~~~~" +
          "E~~~~" +
          "M~~~~" +
          "A~~~~" +
          "T~~~~" +
          "E~~~~*|"
      );
      $(".square").off();
      $(".resetBottom").slideDown();
    }

    playerLetter = "";
    return true;
  }

  return false;
}

function playGame() {
  $(".square").click(function () {
    var play = parseInt($(this).attr("id"));
    if (board[play] == 0 && playerLetter != "") {
      if (playerLetter == "x") {
        board[play] = 1;
      } else {
        board[play] = -1;
      }

      if (players == 2) {
        if (playerLetter == "x") {
          playerLetter = "o";
        } else {
          playerLetter = "x";
        }
      }

      drawBoard();
      var testForWin = checkWin();
      if (players == 1 && testForWin == false) {
        talkTrash();
      }

      if (players != 2 && testForWin == false) {
        setTimeout(function () {
          computerMove();
          checkWin();
          drawBoard();
        }, 600);
      }
    }
  });
}

function drawBoard(win) {
  for (var i = 0; i < 9; i++) {
    if (board[i] >= 1) {
      $("#" + i).html("<span id=" + i + "text" + ">x</span>");
    } else if (board[i] <= -1) {
      $("#" + i).html("<span id=" + i + "text" + ">o</span>");
    }

    if (win == 1 && board[i] != 3 && board[i] != -3) {
      $("#" + i + "text").fadeOut(400, function () {
        $("#" + i).empty();
      });
    }

    if (win == 0) {
      $("#" + i).empty();
    }
    3;
  }
}

function talkTrash() {
  var trash = [
    '"' + playerLetter.toUpperCase() + '" GOES FOR IT!|',
    "REALLY???|",
    "I HAVE NO WORDS....|",
    "WHY THERE?|",
    "WHAT DID I EVER DO TO YOU??|",
    "YOU SURE ABOUT THAT?|",
    "I CAN'T LET YOU DO THAT, DAVE...|",
    "*YAWN*|",
    "THAT YOUR BEST?|",
    'YOU GIVEN UP, "' + playerLetter.toUpperCase() + '"?|',
    '"' + playerLetter.toUpperCase() + '" IS GOING DOWN!|',
    "I CANNOT BE DEFEATED!!|",
    "WHAT HAVE YOU DONE??!!|",
  ];

  newLine(trash[Math.floor(Math.random() * trash.length)]);
}

function noPlayerGame(times) {
  if (times > 0) {
    var winCheck = false;

    setTimeout(function () {
      playerLetter = "x";
      console.log("move for " + playerLetter);
      computerMove();
      drawBoard();
      winCheck = checkWin();
      if ($.inArray(0, board) == -1) {
        winCheck = true;
      }
      if (winCheck) {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        drawBoard();
        setTimeout(function () {
          //drawBoard(0);
          noPlayerGame(times - 1);
        }, moveDelay * 4);
        noPlayerGame(times - 1);
      } else {
        setTimeout(function () {
          playerLetter = "o";
          console.log("move for " + playerLetter);
          computerMove();
          drawBoard();
          winCheck = checkWin();
          if ($.inArray(0, board) == -1) {
            winCheck = true;
          }
          if (winCheck) {
            board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            drawBoard();
            setTimeout(function () {
              //drawBoard(0);
              noPlayerGame(times - 1);
            }, moveDelay * 4);
          }
          if (winCheck == false) {
            setTimeout(function () {
              //moveDelay -= 50;
              noPlayerGame(times);
            }, moveDelay * 1);
          }
        }, moveDelay);
      }
    }, moveDelay);
  }
}
