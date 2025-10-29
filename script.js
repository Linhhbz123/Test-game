// Cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyBgxpGWJ6afphplkKOIzt2Q1F66ybK8FjE",
    authDomain: "casino-9f458.firebaseapp.com",
    projectId: "casino-9f458",
    storageBucket: "casino-9f458.firebasestorage.app",
    messagingSenderId: "818134118287",
    appId: "1:818134118287:web:26fc372bf39b2b78d3e5fa",
    measurementId: "G-52MXFM9EX3"
};

// Khởi tạo Firebase App
firebase.initializeApp(firebaseConfig);

// Lấy các dịch vụ Firebase (SDK v8 Namespaced)
const auth = firebase.auth();
const db = firebase.firestore();

// Hằng số cho Role
const ROLES = ['user', 'admin'];

// ----------------------------------------------------
// CÁC BIẾN DOM
// ----------------------------------------------------

const authSection = document.getElementById('auth-section');
const menuSection = document.getElementById('menu-section');
const gameTXSection = document.getElementById('game-tx');
const adminSection = document.getElementById('admin-section');

const scoreSpan = document.getElementById('score');
const displayNameSpan = document.getElementById('displayName');
const authMessageP = document.getElementById('auth-message');
const adminUsersDiv = document.getElementById('admin-users');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const btnTX = document.getElementById('btn-tx');
const btnAdmin = document.getElementById('btn-admin');

// Tài Xỉu DOM
const txBetAmountInput = document.getElementById('tx-bet-amount');
const txResultP = document.getElementById('tx-result');
const txMessageP = document.getElementById('tx-message');
const betTaiBtn = document.getElementById('bet-tai');
const betXiuBtn = document.getElementById('bet-xiu');
const backBtns = document.querySelectorAll('.backBtn');

let currentUserData = null; // Lưu trữ dữ liệu người dùng (điểm, role,...)

// ----------------------------------------------------
// HÀM HIỂN THỊ UI
// ----------------------------------------------------

function switchUI(sectionToShow) {
    authSection.hidden = true;
    menuSection.hidden = true;
    gameTXSection.hidden = true;
    adminSection.hidden = true;

    // Class 'hidden' để kích hoạt CSS (ví dụ: animation)
    authSection.classList.add('hidden');
    menuSection.classList.add('hidden');
    gameTXSection.classList.add('hidden');
    adminSection.classList.add('hidden');


    if (sectionToShow === 'auth') {
        authSection.hidden = false;
        authSection.classList.remove('hidden');
    } else if (sectionToShow === 'menu') {
        menuSection.hidden = false;
        menuSection.classList.remove('hidden');
    } else if (sectionToShow === 'tx') {
        gameTXSection.hidden = false;
        gameTXSection.classList.remove('hidden');
    } else if (sectionToShow === 'admin') {
        adminSection.hidden = false;
        adminSection.classList.remove('hidden');
        loadAdminUsers();
    }
}

function updateScoreUI(score, email) {
    scoreSpan.textContent = score.toLocaleString('en-US');
    displayNameSpan.textContent = email ? email.split('@')[0] : 'Người chơi';
}

// ----------------------------------------------------
// XỬ LÝ AUTHENTICATION
// ----------------------------------------------------

auth.onAuthStateChanged(user => {
    if (user) {
        const userRef = db.collection('users').doc(user.uid);
        
        userRef.onSnapshot(doc => {
            if (doc.exists) {
                currentUserData = doc.data();
                updateScoreUI(currentUserData.score, currentUserData.email);

                if (currentUserData.role === 'admin') {
                    btnAdmin.classList.remove('hidden');
                } else {
                    btnAdmin.classList.add('hidden');
                }
                
                // Giữ UI nếu người dùng đang ở game hoặc admin
                const currentSection = document.querySelector('.container > div:not([hidden])')?.id;
                if (!['game-tx', 'admin-section'].includes(currentSection)) {
                     switchUI('menu');
                }
            } else {
                // Tạo tài liệu Firestore cho người dùng mới
                userRef.set({
                    email: user.email,
                    score: 5000,
                    role: 'user', 
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    authMessageP.textContent = 'Chào mừng! Bạn nhận được 1,000 điểm.';
                }).catch(error => {
                    console.error("Lỗi tạo user data:", error);
                });
            }
        }, error => {
            console.error("Lỗi lắng nghe user data:", error);
            authMessageP.textContent = 'Lỗi kết nối CSDL.';
        });

    } else {
        currentUserData = null;
        updateScoreUI(0, '');
        switchUI('auth');
    }
});

