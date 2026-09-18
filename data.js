// ============================================================
//  PADEL PUERTA ROJA — event content
//  Edit this file to change players, schedule, and venue info.
//  The design lives in index.html and never needs to be touched.
// ============================================================

window.PPR = {
  event: {
    name: "Padel Puerta Roja",
    tagline: "Cabo San Lucas · October 23–25, 2026",
    // Cabo San Lucas is on Mountain Standard Time year-round (UTC-7).
    tzOffsetHours: -7,
    kickoff: "2026-10-23 15:00",
    groupChat: "",          // paste a WhatsApp / iMessage group link here
    playlist: "",           // paste a Spotify / Apple Music link here
    photoDrop: ""           // paste a shared album link here
  },

  venues: {
    courts: {
      name: "The Courts at Twin Dolphins",
      short: "The Courts",
      line: "Carretera Transpeninsular Km 12.5, Bahía Santa María",
      note: "Six enclosed padel courts inside the Twin Dolphin club. All clinics, matches, showcase, and tournament play.",
      maps: "https://www.google.com/maps/search/?api=1&query=The+Courts+Twin+Dolphin+Carretera+Transpeninsular+Km+12.5+Los+Cabos"
    },
    stay: {
      name: "Maravilla Los Cabos",
      short: "Maravilla",
      line: "Cabo San Lucas, Baja California Sur",
      note: "Home base for the weekend. Meals and evenings here unless noted.",
      maps: "https://www.google.com/maps/search/?api=1&query=Maravilla+Los+Cabos"
    },
    clubhouse: {
      name: "Twin Dolphin Clubhouse",
      short: "Twin Dolphin",
      line: "Twin Dolphin Club, Carretera Transpeninsular Km 12.5",
      note: "Saturday dinner.",
      maps: "https://www.google.com/maps/search/?api=1&query=Twin+Dolphin+Clubhouse+Los+Cabos"
    }
  },

  // Event types drive the color of the pill on each schedule item.
  // clinic · match · showcase · tournament · social
  schedule: [
    {
      date: "2026-10-23", label: "Friday", sub: "Oct 23 · Arrival",
      items: [
        { start: "15:00", end: "15:30", type: "social",     title: "Doors open at The Courts", where: "courts", note: "Check in, grab a racket, hit a few balls." },
        { start: "15:30", end: "16:30", type: "clinic",     title: "Opening Clinic",           where: "courts", note: "Fundamentals and rhythm for every level. Coaches split by group." },
        { start: "16:30", end: "18:00", type: "match",      title: "Mixer Matches",            where: "courts", note: "Rotating partners, short sets, meet everyone." },
        { start: "18:00", end: "18:45", type: "social",     title: "Sunset Drinks Courtside",  where: "courts", note: "Cold ones as the sun goes down behind the arch." },
        { start: "19:00", end: "21:00", type: "social",     title: "Welcome Dinner at Ecco",   where: "stay",   note: "Oceanfront at Maravilla. Wood-fired pizzas, Oaxacan tacos, and a seventy-tequila list." }
      ]
    },
    {
      date: "2026-10-24", label: "Saturday", sub: "Oct 24 · Play Day",
      items: [
        { start: "08:00", end: "09:15", type: "clinic",     title: "Morning Clinic: Bandeja & Víbora", where: "courts", note: "The overhead game. Sample topic." },
        { start: "09:15", end: "10:30", type: "match",      title: "Round Robin Matches",              where: "courts", note: "Everyone plays. Results seed Sunday's tournament." },
        { start: "10:30", end: "16:00", type: "free",       title: "Free Time",                        where: "stay",   note: "Beach, pool, spa, or a siesta. Lunch on your own." },
        { start: "16:00", end: "17:00", type: "showcase",   title: "Pro Showcase",                     where: "courts", note: "Exhibition set from the pros. Bring a chair and a drink." },
        { start: "17:00", end: "18:00", type: "match",      title: "King of the Court",                where: "courts", note: "Winners stay on. Loudest court wins bragging rights." },
        { start: "19:00", end: "21:30", type: "social",     title: "Dinner at the Twin Dolphin Clubhouse", where: "clubhouse", note: "Back to the club for the night. Bring your round robin excuses." }
      ]
    },
    {
      date: "2026-10-25", label: "Sunday", sub: "Oct 25 · Tournament",
      items: [
        { start: "08:00", end: "08:30", type: "clinic",     title: "Tournament Warm-Up",           where: "courts", note: "Draw announced courtside at 8:15." },
        { start: "08:30", end: "10:30", type: "tournament", title: "Puerta Roja Cup: Group Stage", where: "courts", note: "Every pair plays three group matches." },
        { start: "10:30", end: "16:00", type: "free",       title: "Free Time",                    where: "stay",   note: "Rest up. Semifinalists announced in the group chat by noon." },
        { start: "16:00", end: "17:15", type: "tournament", title: "Semifinals",                   where: "courts", note: "Two courts, best of three short sets." },
        { start: "17:15", end: "18:00", type: "tournament", title: "The Final",                    where: "courts", note: "Center court. Everyone in the stands." },
        { start: "18:00", end: "18:30", type: "social",     title: "Awards & Sunset Toast",        where: "courts", note: "Trophies, photos, last light over the Pacific." },
        { start: "19:00", end: "21:00", type: "social",     title: "Farewell Dinner at Talay",     where: "stay",   note: "Thai street food on the beach at Maravilla. Last night, make it count." }
      ]
    }
  ],

  // Players and Pros, listed alphabetically by last name. "bio" is the blurb shown under each name.
  // "tag" is an optional label (e.g. "Head Pro") shown only if set. Leave "" for none.
  pros: [
    { name: "Neil Scantlebury", tag: "", bio: "Padel Master of Speed" },
    { name: "Eduardo",          tag: "", bio: "Padel Master of Smooth" },
    { name: "Gio Carillo",      tag: "", bio: "Padel Master of Control" },
    { name: "Victor",           tag: "", bio: "Padel Master of Power" }
  ],
  players: [
    { name: "Paul Arenson",   tag: "", bio: "Twin Dolphins Padel Champion. Once broke a man's finger with his overhead." },
    { name: "Michael Green",  tag: "", bio: "Twin Dolphins padel finalist. Works out before every padel match." },
    { name: "Jamie Horowitz", tag: "", bio: "Former Amherst basketball star. 3 time Twin Dolphins intermediate Pickleball champion." },
    { name: "Matt Humiston",  tag: "", bio: "Pickleball savant. World Paddle Throwing champion." },
    { name: "Rob Katz",       tag: "", bio: "Twin Dolphins King of the Court winner. Holder of many Twin Dolphins pickleball trophies. OG." },
    { name: "James Pade",     tag: "", bio: "Former Stanford tennis star. Winner of every racket event ever held at Twin Dolphins." },
    { name: "Ian Schapiro",   tag: "", bio: "Best padel player at Cove Club. Twin Dolphin padel finalist. Liveball master." },
    { name: "Brad Stephens",  tag: "", bio: "Owner of several Twin Dolphins padel championships. Best forehand slice in the business." },
    { name: "Matt Stroyman",  tag: "", bio: "Former Cal tennis star. ATP Tour player. Padel wizard." },
    { name: "Brett Thomas",   tag: "", bio: "Former Boston College tennis star. Loves ripping forehands at mach 3 speeds." }
  ],

  essentials: [
    { title: "What to bring", items: ["Padel racket (loaners available at The Courts)", "Court shoes, not running shoes", "Sunscreen, hat, sunglasses", "Refillable water bottle", "Something red for Sunday's final"] },
    { title: "Good to know", items: ["Cabo runs on Mountain Standard Time, no daylight saving", "Mornings are mild, afternoons are hot. Evenings call for a light layer", "Pesos and cards both work. Dollars usually do too", "Uber works in Cabo. The hotel can also arrange rides to The Courts"] }
  ],

  contacts: [
    { name: "Paul Arenson",  role: "Organizer", phone: "+1 (310) 702-1190" },
    { name: "Michael Green", role: "Organizer", phone: "+1 (310) 666-6773" }
  ]
};
