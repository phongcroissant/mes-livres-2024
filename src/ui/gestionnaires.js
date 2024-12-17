// Gestionnaire d'évènement
import {estLu, insererLivre, supprimerLivreById} from "../services/livreService.js";
import {afficherLivres} from "./render.js";

export const setUpGestionnaire = () => {

    // Récupérer les éléments dans le DOM
    const toggleFormBtn = document.querySelector("#toggleFormBtn")
    const formSection = document.querySelector("#formSection")
    const livreForm = document.querySelector("#bookForm")

    const formCollapse = new bootstrap.Collapse(formSection,{toggle : false})
    // Gestionnaire clic bouton toggleFormBtn
    toggleFormBtn.addEventListener("click",()=> {
        formCollapse.toggle()
    })
    // Reset le formulaire lorsque celui-ci est caché
    formSection.addEventListener('hidden.bs.collapse',()=> {
        livreForm.reset()
    })

    // Traitement du formulaire
    livreForm.addEventListener("submit", (evt)=> {
        // Empecher le rechargement de la page
        evt.preventDefault()
        // Récupérer les valeurs saisies
        const titre= livreForm.title.value
        const auteur= livreForm.author.value
        const resume= livreForm.summary.value
        const estLu= livreForm.isRead.checked
        console.log(titre, auteur, resume, estLu)

        insererLivre(titre,auteur,resume,estLu)

        // Cacher (collapse) le formulaire
        formCollapse.hide()
        afficherLivres()
    })
    // Traitement de la suppresion d'un livre
    // Déléguation d'évènement
    const listeLivres = document.querySelector('#booksList')
    listeLivres.addEventListener('click',(evt)=>{
        // Récupérer l'élément sur lequel on a cliqué
        const target = evt.target.closest(".delete-btn, .toggle-read-btn")
        if (target===null) return
        // Récupérer l'id du livre à supprimer à partir du data-id (dataSet)
        const idLivre=target.dataset.id
        // Déterminer sur quel élément on a cliqué
        if (target.classList.contains("delete-btn")) {
            supprimerLivreById(idLivre)
            afficherLivres()
        } else if (target.classList.contains("toggle-read-btn")) {
            estLu(idLivre)
            afficherLivres()
        }
    })
}