// src\models\ConversorModel.ts

import axios from 'axios';

interface ExchangeRateResponse {
    result: string;
    conversion_rate: number;
    'error-type'?: string;
}

export class ConversorModel {
    async getExchangeRate(from: string, to: string): Promise<number> {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error('Chave de API não encontrada. Verifique sua autenticação.');
        }

        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`;
        try {
            const response = await axios.get<ExchangeRateResponse>(apiUrl);
            if (response.data.result === 'success') {
                return response.data.conversion_rate;
            } else if (response.data['error-type']) {
                throw new Error(`Erro na obtenção da taxa de câmbio: ${response.data['error-type']}`);
            } else {
                throw new Error('Erro desconhecido na obtenção da taxa de câmbio.');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Erro na comunicação com a API: ' + error.message);
            } else {
                throw new Error('Erro desconhecido na comunicação com a API');
            }
        }
    }

    convertCurrency(amount: number, rate: number): number {
        return amount * rate;
    }
}
