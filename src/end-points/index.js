import makeGetRate from "./rates";
import axios from "axios";
import asyncpipe from "asyncpipe";
import cheerio from "cheerio";

const getRates = makeGetRate({
  issueHttpRequest: axios,
  asyncpipe,
  htmldom: cheerio
});

export { getRates };
