// Quản lý trạng thái tập trung
let gameState = {
    players: [],
    words: {
        "Hoa quả": ["Cam", "Chanh", "Táo", "Dưa hấu", "Xoài", "Chuối", "Lê", "Nho", "Mận", "Ổi", "Dứa", "Bưởi", "Na", "Mít", "Dừa", "Quýt", "Lựu", "Kiwi", "Chôm chôm", "Thanh long"],
        "Động vật": ["Chó", "Mèo", "Hổ", "Voi", "Khỉ", "Ngựa", "Trâu", "Bò", "Cá heo", "Cá mập", "Sư tử", "Gà", "Vịt", "Cừu", "Dê", "Gấu", "Thỏ", "Chim", "Rùa", "Ếch"],
        "Đồ vật": ["Ghế", "Điện thoại", "Kính", "Bàn", "Cốc", "Bút", "Quạt", "Tivi", "Laptop", "Tủ lạnh", "Xe đạp", "Ô tô", "Xe máy", "Đèn", "Chảo", "Nồi", "Ly", "Dao", "Kéo", "Gối"],
        "Màu sắc": ["Đỏ", "Xanh", "Vàng", "Cam", "Tím", "Hồng", "Đen", "Trắng", "Nâu", "Xanh lá", "Xanh dương", "Xám", "Bạc", "Xanh ngọc"],
        "Quốc gia": ["Việt Nam", "Trung Quốc", "Nhật Bản", "Hàn Quốc", "Thái Lan", "Mỹ", "Anh", "Pháp", "Đức", "Nga", "Canada", "Brazil", "Úc", "Ấn Độ", "Ai Cập", "Mexico", "Tây Ban Nha", "Ý"],
        "Món ăn": ["Phở", "Bún chả", "Nem rán", "Bánh mì", "Bánh cuốn", "Cơm tấm", "Bún bò Huế", "Hủ tiếu", "Cháo", "Xôi", "Gỏi cuốn", "Bánh xèo", "Bánh bao", "Lẩu", "Cơm rang", "Thịt kho", "Canh chua", "Gà rán", "Pizza", "Hamburger"],
        "Đồ uống": ["Nước lọc", "Trà đá", "Cà phê", "Trà sữa", "Sinh tố", "Nước cam", "Nước chanh", "Coca", "Pepsi", "Bia", "Rượu vang", "Rượu trắng", "Sữa", "Sữa chua", "Nước ép táo", "Nước ép dứa", "Nước ép ổi", "Matcha", "Capuchino", "Latte"],
        "Nghề nghiệp": ["Bác sĩ", "Kỹ sư", "Giáo viên", "Công an", "Bộ đội", "Nông dân", "Lập trình viên", "Thiết kế", "Nhạc sĩ", "Ca sĩ", "Diễn viên", "Luật sư", "Kế toán", "Đầu bếp", "Phi công", "Tiếp viên", "Bán hàng", "Tài xế", "Y tá", "Phóng viên"],
        "Thể thao": ["Bóng đá", "Bóng rổ", "Cầu lông", "Bóng chuyền", "Bơi lội", "Điền kinh", "Quần vợt", "Bóng bàn", "Boxing", "Karate", "Judo", "Taekwondo", "Golf", "Bắn cung", "Trượt băng", "Trượt ván", "Đua xe", "Nhảy cao", "Nhảy xa", "Cử tạ"],
        "Phương tiện": ["Xe máy", "Ô tô", "Xe đạp", "Máy bay", "Tàu hỏa", "Tàu thủy", "Xe buýt", "Xe tải", "Xe điện", "Xe khách", "Xe ngựa", "Xe ba gác", "Xe công nông", "Xe lu", "Xe cẩu", "Xe tăng", "Xe cứu hỏa", "Xe cứu thương", "Xe cảnh sát", "Xe container"],
        "Âm nhạc": ["Piano", "Guitar", "Trống", "Sáo", "Violin", "Đàn tranh", "Đàn bầu", "Kèn", "Ukulele", "Harmonica", "Rap", "Rock", "Pop", "Jazz", "Opera", "EDM", "Bolero", "Cải lương", "Dân ca", "Hiphop"],
        "Địa điểm": ["Trường học", "Bệnh viện", "Siêu thị", "Chợ", "Công viên", "Nhà hát", "Rạp chiếu phim", "Bảo tàng", "Nhà thờ", "Chùa", "Sân vận động", "Bãi biển", "Núi", "Sông", "Hồ", "Thư viện", "Khách sạn", "Nhà hàng", "Quán cà phê", "Sân bay"],
        "Trò chơi": ["Cờ vua", "Cờ tướng", "Cờ caro", "Cờ tỷ phú", "UNO", "Poker", "Bài tiến lên", "Mạt chược", "Sudoku", "Rubik", "Caro", "Đố vui", "Ghép hình", "Trốn tìm", "Bắn bi", "Nhảy dây", "Oẳn tù tì", "Điện tử"],
        "Công nghệ": ["Điện thoại", "Laptop", "Máy tính", "Tivi", "Máy in", "Máy ảnh", "Camera", "Đồng hồ thông minh", "Loa", "Tai nghe", "USB", "Ổ cứng", "Chuột", "Bàn phím", "Tablet", "Drone", "Máy chiếu", "Robot", "Kính VR", "Máy chơi game"],
        "Thời tiết": ["Mưa", "Nắng", "Gió", "Bão", "Sấm sét", "Mưa phùn", "Mưa đá", "Nắng gắt", "Lạnh", "Nóng", "Âm u", "Mát mẻ", "Sương mù", "Mưa rào", "Mưa to", "Lũ", "Lốc xoáy", "Mưa ngâu", "Nhiệt đới", "Ôn đới"]
    },
    assignments: {},
    currentIndex: 0,
    suspectIndex: -1
};

