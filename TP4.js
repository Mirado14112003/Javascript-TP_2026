// TP 4 — Prototypes & ES6 Class

// Objectifs : Manipuler prototypes, comparer prototype vs class.
// Travail demandé :
// 1) Constructeur User + méthode login() via prototype.
// 2) Transformer en class User.
// 3) class Admin extends User avec deleteUser().
// Livrables : tp4_prototypes_class.js

 
// TP4 — Prototypes & ES6 Class

// Constructeur User + prototype
function User(id = 0, nom = 'Leo') {
    this.id = id;
    this.nom = nom;
}

User.prototype.login = function(id, nom) {
    if (this.id === id && this.nom === nom) {
        console.log("vous êtes connecté");
    } else {
        console.log("Nom incorrect && Mot de passe incorrect");
    }
}

// Class User
class UserClass {
    constructor(id, nom, age) {
        this.id = id;
        this.nom = nom;
        this.age = age;
    }

    login(id, nom) {
        if (this.id === id && this.nom === nom) {
            console.log("vous êtes connecté");
        } else {
            console.log("Nom incorrect && Mot de passe incorrect");
        }
    }
}

// Class Admin
class Admin extends UserClass {
    deleteUser() {
        this.nom = '';
        this.id = 0;
    }
}

// Tests
console.log(" Prototype User ");
const u1 = new User(1, 'Leo');
u1.login(1, 'Leo'); // connecté
u1.login(2, 'John'); // incorrect

console.log("\n Class User ");
const u2 = new UserClass(2, 'Anna', 25);
u2.login(2, 'Anna'); // connecté
u2.login(3, 'Anna'); // incorrect

console.log("\n Admin ");
const admin = new Admin(99, 'Admin', 30);
admin.deleteUser();
console.log(admin); // nom='' id=0