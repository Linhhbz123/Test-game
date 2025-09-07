let players = [];
let words = {
    "Hoa quả": ["Cam", "Chanh", "Táo", "Dưa hấu", "Xoài"],
    "Động vật": ["Chó", "Mèo", "Hổ", "Voi", "Khỉ"],
    "Đồ vật": ["Ghế", "Điện thoại", "Kính", "Bàn", "Cốc"]
};
let assignments = {};
let currentIndex = 0;
let isVotingPhase = false;
let suspectIndex = -1;

function createNameInputs() {
    const count = parseInt(document.getElementById("playerCount").value);
    const container = document.getElementById("nameInputs");
    container.innerHTML = "";
    if (isNaN(count) || count < 3 || count > 8) {
        alert("Số người chơi từ 3 đến 8!");
        return;
    }
    for (let i = 0; i < count; i++) {
        container.innerHTML += `<input type="text" id="player${i}" placeholder="Tên người chơi ${i+1}"><br>`;
    }
}

function startGame() {
    // Lấy tên người chơi
    players = [];
    const count = parseInt(document.getElementById("playerCount").value);
    for (let i = 0; i < count; i++) {
        let name = document.getElementById(`player${i}`).value || `Người ${i+1}`;
        players.push(name);
    }

    // Lấy chủ đề đã chọn
    let checked = Array.from(document.querySelectorAll("#topics input:checked"))
        .map(cb => cb.value);
    if (checked.length === 0) {
        alert("Chọn ít nhất 1 chủ đề!");
        return;
    }

    // Random từ khóa và người khả nghi
    let topic = checked[Math.floor(Math.random() * checked.length)];
    let list = words[topic];
    let keyword = list[Math.floor(Math.random() * list.length)];
    suspectIndex = Math.floor(Math.random() * players.length);

    assignments = {};
    players.forEach((p, i) => {
        if (i === suspectIndex) {
            assignments[p] = { role: "outsider", word: `Bạn là kẻ khả nghi 👽\nHint: ${topic}` };
        } else {
            assignments[p] = { role: "normal", word: keyword };
        }
    });

    // Reset lượt
    currentIndex = 0;

    // Hiện màn hình thẻ
    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("card-screen").classList.remove("hidden");

    showCurrentCard();
}

function showCurrentCard() {
    let name = players[currentIndex];
    let card = document.getElementById("card");
    let title = document.getElementById("player-turn");
    let nextBtn = document.getElementById("nextBtn");

    title.innerText = "Người chơi " + (currentIndex + 1) + ": " + name;
    card.innerText = name;
    nextBtn.classList.add("hidden");

    // Giữ để xem từ khóa
    card.onmousedown = card.ontouchstart = () => {
        card.innerText = assignments[name].word;
    };
    card.onmouseup = card.ontouchend = () => {
        card.innerText = name;
        nextBtn.classList.remove("hidden");
    };
}

function nextPlayer() {
    currentIndex++;
    if (currentIndex >= players.length) {
        // Chuyển sang màn hình bỏ phiếu
        document.getElementById("card-screen").classList.add("hidden");
        showVoteScreen();
    } else {
        showCurrentCard();
    }
}

function showVoteScreen() {
    document.getElementById("vote-screen").classList.remove("hidden");
    isVotingPhase = true;

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
    if (!isVotingPhase) return;

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
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = "Kẻ tình nghi vẫn ở quanh chúng ta... 🕵️";
        resultMessage.style.color = "red";
    }

    document.getElementById("vote-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    isVotingPhase = false;
}

function resetGame() {
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("setup-screen").classList.remove("hidden");
    
    document.getElementById("nameInputs").innerHTML = '';
    document.getElementById("playerCount").value = '';
    document.querySelectorAll("#topics input:checked").forEach(cb => cb.checked = false);
    
    players = [];
    currentIndex = 0;
    assignments = {};
    suspectIndex = -1;
}