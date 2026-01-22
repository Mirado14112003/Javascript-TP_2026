// TP 4 — Prototypes & ES6 Class

// Objectifs : Manipuler prototypes, comparer prototype vs class.
// Travail demandé :
// 1) Constructeur User + méthode login() via prototype.
// 2) Transformer en class User.
// 3) class Admin extends User avec deleteUser().
// Livrables : tp4_prototypes_class.js


// 1) Constructeur User + méthode login() via prototype.
function user(){
    this.id = 0,
    this.nom = 'Leo' 
}

//prototype login
user.login = function(id, nom){
    if(this.id == id && this.nom == nom){
        console.log("vous êtes connécté");
    }else{
        console.log("Nom incorrect && Mot de pass incorrect");
    }
}

class User{
    constructor(nom, age){
        this.nom = nom
        this.age = age
    }
    
    login(){
        if(this.id == id && this.nom == nom){
            console.log("vous êtes connécté");
        }else{
            console.log("Nom incorrect && Mot de pass incorrect");
        }
    }
}

class Admin extends User{
    deletUser(){
        super.nom = ''
        super.id = ''
    }
}