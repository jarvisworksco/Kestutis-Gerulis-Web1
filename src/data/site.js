// =============================================================================
//  KLIENTO DUOMENYS — VIENINTELIS ŠALTINIS
// -----------------------------------------------------------------------------
//  Visi tekstai, kontaktai, paslaugos, atsiliepimai ir nuotraukos — ČIA.
//  Užpildyk pagal TEMPLATE-PROMPT.md. Reikšmės žemiau yra PLACEHOLDER'iai.
//  TAISYKLĖ: jokių išgalvotų faktų — jei duomens nėra, palik tuščią / pašalink.
// =============================================================================

export const imone = {
  pavadinimas: 'UAB „Pavyzdys"',               // PAKEISTI
  telefonas: '+370 600 00000',                  // PAKEISTI
  telefonasHref: 'tel:+37060000000',            // PAKEISTI (be tarpų)
  elpastas: '',                                 // jei nėra — palik tuščią ('')
  miestas: 'Miestas',                           // PAKEISTI
  aptarnavimoSpindulys: 'iki 100 km aplink',    // PAKEISTI
  patirtisMetais: 10,                           // PAKEISTI
  ivertinimas: 5.0,                             // PAKEISTI (iš profilio)
  atsiliepimuSkaicius: 0,                       // PAKEISTI (iš profilio)
  saskaitosFakturos: true,
  // Kliento profilio nuoroda — naudojama „Žiūrėti visus atsiliepimus" IR
  // „Įvertinkite mus" mygtukuose. PAKEISTI tikra paslaugos.lt / Google nuoroda.
  profilis: 'https://paslaugos.lt/PAKEISTI',
};

export const vietoves = [
  'Miestas', 'Rajonas', 'Vietovė 1', 'Vietovė 2', 'Vietovė 3',
  'Vietovė 4', 'Vietovė 5', 'ir kitos vietovės',
];

// Puslapių tekstai (hero, „apie mus") — kad viskas būtų viename faile.
export const turinys = {
  hero: {
    antraste: 'Pagrindinė paslauga jūsų mieste',          // PAKEISTI (su raktažodžiu + miestu)
    paantraste:
      'Trumpas, įtikinantis sakinys apie tai, ką darote ir kodėl verta rinktis būtent jus. Profesionaliai, greitai ir už aiškią kainą.', // PAKEISTI
    nuotrauka: '/images/placeholder-landscape.svg',        // PAKEISTI gražiausia realia/AI hero nuotrauka
  },
  apie: {
    antraste: 'Vietinis verslas, kuriuo galima pasitikėti', // PAKEISTI
    pastraipos: [                                            // PAKEISTI (2–3 pastraipos iš realaus profilio teksto)
      'Pirma pastraipa apie įmonę: kas esate, kiek metų dirbate, kuo specializuojatės ir kokiems klientams dirbate.',
      'Antra pastraipa: kuo jūsų darbas išsiskiria — technika, kokybė, požiūris, sudėtingi atvejai, kuriuos sprendžiate.',
    ],
    nuotrauka: '/images/placeholder-portrait.svg',          // PAKEISTI realia nuotrauka su technika/žmogumi
    privalumai: [                                            // PAKEISTI
      'Profesionali įranga',
      'Aiški kaina pagal apimtį',
      'Laikomės sutartų terminų',
      'Išrašome sąskaitas faktūras',
    ],
  },
};

