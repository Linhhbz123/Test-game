// Biến game
let currentRoom = null;
let isHost = false;

// Cặp từ khóa
const keywords = [
  ["🍊 Cam", "🍋 Chanh"],
  ["🐱 Mèo", "🐶 Chó"],
  ["⚽ Bóng đá", "🏀 Bóng rổ"],
  ["🍔 Hamburger", "🌭 Hotdog"],
  ["🎸 Guitar", "🎹 Piano"]
];

// Tạo mã phòng ngẫu nhiên
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

// Tạo phòng
function createRoom() {
  currentRoom = generateRoomCode();
  isHost = true;
  document.getElementById("roomCode").innerText = currentRoom;
  document.getElementById("roomInfo").classList.remove("hidden");
}

// Vào phòng
function joinRoom() {
  const code = document.getElementById("roomCodeInput").value.trim();
  if (code) {
    currentRoom = code;
    alert("Bạn đã vào phòng " + code);
  }
}

// Bắt đầu game
function startGame() {
  const pair = keywords[Math.floor(Math.random() * keywords.length)];
  const randomIndex = Math.floor(Math.random() * pair.length);

  document.getElementById("keyword").innerText = pair[randomIndex];
  document.getElementById("keywordSection").classList.remove("hidden");
}
