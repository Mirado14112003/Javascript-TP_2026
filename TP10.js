// Données des étudiants (JSON local)
const students = [
 { id: 1, nom: "Aina", parcours: "IAD", notes: [12, 14, 16] },
 { id: 2, nom: "Tiana", parcours: "ARS", notes: [9, 10, 11] },
 { id: 3, nom: "Toky", parcours: "GLBD", notes: [15, 17, 16] },
 { id: 4, nom: "Hasina", parcours: "IAD", notes: [8, 9, 10] },
 { id: 5, nom: "Mialy", parcours: "ARS", notes: [13, 11, 12] }
];

// Ajouter la moyenne pour chaque étudiant
students.forEach(s => {
    s.moyenne = s.notes.reduce((a,b) => a+b,0)/s.notes.length;
});

let filteredStudents = [...students]; // tableau pour filtrage/recherche


// Récupération des éléments du DOM
 
const tableBody = document.querySelector("#studentTable tbody");
const searchInput = document.getElementById("searchInput");
const filterParcours = document.getElementById("filterParcours");
const sortNameBtn = document.getElementById("sortNameBtn");
const sortMoyBtn = document.getElementById("sortMoyBtn");
const exportCsvBtn = document.getElementById("exportCsvBtn");

  
// Remplir le select des parcours
  
const parcoursSet = new Set(students.map(s => s.parcours));
parcoursSet.forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    filterParcours.appendChild(option);
});

  
// Fonction pour afficher le tableau
  
function renderTable(data) {
    tableBody.innerHTML = ""; // vider le tableau
    data.forEach(student => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${student.nom}</td>
            <td>${student.parcours}</td>
            <td>${student.notes.join(", ")}</td>
            <td>${student.moyenne.toFixed(2)}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Afficher le tableau au démarrage
renderTable(filteredStudents);

  
// Filtrer par parcours
  
filterParcours.addEventListener("change", () => {
    const parcours = filterParcours.value;
    filteredStudents = students.filter(s => parcours === "" || s.parcours === parcours);
    // appliquer recherche
    const search = searchInput.value.toLowerCase();
    if(search) {
        filteredStudents = filteredStudents.filter(s => s.nom.toLowerCase().includes(search));
    }
    renderTable(filteredStudents);
});

  
// Recherche live par nom
  
searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase();
    filteredStudents = students.filter(s => s.nom.toLowerCase().includes(search));
    // appliquer filtre parcours
    const parcours = filterParcours.value;
    if(parcours) {
        filteredStudents = filteredStudents.filter(s => s.parcours === parcours);
    }
    renderTable(filteredStudents);
});

  
// Trier par nom
  
sortNameBtn.addEventListener("click", () => {
    filteredStudents.sort((a,b) => a.nom.localeCompare(b.nom));
    renderTable(filteredStudents);
});

  
// Trier par moyenne
  
sortMoyBtn.addEventListener("click", () => {
    filteredStudents.sort((a,b) => b.moyenne - a.moyenne);
    renderTable(filteredStudents);
});

  
// Export CSV
  
exportCsvBtn.addEventListener("click", () => {
    let csv = "Nom,Parcours,Notes,Moyenne\n";
    filteredStudents.forEach(s => {
        csv += `${s.nom},${s.parcours},"${s.notes.join(" ")}",${s.moyenne.toFixed(2)}\n`;
    });
    const blob = new Blob([csv], {type: "text/csv"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
});
