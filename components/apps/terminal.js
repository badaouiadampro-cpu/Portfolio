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

    // Simulations des outils Kali Linux
    simulateNmap = (target) => {
        const defaultTarget = target || "192.168.1.1";
        return `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for ${defaultTarget}
Host is up (0.0023s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds`;
    }

    simulateEttercap = () => {
        return `ettercap 0.8.3.1 copyright 2001-2020 Ettercap Development Team

Listening on:
  eth0 -> 192.168.1.100/255.255.255.0

SSL dissection needs a valid 'redir_command_on' script in the etter.conf file
Privileges dropped to EUID 65534 EGID 65534...

  34 plugins
  42 protocol dissectors
  57 ports monitored
28230 mac vendor fingerprint
1766 tcp OS fingerprint
2182 known services
Lua: no scripts were specified, not starting up!

Scanning for merged targets (2 hosts)...

* |==================================================>| 100.00 %

2 hosts added to the hosts list...

ARP poisoning victims:
 GROUP 1 : 192.168.1.1
 GROUP 2 : 192.168.1.50

Starting Unified sniffing...`;
    }

    simulateMetasploit = () => {
        return `                                                  
       =[ metasploit v6.3.25-dev                         ]
+ -- --=[ 2345 exploits - 1220 auxiliary - 413 post       ]
+ -- --=[ 1385 payloads - 46 encoders - 11 nops           ]
+ -- --=[ 9 evasion                                       ]

Metasploit tip: Use sessions -1 to interact with the last opened session

[msf](Jobs:0 Agents:0) >> `;
    }

    simulateWireshark = () => {
        return `Wireshark 4.0.6 (Git v4.0.6 packaged as 4.0.6-1~ubuntu22.04.0)

Capturing on 'eth0'
Packets captured: 1247
Displayed: 1247

Protocol Hierarchy Statistics:
├─ Ethernet     100%
   ├─ IPv4       87.3%
   │  ├─ TCP     65.2%
   │  ├─ UDP     18.1%
   │  └─ ICMP     4.0%
   └─ ARP        12.7%

Use: tshark -i eth0 pour capturer en ligne de commande`;
    }

    simulateHydra = () => {
        return `Hydra v9.4 (c) 2022 by van Hauser/THC & David Maciejak
[DATA] max 16 tasks per 1 server, overall 16 tasks
[DATA] attacking ssh://192.168.1.100:22/
[22][ssh] host: 192.168.1.100   login: admin   password: admin123
[STATUS] 156.00 tries/min, 156 tries in 00:01h
1 of 1 target successfully completed, 1 valid password found`;
    }

    simulateNikto = () => {
        return `- Nikto v2.5.0
---------------------------------------------------------------------------
+ Target IP:          192.168.1.100
+ Target Hostname:    example.local
+ Target Port:        80
+ Start Time:         ${new Date().toLocaleString()}
---------------------------------------------------------------------------
+ Server: Apache/2.4.52 (Ubuntu)
+ Retrieved x-powered-by header: PHP/8.1.2
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-Content-Type-Options header is not set.
+ No CGI Directories found (use '-C all' to force check all possible dirs)
+ OSVDB-3268: /config/: Directory indexing found.
+ OSVDB-3092: /admin/: This might be interesting...
+ 8102 requests: 0 error(s) and 5 item(s) reported on remote host`;
    }

    simulateSqlmap = () => {
        return `        ___
       __H__
 ___ ___[']_____ ___ ___  {1.7.2#stable}
|_ -| . [']     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

[*] starting @ ${new Date().toLocaleTimeString()}
[*] testing connection to the target URL
[*] heuristics detected web page charset 'ascii'
[*] testing if the target URL is stable
[*] target URL appears to be stable
[*] testing if GET parameter 'id' is dynamic
[*] GET parameter 'id' appears to be dynamic
[*] testing for SQL injection on GET parameter 'id'
[*] confirming that GET parameter 'id' is an injection point
[*] the back-end DBMS is MySQL
web application technology: Apache 2.4.52, PHP 8.1.2
back-end DBMS: MySQL >= 5.0`;
    }

    simulateBurpsuite = () => {
        return `Burp Suite Community Edition v2023.10.3.4
Professional security testing of web applications

Dashboard loaded successfully
Proxy listener started on 127.0.0.1:8080
Intercept is off

Features:
• Proxy - Intercepte et modifie les requêtes HTTP/HTTPS
• Scanner - Détecte les vulnérabilités automatiquement
• Intruder - Automatise les attaques personnalisées
• Repeater - Modifie et renvoie les requêtes
• Sequencer - Analyse la qualité de la génération de tokens

Status: Ready`;
    }

    simulateAircrack = () => {
        return `Aircrack-ng 1.7

                   [00:02:34] 47823 keys tested (1547.89 k/s)

   KEY FOUND! [ WPA2-PSK password123 ]

   Master Key     : AB CD EF 12 34 56 78 90 AB CD EF 12 34 56 78 90 
                    AB CD EF 12 34 56 78 90 AB CD EF 12 34 56 78 90

   Transient Key  : 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
                    00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00

   EAPOL HMAC     : 12 34 56 78 90 AB CD EF 12 34 56 78 90 AB CD EF`;
    }

    simulateJohnTheRipper = () => {
        return `John the Ripper 1.9.0-jumbo-1
Loaded 1 password hash (bcrypt [Blowfish 32/64 X3])
Cost 1 (iteration count) is 1024 for all loaded hashes
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
password         (admin)
1g 0:00:00:15 DONE (${new Date().toLocaleString()}) 0.06410g/s 89.74p/s 89.74c/s 89.74C/s
Use the "--show" option to display all of the cracked passwords reliably
Session completed`;
    }

    simulateHashcat = () => {
        return `hashcat (v6.2.6) starting...

* Device #1: NVIDIA GeForce RTX 3080, 9728/10240 MB, 68MCU

OpenCL API (OpenCL 3.0 CUDA 12.0.140) - Platform #1 [NVIDIA Corporation]
====================================================================
* Device #1: NVIDIA GeForce RTX 3080, 9728/10240 MB (2431/10239 MB allocatable)

Hash-mode was not specified with -m. Attempting to auto-detect hash mode.

The following mode was auto-detected as the only one matching your input hash:

0 | MD5

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 0 (MD5)
Time.Started.....: ${new Date().toLocaleString()}
Speed.#1.........:  8547.2 MH/s (52.34ms)
Recovered........: 1/1 (100.00%) Digests`;
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
                result = `╔════════════════════════════════════════╗
║    Commandes disponibles:
╚════════════════════════════════════════╝
Navigation:
  cd [dossier]  - Changer de répertoire
  ls [dossier]  - Lister les fichiers
  pwd           - Afficher le répertoire courant

Système:
  echo [texte]  - Afficher un texte
  clear         - Effacer l'écran
  exit          - Quitter le terminal
  whoami        - Afficher l'utilisateur
  date          - Afficher la date

Outils Kali Linux (simulation):
  nmap [target] - Scanner de ports réseau
  ettercap      - MITM et sniffing
  metasploit    - Framework d'exploitation
  wireshark     - Analyseur de paquets réseau
  hydra         - Bruteforce de mots de passe
  nikto         - Scanner de vulnérabilités web
  sqlmap        - Détection d'injection SQL
  burpsuite     - Test de sécurité web
  aircrack-ng   - Audit de sécurité WiFi
  john          - Craqueur de mots de passe
  hashcat       - Craqueur de hash avancé`;
                break;

            case "whoami":
                result = "Adam";
                break;

            case "date":
                result = new Date().toString();
                break;

            // Outils Kali Linux
            case "nmap":
                result = this.simulateNmap(rest);
                break;

            case "ettercap":
                result = this.simulateEttercap();
                break;

            case "metasploit":
            case "msfconsole":
                result = this.simulateMetasploit();
                break;

            case "wireshark":
                result = this.simulateWireshark();
                break;

            case "hydra":
                result = this.simulateHydra();
                break;

            case "nikto":
                result = this.simulateNikto();
                break;

            case "sqlmap":
                result = this.simulateSqlmap();
                break;

            case "burpsuite":
            case "burp":
                result = this.simulateBurpsuite();
                break;

            case "aircrack-ng":
            case "aircrack":
                result = this.simulateAircrack();
                break;

            case "john":
                result = this.simulateJohnTheRipper();
                break;

            case "hashcat":
                result = this.simulateHashcat();
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
