import makeGetRate from "./rates";
import axios from "axios";
import asyncpipe from "asyncpipe";

const getRates = makeGetRate({
  issueHttpRequest: axios,
  asyncpipe
});

export { getRates };
