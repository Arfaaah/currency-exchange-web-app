// Currency code -> country code used for the flag image (flagcdn.com).
// Updated from the original list: old codes that no longer exist were replaced
// (for example BYR -> BYN, VEF -> VES, ZMK -> ZMW, MRO -> MRU, STD -> STN, SLL -> SLE)
// and currencies replaced by the euro (EEK, LTL, LVL, CYP, MTL, SKK, HRK) were removed.
// Only currencies the rate source actually returns are shown in the dropdowns.
const CURRENCY_FLAGS = {
  AED: "ae", AFN: "af", ALL: "al", AMD: "am", ANG: "cw", AOA: "ao", ARS: "ar",
  AUD: "au", AWG: "aw", AZN: "az", BAM: "ba", BBD: "bb", BDT: "bd", BGN: "bg",
  BHD: "bh", BIF: "bi", BMD: "bm", BND: "bn", BOB: "bo", BRL: "br", BSD: "bs",
  BTN: "bt", BWP: "bw", BYN: "by", BZD: "bz", CAD: "ca", CDF: "cd", CHF: "ch",
  CLP: "cl", CNY: "cn", COP: "co", CRC: "cr", CUP: "cu", CVE: "cv", CZK: "cz",
  DJF: "dj", DKK: "dk", DOP: "do", DZD: "dz", EGP: "eg", ERN: "er", ETB: "et",
  EUR: "eu", FJD: "fj", FKP: "fk", GBP: "gb", GEL: "ge", GHS: "gh", GIP: "gi",
  GMD: "gm", GNF: "gn", GTQ: "gt", GYD: "gy", HKD: "hk", HNL: "hn", HTG: "ht",
  HUF: "hu", IDR: "id", ILS: "il", INR: "in", IQD: "iq", IRR: "ir", ISK: "is",
  JMD: "jm", JOD: "jo", JPY: "jp", KES: "ke", KGS: "kg", KHR: "kh", KMF: "km",
  KPW: "kp", KRW: "kr", KWD: "kw", KYD: "ky", KZT: "kz", LAK: "la", LBP: "lb",
  LKR: "lk", LRD: "lr", LSL: "ls", LYD: "ly", MAD: "ma", MDL: "md", MGA: "mg",
  MKD: "mk", MMK: "mm", MNT: "mn", MOP: "mo", MRU: "mr", MUR: "mu", MVR: "mv",
  MWK: "mw", MXN: "mx", MYR: "my", MZN: "mz", NAD: "na", NGN: "ng", NIO: "ni",
  NOK: "no", NPR: "np", NZD: "nz", OMR: "om", PAB: "pa", PEN: "pe", PGK: "pg",
  PHP: "ph", PKR: "pk", PLN: "pl", PYG: "py", QAR: "qa", RON: "ro", RSD: "rs",
  RUB: "ru", RWF: "rw", SAR: "sa", SBD: "sb", SCR: "sc", SDG: "sd", SEK: "se",
  SGD: "sg", SHP: "sh", SLE: "sl", SOS: "so", SRD: "sr", SSP: "ss", STN: "st",
  SYP: "sy", SZL: "sz", THB: "th", TJS: "tj", TMT: "tm", TND: "tn", TOP: "to",
  TRY: "tr", TTD: "tt", TWD: "tw", TZS: "tz", UAH: "ua", UGX: "ug", USD: "us",
  UYU: "uy", UZS: "uz", VES: "ve", VND: "vn", VUV: "vu", WST: "ws", XAF: "cm",
  XCD: "ag", XOF: "sn", XPF: "pf", YER: "ye", ZAR: "za", ZMW: "zm", ZWL: "zw"
};
