import React, { Component } from 'react'
import $ from 'jquery';
const Parser = require('expr-eval').Parser;

const parser = new Parser({
    operators: {
      // These default to true, but are included to be explicit
      add: true,
      concatenate: true,
      conditional: true,
      divide: true,
      factorial: true,
      multiply: true,
      power: true,
      remainder: true,
      subtract: true,

      // Disable and, or, not, <, ==, !=, etc.
      logical: false,
      comparison: false,

      // Disable 'in' and = operators
      'in': false,
      assignment: true
    }
  });

export class Calc extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 2;
        this.prev_commands = [];
        this.commands_index = -1;
        this.variables={}
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
        $('#calculator-body').empty();
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
                <div className=" flex p-2 text-ubt-grey opacity-100 mt-1 float-left font-normal "></div>
                <div className="flex w-full h-5">
                        <div className=" flex text-ubt-green h-1 mr-2"> {';'} </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-calculator-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`calculator-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-calculator-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#calculator-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#calculator-input-${id}`).on("input", function () {
            $(`#cmd span#show-calculator-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
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
        $(`input#calculator-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#calculator-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#calculator-input-${terminal_row_id}`).val(prev_command);
            $(`#show-calculator-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#calculator-input-${terminal_row_id}`).val(prev_command);
            $(`#show-calculator-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    closeTerminal = () => {
        $("#close-calc").trigger('click');
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        // words.shift()
        let result = "";
        switch (main) {        
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "help":                
                result = "Commandes disponibles : <br/>Opérateurs :<br/> addition ( + ), soustraction ( - ),<br/>multiplication ( * ), division ( / ),<br/>modulo ( % ), exponentiation ( ^ )<br/><br/>Fonctions mathématiques :<br/>abs[x] : Valeur absolue (module) de x<br/>acos[x] : Arc cosinus de x (en radians)<br/>acosh[x] : Arc cosinus hyperbolique de x (en radians)<br/>asin[x] : Arc sinus de x (en radians)<br/>asinh[x] : Arc sinus hyperbolique de x (en radians)<br/>atan[x] : Arc tangente de x (en radians)<br/>atanh[x] : Arc tangente hyperbolique de x (en radians)<br/>cbrt[x] : Racine cubique de x<br/>ceil[x] : Plafond de x — le plus petit entier ≥ x<br/>cos[x] : Cosinus de x (x en radians)<br/>cosh[x] : Cosinus hyperbolique de x (x en radians)<br/>exp[x] : e^x (fonction exponentielle, base e)<br/>floor[x] : Plancher de x — le plus grand entier ≤ x<br/>ln[x] : Logarithme népérien de x<br/>log[x] : Logarithme népérien de x (synonyme de ln, pas en base 10)<br/>log10[x] : Logarithme en base 10 de x<br/>log2[x] : Logarithme en base 2 de x<br/>round[x] : x arrondi à l’entier le plus proche<br/>sign[x] : Signe de x (-1, 0 ou 1 pour négatif, zéro ou positif)<br/>sin[x] : Sinus de x (x en radians)<br/>sinh[x] : Sinus hyperbolique de x (x en radians)<br/>sqrt[x] : Racine carrée de x. Résultat NaN (Not a Number) si x est négatif.<br/>tan[x] : Tangente de x (x en radians)<br/>tanh[x] : Tangente hyperbolique de x (x en radians)<br/><br/><br/>Fonctions prédéfinies :<br/>random(n) : Génère un nombre aléatoire dans l’intervalle [0, n). Si n vaut 0 ou n’est pas fourni, la valeur par défaut est 1.<br/>fac(n) ou n! : Factorielle de n (« n × (n−1) × (n−2) × … × 2 × 1 »). Dépréciée. Utiliser l’opérateur ! à la place.<br/>min(a,b,…) : Retourne la plus petite valeur de la liste.<br/>max(a,b,…) : Retourne la plus grande valeur de la liste.<br/>hypot(a,b) : Hypoténuse, c’est-à-dire la racine carrée de la somme des carrés des arguments.<br/>pyt(a, b) : Alias de hypot.<br/>pow(x, y) : Équivalent à x^y.<br/>roundTo(x, n) : Arrondit x à n décimales.<br/><br/>Constantes : <br/>E : Valeur de Math.E depuis l’environnement JavaScript.<br/>PI : Valeur de Math.PI depuis l’environnement JavaScript.<br/><br/>Affectation de variables : <br/>Déclarer une variable et lui assigner une valeur : x=1. La variable déclarée peut être utilisée dans les calculs suivants, par exemple x+2.<br/><br/>Commande clear pour réinitialiser la calculatrice.<br/><br/>Commande exit pour quitter l’application de calculatrice.";
                break;                
            default: 
                result = this.evaluteExp(command);                    
        }
        document.getElementById(`row-calculator-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }
    evaluteExp = (command) => {
        let result = "";
        let expr;
            try{
                expr=parser.parse(command)
                try{
                    result = parser.evaluate(command,this.variables)
                    if(expr.tokens.length===2&&expr.tokens[2].type==="IOP2")
                    this.variables[expr.variables()[0]]=result
                }
                catch (e) {
                    result = e.message;
                }
            }
            catch(e){
                result="Expression Invalide"
            }    
        return result;
    }
    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }
    

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-ubt-grey opacity-100 p-1 float-left font-normal">
                <div>[ Taper "exit" pour quitter, "clear" pour nettoyer, "help" pour obtenir pour en voir plus.]</div>
            <div className="text-white text-sm font-bold bg-ub-drk-abrgn" id="calculator-body">
                {this.state.terminal}
            </div>
            </div>
        )
    }
}

export default Calc

export const displayTerminalCalc = (addFolder,openApp) => {
    return <Calc addFolder={addFolder} openApp={openApp}> </Calc>;
}
