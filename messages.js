// ============================================================
//  ALL MESSAGES — Edit this file to change any text on the site
// ============================================================

const MESSAGES = {

  // ===== ENTRANCE SCREEN =====
  entrance: {
    emoji: "🎁",
    title: "You Have a Surprise!",
    subtitle: "Someone made something special just for you...",
    button: "Open Your Gift ✨"
  },

  // ===== HERO SECTION =====
  hero: {
    preTitle: "🎉 It's Your Special Day! 🎉",
    line1: "Happy",
    line2: "Birthday",
    line3: "Didi! 🎂",
    tagline: "The most amazing person in the entire universe ✨",
    scrollHint: "Scroll down for surprises"
  },

  // ===== CAKE SECTION =====
  cake: {
    title: "🎂 Your Birthday Cake 🎂",
    subtitle: "Blow all the candles to make a wish! 🕯️",
    wishMessage: "✨ Make a wish! It's already on its way to the stars! ✨"
  },

  // ===== BIRTHDAY CARD =====
  card: {
    title: "💌 A Card Just For You 💌",
    subtitle: "Click to open your birthday card!",
    frontDecoration: "✿ ✿ ✿",
    frontHeading: "Happy Birthday!",
    frontCta: "Click me to open 💌",
    frontSeal: "💖",
    insideHeading: "Happyyyy Birthday Didi!!! 🎉🎂💖",
    insideMessages: [
      "You are honestly one of the best people in my life 🥺. Thank you for always being here for me, for helping, making everything feel easier and better 💛. To be honest, Thank you for just existing🫶. Life would be so boring without you and all our fun and crazyyy random moments 😂 and that little komodo side of you 🦎.",
      "I hope this year brings you a lots of happiness, success, peace and everything that you have been wishing for ✨🌸.",
      "You are not just my didi, sometimes you are my guide, my safe place, and sometimes even my bestie 🥹💞. You always understand me even when I do not say anything, and that means a lot to me 💛.",
      "I really admire how strong, kind, you are ✨. how you treat everyone, how you think, You are just Supercalifragilisticexpialidocious 😄✨. I really really learn a lot from you and I always think why I am not more like you 😭.",
      "Thank youuuuuuuu!!!! 💖 And also, never stop being a little crazy and fun 😂💃, because that is what makes you you ✨. Love you so much didi ❤️🫶."
    ],
    insideHearts: ["💖", "💛", "💖", "💛", "💖"]
  },

  // ===== MESSAGE WALL =====
  messageWall: {
    title: "💝 Words From The Heart 💝",
    subtitle: "Tap on each card to reveal a message!",
    cards: [
      { color: "rose",   emoji: "🥹💞",  label: "My Person",        message: "You are my guide, my safe place, and literally the person I go to for everything 🥹💞" },
      { color: "gold",   emoji: "💛",     label: "The Silent One",   message: "You always understand me even when I don't say a single word... and honestly that's a superpower 💛" },
      { color: "purple", emoji: "✨😄",   label: "Supercali-what?!", message: "How you treat people, how you think — You are literally Supercalifragilisticexpialidocious and I will die on that hill 😄✨" },
      { color: "teal",   emoji: "😭🪞",  label: "Role Model",       message: "I genuinely learn so much from you and I always wonder why can't I be more like you 😭✨" },
      { color: "pink",   emoji: "😂💃",  label: "The Crazy Side",   message: "Never EVER stop being a little crazy and fun 😂💃 — that's the version of you that makes my day every single time ✨" },
      { color: "coral",  emoji: "🦎🫶",  label: "Komodo Queen",     message: "That little komodo side of you? Absolutely iconic 🦎😂. Never change. Love you so much didi ❤️🫶" }
    ]
  },

  // ===== BALLOON POP GAME =====
  balloons: {
    title: "🎈 Pop The Balloons! 🎈",
    subtitle: "Every balloon has a hidden message inside! Pop them all!",
    resetButton: "🎈 More Balloons!",
    allPoppedMessage: "🎈 You got them all! Incredible year ahead! 🎈",
    messages: [
      "🎉 This year is YOUR year!",
      "😊 Your smile lights up everything!",
      "💫 More fun just because you exist!",
      "💃 Stay crazy, stay you!",
      "💖 So grateful we met!",
      "🦎 Komodo queen forever!",
      "✨ You deserve the whole world!",
      "🥺 Everyone wishes they had you!",
      "😂 More unhinged moments pls!",
      "🫶 Thank you for existing!"
    ]
  },

  // ===== SCRATCH CARD =====
  scratch: {
    title: "🎫 Scratch & Reveal 🎫",
    subtitle: "Scratch the card to reveal a surprise message!",
    resetButton: "🔄 New Card",
    canvasText: "✨ Scratch here! ✨",
    messages: [
      { title: "The universe knew exactly what it was doing when it made us meet!", sub: "So grateful for you, always 💫" },
      { title: "You're literally irreplaceable!", sub: "Life would be SO boring without you 😂" },
      { title: "Supercalifragilisticexpialidocious!", sub: "That's the only word big enough for you 😄✨" },
      { title: "Partner in crime detected!", sub: "Here's to a million more crazy adventures 💃🦎" },
      { title: "Plot twist: you're the main character!", sub: "And everyone else is just a side quest 👑" },
      { title: "You're the friend everyone deserves!", sub: "But only I'm lucky enough to have 🥹💖" },
      { title: "If kindness was a person...", sub: "It would literally be you, no debate ✨" }
    ]
  },

  // ===== TYPEWRITER LETTER =====
  typewriter: {
    title: "💌 A Letter For You 💌",
    greeting: "Dear Didi,",
    letter: "Happyyy Birthday Didi! Even though we aren't sisters by blood, honestly you feel closer than that. The universe really knew what it was doing when it made our paths cross. You are one of the most important people in my life and I genuinely mean that. Thank you for every crazy moment, every random conversation, every time you just got me without me having to explain. You make everything better just by existing. I hope this year gives you everything you've been wishing for and SO much more ✨🌸",
    signature: "With all my love,<br>Meerkat ❤️🫶"
  },

  // ===== CONFETTI PARTY =====
  confetti: {
    title: "🎊 Party Time! 🎊",
    subtitle: "Hit the button as many times as you want!",
    button: "🎉 CONFETTI EXPLOSION 🎉",
    counterSuffix: "confetti bursts! 🎊"
  },

  // ===== FOOTER =====
  footer: {
    madeWith: "Made with 💖 and lots of love",
    emojiRain: "🎂 🎉 🎈 💖 ✨ 🌸 🦎 🎁 💛 🫶 🥳 🎊",
    finalMessage: "Happy Birthday once more, Didi! You're simply the best! 🎂✨"
  }
};
