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
        { start: "19:30", end: "21:30", type: "social",     title: "Welcome Dinner",           where: "stay",   note: "Sample item. Restaurant and dress code to be confirmed." }
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
        { start: "19:30", end: "22:00", type: "social",     title: "Saturday Dinner",                  where: "stay",   note: "Sample item. Location to be confirmed." }
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
        { start: "18:00", end: "18:30", type: "social",     title: "Awards & Sunset Toast",        where: "courts", note: "Trophies, photos, last light over the Pacific." }
      ]
    }
  ],

  // Players and Pros — photo is optional (leave blank to use initials).
  // from / level / shot / bio are placeholders until real bios arrive.
  // Leave any field as "" and it simply won't show.
  pros: [
    { name: "Neil Scantlebury", from: "", title: "Head Pro",  shot: "", photo: "", bio: "" },
    { name: "Eduardo",          from: "", title: "Pro",       shot: "", photo: "", bio: "" },
    { name: "Gio Carillo",      from: "", title: "Pro",       shot: "", photo: "", bio: "" },
    { name: "Victor",           from: "", title: "Pro",       shot: "", photo: "", bio: "" }
  ],
  players: [
    { name: "Paul Arenson",    from: "", level: "", shot: "", photo: "", bio: "", organizer: true },
    { name: "Michael Green",   from: "", level: "", shot: "", photo: "", bio: "" },
    { name: "Jamie Horowitz",  from: "", level: "", shot: "", photo: "", bio: "" },
    { name: "Brett Thomas",    from: "", level: "", shot: "", photo: "", bio: "" },
    { name: "James Pade",      from: "", level: "", shot: "", photo: "", bio: "" },
    { name: "Rob Katz",        from: "", level: "", shot: "", photo: "", bio: "" },
    { name: "Brad Stephens",   from: "", level: "", shot: "", photo: "", bio: "" },
    { name: "Matt Stroyman",   from: "", level: "", shot: "", photo: "", bio: "" },
    { name: "Matt Humiston",   from: "", level: "", shot: "", photo: "", bio: "" },
    { name: "Ian Schapiro",    from: "", level: "", shot: "", photo: "", bio: "" }
  ],

  essentials: [
    { title: "What to bring", items: ["Padel racket (loaners available at The Courts)", "Court shoes, not running shoes", "Sunscreen, hat, sunglasses", "Refillable water bottle", "Something red for Sunday's final"] },
    { title: "Good to know", items: ["Cabo runs on Mountain Standard Time, no daylight saving", "Mornings are mild, afternoons are hot. Evenings call for a light layer", "Pesos and cards both work. Dollars usually do too", "Uber works in Cabo. The hotel can also arrange rides to The Courts"] }
  ],

  contacts: [
    { name: "Paul Arenson", role: "Organizer", phone: "" },
    { name: "Maravilla Concierge", role: "Hotel", phone: "+52 624 000 0000" }
  ]
};
