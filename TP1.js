// TP1.js – Closures & fonctions avancées

// Création d’un compteur avec increment, decrement et valeur
function creerCompteur() {
    let valeur = 0; // variable privée

    return {
        incrementer: function() {
            valeur++;
            return valeur; // retourne la valeur pour pouvoir l'utiliser dans memoize
        },
        decrementer: function() {
            valeur--;
            return valeur; // retourne la valeur
        },
        valeur: function() {
            return valeur; // accès à la valeur actuelle
        }
    };
}

// Fonction once : exécute la fonction passée qu’une seule fois
function once(fn) {
    let called = false; // mémorise si la fonction a été appelée
    let result;         // mémorise le résultat du premier appel

    return function(...args) {
        if (!called) {
            called = true;
            result = fn(...args);
        }
        return result;
    };
}

// Fonction memoize : mémorise les résultats d’une fonction
function memoize(fn) {
    const memo = {}; // objet pour stocker les résultats

    return function(...args) {
        const key = JSON.stringify(args); // clé unique pour chaque ensemble d'arguments
        if (memo[key] !== undefined) {
            return memo[key]; // retourne le résultat mémorisé
        } else {
            const result = fn(...args); // calcule le résultat
            memo[key] = result;         // mémorise le résultat
            return result;
        }
    };
}
// Tests console

const counter = creerCompteur();
counter.incrementer();  
console.log(counter.valeur()); // 1
counter.incrementer();  
console.log(counter.valeur()); // 2
counter.decrementer();  
console.log(counter.valeur()); // 1

const incrementOnce = once(counter.incrementer);
incrementOnce(); // incrémente une seule fois
incrementOnce(); // n’a aucun effet
console.log(counter.valeur()); // 2 (incrémenté une seule fois)

//tester memoize
function carre(x) {
    console.log(`Calcul de ${x} * ${x}`);
    return x * x;
}

const carreMemo = memoize(carre);
console.log(carreMemo(5)); // Calcul réel + 25
console.log(carreMemo(5)); // 25 mémorisé, pas de calcul
console.log(carreMemo(6)); // Calcul réel + 36
console.log(carreMemo(6)); // 36 mémorisé, pas de calcul

// Exemple memoize
const incrementMemo = memoize(counter.incrementer);
console.log(incrementMemo()); // 3
console.log(incrementMemo()); // 3 (mémorisé)
console.log(counter.valeur()); // 3, la valeur du compteur a été modifiée
