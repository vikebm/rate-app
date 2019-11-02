import { getRates } from "../end-points";
import makeFindRates from "./find-rates";

const findRates = makeFindRates({ getRates });

export { findRates };
