let players = [];
let words = {
    "Hoa quả": ["Cam", "Chanh", "Táo", "Dưa hấu", "Xoài"],
    "Động vật": ["Chó", "Mèo", "Hổ", "Voi", "Khỉ"],
    "Đồ vật": ["Ghế", "Điện thoại", "Kính", "Bàn", "Cốc"]
};
let assignments = {};
let currentIndex = 0;
let suspectIndex = -1;

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
        container.innerHTML += `<input type="text" id="player${i}" placeholder="Tên người chơi ${i+1}">`;
    }
}

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startGame() {
    players = [];
    const count = parseInt(document.getElementById("playerCount").value);
    for (let i = 0; i < count; i++) {
        let name = document.getElementById(`player${i}`).value || `Người ${i+1}`;
        players.push(name);
    }

    let checked = Array.from(document.querySelectorAll("#topics input:checked")).map(cb => cb.value);
    if (checked.length === 0) {
        document.getElementById("error-message").textContent = "Vui lòng chọn ít nhất 1 chủ đề!";
        return;
    }
    document.getElementById("error-message").textContent = "";

    let topic = checked[Math.floor(Math.random() * checked.length)];
    let list = words[topic];
    let keyword = list[Math.floor(Math.random() * list.length)];
    suspectIndex = Math.floor(Math.random() * players.length);

    assignments = {};
    players.forEach((p, i) => {
        if (i === suspectIndex) {
            assignments[p] = { role: "Kẻ Khả Nghi 👽", content: `Gợi ý: ${topic}` };
        } else {
            assignments[p] = { role: "Bình Thường", content: `Từ khóa: ${keyword}` };
        }
    });

    currentIndex = 0;
    switchScreen('card-screen');
    showCurrentCard();
}

function showCurrentCard() {
    let name = players[currentIndex];
    let cardInner = document.querySelector("#card-container .card-inner");
    let cardFrontName = document.getElementById("card-front-name");
    let cardRole = document.getElementById("card-role");
    let cardContent = document.getElementById("card-content");
    let playerTurn = document.getElementById("player-turn");
    let nextBtn = document.getElementById("nextBtn");

    playerTurn.innerText = `Người chơi ${currentIndex + 1}: ${name}`;
    cardFrontName.innerText = name;
    cardRole.innerText = assignments[name].role;
    cardContent.innerText = assignments[name].content;
    
    cardInner.classList.remove('flipped');
    nextBtn.classList.add('hidden');

    // Sự kiện giữ để xem thẻ
    cardInner.onmousedown = cardInner.ontouchstart = () => {
        cardInner.classList.add('flipped');
    };
    cardInner.onmouseup = cardInner.ontouchend = () => {
        cardInner.classList.remove('flipped');
        nextBtn.classList.remove('hidden');
    };
}

function nextPlayer() {
    currentIndex++;
    if (currentIndex >= players.length) {
        switchScreen('vote-screen');
        showVoteScreen();
    } else {
        showCurrentCard();
    }
}

function showVoteScreen() {
    const playerOptionsContainer = document.getElementById("player-options");
    playerOptionsContainer.innerHTML = '';
    
    players.forEach(p => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "player-option-item";
        playerDiv.innerHTML = `<input type="radio" name="suspect" value="${p}" id="radio-${p}">
                               <label for="radio-${p}">${p}</label>`;
        playerOptionsContainer.appendChild(playerDiv);
    });
}

function submitVote() {
    const selectedPlayer = document.querySelector('input[name="suspect"]:checked');
    if (!selectedPlayer) {
        alert("Vui lòng chọn một người để bỏ phiếu.");
        return;
    }

    checkResult(selectedPlayer.value);
}

function checkResult(suspectVote) {
    const suspectName = players[suspectIndex];
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

function resetGame() {
    document.getElementById("nameInputs").innerHTML = '';
    document.getElementById("playerCount").value = '';
    document.querySelectorAll("#topics input:checked").forEach(cb => cb.checked = false);
    
    players = [];
    currentIndex = 0;
    assignments = {};
    suspectIndex = -1;
    
    switchScreen('setup-screen');
}