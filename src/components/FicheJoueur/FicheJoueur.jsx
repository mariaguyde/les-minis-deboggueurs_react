import { useState } from 'react';
import React from 'react';
import coeurPleinSrc from '../../assets/img/coeur_plein.svg';
import coeurVideSrc from '../../assets/img/coeur_vide.svg';
import Modal from '../Modal/Modal';


export default function FicheJoueur({ nbDeplacements, pouvoir, nom, nbVie, description, maudit, objectif, role, img, nomThematique, objectifImg, enfantsTab }) {


    const [showPopInEnfants, setShowPopInEnfants] = useState(false);

    const displayPopIn = () => {
        console.log('Display Pop In Animateurs');
        setShowPopInEnfants(true);
        console.log(showPopInEnfants);
    }

    if (maudit === true) {
        maudit = "oui"
    } else {
        maudit = "non"
    }

    // gestion du nombre de vie selon nbVie du joueurActuel avec une image now it works

    const genererCoeurs = (nbVies, coeur_plein, coeur_vide) => {
        const coeursTab = [];
        const nbViesMax = nbVies + 1; // valeur que je souhaite stocker
        console.log("----- Points de vie Max -----");
        console.log(nbViesMax);
        console.log("----------");

        // Là ca génère le nombre de vie
        for (let i = 0; i < nbVies; i++) {
            coeursTab.push(coeur_plein);
        }

        if (coeursTab.length < nbViesMax) {
            coeursTab.push(coeur_vide);
        }


        return coeursTab;
    };

    // bouton dans ficheAnimateur "Renvoyer un enfant au Dortoir" 
    // Méthode pour supprimer un point de vie --> ca pas prio gérer si il en a plus console.log(joueurActuel est OUT faut l'enlever de OrdreFinal)

    // const [pointDeVie, setPointDeVie] = useState();

    const [showPunition, setPunition] = useState(false);
    const [message, setMessage] = useState("");

    // il faut pendant l'affichage de la Modal, afficher le nombre de vies qu'il reste aux personnages
    const [messagePoint, setMessagePV] = useState(false);

    const retirerPointDeVie = (joueurChoisi) => {
        // match le nom du joueurChoisi et le nom dans le tableau enfantsTab
        const nomJoueurChoisi = joueurChoisi.nom;
        const indexEnfantTrouve = enfantsTab.findIndex(
            (enfantPunie) => enfantPunie.nom === nomJoueurChoisi
        );
        if (indexEnfantTrouve !== -1) {
            joueurChoisi.pv--;
            let message = `${nomJoueurChoisi} a ${joueurChoisi.pv} points de vie !`;
            if (joueurChoisi.pv <= 0) {
                message = `${nomJoueurChoisi} n'a plus de vie !`;
                enfantsTab.splice(indexEnfantTrouve, 1);
                setTimeout(() => {
                    setPunition(true);
                    setShowPopInEnfants(false);
                }, 3500);
            }
            setMessage(message);
        }
    }

    // const onClickConsole = (text, vara) => {
    //     console.log(text);
    //     console.log(vara);
    // }

    return (
        <div id='ficheJoueur'>
            {showPopInEnfants && (
                <Modal setShowModal={setShowPopInEnfants}>
                    {/* il faut que je réupere tous les enfantsChoisis */}
                    {enfantsTab && (
                        <>
                            <p className="title">Sélectionner l'enfant que l'animateur punie</p>
                            {console.log(enfantsTab)}
                            {enfantsTab.map((enfant, i) =>
                                <div key={i} id="ficheEnfantPunition" onClick={() => retirerPointDeVie(enfant)}>
                                    <p>{enfant.nom}</p>
                                    <p>{message}</p>
                                </div>
                            )}
                        </>
                    )}
                </Modal>
            )}
            {role === 'animateur' && (
                <div id='ficheAnimateur'>
                    <div className='tour-wrapper'>
                        <img src={img} alt={"image de profil de l'animateur " + nom} />
                        <div className='tour-wrapper__role'>
                            <p className='role__sous-titre'>{role}</p>
                            <p className='role__nom'>{nom}</p>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="actions__deplacement">
                            <div className="actions__row">
                                <div className="row__image">
                                    <img src={img} alt={"image de " + nom} />
                                </div>
                                <p><strong>{nom}</strong> peut avancer de <strong>{nbDeplacements}</strong></p>
                            </div>
                            <div className="actions__row">
                                <div className="row__image">
                                    <img src={objectifImg} alt={"image de jeton " + nomThematique} />
                                </div>
                                <p><strong>{nom}</strong> ramasse tous les jetons rouges <strong>"{nomThematique}"</strong> de la pièce.</p>
                            </div>
                            <div className="actions__row">
                                <div className="row__image">
                                    <img src={require("../../assets/img/dortoir.png")} alt="image du Dortoir" />
                                </div>
                                <p>Si un enfant est présent dans la pièce où arrive {nom}. Il est renvoyé au Dortoir</p>
                            </div>
                        </div>
                    </div>
                    <button className="actions__button" onClick={displayPopIn}>Renvoyez un enfant dans le dortoir</button>
                </div>
            )}
            {role === 'enfant' && (
                <div id='ficheEnfant'>
                    <div className='tour-wrapper'>
                        <div className="tour-wrapper__sub">
                            <img src={img} alt={"image de profil de " + nom} />
                            <div className='tour-wrapper__role'>
                                <p className='role__sous-titre'>{role}</p>
                                <p className='role__nom'>{nom}</p>
                            </div>
                        </div>
                        <div className="tour-wrapper__pv">
                            {genererCoeurs(nbVie, coeurPleinSrc, coeurVideSrc).map((image, index) => (
                                <img key={index} src={image} alt="coeur" />
                            ))}
                        </div>
                    </div>
                    <div className="actions">
                        <div className="actions__deplacement">
                            <div className="actions__row">
                                <div className="row__image">
                                    <img src={require("../../assets/img/deplacement.png")} alt={"image de " + nom} />
                                </div>
                                <p><strong>{nom}</strong> peut avancer de <strong>{nbDeplacements}</strong></p>
                            </div>
                            <div className="actions__row">
                                <div className="row__image">
                                    <img src={require("../../assets/img/deFiche.png")} alt="image pictogramme du Dortoir" />
                                </div>
                                <p>Le joueur doit effectuer 2 actions présentes dans la réserve de dés.</p>
                            </div>
                            <div className="actions__row">
                                <div className="row__image">
                                    <img src={require("../../assets/img/dortoir.png")} alt="image du Dortoir" />
                                </div>
                                <p>Si un enfant est présent dans la pièce où arrive {nom}. Il est renvoyé au Dortoir</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
