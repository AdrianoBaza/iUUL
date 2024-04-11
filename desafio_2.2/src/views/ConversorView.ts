import * as readline from 'readline'

export class ConversorView {
    private rl: readline.Interface

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    askForInput(message: string): Promise<string> {
        return new Promise(resolve => {
            this.rl.question(message, answer => {
                resolve(answer)
            })
        })
    }

    displayMessage(message: string) {
        console.log(message)
    }

    close() {
        this.rl.close()
    }
}
