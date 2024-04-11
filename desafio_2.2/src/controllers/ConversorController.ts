import { ConversorModel } from '../models/ConversorModel';
import { ConversorView } from '../views/ConversorView';

export class ConversorController {
    private model: ConversorModel;
    private view: ConversorView;

    constructor() {
        this.model = new ConversorModel();
        this.view = new ConversorView();
    }

    async convertCurrency() {
        let from: string;
        let to: string;
        while (true) {
            from = await this.view.askForInput('Moeda origem (digite uma string vazia para sair): ');
            if (from.trim() === '') {
                break;
            }

            to = await this.view.askForInput('Moeda destino: ');
            if (from === to) {
                this.view.displayMessage('Erro: Moeda origem é igual à moeda destino. Por favor, escolha moedas diferentes.');
                continue;
            }

            const amountString = await this.view.askForInput('Valor: ');
            const amount = parseFloat(amountString.replace(',', '.'));

            try {
                const rate = await this.model.getExchangeRate(from, to);
                const convertedAmount = this.model.convertCurrency(amount, rate);

                console.log('----- Conversor de Moedas -----')
                this.view.displayMessage(`Moeda origem: ${from}`);
                this.view.displayMessage(`Moeda destino: ${to}`);
                this.view.displayMessage(`Valor: ${amount.toFixed(2)}\n`);
    
                this.view.displayMessage(`${from} ${amount.toFixed(2)} => ${to} ${convertedAmount.toFixed(2)}`);
                this.view.displayMessage(`Taxa: ${rate.toFixed(6)}`);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    this.view.displayMessage(error.message);
                } else {
                    this.view.displayMessage('Erro desconhecido');
                }
            }
        }

        this.view.close();
    }
}