// -----------------------------------------------------------------------------
//  PASLAUGOS — viena kortelė + atskiras puslapis kiekvienai (/paslaugos/[slug]).
//  Nuotraukas priskirk pagal TURINĮ (paslaugą atitinkanti nuotrauka), ne random.
// -----------------------------------------------------------------------------
export const paslaugos = [
  {
    slug: 'paslauga-viena',                                 // PAKEISTI (be lietuviškų raidžių)
    pavadinimas: 'Pirmoji paslauga',                        // PAKEISTI
    kaina: 'Nuo 00 € / vnt.',                               // PAKEISTI (arba 'Kaina sutartinė')
    trumpai: 'Vieno sakinio paslaugos aprašymas kortelei pagrindiniame puslapyje.', // PAKEISTI
    kortelesNuotrauka: '/images/placeholder-landscape.svg', // PAKEISTI
    alt: 'Pirmosios paslaugos darbų pavyzdys',              // PAKEISTI (lietuviškas alt)
    aprasymas: [                                             // PAKEISTI (2–4 unikalios pastraipos)
      'Detalus paslaugos aprašymas: ką tiksliai darote, kaip vyksta procesas, kokius atvejus apimate.',
      'Antra pastraipa su konkrečiais privalumais ir tuo, kuo ši paslauga naudinga klientui.',
    ],
    nuotraukos: [                                            // PAKEISTI (tos paslaugos nuotraukos)
      { src: '/images/placeholder-landscape.svg', alt: 'Darbų pavyzdys 1' },
      { src: '/images/placeholder-portrait.svg', alt: 'Darbų pavyzdys 2' },
      { src: '/images/placeholder-landscape.svg', alt: 'Darbų pavyzdys 3' },
    ],
  },
  {
    slug: 'paslauga-dvi',
    pavadinimas: 'Antroji paslauga',
    kaina: 'Nuo 00 € / vnt.',
    trumpai: 'Vieno sakinio paslaugos aprašymas kortelei pagrindiniame puslapyje.',
    kortelesNuotrauka: '/images/placeholder-portrait.svg',
    alt: 'Antrosios paslaugos darbų pavyzdys',
    aprasymas: [
      'Detalus paslaugos aprašymas: ką tiksliai darote, kaip vyksta procesas, kokius atvejus apimate.',
      'Antra pastraipa su konkrečiais privalumais ir tuo, kuo ši paslauga naudinga klientui.',
    ],
    nuotraukos: [
      { src: '/images/placeholder-portrait.svg', alt: 'Darbų pavyzdys 1' },
      { src: '/images/placeholder-landscape.svg', alt: 'Darbų pavyzdys 2' },
    ],
  },
  {
    slug: 'paslauga-trys',
    pavadinimas: 'Trečioji paslauga',
    kaina: 'Kaina sutartinė — teiraukitės',
    trumpai: 'Vieno sakinio paslaugos aprašymas kortelei pagrindiniame puslapyje.',
    kortelesNuotrauka: '/images/placeholder-landscape.svg',
    alt: 'Trečiosios paslaugos darbų pavyzdys',
    aprasymas: [
      'Detalus paslaugos aprašymas: ką tiksliai darote, kaip vyksta procesas, kokius atvejus apimate.',
      'Antra pastraipa su konkrečiais privalumais ir tuo, kuo ši paslauga naudinga klientui.',
    ],
    nuotraukos: [
      { src: '/images/placeholder-landscape.svg', alt: 'Darbų pavyzdys 1' },
      { src: '/images/placeholder-portrait.svg', alt: 'Darbų pavyzdys 2' },
    ],
  },
];

