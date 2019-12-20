export default function makeGetRate({ issueHttpRequest, asyncpipe, htmldom }) {
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

    const callRateBcv = asyncpipe(
      buildApiComandDolarBcv,
      issueHttpRequest,
      normalizeApiResponse,
      normalizeResponseDataDolarBcv
    );

    const callAsynYadio = await callRateYadio();
    const callAsynDolarToday = await callRateDolarToday();
    const callAsynDolarCucuta = await callRateDolarCucuta();
    const callAsynAirtm = await callRateAirTm();

    return {
      rateYadio: callAsynYadio.rateYadio,
      rateDolarToday: callAsynDolarToday.rateDolarToday,
      rateDolarBcv: callAsynDolarToday.rateDolarBcv,
      rateDolarBtc: callAsynDolarToday.rateDolarBtc,
      rateAirtm: callAsynAirtm.rateAirtm,
      rateDolarCucuta: callAsynDolarCucuta.rateDolarCucuta,
      rate:
        (callAsynYadio.rateYadio +
          callAsynAirtm.rateAirtm +
          callAsynDolarCucuta.rateDolarCucuta +
          callAsynDolarToday.rateDolarToday +
          callAsynDolarToday.rateDolarBcv +
          callAsynDolarToday.rateDolarBtc) /
        6
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

  function buildApiComandDolarBcv() {
    return {
      method: "get",
      data: "",
      headers: {
        "Content-Type": "application/json"
      },
      url: "http://www.bcv.org.ve/estadisticas/gobierno-central"
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
      rateDolarToday: response.USD.dolartoday,
      rateDolarBcv: response.USD.sicad2,
      rateDolarBtc: response.USD.localbitcoin_ref
    };
  }

  function normalizeResponseDataAirTm(response) {
    let $ = htmldom.load(response);
    const rate = parseFloat(
      $(".rate--buy")
        .first()
        .text()
    );
    return {
      rateAirtm: rate
    };
  }

  function normalizeResponseDataDolarCucuta(response) {
    return {
      rateDolarCucuta: response.USDVEF.dolarcucuta_efe
    };
  }

  function normalizeResponseDataDolarBcv(response) {
    let $ = htmldom.load(response);
    $ = htmldom.load($("#dolar").html());
    const rate = parseInt(htmldom.text($("strong")).replace(".", ""));

    return {
      rateDolarBcv: rate
    };
  }
}
