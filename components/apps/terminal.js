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
        this.child_directories = {
            root: ["Apropos", "Document-perso", "Skills", "Intérêts", "Langues", "Projects", "Contact"],
            Apropos: ["Étudiant en BTS SIO, j'ai débuté par une première expérience en support\ninformatique où j'ai assuré l'assistance aux utilisateurs et la résolution\n d'incidents. J'ai ensuite intégré XEFI, ce qui m'a permis d'acquérir une\n approche plus professionnelle et technique notamment en support et\n déploiement d'infrastructures réseau (pare-feu, routeurs,...). Issu d'une\n formation commerciale, je possède un bon sens de la communication,\n une compréhension des besoins clients et une capacité à vulgariser des\n sujets techniques. Fort de ces bases en réseaux et commerce, je\n souhaite poursuivre mon parcours en alternance afin de me spécialiser\n en cybersécurité."],
            "Document-perso": ["CV.pdf", "Lettre-motivation.pdf"],
            Skills: ["Installation, configuration et gestion de serveurs Linux et Windows", "Gestion des utilisateurs, droits et stratégies de groupe (Active Directory), GPO", "Mise en place de services réseaux : DHCP, DNS, SFTP, Apache,SSH, VPN, Téléphonie IP", "Configuration et maintenance d'équipements réseau : switchs, routeurs, firewalls"],
            Intérêts: ["OSINT", "Cybersécurité", "Ingenierie Sociale"],
            Langues: ["Français", "Anglais", "Arabe"],
            Projects: ["PortScanner", "NetworkMonitor", "SecurityAudit"],
            Contact: ["email.txt", "github.txt", "linkedin.txt"]
        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
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
        this.setState({ terminal: [] });
        setTimeout(() => {
            this.appendTerminalRow();
        }, 0);
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
                        <div className="text-blue-500">Adam@kali</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className="text-green-400">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className="bg-transparent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className="float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className="float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input 
                            id={`terminal-input-${id}`} 
                            data-row-id={id} 
                            onKeyDown={this.checkKey} 
                            onBlur={this.unFocusCursor}
                            autoComplete="off"
                            spellCheck="false"
                            className="absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent"
                        />
                    </div>
                </div>
                <div id={`row-result-${id}`} className="my-2 font-normal text-green-400 whitespace-pre-wrap"></div>
            </React.Fragment>
        );
    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        const rowId = $(e.currentTarget).find('input').data("row-id");
        if (rowId !== undefined) {
            this.startCursor(rowId);
        }
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        $(`input#terminal-input-${id}`).on("input", function () {
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
                this.commands_index = -1;
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

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap gap-3">`);
        const dirs = this.child_directories[parent] || [];
        dirs.forEach(file => {
            files.push(
                `<span class="font-bold text-blue-400">${file}</span>`
            );
        });
        files.push(`</div>`);
        return files;
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
                if (rest === ".." || rest === "..." || rest === ".") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root";
                    break;
                }
                if (this.child_directories[this.curr_dir_name] && this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                } else {
                    result = `bash: cd: ${rest}: Aucun fichier ou répertoire de ce type`;
                }
                break;

            case "ls":
                let target = words[0];
                if (!target) target = this.curr_dir_name;
                if (words.length > 1) {
                    result = "bash: ls: trop d'arguments";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                } else {
                    result = `bash: ls: ${target}: Aucun fichier ou répertoire de ce type`;
                }
                break;

            case "pwd":
                result = this.current_directory.replace("~", "/home/Adam");
                break;

            case "echo":
                result = rest;
                break;

            case "clear":
                this.reStartTerminal();
                return;

            case "exit":
                this.closeTerminal();
                return;

            case "help":
                result = `╔════════════════════════════════════════╗\n║    Commandes disponibles:\n╚════════════════════════════════════════╝\ncd [dossier]  - Changer de répertoire\nls [dossier]  - Lister les fichiers\npwd           - Afficher le répertoire courant\necho [texte]  - Afficher un texte\nclear         - Effacer l'écran\nexit          - Quitter le terminal\nhelp          - Afficher cette aide`;
                break;

            case "whoami":
                result = "Adam";
                break;

            case "date":
                result = new Date().toString();
                break;

            default:
                result = `bash: ${main}: commande introuvable.\nTapez 'help' pour l'aide.`;
        }

        document.getElementById(`row-result-${rowId}`).innerHTML = result;
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
            <div className="h-full w-full bg-ub-drk-abrgn opacity-60 text-white text-sm font-bold" id="terminal-body">
                {this.state.terminal}
            </div>
        )
    }
}

export default Terminal;

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
