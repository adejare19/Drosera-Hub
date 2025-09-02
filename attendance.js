import { db } from "./firebaseConfig.js";
import { doc, getDoc, setDoc, updateDoc } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let currentUser = null;

const streakBtn = document.getElementById("zkgrChadBtn");  // streak button
const markZkgrBtn = document.getElementById("markZkgrBtn"); // button to open modal
const loginModalEl = document.getElementById("loginModal");
const modalLoginBtn = document.getElementById("zkgrModal"); // login button inside modal

// hide streak button by default
streakBtn.style.display = "none";

// --- Login ---
export async function loginUser() {
  const username = document.getElementById("discordUsername").value;
  if (!username) return alert("Enter your Discord username!");

  currentUser = username;
  const today = new Date().toISOString().split("T")[0];

  const ref = doc(db, "attendance", username);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    await setDoc(ref, {
      discordUsername: username,
      streak: 0,
      lastLogin: today,
      calendar: {}
    });
  }

  alert(`Welcome ${username}!`);
  const loginModal = bootstrap.Modal.getInstance(loginModalEl);
  loginModal.hide();

  // show streak button once logged in
  streakBtn.style.display = "block";
}

// --- Open Login Modal ---
function openLoginModal() {
  const loginModal = new bootstrap.Modal(loginModalEl);
  loginModal.show();
}
markZkgrBtn.addEventListener("click", openLoginModal);
modalLoginBtn.addEventListener("click", loginUser);

// --- Mark Attendance ---
export async function markAttendance() {
  if (!currentUser) return alert("Please login first!");
  const today = new Date().toISOString().split("T")[0];

  const ref = doc(db, "attendance", currentUser);
  const snapshot = await getDoc(ref);
  let data = snapshot.data();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yDay = yesterday.toISOString().split("T")[0];

  let newStreak = data.streak;
  if (data.lastLogin === yDay) {
    newStreak++;
  } else if (data.lastLogin !== today) {
    newStreak = 1; // reset streak
  }

  data.calendar[today] = true;

  await updateDoc(ref, {
    streak: newStreak,
    lastLogin: today,
    calendar: data.calendar
  });

  alert(`🔥 Grand Rising Chad! Your current streak: ${newStreak} days`);
  renderCalendar(data.calendar);
}
streakBtn.addEventListener("click", markAttendance);

// --- Render Calendar ---
function renderCalendar(calendar) {
  const container = document.getElementById("streakCalendar");
  container.innerHTML = "";
  for (const [day, present] of Object.entries(calendar)) {
    const div = document.createElement("div");
    div.textContent = new Date(day).getDate(); // just show day number
    div.className = present ? "present" : "missed";
    container.appendChild(div);
  }
}
