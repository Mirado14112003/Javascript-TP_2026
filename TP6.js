// Récupérer le div pour afficher les résultats
const output = document.getElementById("output");

// ----------------------------
// Fonctions simulant des fetch (retournent des Promises)
// ----------------------------
function fetchUsers() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Aina", "Toky", "Mialy"]), 1000);
    });
}

function fetchCourses() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(["Math", "JS", "Science"]), 1500);
    });
}

function fetchGrades() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // On fait parfois échouer pour tester allSettled/any
            if (Math.random() < 0.5) resolve([12, 15, 18]);
            else reject("Erreur lors de fetchGrades");
        }, 1200);
    });
}

// ----------------------------
// Fonction pour afficher les résultats
// ----------------------------
function print(msg) {
    const p = document.createElement("p");
    p.textContent = msg;
    output.appendChild(p);
}

// ----------------------------
// Test Promise.all
// ----------------------------
document.getElementById("allBtn").addEventListener("click", () => {
    output.innerHTML = ""; // vider avant test
    print("Test Promise.all ...");

    Promise.all([fetchUsers(), fetchCourses(), fetchGrades()])
        .then(([users, courses, grades]) => {
            print("Users : " + users.join(", "));
            print("Courses : " + courses.join(", "));
            print("Grades : " + grades.join(", "));
        })
        .catch(err => print("Une promesse a échoué : " + err));
});

// ----------------------------
// Test Promise.race
// ----------------------------
document.getElementById("raceBtn").addEventListener("click", () => {
    output.innerHTML = "";
    print("Test Promise.race ...");

    Promise.race([fetchUsers(), fetchCourses(), fetchGrades()])
        .then(result => print("La première promesse terminée : " + JSON.stringify(result)))
        .catch(err => print("Erreur : " + err));
});

// ----------------------------
// Test Promise.allSettled
// ----------------------------
document.getElementById("allSettledBtn").addEventListener("click", () => {
    output.innerHTML = "";
    print("Test Promise.allSettled ...");

    Promise.allSettled([fetchUsers(), fetchCourses(), fetchGrades()])
        .then(results => {
            results.forEach((res, i) => {
                if (res.status === "fulfilled") {
                    print(`Promesse ${i} réussie : ${JSON.stringify(res.value)}`);
                } else {
                    print(`Promesse ${i} échouée : ${res.reason}`);
                }
            });
        });
});

// ----------------------------
// Test Promise.any
// ----------------------------
document.getElementById("anyBtn").addEventListener("click", () => {
    output.innerHTML = "";
    print("Test Promise.any ...");

    Promise.any([fetchUsers(), fetchCourses(), fetchGrades()])
        .then(result => print("Première promesse réussie : " + JSON.stringify(result)))
        .catch(err => print("Toutes les promesses ont échoué : " + err));
});