registerBtn.addEventListener('click', async () => {
    const email = usernameInput.value;
    const password = passwordInput.value;
    authMessageP.textContent = 'Đang xử lý...';
    authMessageP.style.color = '#00ffff';

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        authMessageP.style.color = '#00ff00';
        authMessageP.textContent = 'Đăng ký thành công! Đang đăng nhập...';
    } catch (error) {
        authMessageP.style.color = '#ff9090';
        if (error.code === 'auth/weak-password') {
            authMessageP.textContent = 'Lỗi: Mật khẩu phải có ít nhất 6 ký tự.';
        } else if (error.code === 'auth/email-already-in-use') {
            authMessageP.textContent = 'Lỗi: Email này đã được sử dụng.';
        } else {
            authMessageP.textContent = `Lỗi ĐK: ${error.message}`;
            console.error("Registration Error:", error);
        }
    }
});

loginBtn.addEventListener('click', async () => {
    const email = usernameInput.value;
    const password = passwordInput.value;
    authMessageP.textContent = 'Đang xử lý...';
    authMessageP.style.color = '#00ffff';

    try {
        await auth.signInWithEmailAndPassword(email, password);
        authMessageP.style.color = '#00ff00';
        authMessageP.textContent = 'Đăng nhập thành công!';
    } catch (error) {
        authMessageP.style.color = '#ff9090';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
             authMessageP.textContent = 'Lỗi: Email hoặc mật khẩu không đúng.';
        } else {
            authMessageP.textContent = `Lỗi ĐN: ${error.message}`;
            console.error("Login Error:", error);
        }
    }
});

logoutBtn.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            authMessageP.style.color = '#00ffff';
            authMessageP.textContent = 'Bạn đã đăng xuất.';
        })
        .catch(error => {
            console.error("Logout Error:", error);
        });
});


// ----------------------------------------------------
// XỬ LÝ GAME TÀI XỈU (Đã xử lý BÃO)
// ----------------------------------------------------

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function handleBet(type) {
    if (!currentUserData) {
        txMessageP.textContent = 'Vui lòng đăng nhập để chơi.';
        return;
    }

    const betAmount = parseInt(txBetAmountInput.value);
    
    if (isNaN(betAmount) || betAmount < 10) {
        txMessageP.style.color = '#ff9090';
        txMessageP.textContent = 'Số tiền cược tối thiểu là 10 điểm.';
        return;
    }

    if (betAmount > currentUserData.score) {
        txMessageP.style.color = '#ff9090';
        txMessageP.textContent = 'Bạn không đủ điểm để cược số tiền này.';
        return;
    }

    // Tiến hành lắc xúc xắc
    const dice1 = rollDice();
    const dice2 = rollDice();
    const dice3 = rollDice();
    const total = dice1 + dice2 + dice3;

    // Hiển thị kết quả xúc xắc
    txResultP.innerHTML = `<span class="dice-icons">&#x268${dice1-1}; &#x268${dice2-1}; &#x268${dice3-1};</span>`;
    
    // Kiểm tra BÃO (Triple)
    const isTriple = (dice1 === dice2 && dice2 === dice3);

    // Xác định kết quả và thay đổi điểm
    let resultType = '';
    let netChange = -betAmount; 

    if (isTriple) {
        resultType = `BÃO (${dice1}-${dice2}-${dice3})`;
    } else if (total >= 11 && total <= 17) {
        resultType = 'TÀI';
    } else if (total >= 3 && total <= 10) {
        resultType = 'XỈU';
    }
    
    // So sánh kết quả với lựa chọn người chơi
    if (isTriple) {
        txMessageP.style.color = '#ff9090';
        txMessageP.textContent = `BÃO! Mọi cược Tài Xỉu đều thua. Bạn mất ${betAmount.toLocaleString('en-US')} điểm.`;
    } else if (resultType === type) {
        netChange = betAmount; // Lãi 1:1
        txMessageP.style.color = '#00ff00';
        txMessageP.textContent = `Thắng ${resultType}! Bạn nhận được ${betAmount.toLocaleString('en-US')} điểm!`;
    } else {
        txMessageP.style.color = '#ff9090';
        txMessageP.textContent = `Thua ${resultType}! Bạn mất ${betAmount.toLocaleString('en-US')} điểm.`;
    }

    // Hiển thị tổng
    txResultP.innerHTML += `<br>Tổng: ${total} (${resultType})`;
    
    // Cập nhật điểm lên Firestore
    const userRef = db.collection('users').doc(auth.currentUser.uid);
    userRef.update({
        score: firebase.firestore.FieldValue.increment(netChange)
    }).catch(error => {
        console.error("Lỗi cập nhật điểm:", error);
        txMessageP.textContent = 'Lỗi: Không thể cập nhật điểm.';
    });
}

