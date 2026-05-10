import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutVivek extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // écran actif par défaut
            navbar: false,
        };
    }

    componentDidMount() {
        this.screens = {
            about: <About />,
            education: <Education />,
            skills: <Skills />,
            projects: <Projects />,
            resume: <Resume />,
        };

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        const el = document.getElementById(lastVisitedScreen);
        if (el) {
            this.changeScreen(el);
        } else {
            this.setState({
                screen: this.screens[lastVisitedScreen],
                active_screen: lastVisitedScreen,
            });
        }
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        localStorage.setItem("about-section", screen);

        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "About section" });

        this.setState({
            screen: this.screens[screen],
            active_screen: screen,
        });
    };

    showNavBar = () => {
        this.setState((prev) => ({ navbar: !prev.navbar }));
    };

    renderNavLinks = () => {
        const { active_screen } = this.state;

        const baseClasses =
            " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5";

        const active = " bg-ub-orange bg-opacity-100 hover:bg-opacity-95";
        const inactive = " hover:bg-gray-50 hover:bg-opacity-5";

        return (
            <>
                <div
                    id="about"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={(active_screen === "about" ? active : inactive) + baseClasses}
                >
                    <img className="w-3 md:w-4" alt="À propos" src="./themes/Yaru/status/about.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">À propos</span>
                </div>

                <div
                    id="education"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={(active_screen === "education" ? active : inactive) + baseClasses}
                >
                    <img className="w-3 md:w-4" alt="Scolarité" src="./themes/Yaru/status/education.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">Scolarité</span>
                </div>

                <div
                    id="skills"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={(active_screen === "skills" ? active : inactive) + baseClasses}
                >
                    <img className="w-3 md:w-4" alt="Compétences" src="./themes/Yaru/status/skills.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">Compétences</span>
                </div>

                <div
                    id="projects"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={(active_screen === "projects" ? active : inactive) + baseClasses}
                >
                    <img className="w-3 md:w-4" alt="Mes projets" src="./themes/Yaru/status/projects.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">Projets</span>
                </div>

                <div
                    id="resume"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={(active_screen === "resume" ? active : inactive) + baseClasses}
                >
                    <img className="w-3 md:w-4" alt="Mon CV" src="./themes/Yaru/status/download.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">CV</span>
                </div>
            </>
        );
    };

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                {/* Barre latérale desktop */}
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>

                {/* Bouton menu mobile */}
                <div
                    onClick={this.showNavBar}
                    className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1"
                >
                    <div className="w-3.5 border-t border-white"></div>
                    <div
                        className="w-3.5 border-t border-white"
                        style={{ marginTop: "2pt", marginBottom: "2pt" }}
                    ></div>
                    <div className="w-3.5 border-t border-white"></div>

                    <div
                        className={
                            (this.state.navbar ? " visible animateShow z-30 " : " invisible ") +
                            " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"
                        }
                    >
                        {this.renderNavLinks()}
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutVivek;

export const displayAboutVivek = () => {
    return <AboutVivek />;
};


/* =========================
   SECTION : À PROPOS
   ========================= */

/* =========================
   SECTION : PRÉSENTATION
========================= */

