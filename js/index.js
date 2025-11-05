
// WORD BANK

const wordBank = {
  beginner: [
    { word: "apple", meaning: "A sweet fruit that grows on trees." },
    { word: "rain", meaning: "Water that falls from clouds." },
    { word: "book", meaning: "A set of pages with written words." },
    { word: "cat", meaning: "A small furry pet animal." },
    { word: "fish", meaning: "An animal that lives in water." },
    { word: "table", meaning: "Furniture with a flat top and legs." },
    { word: "chair", meaning: "A seat for one person." },
    { word: "music", meaning: "Art of combining sounds in harmony." },
    { word: "water", meaning: "A clear liquid essential for life." },
    { word: "happy", meaning: "Feeling or showing pleasure." },
    { word: "bird", meaning: "An animal with feathers and wings." },
    { word: "tree", meaning: "A tall plant with a trunk and leaves." },
    { word: "pen", meaning: "An instrument for writing." },
    { word: "dog", meaning: "A loyal domestic animal." },
    { word: "sun", meaning: "The star at the center of our solar system." },
    { word: "moon", meaning: "The natural satellite of the Earth." },
    { word: "milk", meaning: "A white liquid produced by mammals." },
    { word: "ball", meaning: "A round object used in games." },
    { word: "star", meaning: "A shining object in the night sky." },
    { word: "cake", meaning: "A sweet baked food." },
  ],

  moderate: [
    { word: "teacher", meaning: "A person who educates students." },
    { word: "holiday", meaning: "A day of relaxation or celebration." },
    { word: "building", meaning: "A structure with walls and a roof." },
    { word: "computer", meaning: "An electronic device for data processing." },
    { word: "universe", meaning: "All matter and space as a whole." },
    { word: "travel", meaning: "To go from one place to another." },
    { word: "garden", meaning: "A place where plants and flowers grow." },
    { word: "language", meaning: "A system of communication." },
    { word: "college", meaning: "An educational institution." },
    { word: "picture", meaning: "A visual representation on a surface." },
    { word: "science", meaning: "The study of the natural world." },
    { word: "bicycle", meaning: "A two-wheeled vehicle powered by pedaling." },
    { word: "hospital", meaning: "A place where sick people are treated." },
    { word: "factory", meaning: "A building where goods are made." },
    { word: "library", meaning: "A place full of books for reading." },
    { word: "village", meaning: "A small community in the countryside." },
    { word: "teacher", meaning: "Someone who helps students learn." },
    { word: "family", meaning: "A group of related people living together." },
    { word: "friendship", meaning: "A close and trusting relationship." },
    { word: "airport", meaning: "A place where airplanes take off and land." },
  ],

  advanced: [
    { word: "philosophy", meaning: "The study of fundamental ideas and existence." },
    { word: "architecture", meaning: "Art of designing and constructing buildings." },
    { word: "revolution", meaning: "A sudden or complete change." },
    { word: "astronomy", meaning: "The study of stars and planets." },
    { word: "psychology", meaning: "Science of the human mind and behavior." },
    { word: "microbiology", meaning: "The study of microscopic organisms." },
    { word: "engineering", meaning: "The application of science to design and build." },
    { word: "economics", meaning: "Study of production and consumption." },
    { word: "literature", meaning: "Written works of artistic value." },
    { word: "pharmacy", meaning: "The science of preparing and dispensing medicines." },
    { word: "anthropology", meaning: "The study of humans and societies." },
    { word: "biotechnology", meaning: "Use of biology in technology and medicine." },
    { word: "neurology", meaning: "Study of the nervous system." },
    { word: "sociology", meaning: "Study of human social behavior." },
    { word: "geology", meaning: "Study of the Earth’s structure and materials." },
    { word: "zoology", meaning: "Study of animals and their biology." },
    { word: "genetics", meaning: "Study of heredity and genes." },
    { word: "linguistics", meaning: "Study of language and its structure." },
    { word: "astronautics", meaning: "Science of space travel." },
    { word: "nanotechnology", meaning: "Science of tiny materials and devices." },
  ],
};


// GAME VARIABLE
let level = "", word = "", meaning = "";
let score = 0, time = 60, timer;

// MAIN FUNCTIONS
function showScreen(id) {
  const screens = document.getElementsByClassName("screen");
  for (let i = 0; i < screens.length; i++) {
    screens[i].classList.remove("active");
  }
  document.getElementById(id).classList.add("active");
  if (id === "start-screen") clearInterval(timer);
}

function startGame(selectedLevel) {
  level = selectedLevel;
  score = 0;
  setText("score", score);
  setText("level-title", "-- " + level.toUpperCase() + " LEVEL --");
  showScreen("game-screen");
  startTimer();
  nextWord();
}

function startTimer() {
  clearInterval(timer);
  time = 60;
  updateTimer();
  timer = setInterval(() => {
    time--;
    updateTimer();
    if (time <= 0) endGame();
  }, 1000);
}

function updateTimer() {
  setText("time", time);
  get("progress").style.width = (time / 60) * 100 + "%";
}

function nextWord() {
  const item = randomWord();
  word = item.word;
  meaning = item.meaning;

  let mixed = scramble(word);
  setText("scrambled-word", mixed);
  get("user-input").value = "";
  setText("hint", "");
  setText("meaning", "");
}

function checkAnswer() {
  const input = get("user-input").value.toLowerCase();
  const box = get("scrambled-word");

  if (input === word) {
    score += 10;
    setText("score", score);
    box.classList.add("correct");
    setText("meaning", "✅ " + meaning);
    setTimeout(() => box.classList.remove("correct"), 500);
  } else {
    alert("❌ Wrong guess! Try again.");
  }
}

function showHint() {
  setText("hint", "💡 Hint: " + meaning);
}

function endGame() {
  clearInterval(timer);
  setText("final-score", score);

  let msg = "";
  if (score >= 80) msg = "🌟 Excellent! You're a word master!";
  else if (score >= 40) msg = "👍 Nice job! Keep improving!";
  else msg = "💪 Keep practicing to get better!";

  setText("feedback-msg", msg);
  showScreen("result-screen");
}

// HELPERS 
function get(id) {
  return document.getElementById(id);
}

function setText(id, text) {
  get(id).textContent = text;
}

function randomWord() {
  const list = wordBank[level];
  return list[Math.floor(Math.random() * list.length)];
}

function scramble(word) {
  let mixed;
  do {
    mixed = word.split("").sort(() => Math.random() - 0.5).join("");
  } while (mixed === word);
  return mixed;
}
