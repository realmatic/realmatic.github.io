class Plant{
  constructor(l, dna_) {
    this.position = l.copy(); // Location
    this.health = 200; // Life timer
    this.dna = dna_; // DNA
    
    // DNA will determine 
    this.species = parseInt(random(3)); 
    this.width = map(this.dna.genes[1], 0, 1, 40, 80);
    this.height = map(this.dna.genes[2], 0, 1, 40, 80);
    this.rotation = map(this.dna.genes[3], 0, 1, 0, 2*PI);
  }

  evolve(environ=1000) {
    this.health -= 1 + environ/1000;
    this.width += 0.1 + environ/10000;
    this.height += 0.1 + environ/10000; 
    if(dist(agent.stretchX(),agent.pos.y, this.position.x,this.position.y) < 50) {
       this.health -= 20
    }
    
  }

  reproduce(environ=1000) {
    // asexual reproduction
    //random(number), bigger, slower
    if (random(7) < environ/10000) {
      // Child is exact copy of single parent
      let childDNA = this.dna.copy();
      // Child DNA can mutate
      childDNA.mutate(0.01);
      return new Plant(viewport.position(), childDNA);
    } else {
      return null;
    }
  }

  display() {
    if (!this.dead()) {
      push();
      tint(255, this.health);
      imageMode(CENTER);
      translate(this.position.x, this.position.y);
      rotate(this.rotation);
      image(ferns[this.species], 0, 0, this.width, this.height);
      pop();
    }
  }

  dead() {
    // close to agent die

    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
  
}