function About() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 px-4 md:px-0 flex flex-col items-center">

      {/* TITRE */}
      <h1 className="mt-10 text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
        Présentation
      </h1>

      {/* QUI SUIS-JE */}
      <div className="relative mt-8 w-full md:w-3/4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <h2 className="text-center text-xl font-bold mb-4 text-pink-400">
            Qui suis-je ?
          </h2>

          <ul className="text-sm md:text-base space-y-3 leading-tight">
            <li>
              Étudiant en BTS SIO, j’ai débuté par une première expérience en support
              informatique où j’ai assuré l’assistance aux utilisateurs et la résolution
              d’incidents. J’ai ensuite intégré XEFI, ce qui m’a permis d’acquérir une
              approche plus professionnelle et technique notamment en support et
              déploiement d’infrastructures réseau (pare-feu, routeurs,...). Issu d’une
              formation commerciale, je possède un bon sens de la communication,
              une compréhension des besoins clients et une capacité à vulgariser des
              sujets techniques. Fort de ces bases en réseaux et commerce, je
              souhaite poursuivre mon parcours en alternance afin de me spécialiser
              en cybersécurité.
            </li>

            <li>
              Mon parcours professionnel est le suivant : Avant l’informatique, j’ai suivi une
              formation commerciale en première année de BTS NDRC avant d’intégrer mon BTS SIO.
              Cette double compétence technique et relationnelle me permet aujourd’hui de comprendre aussi bien
              les enjeux techniques que les besoins humains et métiers. Je sais analyser
              une problématique, la traduire en solution concrète et l’expliquer simplement.
            </li>
          </ul>
        </div>
      </div>

      {/* SÉPARATEUR */}
      <div className="my-10 w-1/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* FORMATION */}
      <div className="relative w-full md:w-3/4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <h2 className="text-center text-xl font-bold mb-4 text-pink-400">
            Formation
          </h2>

          <ul className="text-sm md:text-base space-y-3">
            <li>
              <span className="font-bold">
                BTS SIO – Services Informatiques aux Organisations (2024 – 2026)
              </span><br />
              Spécialisation progressive vers les réseaux, systèmes et la cybersécurité.
            </li>

            <li>
              <span className="font-bold">
                BTS NDRC – Négociation et Digitalisation de la Relation Client (2023 – 2024)
              </span><br />
              Acquisition de solides compétences en communication et gestion de projets.
            </li>

            <li>
              <span className="font-bold">
                Bac STMG – Sciences et Technologies du Management et de la Gestion (2022 – 2023)
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* SÉPARATEUR */}
      <div className="my-10 w-1/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* EXPÉRIENCES */}
      <div className="relative w-full md:w-3/4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <h2 className="text-center text-xl font-bold mb-4 text-pink-400">
            Expériences professionnelles
          </h2>

          <ul className="text-sm md:text-base space-y-6">
            <li>
              <span className="font-bold">
                Technicien Informatique – XEFI Poitiers (Janvier – Février 2026)
              </span><br /><br />
              - Assistance aux utilisateurs<br />
              - Déploiement et administration de services réseau (VPN, DNS, DHCP)<br />
              - Gestion d’infrastructures réseau<br />
              - Téléphonie IP
            </li>

            <li>
              <span className="font-bold">
                Technicien Informatique – Lycée Saint-Jacques de Compostelle (Mai – Juin 2025)
              </span><br /><br />
              - Maintenance du parc informatique<br />
              - Active Directory<br />
              - Assistance utilisateurs<br />
              - Documentation technique
            </li>
          </ul>
        </div>
      </div>

      {/* SÉPARATEUR */}
      <div className="my-10 w-1/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* COMPÉTENCES */}
      <div className="relative w-full md:w-3/4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <h2 className="text-center text-xl font-bold mb-4 text-pink-400">
            Compétences techniques
          </h2>

          <ul className="text-sm md:text-base space-y-4">
            <li><span className="font-bold">Systèmes & Réseaux</span><br />Windows Server, Linux, AD, DHCP, DNS, VPN, Apache</li>
            <li><span className="font-bold">Réseau & Sécurité</span><br />Pare-feu, routeurs, switchs</li>
            <li><span className="font-bold">Support & Méthodologie</span><br />Assistance, diagnostic, documentation</li>
          </ul>
        </div>
      </div>

      {/* SÉPARATEUR */}
      <div className="my-10 w-1/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* LANGUES & OBJECTIF */}
      <div className="relative w-full md:w-3/4 group mb-12">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <h2 className="text-center text-xl font-bold text-pink-400 mb-2">Langues</h2>
          <p className="text-center text-sm md:text-base">
            Français · Arabe · Anglais (B2)
          </p>

          <h2 className="mt-6 text-center text-xl font-bold text-pink-400">
            Objectif professionnel
          </h2>

          <p className="mt-3 text-sm md:text-base text-center">
            Je souhaite développer mes compétences et acquérir une véritable expérience professionnelle grâce à une alternance.
            La cybersécurité représente pour moi un domaine stratégique où rigueur, éthique et responsabilité sont essentielles.
          </p>
        </div>
      </div>

      {/* CONTACT */}
      <div className="mt-4 mb-12 text-center text-sm text-zinc-400">
        📧 badaoui.adam.pro@gmail.com <br />
        🌐 ab-portfolio.fr
      </div>
    </div>
  );
}




/* =========================
   SECTION : À PROPOS
   ========================= 
function About() {
    return (
        <>
            <div className="mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>
                    Je m&apos;appelle <span className="font-bold">Adam Badaoui</span>,
                </div>
                <div className="font-normal ml-1">
                    Je suis{" "}
                    <span className="text-pink-600 font-bold">
                        étudiant en BTS SIO option SISR
                    </span>
                </div>
            </div>

            <div className="mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>

            <ul className="mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className="list-pc">
                    Je suis{" "}
                    <span className="font-medium">une personne sérieuse et impliquée</span>, qui aime comprendre
                    comment les systèmes fonctionnent en profondeur. J&apos;aime voir un projet avancer étape
                    par étape et savoir exactement ce que je fais.
                </li>
                <li className="mt-3 list-building">
                    Je suis quelqu&apos;un de curieux, posé, qui préfère faire les choses proprement plutôt que
                    à la va-vite. J&apos;apprécie le travail structuré : procédures, documentations, tests.
                </li>
                <li className="mt-3 list-time">
                    J&apos;aime apprendre en pratiquant : laboratoires réseaux, VMs, firewall, projets concrets.
                    Quand je bloque, je cherche, je teste, je demande, mais je lâche pas facilement.
                </li>
                <li className="mt-3 list-star">
                    En dehors de l&apos;informatique, je m&apos;intéresse aussi au sport, au développement
                    personnel et aux projets d&apos;investissement à long terme. Mon objectif, c&apos;est
                    d&apos;évoluer autant techniquement que personnellement.
                </li>
            </ul>
        </>
    );
}
*/

/* =========================
   SECTION : SCOLARITÉ
   ========================= */

