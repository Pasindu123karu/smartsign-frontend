export interface WordData {
  word: string;
  category: string;
  emoji: string;
  description: string;
  color: string;
  difficulty: 'easy' | 'medium' | 'hard';
  image: string;
}

export const wordsData: WordData[] = [
  { word: "all done", category: "Daily", emoji: "✅", description: "Finished doing something!", color: "from-green-400 to-lime-400", difficulty: "easy", image: "/src/assets/signs/words/alldone.jpg" },
  { word: "don’t", category: "Basic", emoji: "🚫", description: "Shows something is not allowed!", color: "from-red-400 to-pink-400", difficulty: "easy", image: "/src/assets/signs/words/dont.jpg" },
  { word: "eat", category: "Daily", emoji: "🍽️", description: "Time to eat food!", color: "from-orange-400 to-yellow-400", difficulty: "easy", image: "/src/assets/signs/words/eat.jpg" },
  { word: "friends", category: "People", emoji: "👫", description: "People you like to play with!", color: "from-yellow-400 to-orange-400", difficulty: "easy", image: "/src/assets/signs/words/friends.jpg" },
  { word: "help", category: "Daily", emoji: "🆘", description: "Ask for assistance!", color: "from-blue-400 to-cyan-400", difficulty: "easy", image: "/src/assets/signs/words/help.jpg" },
  { word: "hello", category: "Greetings", emoji: "👋", description: "A friendly way to say hi!", color: "from-blue-400 to-purple-400", difficulty: "easy", image: "/src/assets/signs/words/hello.jpg" },
  { word: "hungry", category: "Daily", emoji: "🍽️", description: "Feeling like you need food!", color: "from-red-400 to-orange-400", difficulty: "easy", image: "/src/assets/signs/words/hungry.jpg" },
  { word: "like", category: "Feelings", emoji: "👍", description: "Shows you enjoy or approve!", color: "from-green-400 to-teal-400", difficulty: "easy", image: "/src/assets/signs/words/like.jpg" },
  { word: "me", category: "Basic", emoji: "🙋", description: "Refers to yourself!", color: "from-purple-400 to-pink-400", difficulty: "easy", image: "/src/assets/signs/words/me.jpg" },
  { word: "more", category: "Daily", emoji: "➕", description: "Ask for extra!", color: "from-cyan-400 to-blue-400", difficulty: "easy", image: "/src/assets/signs/words/more.jpg" },
  { word: "no", category: "Basic", emoji: "❌", description: "Disagree or say something is wrong!", color: "from-red-400 to-pink-400", difficulty: "easy", image: "/src/assets/signs/words/no.jpg" },
  { word: "play", category: "Daily", emoji: "⚽", description: "Time to have fun!", color: "from-yellow-400 to-green-400", difficulty: "easy", image: "/src/assets/signs/words/play.jpg" },
  { word: "please", category: "Greetings", emoji: "🙏", description: "Polite way to ask for something!", color: "from-green-400 to-teal-400", difficulty: "easy", image: "/src/assets/signs/words/please.jpg" },
  { word: "stop", category: "Daily", emoji: "✋", description: "Halt or pause!", color: "from-red-400 to-orange-400", difficulty: "easy", image: "/src/assets/signs/words/stop.jpg" },
  { word: "thank you", category: "Greetings", emoji: "🙏", description: "Show gratitude!", color: "from-pink-400 to-red-400", difficulty: "easy", image: "/src/assets/signs/words/thankyou.jpg" },
  { word: "toilet", category: "Daily", emoji: "🚻", description: "Where you go to wash or pee!", color: "from-gray-400 to-blue-400", difficulty: "easy", image: "/src/assets/signs/words/toilet.jpg" },
  { word: "want", category: "Daily", emoji: "🤲", description: "Ask for something you need!", color: "from-purple-400 to-pink-400", difficulty: "easy", image: "/src/assets/signs/words/want.jpg" },
  { word: "water", category: "Daily", emoji: "💧", description: "Drink to stay hydrated!", color: "from-cyan-400 to-blue-400", difficulty: "easy", image: "/src/assets/signs/words/water.jpg" },
  { word: "what", category: "Questions", emoji: "❓", description: "Ask about something!", color: "from-yellow-400 to-orange-400", difficulty: "easy", image: "/src/assets/signs/words/what.jpg" },
  { word: "when", category: "Questions", emoji: "⏰", description: "Ask about time!", color: "from-blue-400 to-indigo-400", difficulty: "easy", image: "/src/assets/signs/words/when.jpg" },
  { word: "where", category: "Questions", emoji: "📍", description: "Ask about location!", color: "from-red-400 to-purple-400", difficulty: "easy", image: "/src/assets/signs/words/where.jpg" },
  { word: "who", category: "Questions", emoji: "🧑", description: "Ask about a person!", color: "from-green-400 to-lime-400", difficulty: "easy", image: "/src/assets/signs/words/who.jpg" },
  { word: "why", category: "Questions", emoji: "❔", description: "Ask for a reason!", color: "from-pink-400 to-red-400", difficulty: "easy", image: "/src/assets/signs/words/why.jpg" },
  { word: "yes", category: "Basic", emoji: "✅", description: "Agree or say something is correct!", color: "from-green-400 to-lime-400", difficulty: "easy", image: "/src/assets/signs/words/yes.jpg" },
  { word: "you", category: "Basic", emoji: "👉", description: "Refers to another person!", color: "from-purple-400 to-indigo-400", difficulty: "easy", image: "/src/assets/signs/words/you.jpg" },
];
