export const CORRIDOR_NEIGHBOURHOODS = [
  "Preston St",
  "Little Italy",
  "Dow's Lake / Carling",
  "Chinatown / Somerset West",
  "Centretown West",
  "Hintonburg",
  "Civic Hospital area",
];

export const HOURS_STATUS = {
  // Published late-night schedule (Ottawa local). Not 24h — doors open at noon.
  is24h: false,
  timezone: "America/Toronto",
  summary: "Open daily from 12 PM; late-night close varies by day (as late as 4 AM Thu–Sat).",
  detail: "Preston Cannabis at 268 Preston St in Little Italy keeps a noon-open, late-night close: Thursday–Saturday until 4 AM, Sunday until 2 AM, and Monday–Wednesday until 1 AM (Ottawa local time). Holiday timing can still shift — call 343-804-9020 if you are unsure before you travel.",
  weekly: [
    { dayOfWeek: "Thursday", opens: "12:00", closes: "04:00", label: "12 PM–4 AM" },
    { dayOfWeek: "Friday", opens: "12:00", closes: "04:00", label: "12 PM–4 AM" },
    { dayOfWeek: "Saturday", opens: "12:00", closes: "04:00", label: "12 PM–4 AM" },
    { dayOfWeek: "Sunday", opens: "12:00", closes: "02:00", label: "12 PM–2 AM" },
    { dayOfWeek: "Monday", opens: "12:00", closes: "01:00", label: "12 PM–1 AM" },
    { dayOfWeek: "Tuesday", opens: "12:00", closes: "01:00", label: "12 PM–1 AM" },
    { dayOfWeek: "Wednesday", opens: "12:00", closes: "01:00", label: "12 PM–1 AM" },
  ],
};

export const HOME_HUB_CARDS = [
  { href: "/weed-dispensary-near-me", eyebrow: "01 / GEO", title: "Weed near Preston St", blurb: "Little Italy and Centretown West orientation for shoppers already in the corridor." },
  { href: "/visit", eyebrow: "02 / VISIT", title: "Plan your visit", blurb: "O-Train Line 2 / Carling, buses, parking notes, and landmarks around 268 Preston St." },
  { href: "/native-cigarettes", eyebrow: "03 / SHELF", title: "Native cigarettes", blurb: "Merchandise-category shelf language for carton and pack formats on the Preston Cannabis menu." },
  { href: "/nicotine-vape", eyebrow: "04 / SHELF", title: "Nicotine vapes", blurb: "A dedicated nicotine vape pillar kept separate from THC disposables." },
  { href: "/delivery", eyebrow: "05 / STATUS", title: "Delivery information", blurb: "Published delivery status only — no invented coverage claims." },
  { href: "/exotic", eyebrow: "06 / TIERS", title: "Flower tiers", blurb: "Jump into Exotic, Premium, AAA+, AA, and Budget weed collections." },
];

export const HOME_FAQS = [
  { question: "Where is Preston Cannabis?", answer: "Preston Cannabis is at 268 Preston St, Ottawa, ON K1R 7R6, in Little Italy between Carling and Somerset West." },
  { question: "Which neighbourhoods does the Preston Street corridor serve?", answer: "Shoppers commonly arrive from Little Italy, Dow's Lake / Carling, Chinatown / Somerset West, Centretown West, Hintonburg, and the Civic Hospital area." },
  { question: "How do I confirm store hours?", answer: "Preston Cannabis opens daily at 12 PM. Thursday–Saturday close at 4 AM, Sunday at 2 AM, and Monday–Wednesday at 1 AM (Ottawa local). Call 343-804-9020 for holiday exceptions." },
  { question: "Is the online menu Preston inventory?", answer: "Yes. The online menu lists Preston Cannabis products, weights, and prices for 268 Preston St." },
  { question: "Where should first-time visitors start?", answer: "Use the Visit page for transit and parking notes, then browse flower tiers or the Native cigarettes and nicotine vape shelves." },
];

