//tableau de moyenne des eleves 
const students  = [
    { id: 1, nom: "Aina", parcours: "IAD", notes: [12, 14, 16] },
    {id: 2, nom: "Tiana", parcours: "ARSB", notes: [9, 10, 11] },
    {id: 3, nom: "Toky", parcours: "GLBD", notes: [15, 17, 16] },
    {id: 4, nom: "Hasina", parcours: "IAD", notes: [8, 9, 10] },
    {id: 5, nom: "Mialy", parcours: "ARSB", notes: [13, 11, 12] }
];

//ajouter la moyenne a chaque eleve utilisant la methode map
const ajoutermoyenne = students.map(student => {
    const total = student.notes.reduce((acc, note) => acc + note, 0);
    const average = total / student.notes.length;
    return { ...student, moyenne: average };
});
console.log(ajoutermoyenne);


//filtrer les eleves ayant une moyenne superieur a 12 utilisant la methode filter et afficher leur notes et nom avec parcours
const elevesAdmis = ajoutermoyenne.filter(student => student.moyenne >= 12);
console.log("Eleves ayant une moyenne superieur a 12:");
console.log(elevesAdmis.map(student => ({ nom: student.nom, parcours: student.parcours, notes: student.notes })));

//triage d'eleve par ordre decroissant par moyenne utilisant la methode sort
const trierParMoyenne = ajoutermoyenne.sort((a, b) => b.moyenne - a.moyenne);
console.log("Eleves tries par ordre decroissant de leur moyenne:");
console.log(trierParMoyenne);

//grouper les eleves par parcours utilisant la methode reduce
const grouperParParcours = ajoutermoyenne.reduce((acc, student) => {
    if (!acc[student.parcours]) {
        acc[student.parcours] = [];
    }
    acc[student.parcours].push(student);
    return acc;
}, {});
console.log("Eleves groupes par parcours:");
console.log(grouperParParcours);
