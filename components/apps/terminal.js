import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.file_system = {
            root: {
                type: 'directory',
                children: ["Apropos", "Document-perso", "Skills", "Intérêts", "Langues", "Projects", "Contact"]
            },
            Apropos: {
                type: 'directory',
                content: "Étudiant en BTS SIO, j'ai débuté par une première expérience en support informatique où j'ai assuré l'assistance aux utilisateurs et la résolution d'incidents IT."
            },
            "Document-perso": {
                type: 'directory',
                children: ["CV.pdf", "Lettre-motivation.pdf"]
            },
            Skills: {
                type: 'directory',
                children: ["Linux", "Windows", "Networks", "Security"]
            },
            Linux: {
                type: 'file',
                content: "Installation, configuration et gestion de serveurs Linux\nAdministration système, Shell scripting, Docker"
            },
            Windows: {
                type: 'file',
                content: "Gestion des utilisateurs, droits et stratégies de groupe (Active Directory)\nGPO, Group Policy, Hyper-V"
            },
            Networks: {
                type: 'file',
                content: "Configuration réseaux, subnetting, routing\nVLAN, DHCP, DNS, VPN"
            },
            Security: {
                type: 'file',
                content: "OSINT, Cybersécurité, Ingenierie Sociale\nPenetration Testing, Firewalls"
            },
            Intérêts: {
                type: 'directory',
                children: ["OSINT", "Cybersécurité", "Ingenierie Sociale"],
                content: "OSINT\nCybersécurité\nIngenierie Sociale"
            },
            Langues: {
                type: 'directory',
                children: ["Français", "Anglais", "Arabe"],
                content: "Français (Natif)\nAnglais (Courant)\nArabe (Courant)"
            },
            Projects: {
                type: 'directory',
                children: ["PortScanner", "NetworkMonitor", "SecurityAudit"]
            },
            PortScanner: {
                type: 'file',
                content: "Port Scanner - Outil de scan de ports\nTechnologie: Python, Socket\nLienGitHub: https://github.com/badaouiadampro-cpu"
            },
            NetworkMonitor: {
                type: 'file',
                content: "Network Monitor - Monitoring de trafic réseau\nTechnologie: JavaScript, Node.js"
            },
            SecurityAudit: {
                type: 'file',
                content: "Security Audit - Audit de sécurité interne\nTechnologie: Bash, Linux"
            },
            Contact: {
                type: 'directory',
                children: ["email.txt", "github.txt", "linkedin.txt"]
            },
            "email.txt": {
                type: 'file',
                content: "badaouiadampro@gmail.com"
            },
            "github.txt": {
                type: 'file',
                content: "https://github.com/badaouiadampro-cpu"
            },
            "linkedin.txt": {
                type: 'file',
                content: "https://linkedin.com/in/adam-badaoui"
            }
        };

        // Ancien format pour compatibilité
        this.child_directories = {
            root: ["Apropos", "Document-perso", "Skills", "Intérêts", "Langues", "Projects", "Contact"],
            Apropos: ["Étudiant en BTS SIO, j'ai débuté par une première expérience en support\ninformatique où j'ai assuré l'assistance aux utilisateurs et la résolution\n d'incidents"],
            "Document-perso": ["CV.pdf", "Lettre-motivation.pdf"],
            Skills: ["Linux", "Windows", "Networks", "Security"],
            Intérêts: ["OSINT", "Cybersécurité", "Ingenierie Sociale"],
            Langues: ["Français", "Anglais", "Arabe"],
            Projects: ["PortScanner", "NetworkMonitor", "SecurityAudit"],
            Contact: ["email.txt", "github.txt", "linkedin.txt"]
        };

        this.aliases = {
            'h': 'help',
            'll': 'ls -la',
            '..': 'cd ..',
            'whoami': 'echo Adam',
            'date': this.getDate.bind(this),
            'help': this.getHelp.bind(this)
        };

        this.state = {
            terminal: [],
        }
    }

    getDate() {
        const now = new Date();
        return now.toString();
    }

    getHelp() {
        return `
╔═══════════════════════════════════════════════════════════╗
║              COMMANDES DISPONIBLES                         ║
╚═══════════════════════════════════════════════════════════╝
├─ cd [dossier]         → Changer de répertoire
├─ ls [-la]             → Lister les fichiers
├─ pwd                  → Afficher le répertoire courant
├─ cat [fichier]        → Afficher le contenu d'un fichier
├─ clear                → Effacer l'écran
├─ echo [texte]         → Afficher un texte
├─ whoami               → Afficher l'utilisateur courant
├─ date                 → Afficher la date et l'heure
├─ mkdir [dossier]      → Créer un dossier
├─ rm [fichier]         → Supprimer un fichier
├─ find [modèle]        → Rechercher des fichiers
├─ history              → Afficher l'historique
├─ tree                 → Afficher la structure en arbre
├─ grep [pattern] [file] → Chercher un motif
└─ exit                 → Quitter le terminal
        `;
    }

    componentDidMount() {
        this.reStartTerminal();
        this.showWelcomeMessage();
    }

    showWelcomeMessage = () => {
        setTimeout(() => {
            const welcome = `
╔═══════════════════════════════════════════════════════════╗
║     Bienvenue dans le Portfolio Terminal d'Adam           ║
║              Tapez 'help' pour l'aide                     ║
╚═══════════════════════════════════════════════════════════╝
        `;
            let terminal = this.state.terminal;
            terminal.push(
                <div key={Math.random()} className="text-green-400 whitespace-pre-wrap mb-2">
                    {welcome}
                </div>
            );
            this.setState({ terminal });
        }, 300);
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full">
                    <div className="flex">
                        <div className=" text-green-500 ">Adam@kali</div>
                        <div className="text-white mx-px font-medium ">:</div>
                        <div className=" text-cyan-500 ">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1 ">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transparent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider "></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white "></div>
                        <input 
                            id={`terminal-input-${id}`} 
                            data-row-id={id} 
                            onKeyDown={this.checkKey} 
                            onBlur={this.unFocusCursor} 
                            autoComplete="off"
                            spellCheck="false"
                            className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent"
                        />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal text-white whitespace-pre-wrap"}></div>
            </React.Fragment>
        );
    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        const rowId = $(e.target).closest('[data-row-id]').data("row-id") || $(e.target).data("row-id");
        this.startCursor(rowId);
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        const $input = $(`input#terminal-input-${id}`);
        $input.trigger("focus");
        
        $input.on("input", function () {
            $(`#show-${id}`).text($(this).val());
        });
        
        this.cursor = window.setInterval(function () {
            const curseur = $(`#cursor-${id}`);
            curseur.css('visibility', curseur.css('visibility') === 'visible' ? 'hidden' : 'visible');
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            } else return;
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length;
            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            let prev_command;
            this.commands_index--;
            if (this.commands_index < 0) {
                this.commands_index = 0;
                prev_command = "";
            } else {
                prev_command = this.prev_commands[this.commands_index];
            }
            let terminal_row_id = $(e.target).data("row-id");
            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            let prev_command;
            this.commands_index++;
            if (this.commands_index >= this.prev_commands.length) {
                this.commands_index = this.prev_commands.length;
                prev_command = "";
            } else {
                prev_command = this.prev_commands[this.commands_index];
            }
            let terminal_row_id = $(e.target).data("row-id");
            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);
        }
        else if (e.key === "Tab") {
            e.preventDefault();
            this.handleAutoComplete(e);
        }
    }

    handleAutoComplete = (e) => {
        const terminal_row_id = $(e.target).data("row-id");
        const input = $(`input#terminal-input-${terminal_row_id}`).val();
        const words = input.split(' ').filter(Boolean);
        
        if (words.length === 0) return;

        const lastWord = words[words.length - 1];
        const command = words[0];

        if (command === 'cd' && words.length === 2) {
            const current_dirs = this.child_directories[this.curr_dir_name] || [];
            const matches = current_dirs.filter(dir => dir.startsWith(lastWord));
            
            if (matches.length === 1) {
                words[words.length - 1] = matches[0];
                const newInput = words.join(' ');
                $(`input#terminal-input-${terminal_row_id}`).val(newInput);
                $(`#show-${terminal_row_id}`).text(newInput);
            }
        }
    }

    getDirectoryChildren = (dirName) => {
        return this.child_directories[dirName] || [];
    }

    displayDirectoryContents = (dirName) => {
        let files = [];
        const children = this.getDirectoryChildren(dirName);
        
        if (children.length === 0) {
            return "<div class='text-gray-500'>Dossier vide</div>";
        }

        files.push(`<div class="flex justify-start flex-wrap gap-4">`);
        children.forEach(file => {
            const isDir = this.child_directories[file] !== undefined;
            const icon = isDir ? "📁" : "📄";
            const color = isDir ? "text-blue-400" : "text-yellow-400";
            files.push(
                `<span class="${color} font-semibold">${icon} ${file}</span>`
            );
        });
        files.push(`</div>`);
        return files.join("");
    }

    findFiles = (pattern) => {
        const results = [];
        const regex = new RegExp(pattern, 'i');
        
        const search = (obj, path = '') => {
            for (const key in obj) {
                if (this.child_directories[key]) {
                    if (regex.test(key)) {
                        results.push(path + key);
                    }
                    search(this.child_directories[key], path + key + '/');
                }
            }
        };

        search(this.child_directories);
        return results.length > 0 ? results.join('\n') : `Aucun fichier trouvé pour: ${pattern}`;
    }

    getTreeStructure = (depth = 0, name = 'root') => {
        const indent = '  '.repeat(depth);
        const children = this.child_directories[name] || [];
        let result = `${indent}📁 ${name}\n`;

        children.forEach((child, index) => {
            const isLast = index === children.length - 1;
            const prefix = isLast ? '└── ' : '├── ';
            const isDir = this.child_directories[child] !== undefined;
            const icon = isDir ? '📁' : '📄';
            result += `${indent}${prefix}${icon} ${child}\n`;
        });

        return result;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift();
        let result = "";
        let rest = words.join(" ").trim();

        // Check for aliases
        if (this.aliases[main]) {
            const aliasValue = this.aliases[main];
            if (typeof aliasValue === 'function') {
                result = aliasValue();
            } else if (typeof aliasValue === 'string' && aliasValue.startsWith('cd ')) {
                main = 'cd';
                words = [aliasValue.slice(3)];
                rest = words[0];
            } else {
                command = aliasValue;
                return this.handleCommands(command, rowId);
            }
        }

        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root";
                    break;
                }
                if (words.length > 1) {
                    result = "bash: cd: trop d'arguments";
                    break;
                }
                if (rest === ".." || rest === "...") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root";
                    break;
                }
                if (this.child_directories[this.curr_dir_name]?.includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                } else {
                    result = `bash: cd: ${rest}: Aucun fichier ou dossier de ce type`;
                }
                break;

            case "ls":
            case "ls -la":
            case "ll":
                let target = words[0];
                if (!target) target = this.curr_dir_name;
                
                if (words.length > 1) {
                    result = "bash: ls: trop d'arguments";
                    break;
                }
                
                result = this.displayDirectoryContents(target);
                break;

            case "pwd":
                result = this.current_directory.replace("~", "/home/Adam");
                break;

            case "echo":
                result = rest || "";
                break;

            case "cat":
                if (!rest) {
                    result = "bash: cat: argument manquant";
                } else {
                    const fileContent = this.file_system[rest]?.content || this.child_directories[rest];
                    if (fileContent) {
                        result = typeof fileContent === 'string' ? fileContent : "Dossier: non affichable";
                    } else {
                        result = `bash: cat: ${rest}: Aucun fichier ou dossier de ce type`;
                    }
                }
                break;

            case "mkdir":
                if (!rest) {
                    result = "bash: mkdir: argument manquant";
                } else {
                    result = `Dossier créé: ${rest}`;
                }
                break;

            case "rm":
                if (!rest) {
                    result = "bash: rm: argument manquant";
                } else {
                    result = `Fichier supprimé: ${rest}`;
                }
                break;

            case "find":
                if (!rest) {
                    result = "bash: find: argument manquant";
                } else {
                    result = this.findFiles(rest);
                }
                break;

            case "tree":
                result = this.getTreeStructure();
                break;

            case "grep":
                if (words.length < 2) {
                    result = "bash: grep: arguments manquants (pattern et fichier requis)";
                } else {
                    result = "fonction grep: résultats (à implémenter)";
                }
                break;

            case "history":
                result = this.prev_commands.map((cmd, idx) => `${idx + 1} ${cmd}`).join('\n') || "Pas d'historique";
                break;

            case "help":
                result = this.getHelp();
                break;

            case "clear":
                this.reStartTerminal();
                return;

            case "exit":
                this.closeTerminal();
                return;

            case "whoami":
                result = "Adam";
                break;

            case "date":
                result = new Date().toString();
                break;

            default:
                result = `bash: ${main}: commande introuvable.\nTapez 'help' pour l'aide.`;
        }

        const resultElement = document.getElementById(`row-result-${rowId}`);
        if (resultElement) {
            resultElement.innerHTML = result;
        }
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&': return '&amp';
                case '<': return '&lt';
                case '>': return '&gt';
                case '"': return '&quot';
                case "'": return '&#x27';
                case '/': return '&#x2F';
                default: return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-gray-900 opacity-95 text-white text-sm font-mono overflow-y-auto p-4" id="terminal-body">
                <style>{`
                    #terminal-body::-webkit-scrollbar {
                        width: 8px;
                    }
                    #terminal-body::-webkit-scrollbar-track {
                        background: #1a1a1a;
                    }
                    #terminal-body::-webkit-scrollbar-thumb {
                        background: #4a4a4a;
                        border-radius: 4px;
                    }
                    #terminal-body::-webkit-scrollbar-thumb:hover {
                        background: #6a6a6a;
                    }
                `}</style>
                { this.state.terminal }
            </div>
        )
    }
}

export default Terminal;

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