/*function Education() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Scolarité
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        BTS SIO – option SISR
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">
                        2024 - 2026 – Lycée Aliénor d&apos;Aquitaine, Poitiers
                    </div>
                    <div className="text-sm md:text-base">
                        Spécialisation en solutions d&apos;infrastructure, systèmes et réseaux : serveurs, services
                        réseau, sécurité, virtualisation.
                    </div>
                </li>

                <li className="list-disc mt-5">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        BTS NDRC
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">
                        2023 - 2024 – Lycée Bois d&apos;Amour, Poitiers
                    </div>
                    <div className="text-sm md:text-base">
                        Formation en négociation, relation client et commerce, apportant une vision terrain et
                        une aisance dans le contact humain.
                    </div>
                </li>

                <li className="list-disc mt-5">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        Baccalauréat STMG
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">
                        2022 - 2023 – Lycée Saint-Jacques de Compostelle, Poitiers
                    </div>
                    <div className="text-sm md:text-base">
                        Sciences et technologies du management et de la gestion : gestion, droit, économie,
                        organisation des entreprises.
                    </div>
                </li>
            </ul>
        </>
    );
}
*/
function Education() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 px-4 md:px-0 flex flex-col items-center">

      {/* TITRE */}
      <h1 className="mt-10 text-2xl md:text-3xl font-bold tracking-wide bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
        Scolarité
      </h1>

      {/* CARD : Ynov Bordeaux */}
      <div className="relative mt-6 w-full md:w-3/4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <span className="absolute left-0 top-6 h-8 w-[2px] bg-gradient-to-b from-pink-500 to-violet-500 rounded-full"></span>

          <div className="text-lg md:text-xl font-bold leading-tight">
            Bachelor Cybersécurité
          </div>

          <div className="text-sm text-zinc-400 mt-1">
            2026 – 2027 · Ynov Campus, Bordeaux
          </div>

          <div className="mt-2 text-sm md:text-base text-zinc-200">
            Approche pratique de la cybersécurité : analyse de vulnérabilités,
            sécurité réseau, gestion des risques, protection des systèmes et
            sensibilisation aux enjeux cyber modernes.
          </div>
        </div>
      </div>

      {/* SÉPARATEUR */}
      <div className="my-10 w-1/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* CARD : BTS SIO */}
      <div className="relative w-full md:w-3/4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <span className="absolute left-0 top-6 h-8 w-[2px] bg-gradient-to-b from-pink-500 to-violet-500 rounded-full"></span>

          <div className="text-lg md:text-xl font-bold leading-tight">
            BTS SIO – option SISR
          </div>

          <div className="text-sm text-zinc-400 mt-1">
            2024 – 2026 · Lycée Aliénor d'Aquitaine, Poitiers
          </div>

          <div className="mt-2 text-sm md:text-base text-zinc-200">
            Spécialisation en solutions d'infrastructure, systèmes et réseaux :
            serveurs, services réseau, sécurité, virtualisation.
          </div>
        </div>
      </div>

      {/* SÉPARATEUR */}
      <div className="my-10 w-1/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* CARD : BTS NDRC */}
      <div className="relative w-full md:w-3/4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <span className="absolute left-0 top-6 h-8 w-[2px] bg-gradient-to-b from-pink-500 to-violet-500 rounded-full"></span>

          <div className="text-lg md:text-xl font-bold leading-tight">
            BTS NDRC
          </div>

          <div className="text-sm text-zinc-400 mt-1">
            2023 – 2024 · Lycée Bois d'Amour, Poitiers
          </div>

          <div className="mt-2 text-sm md:text-base text-zinc-200">
            Formation en négociation, relation client et commerce, apportant une
            vision terrain et une aisance dans le contact humain.
          </div>
        </div>
      </div>

      {/* SÉPARATEUR */}
      <div className="my-10 w-1/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* CARD : BAC STMG */}
      <div className="relative w-full md:w-3/4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <span className="absolute left-0 top-6 h-8 w-[2px] bg-gradient-to-b from-pink-500 to-violet-500 rounded-full"></span>

          <div className="text-lg md:text-xl font-bold leading-tight">
            Baccalauréat STMG
          </div>

          <div className="text-sm text-zinc-400 mt-1">
            2022 – 2023 · Lycée Saint-Jacques de Compostelle, Poitiers
          </div>

          <div className="mt-2 text-sm md:text-base text-zinc-200">
            Sciences et technologies du management et de la gestion : gestion,
            droit, économie, organisation des entreprises.
          </div>
        </div>
      </div>

    </div>
  );
}


