class Habitat {
  constructor(num) {
    this.environ = 1000;
    this.plants = []; 
    
    for (let i = 0; i < num; i++) {
      this.plants.push(new Plant(viewport.position(), new DNA()));
    }
  }

  /* Make a new plant
  born(x, y) {
    let l = createVector(x, y);
    let dna = new DNA();
    this.plants.push(new Plant(l, dna));
  }
  */
  
  disturb(effect) {
    this.environ += effect;
    if(this.environ > 1000) {
      this.environ = 1000;
    }
    if(this.environ < 50) {
      this.environ = 50;
    }
  }
  
  evolve() {
    //this.environs.evolve();

    // Cycle through the ArrayList backwards b/c we are deleting
    for (let i = this.plants.length - 1; i >= 0; i--) {
      // Plants grow
      let p = this.plants[i];
      p.evolve();
      // If it's dead, make environs
      if (p.dead()) {
        this.plants.splice(i, 1);
        this.disturb(1);
      }
      
      let child = p.reproduce(this.environ);
      if ((this.plants.length < this.environ) && (child != null)) {                                               this.plants.push(child);
        this.disturb(-.9);
        //console.log(this.plants.length)
      }  
        
    }
    
  }
  
  display () {
     for (let i = this.plants.length - 1; i >= 0; i--) {
       let p = this.plants[i];
       p.display();
     }
  }
}