// Hàm tiện ích để chuyển đổi màn hình
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Xử lý tạo ô nhập tên
function createNameInputs() {
    const count = parseInt(document.getElementById("playerCount").value);
    const container = document.getElementById("nameInputs");
    container.innerHTML = "";
    if (isNaN(count) || count < 3 || count > 8) {
        document.getElementById("error-message").textContent = "Số người chơi phải từ 3 đến 8!";
        return;
    }
    document.getElementById("error-message").textContent = "";
    for (let i = 0; i < count; i++) {
        container.innerHTML += `<input type="text" class="playerNameInput" placeholder="Tên người chơi ${i + 1}">`;
    }
}

// Bắt đầu trò chơi
function startGame() {
    const playerNameInputs = document.querySelectorAll("#nameInputs .playerNameInput");
    
    // Sửa lỗi: Gán tên cho mỗi người chơi, nếu trống thì đặt tên mặc định
    gameState.players = Array.from(playerNameInputs).map((input, index) => input.value.trim() || `Người ${index + 1}`);
    
    const checkedTopics = Array.from(document.querySelectorAll("#topics input:checked")).map(cb => cb.value);
    if (checkedTopics.length === 0) {
        document.getElementById("error-message").textContent = "Vui lòng chọn ít nhất 1 chủ đề!";
        return;
    }
    document.getElementById("error-message").textContent = "";

    const topic = checkedTopics[Math.floor(Math.random() * checkedTopics.length)];
    const wordList = gameState.words[topic];
    const keyword = wordList[Math.floor(Math.random() * wordList.length)];
    gameState.suspectIndex = Math.floor(Math.random() * gameState.players.length);

    gameState.assignments = {};
    gameState.players.forEach((p, i) => {
        if (i === gameState.suspectIndex) {
            gameState.assignments[p] = { role: "Kẻ Khả Nghi 👽", content: `Gợi ý: ${topic}` };
        } else {
            gameState.assignments[p] = { role: "Bình Thường", content: `Từ khóa: ${keyword}` };
        }
    });

    gameState.currentIndex = 0;
    switchScreen('card-screen');
    showCurrentCard();
}

