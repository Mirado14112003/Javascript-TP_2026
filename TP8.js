const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
const filtres = document.querySelector('.filtres'); 

let toutesLesTaches = [];

//Écoute le formulaire pour ajouter une tâche
form.addEventListener('submit', event=>{
    event.preventDefault();

    const text = input.value.trim();
    //Vérifier si le champ est vide avant d'ajouter la tâche. Vider aussi le champ d'input après que l'utilisateur clique sur ajouter
    if(text !==''){
        rajouterTache(text);
        input.value='';
    }
})

//Créer un nouvel objet avec deux attributs : text (nom de la tâche) et un ID qui est la date de création
function rajouterTache(text){

    const todo={
        text, 
        id: Date.now()
    }
    afficherListe(todo);
}

//Afficher une tâche dans la liste
function afficherListe(todo){

    const item = document.createElement('li');
    item.setAttribute('data-key', todo.id);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    item.appendChild(checkbox);

    const txt = document.createElement('span');
    txt.innerText = todo.text;
    item.appendChild(txt);

    const btn = document.createElement('button');
    const img = document.createElement('img');
    img.setAttribute('src', 'fermer.svg');
    btn.appendChild(img);
    item.appendChild(btn);

    liste.appendChild(item);
    toutesLesTaches.push(item);
}

//Event delegation : gérer checkbox et boutons depuis le parent ul
liste.addEventListener('click', (e)=>{
    const item = e.target.closest('li');
    if(!item) return;

    //Checkbox : marquer la tâche comme terminée
    if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox'){
        item.classList.toggle('finDeTache');
    }

    //Bouton supprimer
    if(e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG'){
        item.remove();
        toutesLesTaches = toutesLesTaches.filter(li => li.dataset.key !== item.dataset.key);
    }
})

//Filtrer les tâches : toutes / terminées / en cours
filtres.addEventListener('click', (e)=>{
    const filter = e.target.dataset.filter;
    toutesLesTaches.forEach(li=>{
        li.style.display = 'flex'; //réinitialiser l'affichage
        if(filter === 'done' && !li.classList.contains('finDeTache')) li.style.display = 'none';
        if(filter === 'todo' && li.classList.contains('finDeTache')) li.style.display = 'none';
    })
})
