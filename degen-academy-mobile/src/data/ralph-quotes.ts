// Ralph's sarcastic quotes for DEGEN ACADEMY

export const RALPH_QUOTES = {
  welcome: [
    "Ready to learn the hard way? Let's go!",
    "Remember: not financial advice. Definitely not.",
    "Time to YOLO responsibly. If that's even a thing.",
  ],

  deposit: [
    "Bold move. I like it.",
    "Aping in, I see. Classic.",
    "That's either genius or... well, you'll find out.",
  ],

  depositHighRisk: [
    "420% APY? Seems totally legit. WAGMI.",
    "Living dangerously. Respect.",
    "This is fine. Everything is fine.",
    "Sir, this is a casino.",
  ],

  withdraw: [
    "Taking profits? What is this, responsible investing?",
    "Paper hands? Or smart hands? You decide.",
    "Cash is a position too, I guess.",
  ],

  rug: [
    "Should've diversified, fren.",
    "And that's why we don't put all eggs in one basket.",
    "Rug secured. L taken. Lesson learned?",
    "That pool was giving red flags. Just saying.",
    "First time? It won't be the last.",
  ],

  exploit: [
    "Audit saved you! See? Security matters.",
    "Smart contracts aren't that smart sometimes.",
    "This is why we read the code. JK, who does that?",
  ],

  exploitBlocked: [
    "Audit came in clutch! Money well spent.",
    "Security pays for itself. Literally.",
    "Hackers HATE this one simple trick.",
  ],

  whale: [
    "Whale alert! Someone's moving markets.",
    "When whales dump, we all feel it.",
    "Insurance helping? That's the game.",
  ],

  gas: [
    "Gas spike! Welcome to peak hours.",
    "Maybe wait this one out?",
    "Everyone's aping at once. Chaos.",
  ],

  pump: [
    "PUMP IT! Quick, take advantage!",
    "To the moon! (temporarily)",
    "Green candles everywhere!",
  ],

  halving: [
    "Halving time! Yields just got scarcer.",
    "Tick tock, rewards dropping.",
    "Supply shock incoming!",
  ],

  buyAudit: [
    "Smart! Security is the best investment.",
    "Audit acquired. Sleep better at night.",
    "Hackers on notice. You're protected.",
    "DYOR includes audits. Good choice.",
  ],

  buyInsurance: [
    "Insurance? Look at you being responsible!",
    "Whale protection activated. Nice.",
    "Hedge against chaos. I approve.",
    "Playing defense. Smart degen.",
  ],

  cantAfford: [
    "Broke. Need more funds, fren.",
    "Portfolio says no.",
    "Math isn't mathing right now.",
  ],

  lowBalance: [
    "Getting spicy. Portfolio looking thin.",
    "Maybe time for a comeback?",
    "NGMI... unless you turn it around.",
  ],

  winning: [
    "You're cooking! Keep it up.",
    "Portfolio looking healthy.",
    "Gains on gains. This is the way.",
  ],

  death: [
    "Skill issue tbh. JK, markets are hard.",
    "The real rug was the friends we lost along the way.",
    "GG. Go touch grass and come back stronger.",
    "At least it wasn't real money. Right? RIGHT?",
  ],

  victory: [
    "You did it! Ready to lose real money now? Wait no-",
    "Graduate status achieved! Now touch grass.",
    "From degen to degree. Proud of you.",
    "You've learned the game. The game never ends though.",
  ],
} as const;

export type QuoteCategory = keyof typeof RALPH_QUOTES;

export function getRandomQuote(category: QuoteCategory): string {
  const quotes = RALPH_QUOTES[category];
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index] ?? quotes[0] ?? "...";
}
