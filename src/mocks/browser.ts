import {setupWorker} from "msw/browser"
import { handlers } from "./handles"

export const worker = setupWorker(...handlers);