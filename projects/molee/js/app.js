
(function($) { 
 function modalOpen(){ $('#modal-score').modal('show') }
 $( document ).ready(modalOpen);


    $.fn.shake = function(settings) {
        if(typeof settings.interval == 'undefined'){
            settings.interval = 100;
        }

        if(typeof settings.distance == 'undefined'){
            settings.distance = 10;
        }

        if(typeof settings.times == 'undefined'){
            settings.times = 4;
        }

        if(typeof settings.complete == 'undefined'){
            settings.complete = function(){};
        }


        for(var iter=0; iter<(settings.times+1); iter++){
            $(this).animate({ left:((iter%2 == 0 ? settings.distance : settings.distance * -1)) }, settings.interval);
        }

        $(this).animate({ left: 0}, settings.interval, settings.complete);  
    }; 
    
        
$(document).ready(function shake(){
    $('img.mole').click(function(e){
        $(this).shake({
            interval: 200,
            distance: 100,
            times: 20
        });
    });

   })
    })(jQuery);



if(window.innerHeight > window.innerWidth){
    alert("Please rotate your device for best experience.");
}

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const btnStart = document.querySelector('button#go');
const bonkSound = document.querySelector('#whSound');
const startScreen = document.querySelector('.start-screen');
const showScore = document.querySelector('.show-score');

let score = 0;
let lastHole;
let timeUp = false;
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(500, 1500);
  const hole = randomHole(holes);

  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    scoreBoard.classList.remove('add');
    if (!timeUp) peep();
  }, time);
}


function start() {
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  scoreBoard.classList.remove('add');
  (function($) { $('#modal-score').modal('hide') })(jQuery);

  // start peep
  peep();

  setTimeout(() => {
    timeUp = true;
   (function($) { $('#modal-score').modal('show') })(jQuery);

    if (score >= 0) {
      showScore.classList.add('show');
      const message = 'Your score: ' + score +' moles.' + (score >= 10 ? " GREAT!" : '') + (score >= 1 && score <= 5 ? " Get Reckt" : '') + (score = 0 ? " That's Sad" : '');
      showScore.textContent = message;
    }

  }, 15000);
}

function whac(e) {
  (function($) { $(document).ready(function shake(){
    $('img.mole').click(function(e){
        $(this).shake({
            interval: 200,
            distance: 100,
            times: 20
        });
    });

   }) })(jQuery);
  bonkSound.currentTime = 0;
  if (!timeUp) {
    bonkSound.play();
    scoreBoard.classList.add('add');
    score++;
    scoreBoard.textContent = score;
  }
}

moles.forEach(mole => {
  mole.addEventListener('click', whac);
});

btnStart.addEventListener('click', start);

var aud1 = document.getElementById("lobby1");
var aud2 = document.getElementById("lobby2");
var aud3 = document.getElementById("lobby3");
var aud4 = document.getElementById("lobby4");

function bong(e){
aud1.onended = function() {
    aud3.play();
}; 
}
aud3.onended = function() {
    aud4.play();
}; 
aud4.onended = function() {
    aud1.play();
}; 

function begin(e){

  aud1.pause();
  aud1.currentTime = 0;
  aud3.play();
}
btnStart.addEventListener('click', begin);