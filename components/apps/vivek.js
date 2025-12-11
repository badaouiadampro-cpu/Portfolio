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
        }
    }

    componentDidMount() {
        // les clés DOIVENT correspondre aux id des div (about, education, skills, projects, resume)
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus sur le dernier onglet ouvert
        const el = document.getElementById(lastVisitedScreen);
        if (el) {
            this.changeScreen(el);
        }
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "About section" });

        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div
                    id="about"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={
                        (this.state.active_screen === "about"
                            ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95"
                            : " hover:bg-gray-50 hover:bg-opacity-5 ")
                        + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
                    }
                >
                    <img className="w-3 md:w-4" alt="À propos" src="./themes/Yaru/status/about.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">À propos</span>
                </div>

                <div
                    id="education"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={
                        (this.state.active_screen === "education"
                            ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95"
                            : " hover:bg-gray-50 hover:bg-opacity-5 ")
                        + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
                    }
                >
                    <img className="w-3 md:w-4" alt="Scolarité" src="./themes/Yaru/status/education.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">Scolarité</span>
                </div>

                <div
                    id="skills"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={
                        (this.state.active_screen === "skills"
                            ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95"
                            : " hover:bg-gray-50 hover:bg-opacity-5 ")
                        + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
                    }
                >
                    <img className="w-3 md:w-4" alt="Compétences" src="./themes/Yaru/status/skills.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">Compétences</span>
                </div>

                <div
                    id="projects"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={
                        (this.state.active_screen === "projects"
                            ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95"
                            : " hover:bg-gray-50 hover:bg-opacity-5 ")
                        + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
                    }
                >
                    <img className="w-3 md:w-4" alt="Mes projets" src="./themes/Yaru/status/projects.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">Projets</span>
                </div>

                <div
                    id="resume"
                    tabIndex="0"
                    onFocus={this.changeScreen}
                    className={
                        (this.state.active_screen === "resume"
                            ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95"
                            : " hover:bg-gray-50 hover:bg-opacity-5 ")
                        + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
                    }
                >
                    <img className="w-3 md:w-4" alt="Mon CV" src="./themes/Yaru/status/download.svg" />
                    <span className="ml-1 md:ml-2 text-gray-50 ">CV</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>

                <div
                    onClick={this.showNavBar}
                    className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1"
                >
                    <div className="w-3.5 border-t border-white"></div>
                    <div className="w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className="w-3.5 border-t border-white"></div>
                    <div
                        className={
                            (this.state.navbar ? " visible animateShow z-30 " : " invisible ")
                            + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"
                        }
                    >
                        {this.renderNavLinks()}
                    </div>
                </div>

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
}

// ===== À PROPOS =====

function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                {/* Mets ici ta vraie image dans public/images/logos/ */}
                <img className="w-full" src="./images/logos/adam.png" alt="Photo Adam Badaoui" />
            </div>

            <div className="mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>Je m'appelle <span className="font-bold">Adam Badaoui</span>,</div>
                <div className="font-normal ml-1">
                    Je suis <span className="text-pink-600 font-bold">étudiant en BTS SIO option SISR</span>
                </div>
            </div>

            <div className="mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>

            <ul className="mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className="list-pc">
                    Je suis <span className="font-medium">étudiant en BTS SIO SISR</span>, intéressé par
                    l'administration systèmes, les réseaux et la cybersécurité.
                    {/* CHANGE ICI AVEC TON MAIL */}
                    {" "}Actuellement, je recherche des opportunités de stage / alternance (contact :
                    <a className="text-underline" href="mailto:contact@exemple.com">
                        <u> contact@exemple.com</u>
                    </a>).
                </li>
                <li className="mt-3 list-building">
                    J’aime monter des infrastructures complètes : serveurs Debian, services web, bases de données,
                    Active Directory, VLANs, firewall, etc.
                </li>
                <li className="mt-3 list-time">
                    En dehors des cours, je passe du temps à tester des labs (VM, firewall, SI d’entreprise) et à me former
                    sur Linux, la sécurité et l’automatisation.
                </li>
                <li className="mt-3 list-star">
                    Je suis motivé pour mettre en pratique mes compétences dans un environnement professionnel et continuer à progresser.
                </li>
            </ul>
        </>
    );
}