// Gắn sự kiện cho nút cược
betTaiBtn.addEventListener('click', () => handleBet('TÀI'));
betXiuBtn.addEventListener('click', () => handleBet('XỈU'));


// ----------------------------------------------------
// XỬ LÝ ADMIN PANEL
// ----------------------------------------------------

function loadAdminUsers() {
    if (currentUserData && currentUserData.role === 'admin') {
        adminUsersDiv.innerHTML = 'Đang tải...';
        
        db.collection('users').get().then(snapshot => {
            adminUsersDiv.innerHTML = '';
            
            const header = document.createElement('h3');
            header.textContent = `Tổng số người chơi: ${snapshot.size}`;
            adminUsersDiv.appendChild(header);

            snapshot.forEach(doc => {
                const data = doc.data();
                const uid = doc.id;
                
                if (uid === auth.currentUser.uid) return;

                const userDiv = document.createElement('div');
                userDiv.classList.add('admin-user-item');
                userDiv.dataset.uid = uid;

                userDiv.innerHTML = `
                    <p><strong>Email:</strong> ${data.email} | <strong>UID:</strong> ${uid.substring(0, 8)}...</p>
                    <p><strong>Điểm:</strong> <span id="score-${uid}">${data.score.toLocaleString('en-US')}</span></p>
                    
                    <div class="admin-controls">
                        <input type="number" id="points-change-${uid}" placeholder="Điểm cộng/trừ" value="100">
                        <button class="action-btn" data-action="update-score" data-uid="${uid}">Cập nhật Điểm</button>
                    </div>

                    <div class="admin-controls">
                        <select id="role-select-${uid}" data-uid="${uid}">
                            ${ROLES.map(role => 
                                `<option value="${role}" ${data.role === role ? 'selected' : ''}>${role.toUpperCase()}</option>`
                            ).join('')}
                        </select>
                        <button class="action-btn" data-action="update-role" data-uid="${uid}">Cập nhật Role</button>
                    </div>
                    <small id="msg-${uid}" style="color:#00ffff; margin-top:5px; display:block;"></small>
                `;
                adminUsersDiv.appendChild(userDiv);
            });
            
            attachAdminListeners(); 

        }).catch(error => {
            console.error("Lỗi tải danh sách người dùng admin:", error);
            adminUsersDiv.innerHTML = 'Lỗi tải dữ liệu người dùng.';
        });
    } else {
        adminUsersDiv.innerHTML = 'Bạn không có quyền truy cập trang này.';
    }
}

function attachAdminListeners() {
    adminUsersDiv.addEventListener('click', async (event) => {
        const btn = event.target.closest('.action-btn');
        if (!btn) return;

        const uid = btn.dataset.uid;
        const action = btn.dataset.action;
        const msgElement = document.getElementById(`msg-${uid}`);
        
        msgElement.textContent = 'Đang xử lý...';
        msgElement.style.color = '#00ffff';

        try {
            if (action === 'update-score') {
                const amountInput = document.getElementById(`points-change-${uid}`);
                const amount = parseInt(amountInput.value);
                if (isNaN(amount) || amount === 0) {
                    msgElement.textContent = 'Vui lòng nhập số điểm hợp lệ.';
                    msgElement.style.color = '#ff9090';
                    return;
                }
                await updatePlayerScore(uid, amount);
                msgElement.textContent = `Cập nhật điểm thành công: ${amount > 0 ? '+' : ''}${amount.toLocaleString('en-US')}.`;
                msgElement.style.color = '#00ff00';
            } else if (action === 'update-role') {
                const roleSelect = document.getElementById(`role-select-${uid}`);
                const newRole = roleSelect.value;
                await updatePlayerRole(uid, newRole);
                msgElement.textContent = `Cập nhật vai trò thành công: ${newRole.toUpperCase()}.`;
                msgElement.style.color = '#00ff00';
            }
        } catch (error) {
            console.error("Lỗi Admin Action:", error);
            msgElement.textContent = `Lỗi: ${error.message}`;
            msgElement.style.color = '#ff9090';
        }
    });
}

async function updatePlayerScore(uid, amount) {
    const userRef = db.collection('users').doc(uid);
    await userRef.update({
        score: firebase.firestore.FieldValue.increment(amount)
    });
}

async function updatePlayerRole(uid, role) {
    const userRef = db.collection('users').doc(uid);
    await userRef.update({
        role: role
    });
}


// ----------------------------------------------------
// XỬ LÝ CHUYỂN ĐỔI UI
// ----------------------------------------------------

btnTX.addEventListener('click', () => switchUI('tx'));
btnAdmin.addEventListener('click', () => switchUI('admin'));

backBtns.forEach(button => {
    button.addEventListener('click', () => switchUI('menu'));
});

switchUI('auth');