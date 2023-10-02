// https://editor.p5js.org/zahrak/sketches/SyGFspkjz
// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>
// The Nature of Code

// sequence: viewport, agent, dna, plant, habitat, sounds
// disturb negative is bad

var canvasHeight = 540
var canvasWidth = 1200
var sceneHeight = 200
var agentSize = 50

var viewport
var agent
var agentimg
 
let habitat;
let ferns = [];

let ambientSounds = [];
let soundEffects = [-40, -40, -30, -50, -50, -20, -30, -30, 20, 40, 50, 50, 50, 30, 25, 25]
let soundIndex =0;
let soundInterval = 10;
let disturbanceLevel = 0;


function preload() {
  agentimg = loadImage('agent.png')
  ferns[0] = loadImage('fern1.png')
  ferns[1] = loadImage('fern2.png')
  ferns[2] = loadImage('fern3.png')
  
  //streamsound = createAudio('loop.mp3')
  
  for (let i = 0; i < 16; i++) {
     //ambientSounds[i] = createAudio('sample'+(i+1)+'.mp3')
  }
}

function setup() {
  frameRate(5);
  createCanvas(canvasWidth, canvasHeight)
  
  viewport = new Viewport(sceneHeight)
  agent = new Agent(agentSize)
  habitat = new Habitat(10)
}

function draw() {
  clear()

  viewport.render()
 
  agent.move(random(-5,5),random(-5,5))
  agent.update()
  agent.render()
  
  habitat.evolve();
  habitat.display();
  
  soundInterval -= 1;
  if(soundInterval == 0) {
      soundIndex =                           parseInt(random(ambientSounds.length)) ;
      //ambientSounds[soundIndex].play();
      disturbanceLevel = soundEffects[soundIndex]
      habitat.disturb(disturbanceLevel);
      //console.log(soundIndex);
      soundInterval = parseInt(random(10, 50));      
  }
  
  push()
  textSize(24);
  fill('green')
  text(parseInt(habitat.plants.length), width/2-30, sceneHeight/2-60);

  if(disturbanceLevel > 0) {
    fill(255);
  } else {
    fill('red');
  }  
  text(disturbanceLevel, width/2-30, sceneHeight/2);
  pop()
}


function mousePressed(){
    //getAudioContext().resume() 
    //streamsound.play()
    //streamsound.loop(true)
    //streamsound.volume(0.8)
}