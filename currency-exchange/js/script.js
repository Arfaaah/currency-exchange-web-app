// Currency Exchange: live rates from free sources that need no API key.
// 1st source: ExchangeRate-API open access (https://open.er-api.com), updated daily.
// 2nd source (backup): fawazahmed0 currency-api on jsDelivr, also free with no key.
// Rates are cached in the browser for 1 hour so the app is fast and kind to the free APIs.

const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const swapButton = document.getElementById("swap");
const form = document.getElementById("converter");
const resultBox = document.getElementById("result");
const updatedText = document.getElementById("updated");
const submitButton = form.querySelector("button[type=submit]");

const CACHE_MINUTES = 60;
const REQUEST_TIMEOUT_MS = 8000;

// Show full names like "NGN - Nigerian Naira" where the browser supports it
const currencyNames = (() => {
  try { return new Intl.DisplayNames(["en"], { type: "currency" }); } catch { return null; }
})();
const label = (code) => {
  const name = currencyNames ? currencyNames.of(code) : "";
  return name && name !== code ? `${code} - ${name}` : code;
};

// ---------- Fetching rates ----------

function withTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

// Each source returns { rates: { USD: 1, NGN: 1500, ... }, updated: "date text", source: "name" }
async function fromExchangeRateApi(base) {
  const res = await withTimeout(`https://open.er-api.com/v6/latest/${base}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.result !== "success" || !data.rates) throw new Error("Bad response");
  return { rates: data.rates, updated: data.time_last_update_utc, source: "ExchangeRate-API" };
}

async function fromCurrencyApi(base) {
  const code = base.toLowerCase();
  const urls = [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${code}.json`,
    `https://latest.currency-api.pages.dev/v1/currencies/${code}.json`,
  ];
  for (const url of urls) {
    try {
      const res = await withTimeout(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (!data[code]) continue;
      const rates = {};
      for (const [k, v] of Object.entries(data[code])) rates[k.toUpperCase()] = v;
      return { rates, updated: data.date, source: "currency-api" };
    } catch { /* try the next URL */ }
  }
  throw new Error("Backup source failed");
}

function readCache(base) {
  try {
    const saved = JSON.parse(localStorage.getItem(`rates-${base}`));
    if (saved && Date.now() - saved.savedAt < CACHE_MINUTES * 60 * 1000) return saved.data;
  } catch { /* storage blocked or empty: ignore */ }
  return null;
}

function writeCache(base, data) {
  try { localStorage.setItem(`rates-${base}`, JSON.stringify({ savedAt: Date.now(), data })); } catch { /* ignore */ }
}

async function getRates(base) {
  const cached = readCache(base);
  if (cached) return cached;
  let data;
  try {
    data = await fromExchangeRateApi(base);
  } catch {
    data = await fromCurrencyApi(base); // throws if the backup also fails
  }
  writeCache(base, data);
  return data;
}

// ---------- Screen ----------

function setFlag(img, code) {
  const country = CURRENCY_FLAGS[code];
  img.hidden = !country;
  if (country) {
    img.src = `https://flagcdn.com/w40/${country}.png`;
    img.alt = `${code} flag`;
  }
}

function fillDropdowns(codes) {
  const sorted = [...codes].sort();
  for (const select of [fromSelect, toSelect]) {
    const current = select.value;
    select.innerHTML = sorted.map((c) => `<option value="${c}">${label(c)}</option>`).join("");
    if (current && sorted.includes(current)) select.value = current;
  }
}

function formatNumber(value, code) {
  const digits = value !== 0 && Math.abs(value) < 1 ? 6 : 2;
  try {
    return new Intl.NumberFormat("en", { maximumFractionDigits: digits }).format(value) + " " + code;
  } catch {
    return value.toFixed(digits) + " " + code;
  }
}

function showError(message) {
  resultBox.textContent = message;
  resultBox.classList.add("error");
  updatedText.textContent = "";
}

async function convert() {
  let amount = parseFloat(amountInput.value);
  if (!Number.isFinite(amount) || amount <= 0) {
    amount = 1;
    amountInput.value = "1";
  }
  const from = fromSelect.value;
  const to = toSelect.value;

  resultBox.classList.remove("error");
  resultBox.textContent = "Getting exchange rate...";
  submitButton.disabled = true;

  try {
    const data = await getRates(from);
    const rate = data.rates[to];
    if (typeof rate !== "number") throw new Error("Rate not available");
    resultBox.textContent = `${formatNumber(amount, from)} = ${formatNumber(amount * rate, to)}`;
    updatedText.textContent = data.updated ? `Rates updated: ${data.updated}` : "";
  } catch {
    showError(navigator.onLine === false
      ? "You are offline. Check your connection and try again."
      : "Could not get the exchange rate right now. Please try again.");
  } finally {
    submitButton.disabled = false;
  }
}

// ---------- Events ----------

let typingTimer;
amountInput.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(convert, 500); // convert when the user stops typing
});

fromSelect.addEventListener("change", () => { setFlag(fromFlag, fromSelect.value); convert(); });
toSelect.addEventListener("change", () => { setFlag(toFlag, toSelect.value); convert(); });

swapButton.addEventListener("click", () => {
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
  setFlag(fromFlag, fromSelect.value);
  setFlag(toFlag, toSelect.value);
  convert();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  convert();
});

// ---------- Start ----------

async function start() {
  // Show the built-in list straight away, then keep only codes the rate source supports
  fillDropdowns(Object.keys(CURRENCY_FLAGS));
  fromSelect.value = "USD";
  toSelect.value = "NGN";
  try {
    const data = await getRates("USD");
    const supported = Object.keys(CURRENCY_FLAGS).filter((c) => c in data.rates);
    if (supported.length > 10) fillDropdowns(supported);
  } catch { /* keep the built-in list; convert() will show the error */ }
  setFlag(fromFlag, fromSelect.value);
  setFlag(toFlag, toSelect.value);
  convert();
}

start();
