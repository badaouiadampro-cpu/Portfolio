import React, { Component } from 'react'
import $ from 'jquery';

// Terminal personnalisé pour Adam
export class Terminal extends Component {
    constructor() {
        super();
        this.curseur = ""; // curseur clignotant
        this.nb_lignes = 1; // nombre de lignes dans le terminal
        this.repertoire_courant = "~"; // répertoire courant
        this.nom_repertoire = "root"; // nom du répertoire courant
        this.commandes_precedentes = []; // historique des commandes
        this.index_commandes = -1; // index pour naviguer dans l'historique
        this.sous_repertoires = { // structure des dossiers et contenus
            root: ["Apropos", "Document-perso", "Skills", "Intérêts", "Langues"],
            Apropos: ["Étudiant en BTS SIO, j’ai débuté par une première expérience en support\ninformatique où j’ai assuré l’assistance aux utilisateurs et la résolution\n d’incidents. J’ai ensuite intégré XEFI, ce qui m’a permis d’acquérir une\n approche plus professionnelle et technique notamment en support et\n déploiement d’infrastructures réseau (pare-feu, routeurs,...). Issu d’une\n formation commerciale, je possède un bon sens de la communication,\n une compréhension des besoins clients et une capacité à vulgariser des\n sujets techniques. Fort de ces bases en réseaux et commerce, je\n souhaite poursuivre mon parcours en alternance afin de me spécialiser\n en cybersécurité."],
            Skills: ["Installation, configuration et gestion de serveurs Linux et Windows", "Gestion des utilisateurs, droits et stratégies de groupe (Active Directory), GPO", "Mise en place de services réseaux : DHCP, DNS, SFTP, Apache,SSH, VPN, Téléphonie IP", "Configuration et maintenance d’équipements réseau : switchs, routeurs, firewalls"],
            Intérêts: ["OSINT", "Cybersécurité", "Ingenierie Sociale"],
            Langues: ["Français", "Anglais", "Arabe"],
        };
        this.state = {
            terminal: [], // contenu du terminal
        }
    }