// Hiển thị thẻ bài cho người chơi hiện tại
function showCurrentCard() {
    const name = gameState.players[gameState.currentIndex];
    const assignment = gameState.assignments[name];

    document.getElementById("player-turn").innerText = `Người chơi ${gameState.currentIndex + 1}: ${name}`;
    document.getElementById("card-front-name").innerText = name;
    document.getElementById("card-role").innerText = assignment.role;
    document.getElementById("card-content").innerText = assignment.content;

    document.querySelector("#card-container .card-inner").classList.remove('flipped');
    document.getElementById("nextBtn").classList.add('hidden');
}

// Chuyển sang người chơi tiếp theo
function nextPlayer() {
    gameState.currentIndex++;
    if (gameState.currentIndex >= gameState.players.length) {
        switchScreen('vote-screen');
        showVoteScreen();
    } else {
        showCurrentCard();
    }
}

// Hiển thị màn hình bỏ phiếu
function showVoteScreen() {
    const playerOptionsContainer = document.getElementById("player-options");
    playerOptionsContainer.innerHTML = '';
    
    gameState.players.forEach(p => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "player-option-item";
        playerDiv.innerHTML = `<input type="radio" name="suspect" value="${p}" id="radio-${p}">
                               <label for="radio-${p}">${p}</label>`;
        playerOptionsContainer.appendChild(playerDiv);
    });
}

// Gửi phiếu bầu
function submitVote() {
    const selectedPlayer = document.querySelector('input[name="suspect"]:checked');
    if (!selectedPlayer) {
        alert("Vui lòng chọn một người để bỏ phiếu.");
        return;
    }
    checkResult(selectedPlayer.value);
}

// Kiểm tra kết quả
function checkResult(suspectVote) {
    const suspectName = gameState.players[gameState.suspectIndex];
    const resultMessage = document.getElementById("result-message");

    if (suspectVote === suspectName) {
        resultMessage.textContent = "Kẻ tình nghi đã bị bắt! 🎉";
        resultMessage.style.color = "var(--success-color)";
    } else {
        resultMessage.textContent = "Kẻ tình nghi vẫn ở quanh chúng ta... 🕵️";
        resultMessage.style.color = "var(--error-color)";
    }
    switchScreen('result-screen');
}

// Chơi lại
function resetGame() {
    document.getElementById("nameInputs").innerHTML = '';
    document.getElementById("playerCount").value = '';
    document.querySelectorAll("#topics input:checked").forEach(cb => cb.checked = false);
    
    gameState.players = [];
    gameState.currentIndex = 0;
    gameState.assignments = {};
    gameState.suspectIndex = -1;
    
    switchScreen('setup-screen');
}

// Hàm khởi tạo và gán sự kiện ban đầu
function init() {
    // Gán sự kiện cho các nút
    document.getElementById('createNameBtn').addEventListener('click', createNameInputs);
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    document.getElementById('nextBtn').addEventListener('click', nextPlayer);
    document.getElementById('submitVoteBtn').addEventListener('click', submitVote);
    document.getElementById('resetGameBtn').addEventListener('click', resetGame);

    // Gán sự kiện lật thẻ bài một lần duy nhất
    const cardInner = document.querySelector("#card-container .card-inner");
    cardInner.addEventListener('mousedown', () => cardInner.classList.add('flipped'));
    cardInner.addEventListener('touchstart', () => cardInner.classList.add('flipped'));
    
    cardInner.addEventListener('mouseup', () => {
        cardInner.classList.remove('flipped');
        document.getElementById("nextBtn").classList.remove('hidden');
    });
    cardInner.addEventListener('touchend', () => {
        cardInner.classList.remove('flipped');
        document.getElementById("nextBtn").classList.remove('hidden');
    });
}

// Chạy hàm khởi tạo khi DOM đã được tải
document.addEventListener('DOMContentLoaded', init);