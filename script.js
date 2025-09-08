// Quản lý trạng thái tập trung
let gameState = {
    players: [],
    words: {
        "Hoa quả": [
            ["Cam", "Chanh"], ["Táo", "Lê"], ["Xoài", "Dứa"], ["Bưởi", "Quýt"], ["Dưa hấu", "Thanh long"],
            ["Mận", "Ổi"], ["Na", "Mít"], ["Kiwi", "Chôm chôm"], ["Lựu", "Nho"], ["Dừa", "Cóc"]
        ],
        "Động vật": [
            ["Chó", "Sói"], ["Mèo", "Hổ"], ["Ngựa", "Lừa"], ["Trâu", "Bò"], ["Khỉ", "Vượn"],
            ["Sư tử", "Báo"], ["Gà", "Vịt"], ["Cừu", "Dê"], ["Cá heo", "Cá voi"], ["Rùa", "Ba ba"]
        ],
        "Đồ vật": [
            ["Ghế", "Bàn"], ["Điện thoại", "Laptop"], ["Kính", "Kính râm"], ["Cốc", "Ly"], ["Dao", "Kéo"],
            ["Quạt", "Điều hòa"], ["Tivi", "Máy tính"], ["Chảo", "Nồi"], ["Gối", "Chăn"], ["Đèn", "Đèn pin"]
        ],
        "Màu sắc": [
            ["Đỏ", "Cam"], ["Xanh dương", "Xanh biển"], ["Xanh lá", "Xanh ngọc"], ["Tím", "Hồng tím"], ["Đen", "Xám"],
            ["Trắng", "Be"], ["Vàng", "Vàng nghệ"], ["Nâu", "Nâu đất"], ["Hồng", "Hồng pastel"], ["Bạc", "Bạch kim"]
        ],
        "Quốc gia": [
            ["Việt Nam", "Thái Lan"], ["Trung Quốc", "Nhật Bản"], ["Hàn Quốc", "Triều Tiên"], ["Mỹ", "Canada"], ["Anh", "Pháp"],
            ["Đức", "Ý"], ["Nga", "Ukraina"], ["Brazil", "Argentina"], ["Úc", "New Zealand"], ["Ai Cập", "Morocco"]
        ],
        "Món ăn": [
            ["Phở", "Bún bò"], ["Cơm tấm", "Xôi mặn"], ["Bánh mì", "Bánh bao"], ["Mì tôm", "Mì trứng"], ["Lẩu Thái", "Lẩu kim chi"],
            ["Nem rán", "Chả giò"], ["Bánh cuốn", "Bánh ướt"], ["Gỏi cuốn", "Bò bía"], ["Cá kho", "Thịt kho"], ["Chè đậu", "Chè bưởi"]
        ],
        "Đồ uống": [
            ["Cà phê", "Trà đen"], ["Trà sữa", "Sữa tươi"], ["Coca", "Pepsi"], ["Bia", "Rượu vang"], ["Sinh tố xoài", "Sinh tố bơ"],
            ["Nước cam", "Nước chanh"], ["Hồng trà", "Trà ô long"], ["Soda", "7Up"], ["Sữa chua uống", "Yakult"], ["Matcha", "Trà xanh"]
        ],
        "Nghề nghiệp": [
            ["Bác sĩ", "Y tá"], ["Giáo viên", "Gia sư"], ["Công an", "Bộ đội"], ["Kỹ sư", "Lập trình viên"], ["Ca sĩ", "Diễn viên"],
            ["Họa sĩ", "Điêu khắc gia"], ["Luật sư", "Thẩm phán"], ["Đầu bếp", "Phụ bếp"], ["Phi công", "Tiếp viên"], ["Nhà báo", "Phóng viên"]
        ],
        "Thể thao": [
            ["Bóng đá", "Futsal"], ["Bóng rổ", "Bóng chuyền"], ["Cầu lông", "Tennis"], ["Bơi lội", "Lặn"], ["Chạy bộ", "Đi bộ"],
            ["Đấm bốc", "Muay Thái"], ["Cờ vua", "Cờ tướng"], ["Trượt ván", "Trượt patin"], ["Golf", "Mini golf"], ["Đua xe", "MotoGP"]
        ],
        "Phương tiện": [
            ["Xe đạp", "Xe máy"], ["Ô tô", "Xe tải"], ["Tàu hỏa", "Tàu điện"], ["Máy bay", "Trực thăng"], ["Thuyền buồm", "Ca nô"],
            ["Xe buýt", "Xe khách"], ["Xe hơi", "Siêu xe"], ["Xe điện", "Xe hybrid"], ["Xe công nông", "Xe kéo"], ["Xe ngựa", "Xe bò"]
        ],
        "Âm nhạc": [
            ["Piano", "Organ"], ["Guitar", "Ukulele"], ["Trống", "Trống cajon"], ["Violin", "Viola"], ["Rap", "Hiphop"],
            ["Nhạc pop", "Nhạc ballad"], ["Nhạc rock", "Nhạc metal"], ["Jazz", "Blues"], ["EDM", "DJ"], ["Bolero", "Trữ tình"]
        ],
        "Địa điểm": [
            ["Trường học", "Thư viện"], ["Bệnh viện", "Phòng khám"], ["Siêu thị", "Chợ"], ["Công viên", "Sân vận động"], ["Nhà hàng", "Quán cà phê"],
            ["Rạp phim", "Nhà hát"], ["Nhà thờ", "Chùa"], ["Biển", "Hồ"], ["Núi", "Đồi"], ["Ga tàu", "Bến xe"]
        ],
        "Trò chơi": [
            ["Cờ vua", "Cờ tướng"], ["Cờ caro", "Cờ gomoku"], ["Poker", "Bài tây"], ["Uno", "Skipbo"], ["Ma sói", "Among Us"],
            ["Sudoku", "Crossword"], ["Ghép hình", "Xếp gỗ Jenga"], ["Liên Quân", "PUBG"], ["Minecraft", "Roblox"], ["Flappy Bird", "Candy Crush"]
        ],
        "Công nghệ": [
            ["Điện thoại", "Máy tính bảng"], ["Máy tính", "Laptop"], ["Tai nghe", "Loa"], ["Chuột", "Bàn phím"], ["USB", "Ổ cứng"],
            ["Máy ảnh", "Camera"], ["Drone", "Robot"], ["Máy in", "Máy quét"], ["Máy chiếu", "Tivi"], ["Máy game", "Console"]
        ],
        "Thời tiết": [
            ["Nắng", "Nắng gắt"], ["Mưa", "Mưa phùn"], ["Bão", "Bão tố"], ["Gió", "Gió mùa"], ["Tuyết", "Bão tuyết"],
            ["Sương mù", "Trời âm u"], ["Sấm sét", "Mưa giông"], ["Mây", "Trời quang"], ["Nhiệt độ cao", "Nắng nóng"], ["Nhiệt độ thấp", "Trời lạnh"]
        ]
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
    
    gameState.players = Array.from(playerNameInputs).map((input, index) => input.value.trim() || `Người ${index + 1}`);
    
    const checkedTopics = Array.from(document.querySelectorAll("#topics input:checked")).map(cb => cb.value);
    if (checkedTopics.length === 0) {
        document.getElementById("error-message").textContent = "Vui lòng chọn ít nhất 1 chủ đề!";
        return;
    }
    document.getElementById("error-message").textContent = "";

    const topic = checkedTopics[Math.floor(Math.random() * checkedTopics.length)];
    const wordPairs = gameState.words[topic];
    
    if (wordPairs.length === 0) {
        document.getElementById("error-message").textContent = "Chủ đề đã chọn không có từ khóa nào!";
        return;
    }

    const randomPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    const [differentWord, mainWord] = randomPair;

    gameState.suspectIndex = Math.floor(Math.random() * gameState.players.length);

    gameState.assignments = {};
    gameState.players.forEach((p, i) => {
        if (i === gameState.suspectIndex) {
            gameState.assignments[p] = { role: "Bình Thường", content: `Từ khóa: ${differentWord}` };
        } else {
            gameState.assignments[p] = { role: "Bình Thường", content: `Từ khóa: ${mainWord}` };
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
        resultMessage.textContent = "Người có từ khóa khác đã bị tìm thấy! 🎉";
        resultMessage.style.color = "var(--success-color)";
    } else {
        resultMessage.textContent = "Người có từ khóa khác vẫn còn ở đây... 🕵️";
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
    document.getElementById('createNameBtn').addEventListener('click', createNameInputs);
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    document.getElementById('nextBtn').addEventListener('click', nextPlayer);
    document.getElementById('submitVoteBtn').addEventListener('click', submitVote);
    document.getElementById('resetGameBtn').addEventListener('click', resetGame);

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