//This
const teacher = {nom : "Antoine"
    , matiere : "Langage C"
    , presenter(){
        console.log(`Je suis ${this.nom}, j'enseigne le ${this.matiere}`)
    }
};

teacher.presenter();


//Corriger le perte de référence avec bind
const presentereference = teacher.presenter;

presentereference(); //ceci affichera "Je suis undefined, j'enseigne le undefined"

//Solution avec bind
const presentfix = teacher.presenter.bind(teacher);
presentfix();

//printIdentity (ville, pays) avec call/apply
const personne = {
    nom : "Mirado", 
    age : 22
};

function printIdentity(ville, pays){
    console.log(`Je suis ${this.nom}, j'ai ${this.age} ans, je viens de ${ville}, ${pays} `);
}

//Call : arguments séparés
printIdentity.call(personne,  "Antananarivo", "Madagascar");

//Apply : arguments dans un tableau
printIdentity.apply(personne, ["Antananarivo", "Madagascar"]);