    componentDidMount() {
        this.reinitialiserTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.curseur);
        this.demarrerCurseur(this.nb_lignes - 2);
    }

    componentWillUnmount() {
        clearInterval(this.curseur);
    }

    reinitialiserTerminal = () => {
        clearInterval(this.curseur);
        $('#terminal-body').empty();
        this.ajouterLigneTerminal();
    }

    ajouterLigneTerminal = () => {
        let terminal = this.state.terminal;
        terminal.push(this.ligneTerminal(this.nb_lignes));
        this.setState({ terminal });
        this.nb_lignes += 2;
    }

    ligneTerminal = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full">
                    <div className="flex">
                        <div className=" text-blue-500 ">Adam@kali</div>
                        <div className="text-white mx-px font-medium ">:</div>
                        <div className=" text-ubt-blue ">{this.repertoire_courant}</div>
                        <div className="text-white mx-px font-medium mr-1 ">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCurseur} className=" bg-transparent relative flex-1 overflow-hidden">
                        <span id={`affiche-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider "></span>
                        <div id={`curseur-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white "></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.verifierTouche} onBlur={this.defocusCurseur} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent " spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`ligne-resultat-${id}`} className={"my-2 font-normal text-[#93AC8F]"}></div>
            </React.Fragment>
        );
    }

    focusCurseur = (e) => {
        clearInterval(this.curseur);
        this.demarrerCurseur($(e.target).data("row-id"));
    }

    defocusCurseur = (e) => {
        this.arreterCurseur($(e.target).data("row-id"));
    }

    demarrerCurseur = (id) => {
        clearInterval(this.curseur);
        $(`input#terminal-input-${id}`).trigger("focus");
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#affiche-${id}`).text($(this).val());
        });
        this.curseur = window.setInterval(function () {
            const curseur = $(`#curseur-${id}`);
            curseur.css('visibility', curseur.css('visibility') === 'visible' ? 'hidden' : 'visible');
        }, 500);
    }

    arreterCurseur = (id) => {
        clearInterval(this.curseur);
        $(`#curseur-${id}`).css({ visibility: 'visible' });
    }

    retirerCurseur = (id) => {
        this.arreterCurseur(id);
        $(`#curseur-${id}`).css({ display: 'none' });
    }

    effacerInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    verifierTouche = (e) => {
        if (e.key === "Enter") {
            const ligne_id = $(e.target).data("row-id");
            const commande = $(`input#terminal-input-${ligne_id}`).val().trim();
            if (!commande) return;
            this.retirerCurseur(ligne_id);
            this.executerCommandes(commande, ligne_id);

            this.commandes_precedentes.push(commande);
            this.index_commandes = this.commandes_precedentes.length - 1;

            this.effacerInput(ligne_id);
        } else if (e.key === "ArrowUp") { this.naviguerHistorique(e, -1); }
        else if (e.key === "ArrowDown") { this.naviguerHistorique(e, 1); }
    }

    naviguerHistorique(e, direction) {
        if (this.commandes_precedentes.length === 0) return;
        if (direction === -1) this.index_commandes = Math.max(this.index_commandes, 0);
        if (direction === 1) this.index_commandes = Math.min(this.index_commandes, this.commandes_precedentes.length - 1);
        const commande_prec = this.commandes_precedentes[this.index_commandes];
        const ligne_id = $(e.target).data("row-id");
        $(`input#terminal-input-${ligne_id}`).val(commande_prec);
        $(`#affiche-${ligne_id}`).text(commande_prec);
        this.index_commandes += direction;
    }

    sousRepertoires = (parent) => {
        let fichiers = [];
        fichiers.push(`<div class="flex justify-start flex-wrap">`)
        this.sous_repertoires[parent].forEach(f => {
            fichiers.push(`<span class="font-bold mr-2 text-ubt-blue">'${f}'</span>`)
        });
        fichiers.push(`</div>`)
        return fichiers;
    }

    fermerTerminal = () => { $("#close-terminal").trigger('click'); }

    executerCommandes = (commande, ligneId) => {
        const mots = commande.split(' ').filter(Boolean);
        const principale = mots[0];
        mots.shift();
        const reste = mots.join(" ").trim();
        let resultat = "";

        switch(principale) {
            case "cd":
                if (!reste) { this.repertoire_courant = "~"; this.nom_repertoire = "root"; break; }
                if (this.sous_repertoires[this.nom_repertoire].includes(reste)) {
                    this.repertoire_courant += "/" + reste;
                    this.nom_repertoire = reste;
                } else resultat = `bash: cd: ${reste}: Aucun fichier ou dossier`;
                break;
            case "ls":
                let cible = reste || this.nom_repertoire;
                if (cible in this.sous_repertoires) resultat = this.sousRepertoires(cible).join("");
                else resultat = `ls: impossible d'accéder à '${cible}'`;
                break;
            case "pwd": resultat = this.repertoire_courant.replace("~", "/home/Adam"); break;
            case "clear": this.reinitialiserTerminal(); return;
            case "exit": this.fermerTerminal(); return;
            default: resultat = `Commande '${principale}' non trouvée ou non implémentée.<br>Commandes disponibles: [ cd, ls, pwd, clear, exit ]`;
        }

        document.getElementById(`ligne-resultat-${ligneId}`).innerHTML = resultat;
        this.ajouterLigneTerminal();
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn opacity-60 text-white text-sm font-bold" id="terminal-body">
                { this.state.terminal }
            </div>
        )
    }
}

export default Terminal;

export const afficherTerminal = (ajouterDossier, ouvrirApp) => {
    return <Terminal addFolder={ajouterDossier} openApp={ouvrirApp}> </Terminal>;
}
