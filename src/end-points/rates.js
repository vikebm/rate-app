export default function makeGetRate({ issueHttpRequest, asyncpipe }) {
  return async function getRate() {
    const callRateYadio = asyncpipe(
      buildApiComandYadio,
      issueHttpRequest,
      normalizeApiResponse,
      normalizeResponseDataYadio
    );

    const callRateDolarToday = asyncpipe(
      buildApiComandDolarToday,
      issueHttpRequest,
      normalizeApiResponse,
      normalizeResponseDataDolarToday
    );

    const callRateAirTm = asyncpipe(
      buildApiComandAirTm,
      issueHttpRequest,
      normalizeApiResponse,
      normalizeResponseDataAirTm
    );

    const callRateDolarCucuta = asyncpipe(
      buildApiComandDolarCucuta,
      issueHttpRequest,
      normalizeApiResponse,
      normalizeResponseDataDolarCucuta
    );

    const callAsynYadio = await callRateYadio();
    const callAsynDolarToday = await callRateDolarToday();
    //const callAsynDolarCucuta = await callRateDolarCucuta(); Not working in local
    const callAsynAirtm = await callRateAirTm();

    return {
      rateYadio: callAsynYadio.rateYadio,
      rateDolarToday: callAsynDolarToday.rateDolarToday,
      rateAirtm: callAsynAirtm.rateAirtm,
      rate:
        (callAsynYadio.rateYadio +
          callAsynDolarToday.rateDolarToday +
          callAsynAirtm.rateAirtm) /
        3
    };
  };

  function buildApiComandYadio() {
    return {
      method: "get",
      data: "",
      headers: {
        "Content-Type": "application/json"
      },
      url: process.env.URL_YADIO
    };
  }

  function buildApiComandDolarToday() {
    return {
      method: "get",
      data: "",
      headers: {
        "Content-Type": "application/json"
      },
      url: process.env.URL_DOLAR_TODAY
    };
  }

  function buildApiComandAirTm() {
    return {
      method: "get",
      data: "",
      headers: {
        "Content-Type": "application/json"
      },
      url: process.env.URL_AIRTM
    };
  }

  function buildApiComandDolarCucuta() {
    return {
      method: "get",
      data: "",
      headers: {
        "Content-Type": "application/json"
      },
      url: process.env.URL_DOLAR_CUCUTA
    };
  }

  function normalizeApiResponse(response) {
    return response.data;
  }

  function normalizeResponseDataYadio(response) {
    return {
      rateYadio: response.USD.rate
    };
  }

  function normalizeResponseDataDolarToday(response) {
    return {
      rateDolarToday: response.USD.dolartoday
    };
  }

  function normalizeResponseDataAirTm(response) {
    return {
      rateAirtm: response.yesterday.VES_CASH.rate
    };
  }

  function normalizeResponseDataDolarCucuta(response) {
    return {
      rateDolarCucuta: response.USDVEF.dolarcucuta
    };
  }
}
