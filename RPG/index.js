const DIRECTIONS = {
    forward: "forward",
    backward: "backward"
};

const TURN_DIRECTION = {
    left: "left",
    right: "right"
};

class Hero {
    constructor(name, maxHP, resource, baseDmg = 5) {
        this.name = name;
        this.currentHP = maxHP;
        this.maxHP = maxHP;
        this.statuses = [];
        this.resource = resource;
        this.baseDamage = baseDmg;

    }

    turn(direction) {
        console.log(`${this.name} turns ${direction}.`);
    }

    walk(steps, direction) {
        console.log(`${this.name} walks ${steps} steps ${direction}.`);
    }

    attack(target) {
        console.log(
            `${this.name} attacks ${target.name} for ${this.baseDamage} damage.`
        );

        if (target) {
            target.applyDamage(this.baseDamage);
        }
    }

    getHP() {
        const hp = `${this.currentHP.toFixed(2)}/${this.maxHP.toFixed(2)}`;
        // console.log(`${this.name} has ${hp} hit points.`);

        return hp;
    }

    applyDamage(damage) {
        this.currentHP -= damage;
        console.log(`${this.name} is taking ${damage} damage. Current HP: ${this.currentHP.toFixed(2)}`);
    }

    applyHP(hp) {
        //scrieti codul care adauga viata si afiseaza la consola: Healing <name> with <hp>. Current HP: <value>
    }
}

class Warrior extends Hero {
    constructor(name, maxHP, resource, baseDmg = 5, life) {
        super(name, maxHP, resource, 8, life);
        this.armor = 0;
    }

    block() {
        if (this.resource >= 20) {
            this.armor += 3;
            this.resource -= 20;
            console.log(
                `${this.name} blocks and gains 3 armor. Resources: ${
            this.resource
          } | Armour: ${this.armor}`
            );
        } else {
            console.log(`${this.name} doesn't have enough resources to block.`);
        }
    }

    bash(target) {
        if (this.resource >= 15) {
            const damage = this.baseDamage * 1.2 + 10;

            console.log(
                `${this.name} bashes ${target.name} for ${damage} damage. Resources: ${
            this.resource
          } | Armour: ${this.armor}`
            );
            this.resource -= 15;
            target.applyDamage(damage);
        } else {
            alert(`${this.name} doesn't have enough resources to bash.`);
        }
    }

    slam(target) {
        if (this.resource >= 10) {
            const damage = this.baseDamage * 0.9 + 5;

            console.log(
                `${this.name} slams ${target.name} for ${damage} and applies dazed.`
            );
            this.resource -= 10;
            target.applyDamage(damage);
        } else {
            console.log(`${this.name} doesn't have enough resources to slam.`);
        }
    }
}

