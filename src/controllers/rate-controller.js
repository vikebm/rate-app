export default function makeGetRate(findRates) {
  return async function getRate() {
    const headers = {
      "Content-Type": "application/json"
    };
    try {
      const rates = await findRates();

      return {
        headers,
        statusCode: 200,
        body: rates
      };
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
}
