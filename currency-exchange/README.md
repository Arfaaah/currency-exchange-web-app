# Currency Exchange

A simple web app that converts between world currencies using live exchange rates.

**Live demo:** https://YOUR-GITHUB-USERNAME.github.io/currency-exchange/

## Features

- Live exchange rates, no API key needed
- About 160 currencies, with full names and flags
- Converts as you type, plus a Get Exchange Rate button
- Swap button to flip the two currencies
- Works on phones, tablets and computers
- Backup rate source if the main one is down, and clear error messages when offline
- Rates are saved in the browser for 1 hour, so it loads fast and uses the free APIs lightly

## How it works

1. The app asks the main rate source for today's rates against the "From" currency.
2. It multiplies the amount you entered by the rate for the "To" currency.
3. If the main source fails, it tries the backup source.

## Rate sources

| Source | Key needed | Updates |
|---|---|---|
| [ExchangeRate-API open access](https://www.exchangerate-api.com/docs/free) (main) | No | Once a day |
| [fawazahmed0 currency-api](https://github.com/fawazahmed0/exchange-api) (backup) | No | Daily |

Rates are for information only and can differ from what banks and exchange services charge.

## Built with

HTML, CSS and JavaScript (no frameworks). Flags from [flagcdn.com](https://flagcdn.com), font Poppins from Google Fonts.

## Run it on your computer

Open `index.html` in a browser. No install or build step is needed.

## History

- **Version 1:** I built the first version on my phone in Spck Code Editor while learning HTML, CSS and JavaScript in the 3MTT Cohort 2 Software Development programme. It used an ExchangeRate-API trial key, which expired after 30 days.
- **Version 2 (this version):** rebuilt to use free rate sources with no key, a backup source, an updated currency list (old codes such as BYR, VEF and ZMK replaced), full currency names, a fully responsive layout and better error handling. I rebuilt it with help from an AI coding assistant.

## Author

Maryam Balarabe Adamu, Software Engineering student, Khalifa Isyaku Rabiu University (KHAIRUN), Kano.