function renderCharacters(characters) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    characters.forEach(character => {
                const child = document.createElement("div");
                child.className = "card mb-2";

                child.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text">${character.getHP()}</p>
          <button href="#" id="atk-button-${
            character.name
          }" class="btn btn-primary">ATTACK</button>
          <button href="#" id="bash-button-${
            character.name
          }" class="btn btn-primary">BASH</button>
        </div>
  
      <select class="custom-select" id="${character.name}-target">
        ${characters
          .filter(c => c.name !== character.name)
          .map(c => `<option value="${c.name}">${c.name}</option>`)}
      </select>
      `;
  
      container.appendChild(child);
  
      document
        .getElementById(`atk-button-${character.name}`)
        .addEventListener("click", function() {
          const targetValue = document.getElementById(`${character.name}-target`)
            .value;
          const target = characters.find(function(character) {
            return character.name === targetValue;
          });
  
          character.attack(target);
          renderCharacters(characters);
        });
  
      document
        .getElementById(`bash-button-${character.name}`)
        .addEventListener("click", function() {
          const targetValue = document.getElementById(`${character.name}-target`)
            .value;
          const target = characters.find(function(character) {
            return character.name === targetValue;
          });
  
          character.bash(target);
          renderCharacters(characters);
        });
    });
  }
  
  var characters = [];
  
  const form = document.querySelector("#hero-form");
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const heroInput = document.getElementById("hero-name").value;
    const heroClass = document.getElementById("hero-class").value;
  
    if (heroClass === "warrior") {
      const warrior = new Warrior(heroInput, 50, 100);
      characters.push(warrior);
    } else if (heroClass === "mage") {
      const mage = new Mage(heroInput, 25, 300);
      characters.push(mage);
    } else if (heroClass === "priest") {
      const priest = new Priest(heroInput, 25, 300);
      characters.push(priest);
    }
  
    renderCharacters(characters);
  });
  
  //HOMEWORK
  
  //Implementati caracterele Mage si Priest care sa aiba aiba abilitatile exprimate in comentarii
  
  class Mage extends Hero {
    constructor(name, maxHP, resource, baseDmg = 5) {
      super(name, maxHP, resource, 40);
    }
  
    fireball(targets) {
//if (characters.baseDamage <= 40){
    targets = 40;
    characters.maxHP = this.maxHP - targets;
    console.log( `${this.name} applies ${targets} damage to all characters`)
//}  
//const fireDamage = characters.maxHP - 40;
            //console.log( `${this.name} applies ${fireDamage} to all characters`)
   
      //Mage are abilitatea dea a scade viata tuturor caracterelor cu valoarea <baseDamage, default 40>
      //scrieti codul care scade viata tuturor caracterelor si afiseaza la consola: <name> applies <baseDamage value> damage to all characters.
    }
  }
  
  class Priest extends Hero {
    constructor(name, maxHP, resource, baseDmg = 5, ) {
      super(name, maxHP, resource, 10);
    }
  
    heal(target, amount) {
        
            target.resource += this.amount;
           Priest.resource -= this.amount;
            console.log(`${this.name} give to ${target.name} ${amount} of lifes`)
        
      //Priest poate sa dea cata viata vrea unui caracter dar i se scade acelasi numar din resurse
      //scrieti codul care adauga viata, scade resursele preotului cu valoarea vietii si afiseaza la consola: <name> heals <target name> with <value> HP.
    }
  
    pray() {
        if (this.baseDamage >= 10){
        Priest.resource = this.baseDamage + 10;
        characters.maxHP += 10;
        console.log(`${this.name} prays and got ${10} resources. Now has ${Priest.resource} to heal the others.`)
      //Priest se poate ruga si primeste resurse in valoare de <baseDamage, default 10>, resurse pe care le poate folosi sa dea HP altor caractere
      //scrieti codul care adauga adauga resurse preotului si afiseaza la consola: <name> prays and got <baseDamage> resources. Now has <new resources value> to heal the others.
    }
}
  }
  const conan = new Warrior("Conan", 50, 100);
  const omulSimplu = new Warrior("Omul Simplu", 40, 20);
  const boca = new Priest("Boca", 100, 100);
  const mage = new Mage("Knight", 10, 10, 15);
  
  characters = [conan, omulSimplu, boca, mage];
  renderCharacters(characters);
  
  /* INPUT: */
  conan.turn(TURN_DIRECTION.left);
  omulSimplu.walk(5, DIRECTIONS.forward);
  console.log("=========== FIGHT ===========");
  conan.attack(omulSimplu);
  omulSimplu.block(conan);
  conan.attack(omulSimplu);
  console.log("=====")
  boca.heal(omulSimplu,50);
  conan.attack(boca);
  boca.pray();
  omulSimplu.attack(conan);
  mage.fireball(characters.slice(0, characters.length - 1));




  
  /* OUTPUT:
  Conan turns left. 
  Omul Simplu walks 5 steps forward. 
  =========== FIGHT =========== 
  Conan attacks Omul Simplu for 8 damage. 
  Omul Simplu is taking 8 damage. Current HP: 32.00 
  Omul Simplu blocks and gains 3 armor. Resources: 0 | Armour: 3 
  Conan attacks Omul Simplu for 8 damage. 
  Omul Simplu is taking 8 damage. Current HP: 24.00 
  
  Boca heals Omul Simplu with 50 HP 
  Healing Omul Simplu with 50. Current HP: 74.00 
  Conan attacks Boca for 8 damage. 
  Boca is taking 8 damage. Current HP: 92.00 
  Boca prays and got 10 resources. Now has 60 to heal the others. 
  Omul Simplu attacks Conan for 8 damage. 
  Conan is taking 8 damage. Current HP: 42.00 
  Knight applies 40 damage to all characters. 
  Conan is taking 40 damage. Current HP: 2.00 
  Omul Simplu is taking 40 damage. Current HP: 34.00 
  Boca is taking 40 damage. Current HP: 52.00 
  */