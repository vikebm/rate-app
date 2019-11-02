import makeGetRates from "./rate-controller";
import { findRates } from "../uses-cases";

const getRate = makeGetRates(findRates);

export { getRate };