export const VISIT_COPY = {
  title: "How to Visit on Preston St in Little Italy | Preston Cannabis",
  h1: "How to visit Preston Cannabis on Preston Street in Little Italy",
  description: "Directions, O-Train Line 2 / Carling notes, buses, parking, and landmarks for Preston Cannabis at 268 Preston St, Ottawa, ON K1R 7R6.",
  intro: "Use this page to reach 268 Preston St without mixing Preston Cannabis up with downtown ByWard destinations. The storefront sits on Preston Street in Little Italy, with easy links toward Dow's Lake, Carling, Somerset West, and Centretown West.",
  sections: [
    { heading: "Store pin", body: "Preston Cannabis — 268 Preston St, Ottawa, ON K1R 7R6. Phone 343-804-9020. Adults 19+." },
    { heading: "O-Train Line 2 / Carling", body: "Riders on O-Train Line 2 can use Carling-area access and continue a short surface hop onto Preston Street. Confirm live Line 2 schedules before you leave; overnight gaps are common." },
    { heading: "Bus approaches", body: "OC Transpo routes that touch Carling, Preston, and Somerset West are the practical buses for Little Italy. Stay on the Preston spine rather than cutting east toward Elgin if your goal is this address." },
    { heading: "Parking and curb notes", body: "Look for short-stay curb space and nearby lots along Preston Street and the side streets that feed Little Italy restaurants. Weekend evenings fill faster near Somerset West." },
    { heading: "Landmarks", body: "Orient on Preston Street between Carling and Somerset West, with Dow's Lake to the south-west and the Civic Hospital area a short hop north-east. Chinatown / Somerset West is the northern walk for many visitors." },
  ],
  faqs: [
    { question: "What is the exact address?", answer: "268 Preston St, Ottawa, ON K1R 7R6." },
    { question: "Does this page claim 24-hour opening?", answer: "No. Preston Cannabis opens at 12 PM daily and closes late (4 AM Thu–Sat, 2 AM Sunday, 1 AM Mon–Wed). It is not a 24-hour store." },
    { question: "Is Preston Cannabis the same as Spirit Corner on Dalhousie?", answer: "No. Preston Cannabis is a Preston Street / Little Italy storefront and is not a ByWard Market counter." },
  ],
};

export const HOURS_COPY = {
  title: "Store Hours on Preston Street | Preston Cannabis",
  h1: "Late-night store hours for Preston Cannabis on Preston Street",
  description: "Published Ottawa hours for Preston Cannabis at 268 Preston St: noon open daily, with late closes through 4 AM Thu–Sat, 2 AM Sunday, and 1 AM Mon–Wed.",
  intro: "Preston Cannabis publishes a noon-to-late schedule for the Little Italy door at 268 Preston St. Shoppers heading over from Carling, Somerset West, or Dow's Lake can plan around the weekday grid below — doors open at 12 PM every day, then stay open past midnight on a day-by-day close.",
  sections: [
    { heading: "Weekly hours (Ottawa local)", body: "Thursday 12 PM–4 AM. Friday 12 PM–4 AM. Saturday 12 PM–4 AM. Sunday 12 PM–2 AM. Monday 12 PM–1 AM. Tuesday 12 PM–1 AM. Wednesday 12 PM–1 AM. Closes after midnight are listed on the same calendar day they begin." },
    { heading: "Late night on Preston Street", body: "Thursday through Saturday run the longest window, staying open until 4 AM. Sunday winds down at 2 AM, and Monday through Wednesday close at 1 AM. This is a late-night pattern, not a 24-hour claim." },
    { heading: "Before you cross town", body: "If you are coming from Hintonburg, Dow's Lake, or across the river via Carling, leave a few extra minutes for Little Italy parking. For holiday exceptions, call 343-804-9020." },
  ],
  faqs: [
    { question: "What are Preston Cannabis hours?", answer: "Open daily at 12 PM. Thursday–Saturday close at 4 AM, Sunday at 2 AM, and Monday–Wednesday at 1 AM (Ottawa local time)." },
    { question: "Is Preston Cannabis open 24 hours?", answer: "No. The store opens at noon and closes late — as late as 4 AM on Thursday–Saturday — but it is not a 24-hour shop." },
    { question: "Are you open late on weekends?", answer: "Yes. Friday and Saturday follow the Thursday pattern: 12 PM to 4 AM. Sunday runs 12 PM to 2 AM." },
  ],
};

export const NATIVE_CIG_COPY = {
  title: "Native Cigarettes on Preston St in Little Italy | Preston Cannabis",
  h1: "Native cigarettes on Preston Street in Little Italy",
  description: "Merchandise-category shelf language for Native cigarettes at Preston Cannabis, 268 Preston St, Ottawa, ON K1R 7R6. Adults 19+.",
  intro: "This pillar describes the Native cigarettes merchandise category on the Preston Cannabis menu. It is adult merchandise-category shelf language only, with no cultural or wellness story attached.",
  sections: [
    { heading: "What the shelf covers", body: "Carton and pack formats listed under the cigarettes collection on the Preston Cannabis menu. Names, counts, and prices follow those menu rows rather than marketing adjectives." },
    { heading: "How Preston shoppers use the category", body: "Visitors walking Preston Street after dinner in Little Italy often check cigarette formats alongside accessories. Keep the Native cigarettes aisle separate from THC flower tiers when you compare." },
    { heading: "Responsible framing", body: "Native cigarettes here means a labelled merchandise category for adults 19+. No cultural sourcing story or wellness promise appears on this page." },
    { heading: "Next steps in the storefront", body: "Open the cigarettes menu collection for SKUs, or return to Visit for the Preston Street pin before you travel." },
  ],
  faqs: [
    { question: "Are Native cigarettes sold as a cultural product here?", answer: "No. On this site the phrase is merchandise-category shelf language for adult shoppers only." },
    { question: "Where do I browse listed SKUs?", answer: "Open the cigarettes collection on the Preston Cannabis menu." },
  ],
};

