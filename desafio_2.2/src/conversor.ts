// index.ts
import * as dotenv from 'dotenv'

import { ConversorController } from './controllers/ConversorController'
dotenv.config()

const controller = new ConversorController()
controller.convertCurrency()