// ===== SCOLARITÉ =====

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
                    <div className="text-sm text-gray-400 mt-0.5">2023 - 2025</div>
                    <div className="text-sm md:text-base">
                        Administration systèmes et réseaux, virtualisation, sécurité, services web, bases de données.
                    </div>
                </li>

                <li className="list-disc mt-5">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        Baccalauréat (à adapter)
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">Années à adapter</div>
                    <div className="text-sm md:text-base">
                        Matières scientifiques / informatiques (ex : NSI, SI, maths…). À personnaliser selon ton parcours.
                    </div>
                </li>
            </ul>
        </>
    );
}

// ===== COMPÉTENCES =====

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

            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    Administration de systèmes Linux (Debian) et Windows Server : services réseau, partage, droits,
                    supervision de base.
                </li>
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    Mise en place de services web (Apache / Nginx, PHP, MariaDB/MySQL) et déploiement d’applications
                    (type GSB Frais, portfolio, etc.).
                </li>
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    Notions de sécurité réseau : VLAN, firewall (Fortigate), redirections NAT, filtrage, SFTP chrooté.
                </li>
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div>Voici les outils et langages que j’utilise le plus :</div>
                </li>
            </ul>

            <div className="w-full md:w-10/12 flex mt-4">
                <div className="text-sm text-center md:text-base w-1/2 font-bold">Outils</div>
                <div className="text-sm text-center md:text-base w-1/2 font-bold">Langages</div>
            </div>

            <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
                <div className="px-2 w-1/2">
                    <div className="flex flex-wrap justify-center gap-2 items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/-Linux-%23000000?style=flat&logo=linux&logoColor=ffffff" alt="linux" />
                        <img className="m-1" src="https://img.shields.io/badge/-Debian-%23A81D33?style=flat&logo=debian&logoColor=white" alt="debian" />
                        <img className="m-1" src="https://img.shields.io/badge/-Wireshark-%2311358E?style=flat&logo=wireshark&logoColor=white" alt="wireshark" />
                        <img className="m-1" src="https://img.shields.io/badge/-Fortigate-%23EE3124?style=flat&logo=fortinet&logoColor=white" alt="fortigate" />
                        <img className="m-1" src="https://img.shields.io/badge/-Cisco%20Packet%20Tracer-%231BA0D7?style=flat&logo=cisco&logoColor=white" alt="cisco packet tracer" />
                        <img className="m-1" src="https://img.shields.io/badge/-Git/GitHub-%23181717?style=flat&logo=github&logoColor=white" alt="github" />
                    </div>
                </div>

                <div className="px-2 flex flex-wrap items-start gap-2 w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/-Bash-%234EAA25?style=flat&logo=gnu-bash&logoColor=ffffff" alt="bash" />
                        <img className="m-1" src="https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="python" />
                        <img className="m-1" src="https://img.shields.io/badge/-PHP-777BB4?style=flat&logo=php&logoColor=ffffff" alt="php" />
                        <img className="m-1" src="https://img.shields.io/badge/-SQL-%234479A1?style=flat&logo=mysql&logoColor=ffffff" alt="sql" />
                        <img className="m-1" src="https://img.shields.io/badge/-HTML5-%23E34F26?style=flat&logo=html5&logoColor=ffffff" alt="html" />
                        <img className="m-1" src="https://img.shields.io/badge/-CSS3-%231572B6?style=flat&logo=css3&logoColor=ffffff" alt="css" />
                        <img className="m-1" src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000" alt="javascript" />
                    </div>
                </div>
            </div>
        </>
    );
}