export const NICOTINE_VAPE_COPY = {
  title: "Nicotine Vapes near Somerset West and Preston St | Preston Cannabis",
  h1: "Nicotine vapes near Somerset West and Preston Street",
  description: "Corridor page for nicotine vape formats at Preston Cannabis in Little Italy, kept separate from THC disposables. Adults 19+.",
  intro: "Nicotine vapes sit in their own collection so Preston Street shoppers do not confuse them with THC disposables. Browse listed devices and flavours on the Preston Cannabis menu, then confirm in-store availability.",
  sections: [
    { heading: "Why the pillar is separate", body: "THC vape-disposables and nicotine vapes answer different searches. This page keeps nicotine hardware and flavour listings on their own path from the Little Italy storefront." },
    { heading: "What to compare on the shelf", body: "Look at device format, listed strength language on the product card, and pack size. Listed flavours and prices come from the Preston Cannabis menu." },
    { heading: "Corridor context", body: "Shoppers coming from Chinatown / Somerset West or Centretown West can pair this pillar with the Visit page for parking and O-Train Line 2 / Carling notes." },
    { heading: "Age and compliance", body: "Nicotine products are for adults 19+. No medical claims or underage targeting appear here." },
  ],
  faqs: [
    { question: "Are nicotine vapes the same as THC disposables?", answer: "No. Use the nicotine vapes collection for nicotine products and the THC vape-disposables collection for cannabis devices." },
    { question: "Where is the store?", answer: "268 Preston St, Ottawa, ON K1R 7R6." },
  ],
};

export const TIER_PAGE_COPY = {
  exotic: {
    intro: "Browse Exotic Weed on Preston St in Little Italy. Compare listed flower cards on the Preston Cannabis menu, then move to Premium or AAA+ when you want neighbouring tiers.",
    description: "Exotic Weed on Preston St in Little Italy at Preston Cannabis. Compare listed flower details in one corridor collection.",
    faqs: [
      { question: "What is on the Exotic Weed page?", answer: "Listed Exotic-tier flower cards from the Preston Cannabis menu for shoppers on Preston Street." },
      { question: "Does Exotic Weed mean live Preston stock?", answer: "Yes. Exotic Weed cards on this page are Preston Cannabis menu entries for 268 Preston St." },
    ],
  },
  premium: {
    intro: "Explore Premium Weed near Dow's Lake and Little Italy. Use this collection to scan listed formats before hopping to Exotic Weed or AAA+ Weed.",
    description: "Premium Weed near Dow's Lake and Little Italy at Preston Cannabis. A focused flower collection for Preston Street visitors.",
    faqs: [
      { question: "Who is Premium Weed for?", answer: "Shoppers who want a mid-to-upper flower band without leaving the Preston Street corridor pages." },
      { question: "Where do I go next?", answer: "Open individual product cards or continue to AAA+ Weed and AA Weed." },
    ],
  },
  aaa: {
    intro: "AAA+ Weed on Preston St in Little Italy gathers listed AAA+ flower rows so you can compare names and weights without city-wide spam titles.",
    description: "AAA+ Weed on Preston St in Little Italy | flower collection for Preston Cannabis visitors.",
    faqs: [
      { question: "Is AAA+ the same as Exotic?", answer: "No. AAA+ is its own inventory band with a separate collection page on this site." },
      { question: "Can I jump to Budget Weed from here?", answer: "Yes. Related links include Budget Weed and AA Weed for broader browsing." },
    ],
  },
  aa: {
    intro: "AA Weed along Somerset West and Chinatown-facing approaches gives a straightforward flower band for Preston Street shoppers comparing mid-shelf options.",
    description: "AA Weed near Somerset West and Chinatown approaches at Preston Cannabis on Preston Street.",
    faqs: [
      { question: "What should I compare on AA Weed?", answer: "Listed names, weights, and posted prices inside the AA collection only." },
      { question: "Is parking mentioned here?", answer: "Use the Visit page for parking and transit; this page stays focused on the AA flower shelf." },
    ],
  },
  budget: {
    intro: "Budget Weed for Centretown West and Preston Street visitors who want value-focused flower cards grouped in one honest collection.",
    description: "Budget Weed for Centretown West shoppers visiting Preston Cannabis on Preston Street.",
    faqs: [
      { question: "Does Budget Weed invent discounts?", answer: "No. Only prices listed on the Preston Cannabis menu appear on product cards." },
      { question: "How do I reach the store?", answer: "Follow the Visit page for O-Train Line 2 / Carling and Preston Street notes." },
    ],
  },
};
