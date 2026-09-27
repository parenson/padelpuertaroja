// ============================================================
//  LA VÍBORA INVITATIONAL — event content
//  Edit this file to change players, schedule, and venue info.
//  The design lives in index.html and never needs to be touched.
// ============================================================

window.PPR = {
  event: {
    name: "La Víbora Invitational",
    tagline: "Cabo San Lucas · October 23–25, 2026",
    // Cabo San Lucas is on Mountain Standard Time year-round (UTC-7).
    tzOffsetHours: -7,
    kickoff: "2026-10-23 15:00",
    groupChat: "https://chat.whatsapp.com/HcNJbXEYHByGYAvQ0LS2AX", // WhatsApp invite link
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
    beach: {
      name: "Maravilla Beach Club",
      short: "Beach Club",
      line: "Maravilla Los Cabos",
      note: "Friday lunch.",
      maps: "https://www.google.com/maps/search/?api=1&query=Maravilla+Los+Cabos+Beach+Club"
    },
    montage: {
      name: "Montage Los Cabos",
      short: "Montage",
      line: "Twin Dolphin, Carretera Transpeninsular Km 12.5",
      note: "Sunday dinner at Talay.",
      maps: "https://www.google.com/maps/search/?api=1&query=Talay+Montage+Los+Cabos"
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
        { start: "12:30", end: "14:00", type: "social",     title: "Beach Club Lunch",         where: "beach",  note: "Maravilla Beach Club, for all who are around the club." },
        { start: "15:00", end: "15:30", type: "social",     title: "Warm Up at The Courts",    where: "courts", note: "Check in, grab a racket, hit a few balls." },
        { start: "15:30", end: "16:30", type: "clinic",     title: "Opening Clinic",           where: "courts", note: "Fundamentals and rhythm for every level. Coaches split by group." },
        { start: "16:30", end: "18:00", type: "match",      title: "Mixer Matches",            where: "courts", note: "Rotating partners, short sets, constant action." },
        { start: "19:30", end: "21:00", type: "social",     title: "Welcome Dinner at Ecco",   where: "stay",   note: "Oceanfront at Maravilla. Wood-fired pizzas, Oaxacan tacos, and a seventy-tequila list." }
      ]
    },
    {
      date: "2026-10-24", label: "Saturday", sub: "Oct 24 · Play Day",
      items: [
        { start: "08:00", end: "09:15", type: "clinic",     title: "Morning Clinic: Game Essentials", where: "courts", note: "Serves, returns, vibora, bandeja, wall strategy, team work." },
        { start: "09:15", end: "10:30", type: "match",      title: "King of the Court",              where: "courts", note: "Winners stay on. Loudest court wins bragging rights." },
        { start: "10:30", end: "15:00", type: "free",       title: "Free Time",                        where: "stay",   note: "Beach, pool, spa, or a siesta. Lunch on your own." },
        { start: "15:00", end: "16:00", type: "showcase",   title: "Pro Showcase",                     where: "courts", note: "Exhibition set from the pros. Bring a chair and a drink." },
        { start: "16:00", end: "18:30", type: "match",      title: "Round Robin Matches",                where: "courts", note: "Everyone plays. Results seed Sunday's tournament." },
        { start: "19:00", end: "21:30", type: "social",     title: "Dinner - TBA", where: "", note: "Tournament pairings and draw announced." }
      ]
    },
    {
      date: "2026-10-25", label: "Sunday", sub: "Oct 25 · Tournament",
      items: [
        { start: "08:00", end: "08:30", type: "clinic",     title: "Tournament Warm-Up",           where: "courts", note: "" },
        { start: "08:30", end: "11:30", type: "tournament", title: "La Víbora Cup",   where: "courts", note: "Pool play followed by Semifinals and Finals." },
        { start: "11:30", end: "15:30", type: "free",       title: "Free Time",                    where: "stay",   note: "Enjoy the day. Heal from the weekend." },
        { start: "16:00", end: "18:00", type: "match", title: "Open Play",                   where: "courts", note: "For those who just can't get enough." },
        { start: "19:00", end: "21:00", type: "social",     title: "Dinner at Talay",     where: "montage", note: "Thai street food at the Montage. Last night, make it count." }
      ]
    }
  ],

  // Players and Pros, listed alphabetically by last name. "bio" is the blurb shown under each name.
  // "tag" is an optional label (e.g. "Head Pro") shown only if set. Leave "" for none.
  pros: [
    { name: "Neil Scantlebury",  tag: "", bio: "Lord of The Courts at Twin Dolphins. Padel Master of Speed." },
    { name: "Eduardo Villasenor", tag: "", bio: "Pickleball Savant. Padel Master of Smooth." },
    { name: "Gio Carillo",       tag: "", bio: "PadelUp Professional from Los Angeles. Padel Master of Control." },
    { name: "Alvaro Pecos",      tag: "", bio: "Head Professional at PadelHaus in New York. Padel Master of Technique." },
    { name: "Josh Gilmour",      tag: "", bio: "Director of Recreation at Chileno Bay. Padel Master of Power." }
  ],
  players: [
    { name: "Paul Arenson",   tag: "", bio: "Twin Dolphins padel champion. Cold plunge enthusiast." },
    { name: "Sean Cavanaugh", tag: "", bio: "Best padel playing salesperson at Maravilla." },
    { name: "Michael Green",  tag: "", bio: "Penn baseball Hall of Famer. Bicoastal padel ambassador." },
    { name: "Jason Harrow",   tag: "", bio: "Former Princeton squash star. Padel maestro off the glass." },
    { name: "Jamie Horowitz", tag: "", bio: "Former Amherst basketball star. 3 time Twin Dolphins intermediate Pickleball champion." },
    { name: "Matt Humiston",  tag: "", bio: "Pickleball specialist. World Paddle Throwing champion." },
    { name: "Rob Katz",       tag: "", bio: "Twin Dolphins King of the Court winner. Twin Dolphins pickleball royalty." },
    { name: "Sean Keenan",    tag: "", bio: "Twin Dolphins padel grinder. Early riser." },
    { name: "James Pade",     tag: "", bio: "Former Stanford tennis star. ATP Tour player. Winner of every racket event ever held at Twin Dolphins." },
    { name: "Ian Schapiro",   tag: "", bio: "Best padel player at Cove Club. Twin Dolphin padel finalist. Liveball master." },
    { name: "Brad Stephens",  tag: "", bio: "Owner of several Twin Dolphins padel championships. Best forehand slice in the business." },
    { name: "Matt Stroyman",  tag: "", bio: "Former Cal tennis star. ATP Tour player. Padel wizard." },
    { name: "Brett Thomas",   tag: "", bio: "Former Boston College tennis star. Loves ripping forehands at mach 3 speeds." }
  ],

  essentials: [
    { title: "What to bring", items: ["Padel racket (loaners available at The Courts)", "Court shoes, not running shoes", "Sunscreen, hat, sunglasses", "Refillable water bottle", "Something red for Sunday's final"] },
    { title: "Good to know", items: ["Cabo runs on Mountain Standard Time, no daylight saving", "Mornings are mild, afternoons are hot. Evenings call for a light layer"] }
  ],

  contacts: [
    { name: "Paul Arenson",  role: "Organizer", phone: "+1 (310) 702-1190" },
    { name: "Michael Green", role: "Organizer", phone: "+1 (310) 666-6773" }
  ]
};
