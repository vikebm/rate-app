export default function makeFindRates({ getRates }) {
  return async function findRates({} = {}) {
   const rates = await getRates();

    return {
      ...rates
    };
  };
}