// -----------------------------------------------------------------------------
//  ATSILIEPIMAI — pažodžiui iš kliento profilio (vardas, data, žvaigždutės, tekstas).
//  Jokio redagavimo. PAKEISTI visus žemiau esančius placeholder'ius.
// -----------------------------------------------------------------------------
export const atsiliepimai = [
  { vardas: 'Vardas Pavardė', paslauga: 'Pirmoji paslauga', data: '2025-01-01', zvaigzdes: 5, tekstas: 'Placeholder atsiliepimo tekstas — pakeisti realiu klientų atsiliepimu iš profilio.' },
  { vardas: 'Vardas Pavardė', paslauga: 'Antroji paslauga', data: '2025-01-01', zvaigzdes: 5, tekstas: 'Placeholder atsiliepimo tekstas — pakeisti realiu klientų atsiliepimu iš profilio.' },
  { vardas: 'Vardas Pavardė', paslauga: '', data: '2025-01-01', zvaigzdes: 5, tekstas: 'Placeholder atsiliepimo tekstas — pakeisti realiu klientų atsiliepimu iš profilio.' },
  { vardas: 'Vardas Pavardė', paslauga: 'Trečioji paslauga', data: '2025-01-01', zvaigzdes: 5, tekstas: 'Placeholder atsiliepimo tekstas — pakeisti realiu klientų atsiliepimu iš profilio.' },
  { vardas: 'Vardas Pavardė', paslauga: 'Pirmoji paslauga', data: '2025-01-01', zvaigzdes: 5, tekstas: 'Placeholder atsiliepimo tekstas — pakeisti realiu klientų atsiliepimu iš profilio.' },
  { vardas: 'Vardas Pavardė', paslauga: '', data: '2025-01-01', zvaigzdes: 5, tekstas: 'Placeholder atsiliepimo tekstas — pakeisti realiu klientų atsiliepimu iš profilio.' },
];

export const duk = [
  { klausimas: 'Kiek kainuoja paslaugos?', atsakymas: 'PAKEISTI — atsakymas apie kainodarą pagal realius kliento įkainius.' },
  { klausimas: 'Kokiose vietovėse dirbate?', atsakymas: 'PAKEISTI — aptarnaujamos teritorijos pagal realius duomenis.' },
  { klausimas: 'Kaip greitai galite atvykti?', atsakymas: 'PAKEISTI — terminai / reagavimo laikas.' },
  { klausimas: 'Ar dirbate su įmonėmis?', atsakymas: 'PAKEISTI — ar teikiamos paslaugos verslui, ar išrašomos sąskaitos faktūros.' },
  { klausimas: 'Kaip sužinoti tikslią kainą?', atsakymas: 'PAKEISTI — kaip pateikti užklausą ir gauti pasiūlymą.' },
];

// -----------------------------------------------------------------------------
//  GALERIJA — visos realios darbo nuotraukos. plati:true = per visą plotį (masonry).
//  Nuotraukos rodomos PILNU dydžiu (neapkarpomos) — prieš/po koliažai turi matytis.
// -----------------------------------------------------------------------------
export const galerija = [
  { src: '/images/placeholder-landscape.svg', alt: 'Darbų pavyzdys', plati: true },
  { src: '/images/placeholder-portrait.svg', alt: 'Darbų pavyzdys' },
  { src: '/images/placeholder-landscape.svg', alt: 'Darbų pavyzdys' },
  { src: '/images/placeholder-portrait.svg', alt: 'Darbų pavyzdys' },
  { src: '/images/placeholder-landscape.svg', alt: 'Darbų pavyzdys', plati: true },
  { src: '/images/placeholder-portrait.svg', alt: 'Darbų pavyzdys' },
  { src: '/images/placeholder-landscape.svg', alt: 'Darbų pavyzdys' },
  { src: '/images/placeholder-portrait.svg', alt: 'Darbų pavyzdys' },
];

// Procesas — 4 žingsniai. Pritaikyk pavadinimus/aprašymus pagal nišą.
export const procesas = [
  { pavadinimas: 'Susisiekite', aprasymas: 'Paskambinkite ar užpildykite užklausos formą — trumpai aprašykite darbą.' },
  { pavadinimas: 'Įvertinimas ir kaina', aprasymas: 'Įvertinsiu apimtį ir sudėtingumą — pateiksiu aiškią kainą be įsipareigojimų.' },
  { pavadinimas: 'Darbų atlikimas', aprasymas: 'Atvykstu su profesionalia įranga ir atlieku darbus sutartu laiku.' },
  { pavadinimas: 'Rezultatas ir sąskaita', aprasymas: 'Perduodu atliktą darbą ir, jei reikia, išrašau sąskaitą faktūrą.' },
];
