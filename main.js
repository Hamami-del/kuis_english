// ===== Inisialisasi Firebase =====
const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ===== Variabel =====
let indexSoal = 0;
let skor = 0;
let namaPemain = "";

// ===== Tombol Mulai =====
document.getElementById("mulaiBtn").addEventListener("click", () => {
  const inputNama = document.getElementById("namaPemain").value.trim();
  if (inputNama === "") {
    alert("Masukkan nama kamu dulu ya!");
    return;
  }
  namaPemain = inputNama;

  // Simpan nama ke Firebase
  db.ref("pemain").push({
    nama: namaPemain,
    waktu: new Date().toLocaleString("id-ID")
  });

  // Sembunyikan form nama dan tampilkan kuis
  document.getElementById("nama-container").style.display = "none";
  document.getElementById("kuis-container").style.display = "block";
  tampilSoal();
});

// ===== Tampilkan Soal =====
function tampilSoal() {
  const soalSekarang = soal[indexSoal];
  document.getElementById("pertanyaan").textContent = soalSekarang.q;

  const pilihanContainer = document.getElementById("pilihan-container");
  pilihanContainer.innerHTML = "";

  soalSekarang.options.forEach((pil) => {
    const btn = document.createElement("button");
    btn.textContent = pil;
    btn.onclick = () => cekJawaban(pil);
    pilihanContainer.appendChild(btn);
  });

  document.getElementById("skor").textContent = `Score: ${skor}`;
}

// ===== Cek Jawaban =====
function cekJawaban(pilihan) {
  if (pilihan === soal[indexSoal].answer) {
    skor++;
  }
  lanjutSoal();
}

// ===== Tombol Lewati dan Berikutnya =====
document.getElementById("lewatiBtn").addEventListener("click", lanjutSoal);
document.getElementById("nextBtn").addEventListener("click", lanjutSoal);

function lanjutSoal() {
  indexSoal++;
  if (indexSoal < soal.length) {
    tampilSoal();
  } else {
    document.getElementById("kuis-container").innerHTML = `
      <h2>🎉 Great job, ${namaPemain}!</h2>
      <p>Your final score is: <b>${skor} / ${soal.length}</b></p>
      <button onclick="location.reload()">Play Again</button>
    `;
  }
}

// ===== Popup Donasi =====
document.getElementById("donasiBtn").addEventListener("click", () => {
  document.getElementById("popupDonasi").style.display = "flex";
});

function tutupDonasi() {
  document.getElementById("popupDonasi").style.display = "none";
}
