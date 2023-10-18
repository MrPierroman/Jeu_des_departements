let zoneQuestionQCM = document.getElementById("zoneQCM");
let btnEnvoyerReponse = document.getElementById("btnEnvoyerReponse");
let zoneConsigne = document.getElementById("consigne");

let optionDepartement = [
  document.getElementById("exemple1"),
  document.getElementById("exemple2"),
  document.getElementById("exemple3"),
];

let optionNumero = [
  document.getElementById("exemple4"),
  document.getElementById("exemple5"),
  document.getElementById("exemple6"),
];

let optionPrefecture = [
  document.getElementById("exemple7"),
  document.getElementById("exemple8"),
  document.getElementById("exemple9"),
];

let listePropositionDepartement = [];
let listePropositionNumero = [];
let listePropositionPrefecture = [];
let listeNombreAuPif = [];
let listeNombresInterdits = [];
let nombreAuPif;
let departementATrouver;
let numeroATrouver;
let prefectureATrouver;

function nombreAuPifSansInterdit(max, liste) {
  let nombre = Math.floor(Math.random() * max);
  do {
    nombre = Math.floor(Math.random() * max);
  } while (elementEstDansTableau(nombre, liste) === true);
  return nombre;
}

function elementEstDansTableau(nombre, tableau) {
  for (let i = 0; i < tableau.length; i++) {
    if (nombre === tableau[i]) {
      return true;
    }
  }
  return false;
}

console.log(nombreAuPifSansInterdit(3, [0, 2]));

//     if (nombre === liste[i]) {
//       return nombreAuPifSansInterdit(max, liste);
//     }
//   }
//   return nombre;
// }

function lancementQCM() {
  if (listeNombresInterdits.length === 96) {
    alert(
      `Bravo, votre score est de ${score}/97 ! Rechargez la page pour rejouer.`
    );
    zoneQuestionQCM.style.display = "none";
  } else {
    nombreAuPif = nombreAuPifSansInterdit(
      listeDepartements.length,
      listeNombresInterdits
    );
    console.log(nombreAuPif);
    listeNombreAuPif.push(nombreAuPif);
    listePropositionDepartement.push(listeTemporaire[nombreAuPif]);
    listePropositionPrefecture.push(listeTemporairePrefecture[nombreAuPif]);
    listePropositionNumero.push(listeTemporaireNumero[nombreAuPif]);
    for (let i = 0; i < 2; i++) {
      nombreAuPif = getRandomInt(listeTemporaire.length);
      console.log(nombreAuPif);
      listeNombreAuPif.push(nombreAuPif);
      listePropositionDepartement.push(listeTemporaire[nombreAuPif]);
      listePropositionPrefecture.push(listeTemporairePrefecture[nombreAuPif]);
      listePropositionNumero.push(listeTemporaireNumero[nombreAuPif]);
    }
    console.log(listePropositionDepartement);
    console.log(listePropositionNumero);
    listeNombresInterdits.push(listeNombreAuPif[0]);
    console.log(listeNombresInterdits);
    departementATrouver = listePropositionDepartement[0];
    numeroATrouver = listePropositionNumero[0];
    prefectureATrouver = listePropositionPrefecture[0];

    for (let i = 0; i < listeDepartements.length; i++) {
      if (departementATrouver === listeDepartements[i].id) {
        departementAColore = document.getElementById(departementATrouver);
        departementAColore.style.fill = "#b33f62";
      }
    }

    for (let i = 0; i < optionDepartement.length; i++) {
      let nombreInjectionHasard = getRandomInt(
        listePropositionDepartement.length
      );
      optionDepartement[i].innerHTML =
        listePropositionDepartement[nombreInjectionHasard];
      listePropositionDepartement.splice(nombreInjectionHasard, 1);
      listeNombreAuPif.splice(nombreInjectionHasard, 1);
    }
    for (let i = 0; i < optionNumero.length; i++) {
      let nombreInjectionHasard = getRandomInt(listePropositionNumero.length);
      optionNumero[i].innerHTML = listePropositionNumero[nombreInjectionHasard];
      listePropositionNumero.splice(nombreInjectionHasard, 1);
    }
    for (let i = 0; i < optionPrefecture.length; i++) {
      let nombreInjectionHasard = getRandomInt(
        listePropositionPrefecture.length
      );
      optionPrefecture[i].innerHTML =
        listePropositionPrefecture[nombreInjectionHasard];
      listePropositionPrefecture.splice(nombreInjectionHasard, 1);
    }
  }
}

let btnDepartement = [
  document.getElementById("btn1"),
  document.getElementById("btn2"),
  document.getElementById("btn3"),
];

let btnNumero = [
  document.getElementById("btn4"),
  document.getElementById("btn5"),
  document.getElementById("btn6"),
];

let btnPrefecture = [
  document.getElementById("btn7"),
  document.getElementById("btn8"),
  document.getElementById("btn9"),
];

let point = 0;
let choixJoueurDepartement = "";
let choixJoueurNumero = "";
let choixJoueurPrefecture = "";

// function verifChoixJoueur () {}
btnEnvoyerReponse.addEventListener("click", () => {
  for (let i = 0; i < btnDepartement.length; i++) {
    if (btnDepartement[i].checked === true) {
      choixJoueurDepartement = optionDepartement[i].innerHTML;
    }
    if (btnNumero[i].checked === true) {
      choixJoueurNumero = optionNumero[i].innerHTML;
    }
    if (btnPrefecture[i].checked === true) {
      choixJoueurPrefecture = optionPrefecture[i].innerHTML;
    }
  }
  console.log(choixJoueurDepartement);
  console.log(choixJoueurNumero);
  console.log(choixJoueurPrefecture);
  verifChoixJoueurQCM();
  point = 0;
});

function verifChoixJoueurQCM() {
  let paireDepartementTrouvee = false;
  let paireNumeroTrouvee = false;
  let pairePrefectureTrouvee = false;

  if (choixJoueurDepartement === departementATrouver) {
    point++;
    paireDepartementTrouvee = true;
  }
  if (choixJoueurNumero === numeroATrouver) {
    point++;
    paireNumeroTrouvee = true;
  }
  if (choixJoueurPrefecture === prefectureATrouver) {
    point++;
    pairePrefectureTrouvee = true;
  }

  if (
    paireDepartementTrouvee === false ||
    paireNumeroTrouvee === false ||
    pairePrefectureTrouvee === false
  ) {
    alert(
      `La bonne réponse était département : ${departementATrouver}, numéro : ${numeroATrouver} et préfecture : ${prefectureATrouver}`
    );
  }
  if (point >= 2) {
    for (let i = 0; i < departementsFrancais.length; i++) {
      if (departementATrouver === departementsFrancais[i]) {
        departementAColore = document.getElementById(departementATrouver);
        departementAColore.style.fill = "green";
        score++;
        zoneScore.innerHTML = score;
      }
    }
  } else {
    for (let i = 0; i < departementsFrancais.length; i++) {
      if (departementATrouver === departementsFrancais[i]) {
        departementAColore = document.getElementById(departementATrouver);
        departementAColore.style.fill = "red";
      }
    }
  }
  lancementQCM();
}