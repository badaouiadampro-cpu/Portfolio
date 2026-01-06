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

function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                {/* Mets ta vraie image dans public/images/logos/ */}
                <img
                    className="w-full"
                    src="./images/logos/adam.png"
                    alt="Photo Adam Badaoui"
                />
            </div>

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

/* =========================
   SECTION : SCOLARITÉ
   ========================= */

function Education() {
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

/* =========================
   SECTION : COMPÉTENCES
   ========================= */

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
                Le tableau de compétences sera bientôt disponible.  
                Une fois finalisé, il sera accessible ici sous forme de fichier PDF.
            </p>

            <div className="mt-6 flex justify-center w-full">
                <a
                    href="./files/tableau-competences.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-ub-orange text-white rounded hover:bg-opacity-80 transition duration-150"
                >
                    Ouvrir le tableau de compétences
                </a>
            </div>

            <p className="w-10/12 text-xs md:text-sm text-gray-300 mt-4 text-center">
                ()
            </p>
        </>
    );
}


/* =========================
   SECTION : PROJETS
   ========================= */

function Projects() {
    const project_list = [
        {
            name: "WebLab – Infrastructure multi-VM",
            date: "2024",
            pdf: "./files/projet-weblab.pdf", // à créer dans public/files/
            description: [
                "Environnement composé de plusieurs VM : serveur web, serveur de bases de données, Active Directory, SFTP chrooté, etc.",
                "Configuration d’Apache/PHP/MariaDB, intégration au domaine, gestion des droits et de la sécurité de base.",
            ],
        },
        {
            name: "FireLab – Firewall Fortigate",
            date: "2024",
            pdf: "./files/projet-firelab.pdf", // à créer dans public/files/
            description: [
                "Lab réseau avec firewall Fortigate 60D, gestion des VLAN, routage, règles de filtrage et NAT.",
                "Tests de connectivité, sécurisation des flux entre LAN, DMZ et WAN.",
            ],
        },
        {
            name: "Application GSB Frais",
            date: "2024",
            pdf: "./files/projet-gsb-frais.pdf", // à créer dans public/files/
            description: [
                "Déploiement d’une application PHP / MariaDB pour la gestion de frais (projet GSB).",
                "Séparation serveur web / serveur BDD, comptes SQL dédiés, durcissement minimal de la base.",
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
}

/* =========================
   SECTION : CV
   ========================= */

function Resume() {
    return (
        <iframe
            className="h-full w-full"
            src="./files/adam-badaoui-cv.pdf" // mets ton vrai fichier ici
            title="CV Adam Badaoui"
            frameBorder="0"
        ></iframe>
    );
}
