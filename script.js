let h1 = document.querySelector("h1");
let p = document.querySelector("p");
let valider = document.querySelector(".milieu");
let rejouer = document.querySelector(".fin");
let voirMot = document.querySelector(".voirMot");
let lettres;
let partieDroite = document.querySelector("#partie-droite");
let partieGauche = document.querySelector('#partie-gauche');

let inputValider = document.querySelector('.input_valider');
let bouttonValider = document.querySelector('.boutton_valider');

let debut = document.querySelector('.debut');
let debutBoutton = document.querySelector('.debut_boutton');

let resultat = document.querySelector('.resultat');
let resultatTitre = document.querySelector('.resultat_titre');
let resultatBoutton = document.querySelector('.resultat_boutton');

let dernier = -1;
let imgNombre = 0;
let choixLettre = [];
let enLettre;
let copieMots;
let motAleatoire = -1;
let mots = [
    ["A", "X", "E"],
    ["C", "A", "R"],
    ["C", "O", "Q"],
    ["G", "A", "Z"],
    ["C", "E", "R", "F"],
    ["L", "U", "N", "E"],
    ["A", "V", "I", "O", "N"],
    ["B", "A", "R", "B", "E"],
    ["P", "O", "I", "R", "E"],
    ["B", "A", "L", "A", "D", "E"],
    ["P", "O", "D", "I", "U", "M"],
    ["P", "O", "U", "L", "P", "E"],
    ["C", "Y", "M", "B", "A", "L", "E"],
    ["T", "R", "I", "A", "N", "G", "L", "E"],
    ["A", "S", "C", "E", "N", "S", "E", "U", "R"],
    ["B", "R", "I", "L", "L", "A", "N", "C", "E"],
    ["C", "A", "B", "R", "I", "O", "L", "E", "T"],
    ["G", "R", "A", "P", "H", "I", "Q", "U", "E"],
    ["H", "O", "R", "O", "S", "C", "O", "P", "E"],
    ["P", "R", "I", "N", "T", "E", "M", "P", "S"],
    ["C", "O", "Q", "U", "E", "L", "I", "C", "O", "T"],
    ["L", "A", "B", "Y", "R", "I", "N", "T", "H", "E"]
]

// Sélection aléatoire du mot
function genererMot(max) {
    return Math.floor(Math.random() * Math.floor(max));
} 

// Afficher le mot partiellement caché au lancement du jeu
function lancerPartie() {
    do {
        motAleatoire = genererMot(mots.length);
    } while (motAleatoire == dernier)
    
    copieMots = [...mots[motAleatoire]];
    lettres = document.querySelectorAll (".lettres").length;
    console.log('Mot aléatoire : ' + mots[motAleatoire]);
    
    const cacherMot = copieMots.fill('_', 1, copieMots.length-1);
    enLettre = [...cacherMot];
    voirMot.textContent = enLettre.join(' ');
}

// Créer bouton "Démarrer" puis disparait
debutBoutton.addEventListener('click', () => {
    debut.classList.toggle('cache')
    lancerPartie()  
})

// Si lettre juste : affiche sur le mot / Si non : affiche un bout d'image du pendu
function verifLettre(lettres) {
    if (choixLettre.includes(lettres)) {
        console.log('Déjà utilisée')
    }
    else {
        choixLettre.push(lettres)
        if (mots[motAleatoire].includes(lettres)) {
            for (let i = 0; i < mots[motAleatoire].length; i++) {
                if (mots[motAleatoire][i] === lettres) {
                    enLettre[i] = lettres;
                }
            }
            voirMot.textContent = enLettre.join(' ');

            if (!enLettre.includes('_')) {
                resultat.classList.toggle('cache')
                resultatTitre.innerHTML = 'BRAVO ! Tu as trouvé le mot !'
            }
        } else {
            imgNombre++
            partieGauche.innerHTML = `<img class="image imageUn" src="Images/Etape${imgNombre}.svg" alt="Image 1">`

            if (imgNombre === 8) {
                resultat.classList.toggle('cache')
                resultatTitre.innerHTML = `Tu as perdu... Le mot était : <span style="color: #FCD8D4;">${mots[motAleatoire].join('')}</span>`
            }
        }
    }
}


//Rendre lettre cliquable
partieDroite.addEventListener('click', (e) => {
    if (e.target.classList.contains("lettres")) {
        let dernierClic = e.target.value;
        verifLettre(dernierClic);
        e.target.style.display = "none"
        }
    }
)

function transformerTableau() {
    let sansEspace = [...mots[motAleatoire]].join('')
    let enString = sansEspace.toString()

    return enString
}

bouttonValider.addEventListener('click', () => {
    let motChoisi = transformerTableau()
    let input = inputValider.value;

    if (input.toUpperCase() === motChoisi) {
        resultat.classList.toggle('cache')
        resultatTitre.innerHTML = 'BRAVO ! Tu as trouvé le mot !'
    } else {
        imgNombre++
        partieGauche.innerHTML = `<img class="image imageUn" src="Images/Etape${imgNombre}.svg" alt="Image 1">`
    }
})

// Créer bouton rejouer une fois fini
resultatBoutton.addEventListener('click', () => {
    location.reload()
})