/* =========================
   SECTION : COMPÉTENCES V1
   ========================= 

function Skills() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Compétences techniques
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            <p className="w-10/12 text-sm md:text-base text-center">
                Le tableau de compétences ainsi que les fiches de procédures des projets sont des supports nécessaires en vue de passer une de mes épreuves de BTS SIO .  
                Une fois finalisés, ils seront accessibles ici sous forme de fichiers PDF.
            </p>

            <div className="mt-6 flex justify-center w-full">
                <a
                    href="./files/Tableau de synthèse - Épreuve E5 - BTS SIO 2025 - Tableau_de_synthèse_Épreuve_E4.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-ub-orange text-white rounded hover:bg-opacity-80 transition duration-150"
                >
                    Ouvrir le tableau de compétences
                </a>
            </div>

            <p className="w-10/12 text-xs md:text-sm text-gray-300 mt-4 text-center">
                (Ce fichier n'est pas définitif)
            </p>
        </>
    );
}*/
function Skills() {
  return (
    <section className="w-full flex flex-col items-center">

      {/* TITRE */}
      <h2 className="mt-10 text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
        Compétences techniques
      </h2>

      {/* TEXTE INTRO */}
      <p className="w-10/12 md:w-8/12 text-sm md:text-base text-center text-zinc-300 mt-4">
        Le tableau de compétences est un document clé pour l’épreuve E5 du BTS SIO.
        Il synthétise les compétences acquises en formation et en entreprise,
        en lien direct avec les projets techniques présentés sur ce portfolio.
      </p>

      {/* CARTE */}
      <div className="relative mt-10 w-10/12 md:w-8/12 group">
        {/* Halo dégradé */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        {/* Carte */}
        <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-zinc-100">
                Tableau de compétences – BTS SIO
              </h3>
              <p className="text-sm text-zinc-400">
                Épreuve E5 · Document PDF
              </p>
            </div>

            <span className="text-xs px-2 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
              En cours
            </span>
          </div>

          <ul className="mt-4 text-sm md:text-base text-zinc-200 list-disc ml-4 space-y-1">
            <li>Recensement structuré des compétences techniques.</li>
            <li>Appui aux projets et procédures professionnelles.</li>
            <li>Support officiel pour la validation du diplôme.</li>
          </ul>
        </div>
      </div>

      {/* BOUTON DÉTACHÉ */}
      <a
        href="./files/Tableau de synthèse - Épreuve E5 - BTS SIO 2025.pdf"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block text-sm px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90 transition"
      >
        Ouvrir le tableau de compétences
      </a>

      {/* ESPACE BAS */}
      <div className="mb-16"></div>
    </section>
  );
}


/* =========================
   SECTION : PROJETS V2
========================= */
function Projects() {
  const project_list = [
    {
      name: "AP 4.4 - WebLab GSB",
      date: "2026",
      pdf: "./files/AP4_synthetique_10_pages.pdf",
      description: [
        "Déploiement d’une infrastructure WebLab composée de plusieurs services : serveur web, serveur de base de données, Active Directory et accès sécurisé.",
        "Configuration d’Apache, PHP et MariaDB, intégration au domaine, gestion des droits utilisateurs et sécurisation de base de l’environnement.",
      ],
    },
    {
      name: "Interventions en stage - Lycée Saint-Jacques de Compostelle",
      date: "2025",
      pdf: "./files/Interventions réalisés Stage Badaoui Adam.pdf",
      description: [
        "Réalisation d’interventions techniques dans un environnement scolaire : assistance utilisateurs, maintenance de postes et résolution d’incidents.",
        "Participation à la gestion du parc informatique, au support matériel et logiciel, ainsi qu’au suivi des interventions réalisées.",
      ],
    },
    {
      name: "Cahier des charges - Lycée Saint-Jacques de Compostelle",
      date: "2025",
      pdf: "./files/Cahier des charges Stage Badaoui Adam.pdf",
      description: [
        "Rédaction d’un cahier des charges lié aux besoins informatiques du lycée et à l’organisation du parc matériel.",
        "Analyse du contexte, identification des besoins, définition des objectifs et présentation des contraintes techniques.",
      ],
    },
    {
      name: "Organisation et gestion du parc informatique - Lycée Saint-Jacques de Compostelle",
      date: "2025",
      pdf: "./files/Organisation et gestion du parc informatique Badaoui Adam.pdf",
      description: [
        "Organisation, inventaire et suivi du parc informatique de l’établissement.",
        "Gestion du matériel, suivi des équipements, mise à jour des informations et amélioration de la traçabilité du parc.",
      ],
    },
    {
      name: "Carnet de bord - Lycée Saint-Jacques de Compostelle",
      date: "2025",
      pdf: "./files/Carnet de bord Stage Badaoui Adam.pdf",
      description: [
        "Suivi chronologique des activités réalisées durant le stage au lycée.",
        "Présentation des missions effectuées, des interventions techniques et des compétences mobilisées.",
      ],
    },
    {
      name: "Création de logo - Lycée Saint-Jacques de Compostelle",
      date: "2026",
      pdf: "./files/Design sans titre.png",
      description: [
        "Création d’un logo dans le cadre d’un projet lié au lycée Saint-Jacques de Compostelle.",
        "Travail de conception graphique, choix visuel et production d’un support de communication.",
      ],
    },
    {
      name: "Interventions en stage - Xefi",
      date: "2026",
      pdf: "./files/Interventions_Stage_Xefi.docx.pdf",
      description: [
        "Réalisation d’interventions techniques en entreprise : préparation de postes, assistance utilisateurs et support informatique.",
        "Suivi des demandes, résolution d’incidents et participation aux opérations de maintenance matérielle et logicielle.",
      ],
    },
    {
      name: "Cahier des charges - Xefi",
      date: "2026",
      pdf: "./files/Deploiement_de_postes_automatise.pdf",
      description: [
        "Rédaction d’un cahier des charges pour un projet de déploiement automatisé de postes informatiques.",
        "Définition des besoins, des contraintes techniques, des ressources nécessaires et des résultats attendus.",
      ],
    },
    {
      name: "Fiche de procédure - Déploiement Windows 11 - Xefi",
      date: "2026",
      pdf: "./files/Deploiement_de_postes_automatise.pdf",
      description: [
        "Procédure de déploiement automatisé de postes Windows 11 dans un environnement professionnel.",
        "Préparation de l’image système, automatisation de l’installation, configuration initiale et vérification du bon fonctionnement des postes.",
      ],
    },
    {
      name: "Carnet de bord - Xefi",
      date: "2026",
      pdf: "./files/Carnet_de_bord_Badaoui.docx.pdf",
      description: [
        "Suivi des activités réalisées durant le stage chez Xefi.",
        "Présentation des interventions, des missions de support et des compétences techniques développées.",
      ],
    },
    {
      name: "Fiche de procédure - Docker",
      date: "2026",
      pdf: "./files/Fiche de procédure Docker.pdf",
      description: [
        "Mise en place d’environnements applicatifs à l’aide de Docker et Docker Compose.",
        "Création, configuration et lancement de conteneurs pour déployer des services web de manière isolée et reproductible.",
      ],
    },
    {
      name: "Fiche de procédure - MikroTik",
      date: "2026",
      pdf: "./files/fiche_mikrotik.pdf",
      description: [
        "Présentation des commandes et paramètres essentiels pour administrer un équipement MikroTik.",
        "Configuration de base du réseau, des interfaces, du routage, du pare-feu et des services principaux.",
      ],
    },
    {
      name: "Fiche de procédure - WirelessMon",
      date: "2026",
      pdf: "./files/Fiche de procédure — Cartographier un réseau Wi-Fi avec WirelessMon.pdf",
      description: [
        "Utilisation de WirelessMon pour analyser et cartographier un réseau Wi-Fi.",
        "Relevé des signaux, identification des points d’accès, analyse de la couverture et repérage des zones faibles.",
      ],
    },
    {
      name: "Fiche de procédure - Virtualisation avec Disk2vhd",
      date: "2025",
      pdf: "./files/FICHE_PROCÉDURE_Virtualisation_Disk2vhd.pdf",
      description: [
        "Création d’une image virtuelle d’un poste physique à l’aide de Disk2vhd.",
        "Conversion du disque en fichier VHD/VHDX afin de permettre son utilisation dans un environnement virtualisé.",
      ],
    },
    {
      name: "AP 4.4 - Schéma réseau GSB",
      date: "2026",
      pdf: "./files/Schéma GSB Réseau.png",
      description: [
        "Réalisation d’un schéma réseau représentant l’infrastructure du projet GSB.",
        "Visualisation des serveurs, des postes clients, des services réseau et des liens entre les différents éléments.",
      ],
    },
    {
      name: "Firewall - Sophos XGS",
      date: "2026",
      pdf: "./files/THOMYRIS - SOPHOS - XGS - Procédure Initialisation FIREWALL V1.8.1.pdf",
      description: [
        "Configuration initiale d’un pare-feu Sophos XGS dans le cadre du déploiement d’une infrastructure réseau professionnelle.",
        "Paramétrage des interfaces, sécurisation des flux, tests de connectivité et mise en place des règles de filtrage.",
      ],
    },
    {
      name: "Switch - Aruba",
      date: "2026",
      pdf: "./files/THOMYRIS - ARUBA - INITIALISATION SWITCH ARUBA INSTANT ON_V4.pdf",
      description: [
        "Configuration d’un switch Aruba dans un environnement réseau professionnel.",
        "Mise en place des VLAN, configuration des ports, segmentation du réseau et tests de communication entre les équipements.",
      ],
    },
    {
      name: "TP - Mise en haute disponibilité",
      date: "2026",
      pdf: "./files/TP_Haute_Disponibilité.pdf",
      description: [
        "Étude et mise en place d’une solution de haute disponibilité pour assurer la continuité de service.",
        "Analyse des risques, configuration de mécanismes de redondance et vérification du basculement en cas d’incident.",
      ],
    },
    {
      name: "Projet - Renouvellement du parc informatique",
      date: "2025",
      pdf: "./files/Procédure_renouvellement_parc_informatique.pdf",
      description: [
        "Organisation du renouvellement d’un parc informatique : retrait des anciens équipements et installation du nouveau matériel.",
        "Branchement, vérification, préparation des postes, gestion du matériel et mise au rebut via la filière D3E.",
      ],
    },
    {
      name: "TP - Cloud privé et Cloud public",
      date: "2026",
      pdf: "./files/Cloud privé et cloud public.pdf",
      description: [
        "Comparaison entre les solutions de cloud privé et de cloud public.",
        "Analyse des avantages, des limites, des usages possibles et des enjeux liés à la sécurité, aux coûts et à la disponibilité.",
      ],
    },
    {
      name: "Mémento - 3CX",
      date: "2026",
      pdf: "./files/Mémento 3CX — Téléphonie IP _ PBX.pdf",
      description: [
        "Synthèse des notions essentielles liées à la téléphonie IP et à l’administration d’un PBX 3CX.",
        "Présentation des commandes, paramètres et éléments à connaître pour gérer les utilisateurs, extensions et appels.",
      ],
    },
    {
      name: "Mémento - Switch Cisco",
      date: "2025",
      pdf: "./files/Mémento Cisco.pdf",
      description: [
        "Mémento des commandes principales pour configurer et administrer un switch Cisco.",
        "Configuration des VLAN, des ports, du trunk, des interfaces et vérification de l’état du réseau.",
      ],
    },
    {
      name: "Mémento - Routeur Zyxel",
      date: "2025",
      pdf: "./files/memento_zyxel.pdf",
      description: [
        "Synthèse des paramètres importants pour administrer un routeur Zyxel.",
        "Configuration réseau de base, accès à l’interface, gestion du Wi-Fi, du pare-feu et des règles de sécurité.",
      ],
    },
    {
      name: "AP 3.4 - WebLab GSB - Serveur Web et PHP",
      date: "2025",
      pdf: "./files/Fiche_procédure_WEB_GSB.pdf",
      description: [
        "Configuration du serveur web pour l’hébergement de l’application GSB.",
        "Installation et paramétrage d’Apache, PHP et des fichiers nécessaires au bon fonctionnement de l’application.",
      ],
    },
    {
      name: "AP 3.4 - WebLab GSB - Base de données",
      date: "2025",
      pdf: "./files/Fiche_procédure_BDD_GSB.pdf",
      description: [
        "Mise en place du serveur de base de données pour l’application GSB.",
        "Installation de MariaDB, création de la base, importation des tables et configuration des accès utilisateurs.",
      ],
    },
    {
      name: "Accès distant - VPN Sophos",
      date: "2026",
      pdf: "./files/THOMYRIS_SOPHOS_Procédure_vpn_connect_ssl.pdf",
      description: [
        "Installation et configuration du client VPN Sophos Connect afin de permettre un accès distant sécurisé au réseau de l’entreprise.",
        "Établissement du tunnel VPN, authentification utilisateur et vérification de l’accès aux ressources internes autorisées.",
      ],
    },
    {
      name: "Sécurisation des accès - Authentification forte Sophos OTP",
      date: "2026",
      pdf: "./files/THOMYRIS - SOPHOS - Initialisation authentification à double facteur.pdf",
      description: [
        "Mise en place de l’authentification forte par OTP sur un pare-feu Sophos.",
        "Configuration de la double authentification via le User Portal afin de renforcer la sécurité des accès utilisateurs.",
      ],
    },
    {
      name: "Wi-Fi - Aruba Instant On",
      date: "2026",
      pdf: "./files/THOMYRIS - ARUBA WIFI.pdf",
      description: [
        "Configuration et administration de bornes Wi-Fi Aruba Instant On dans un environnement professionnel.",
        "Création des réseaux Wi-Fi, gestion des SSID, sécurisation des accès et validation de la couverture réseau.",
      ],
    },
    {
      name: "Fiche de procédure - Veeam",
      date: "2025",
      pdf: "./files/fiche-de-procedure-config-sauvegarde.pdf",
      description: [
        "Configuration d’une solution de sauvegarde avec Veeam.",
        "Création des tâches de sauvegarde, paramétrage des destinations, planification et vérification de la restauration des données.",
      ],
    },
    {
      name: "Procédure d’installation - GLPI sur Debian",
      date: "2025",
      pdf: "./files/Procédure d’installation de GLPI sur Debian Console.pdf",
      description: [
        "Installation de GLPI sur un serveur Debian en ligne de commande.",
        "Configuration du serveur web, de la base de données, des dépendances PHP et finalisation de l’installation via l’interface web.",
      ],
    },
    {
      name: "Fiche de procédure - Référencement Web",
      date: "2026",
      pdf: "./files/Fiche procédure — Référencement Web.pdf",
      description: [
        "Mise en place d’actions de référencement naturel pour améliorer la visibilité d’un site web.",
        "Optimisation des contenus, des balises, de la structure des pages et vérification des bonnes pratiques SEO.",
      ],
    },
    {
      name: "Fiche de procédure - Mise en place d’un serveur DHCP",
      date: "2025",
      pdf: "./files/Fiche de procédure _ Mise en place d’un serveur DHCP sous Windows Server 2012.pdf",
      description: [
        "Installation et configuration du rôle DHCP sur Windows Server 2012.",
        "Création d’une étendue d’adresses IP, configuration des options DHCP et test d’attribution automatique sur les postes clients.",
      ],
    },
    {
      name: "Fiche de procédure - Snipe-IT",
      date: "2025",
      pdf: "./files/Fiche de procédure Snipe-IT.pdf",
      description: [
        "Installation et configuration de Snipe-IT pour la gestion du parc informatique.",
        "Création des catégories, ajout des équipements, suivi des affectations et amélioration de la traçabilité du matériel.",
      ],
    },
    {
      name: "Fiche de procédure - Mise en place du service DNS",
      date: "2025",
      pdf: "./files/Fiche de procédure - Mise en place du service DNS.pdf",
      description: [
        "Installation et configuration du service DNS sur Windows Server.",
        "Création des zones DNS, ajout des enregistrements nécessaires et vérification de la résolution de noms sur le réseau.",
      ],
    },
    {
      name: "Fiche de procédure - Installation et paramétrage du client FOG",
      date: "2025",
      pdf: "./files/Fiche de procédure - Installation et paramétrage du client FOG.pdf",
      description: [
        "Installation et configuration du client FOG sur des postes informatiques.",
        "Préparation des postes pour la gestion centralisée, le déploiement d’images et l’inventaire matériel.",
      ],
    },
    {
      name: "Sécurité des postes - Sophos Endpoint Cryptoprotect",
      date: "2026",
      pdf: "./files/THOMYRIS_SOPHOS_Cryptoprotect.pdf",
      description: [
        "Déploiement et administration de Sophos Endpoint via Sophos Central.",
        "Configuration de la protection des postes, gestion des agents, protection antialtération et vérification de l’état de sécurité.",
      ],
    },
    {
      name: "Messagerie - Configuration IMAP",
      date: "2026",
      pdf: "./files/IMAP_Configuration_Mail.pdf",
      description: [
        "Configuration d’une boîte mail en IMAP/SMTP sur un client de messagerie.",
        "Paramétrage des serveurs entrant et sortant, authentification, synchronisation et tests d’envoi/réception.",
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">

      {/* TITRE */}
      <h1 className="mt-10 text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
        Projets & Réalisations
      </h1>

      {project_list.map((project, index) => (
        <div key={index} className="w-full flex flex-col items-center">

          {/* CARD PROJET */}
          <div className="relative mt-6 w-full md:w-3/4 group">
            {/* Halo dégradé */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

            {/* Carte */}
            <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl p-6 transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700">
              <span className="absolute left-0 top-6 h-8 w-[2px] bg-gradient-to-b from-pink-500 to-violet-500 rounded-full" />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                <div className="text-lg md:text-xl font-bold leading-tight">
                  {project.name}
                </div>
                <div className="text-sm text-zinc-400">
                  {project.date}
                </div>
              </div>

              <ul className="mt-3 text-sm md:text-base space-y-2">
                {project.description.map((line, i) => (
                  <li key={i}>- {line}</li>
                ))}
              </ul>

              {project.pdf && (
                <a
                  href={project.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm text-pink-400 hover:text-pink-300 transition"
                >
                  Voir la documentation PDF →
                </a>
              )}
            </div>
          </div>

          {/* SÉPARATEUR */}
          {index !== project_list.length - 1 && (
            <div className="my-10 w-1/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          )}

        </div>
      ))}

    </div>
  );
}


/* =========================
   SECTION : PROJETS
   ========================= 

function Projects() {
    const project_list = [
        {
            name: "GSB - WebLab",
            date: "2025",
            pdf: "public/files/THOMYRIS_SOPHOS_XGS_FIREWALL_V1_8_1.pdf", // à créer dans public/files/
            description: [
                "Environnement composé de plusieurs VM : serveur web, serveur de bases de données, Active Directory, SFTP, etc.",
                "Configuration d’Apache/PHP/MariaDB, intégration au domaine, gestion des droits et de la sécurité de base.",
            ],
        },
        {
            name: "Firewall - Sophos XGS",
            date: "2026",
            pdf: "./files/THOMYRIS - SOPHOS - XGS - Procédure Initialisation FIREWALL V1.8.1.pdf", // à créer dans public/files/
            description: [
                "Configuration d'un Pare-feu Sophos XGS en entreprise dans le contexte de l'installation d'une infrastructure réseau pour une collectivité territoriale.",
                "Configuration, tests de connectivité, sécurisation des flux entre LAN, DMZ et WAN.",
            ],
        },
        {
            name: "Switch - Aruba",
            date: "2026",
            pdf: "./files/THOMYRIS - ARUBA - INITIALISATION SWITCH ARUBA INSTANT ON_V4.pdf", // à créer dans public/files/
            description: [
                "Configuration d’un switch Aruba en environnement professionnel dans le cadre du déploiement d’une infrastructure réseau pour une collectivité territoriale.",
                "Mise en place des VLANs, configuration des ports (access/trunk), routage inter-VLAN, paramétrage des règles de sécurité (ACL), activation des mécanismes de contrôle d’accès (802.1X), tests de connectivité et sécurisation des flux entre les différents segments du réseau (postes utilisateurs, serveurs, équipements d’administration)",
            ],
        },
        {
            name: "Accès distant - VPN Sophos",
            date: "2026",
            pdf: "./files/THOMYRIS_SOPHOS_Procédure_vpn_connect_ssl.pdf", // à créer dans public/files/
            description: [
                "Installation et configuration du client VPN Sophos Connect dans un environnement professionnel afin de permettre l’accès distant sécurisé à l’infrastructure réseau.",
                "Établissement du tunnel sécurisé et validation de l’accès aux ressources réseau et applications autorisées.",
            ],
        },
        {
            name: "Sécurisation des accès - Authentification forte Sophos (OTP)",
            date: "2026",
            pdf: "./files/THOMYRIS - SOPHOS - Initialisation authentification à double facteur.pdf", // à créer dans public/files/
            description: [
                "Mise en place de l’authentification forte (One-Time Password) sur un firewall Sophos afin de renforcer la sécurité des accès utilisateurs.",
                "Configuration de l’authentification à double facteur via le UserPortal",
            ],
        },
        {
            name: "WiFi - Aruba Instant On",
            date: "2026",
            pdf: "./files/THOMYRIS - ARUBA WIFI - INITIALISATION AVEC CENTRAL OU LOCAL V.6.pdf", // à créer dans public/files/
            description: [
                "Enregistrement et administration des bornes WiFi Aruba via la plateforme HPE GreenLake en mode MSP, permettant une gestion centralisée multi-clients avec affectation des licences, des équipements et des accès à Aruba Central.",
                "Configuration et sécurisation des réseaux WiFi internes et invités : création de sites et de groupes, déploiement des SSID, paramétrage DHCP/VLAN, portail captif, règles de filtrage, mises à jour et initialisation locale des bornes.",
            ],
        },
        {
            name: "Sécurité des postes - Sophos Endpoint (Cryptoprotect)",
            date: "2026",
            pdf: "./files/THOMYRIS_SOPHOS_Cryptoprotect.pdf", // à créer dans public/files/
            description: [
                "Déploiement et administration de la solution Sophos Endpoint via Sophos Central pour assurer la protection antivirale, le contrôle applicatif et le filtrage web des postes et serveurs Windows et macOS des clients.",
                "Préparation du programme d’installation, installation et désinstallation (standard ou forcée) des agents Sophos, avec gestion centralisée des postes, de la protection antialtération et des compatibilités systèmes.",
            ],
        },
        {
            name: "Messagerie - Configuration IMA",
            date: "2026",
            pdf: "./files/IMAP_Configuration_Mail.pdf", // à créer dans public/files/
            description: [
                "Configuration de boîtes mail hébergées sur un datacenter via Outlook, paramétrage IMAP/SMTP, ports, sécurité et authentification.",
                "Gestion des mots de passe, respect des critères de sécurité, synchronisation, accès distant et utilisation des fonctionnalités de messagerie avancées.",
            ],
        },
        {
            name: "Switch - Aruba",
            date: "2024",
            pdf: "./files/THOMYRIS - ARUBA - INITIALISATION SWITCH ARUBA INSTANT ON_V4.pdf", // à créer dans public/files/
            description: [
                "Configuration d’un switch Aruba en environnement professionnel dans le cadre du déploiement d’une infrastructure réseau pour une collectivité territoriale.",
                "Mise en place des VLANs, configuration des ports (access/trunk), routage inter-VLAN, paramétrage des règles de sécurité (ACL), activation des mécanismes de contrôle d’accès (802.1X), tests de connectivité et sécurisation des flux entre les différents segments du réseau (postes utilisateurs, serveurs, équipements d’administration)",
            ],
        },
        {
            name: "Switch - Aruba",
            date: "2024",
            pdf: "./files/THOMYRIS - ARUBA - INITIALISATION SWITCH ARUBA INSTANT ON_V4.pdf", // à créer dans public/files/
            description: [
                "Configuration d’un switch Aruba en environnement professionnel dans le cadre du déploiement d’une infrastructure réseau pour une collectivité territoriale.",
                "Mise en place des VLANs, configuration des ports (access/trunk), routage inter-VLAN, paramétrage des règles de sécurité (ACL), activation des mécanismes de contrôle d’accès (802.1X), tests de connectivité et sécurisation des flux entre les différents segments du réseau (postes utilisateurs, serveurs, équipements d’administration)",
            ],
        },
        {
            name: "Switch - Aruba",
            date: "2024",
            pdf: "./files/THOMYRIS - ARUBA - INITIALISATION SWITCH ARUBA INSTANT ON_V4.pdf", // à créer dans public/files/
            description: [
                "Configuration d’un switch Aruba en environnement professionnel dans le cadre du déploiement d’une infrastructure réseau pour une collectivité territoriale.",
                "Mise en place des VLANs, configuration des ports (access/trunk), routage inter-VLAN, paramétrage des règles de sécurité (ACL), activation des mécanismes de contrôle d’accès (802.1X), tests de connectivité et sécurisation des flux entre les différents segments du réseau (postes utilisateurs, serveurs, équipements d’administration)",
            ],
        },
    ];

    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projets
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            {project_list.map((project, index) => (
                <a
                    key={index}
                    href={project.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full flex-col px-4"
                >
                    <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="flex justify-center items-center">
                                <div className="text-base md:text-lg mr-2">{project.name}</div>
                            </div>
                            <div className="text-gray-300 font-light text-sm">{project.date}</div>
                        </div>

                        <ul className="tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                            {project.description.map((desc, i) => (
                                <li key={i} className="list-disc mt-1 text-gray-100">
                                    {desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </a>
            ))}
        </>
    );
}*/

/* =========================
   SECTION : CV
   ========================= */

function Resume() {
  return (
    <section className="w-full flex flex-col items-center">

      {/* TITRE */}
      <h1 className="mt-10 text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
        Mon CV
      </h1>

      {/* TEXTE INTRO */}
      <p className="mt-4 w-10/12 md:w-8/12 text-center text-sm md:text-base text-zinc-300">
        Consultez mon CV directement en image ou ouvrez-le au format PDF.
      </p>

      {/* CARTE + HALO */}
      <div className="relative mt-10 w-11/12 md:w-7/12 group">
        {/* Halo dégradé */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/40 to-violet-500/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition"></div>

        {/* Conteneur */}
        <div className="relative bg-neutral-900 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:border-zinc-700 p-4">

          {/* IMAGE DU CV */}
          <img
            src="./files/CV-Badaoui-Adam_page-0001.jpg"   // ← Mets ton image ici
            alt="CV Adam Badaoui"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* BOUTONS DÉTACHÉS */}
      <div className="flex flex-col items-center gap-3 mt-6">

        {/* Ouvrir en PDF */}
        <a
          href="./files/CV-Badaoui-Adam.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-sm px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:opacity-90 transition"
        >
          Ouvrir le CV en PDF
        </a>

        {/* Télécharger */}
        <a
          href="./files/CV-Badaoui-Adam.pdf"
          download
          className="text-sm px-5 py-2 rounded-lg bg-neutral-800 border border-zinc-700 text-zinc-200 hover:bg-neutral-700 transition"
        >
          Télécharger le CV
        </a>
      </div>

      <div className="mb-16"></div>
    </section>
  );
}

