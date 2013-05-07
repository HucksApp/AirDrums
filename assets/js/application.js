if (screen.width <= 699) {
  document.location = "stick";
}

var socket = io.connect('/');
var snare = AudioFX('/assets/sounds/snare', { formats: ['mp3'], pool: 5, volume: 1.0 } );
var cowbell = AudioFX('/assets/sounds/cowbell', { formats: ['mp3'], pool: 5, volume: 1.0 } );
var tom1 = AudioFX('/assets/sounds/tom1', { formats: ['mp3'], pool: 5, volume: 1.0 } );
var ride = AudioFX('/assets/sounds/ride', { formats: ['mp3'], pool: 5, volume: 1.0 } );
var crash = AudioFX('/assets/sounds/crash', { formats: ['mp3'], pool: 5, volume: 1.0 } );
var kick = AudioFX('/assets/sounds/kick', { formats: ['mp3'], pool: 5, volume: 1.0 } );
//var connected = AudioFX('/assets/sounds/connected', {formats: ['mp3'], volume: 1.0 } );
// var hihat = AudioFX('/assets/sounds/hihat', { formats: ['mp3'], pool: 5, volume: 1.0 } );
// var tom2 = AudioFX('/assets/sounds/tom2', { formats: ['mp3'], pool: 5, volume: 1.0 } );

var sessionID = Math.round(Math.random()*1171).toString();
$('#key').append(sessionID);

socket.emit('join', sessionID);

socket.on('joined', function() {
  console.log('joined, woohoo!');
  transition();
});

socket.on('action', function(data){
  console.log(data);
  if (data === 'snare')
  snare.play();
  else if (data === 'hihat')
  hihat.play();
  else if (data === 'cowbell')
  cowbell.play();
  else if (data === 'tom1')
  tom1.play();
  else if (data === 'tom2')
  tom2.play();
  else if (data === 'crash')
  crash.play();
  else if (data === 'ride')
  ride.play();
  else if (data === 'kick')
  kick.play();
});

function transition() {
  $('#prejoin').slideUp();
  $('#postjoin').show();
  //connected.play();

  drawKit();
}

function drawKit() {
  var canvas = document.getElementById('drumSet');
  var context = canvas.getContext('2d');
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  var radius = canvas.width / 3;

  for(i=0; i<359; i+=72){
    var startAngle = radians(i);
    var endAngle = radians(i+72);
    var counterClockwise = false;

  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  context.lineWidth = 100;

  // line color
  context.strokeStyle = "rgb(" + String((i*3)% 255) + ", " + String((i*91)%255) +
    "," + String((i*34) % 255) + ")";
  context.stroke();
  }

}

function radians(degrees) {
  return (Math.PI/180) * degrees;
}