// ===== PROJETS =====

function Projects() {
    const project_list = [
        {
            name: "WebLab – Infrastructure multi-VM",
            date: "2024",
            link: "https://github.com/USERNAME/weblab", // à modifier
            description: [
                "Mise en place d’un environnement composé de plusieurs VM : serveur web, serveur de bases de données, Active Directory, SFTP chrooté, etc.",
                "Configuration d’Apache/PHP/MariaDB, intégration au domaine, gestion des droits et de la sécurité de base."
            ],
            domains: ["debian", "apache", "mariadb", "sftp", "virtualisation"]
        },
        {
            name: "FireLab – Firewall Fortigate",
            date: "2024",
            link: "https://github.com/USERNAME/firelab", // à modifier
            description: [
                "Lab réseau avec firewall Fortigate 60D, gestion des VLAN, routage, règles de filtrage et NAT.",
                "Tests de connectivité, sécurisation des flux entre LAN, DMZ et WAN."
            ],
            domains: ["fortigate", "vlan", "nat", "firewall"]
        },
        {
            name: "Application GSB Frais",
            date: "2024",
            link: "https://github.com/USERNAME/gsb-frais", // à modifier
            description: [
                "Déploiement d’une application PHP / MariaDB pour la gestion de frais (projet GSB).",
                "Séparation serveur web / serveur BDD, comptes SQL dédiés, durcissement minimal de la base."
            ],
            domains: ["php", "mariadb", "linux", "gsb"]
        },
    ];

    const tag_colors = {
        "javascript": "yellow-300",
        "firebase": "red-600",
        "firestore": "red-500",
        "firebase auth": "red-400",
        "chrome-extension": "yellow-400",
        "flutter": "blue-400",
        "dart": "blue-500",
        "react-native": "purple-500",
        "html5": "pink-600",
        "sass": "pink-400",
        "tensorflow": "yellow-600",
        "django": "green-600",
        "python": "green-200",
        "codeforces-api": "gray-300",
        "tailwindcss": "blue-300",
        "next.js": "purple-600",

        // ajouts perso
        "debian": "red-500",
        "apache": "yellow-500",
        "mariadb": "blue-500",
        "sftp": "green-500",
        "virtualisation": "purple-500",
        "fortigate": "red-500",
        "vlan": "yellow-400",
        "nat": "green-400",
        "firewall": "red-600",
        "php": "indigo-400",
        "linux": "gray-300",
        "gsb": "pink-500",
    };

    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projets
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            {project_list.map((project, index) => {
                return (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full flex-col px-4"
                    >
                        <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                            <div className="flex flex-wrap justify-between items-center">
                                <div className="flex justify-center items-center">
                                    <div className="text-base md:text-lg mr-2">
                                        {project.name}
                                    </div>
                                </div>
                                <div className="text-gray-300 font-light text-sm">
                                    {project.date}
                                </div>
                            </div>

                            <ul className="tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                {project.description.map((desc, i) => (
                                    <li key={i} className="list-disc mt-1 text-gray-100">
                                        {desc}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                {project.domains &&
                                    project.domains.map((domain, i) => {
                                        const color = tag_colors[domain] || "gray-400";
                                        const borderColorClass = `border-${color}`;
                                        const textColorClass = `text-${color}`;

                                        return (
                                            <span
                                                key={i}
                                                className={`px-1.5 py-0.5 w-max border ${borderColorClass} ${textColorClass} m-1 rounded-full`}
                                            >
                                                {domain}
                                            </span>
                                        );
                                    })}
                            </div>
                        </div>
                    </a>
                );
            })}
        </>
    );
}

// ===== CV =====

function Resume() {
    return (
        // Mets ici le bon nom de fichier dans /public/files/
        <iframe
            className="h-full w-full"
            src="./files/adam-badaoui-cv.pdf"
            title="CV Adam Badaoui"
            frameBorder="0"
        ></iframe>
    );
}
