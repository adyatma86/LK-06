// ==========================
// EFFECT NAVBAR KETIKA SCROLL
// ==========================
const navbar = document.querySelector(".navbar");
const h1 = document.querySelector(".logoA h1");
const cuy = document.querySelector(".logoA");
const cay = document.querySelector("nav ul");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    h1.classList.add("scrolled1");
    cuy.classList.add("scrolled2");
    cay.classList.add("scrolled3");
  } else {
    navbar.classList.remove("scrolled");
    h1.classList.remove("scrolled1");
    cuy.classList.remove("scrolled2");
    cay.classList.remove("scrolled3");
  }
});

// ==========================
// SMOOTH SCROLL
// ==========================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ==========================
// ANIMASI KETIKAN
// ==========================
const typed = new Typed(".gonta-ganti", {
  strings: ["Frontend Developer", "Backend Developer"],
  typeSpeed: 80,
  backSpeed: 80,
  backDelay: 1200,
  loop: true,
});

// ==========================
// ANIMASI MASUKNYA ITEM"
// ==========================
const elementsToReveal = document.querySelectorAll(
  "#tentang article, .skill-container article, .proyek-container article, .email, #form form",
);

elementsToReveal.forEach((el) => {
  el.classList.add("hidden-scroll");
});

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-scroll");
        entry.target.classList.remove("hidden-scroll");
      } else {
        entry.target.classList.add("hidden-scroll");
        entry.target.classList.remove("show-scroll");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

elementsToReveal.forEach((el) => {
  revealOnScroll.observe(el);
});

// ==========================
// MENU KETIKA TAMPILAN MOBILE
// ==========================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

  const isOpen = hamburger.classList.contains("active");
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Tutup menu setelah klik link
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// ==========================
// VALIDASI FORM
// ==========================
const form = document.querySelector("#form form");

// buat elemen notifikasi
const notif = document.createElement("div");
notif.style.marginTop = "10px";
form.appendChild(notif);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const hp = document.getElementById("hp").value.trim();
  const pesan = document.getElementById("pesan").value.trim();
  const kategori = document.getElementById("kategori");
  const hasil = document.querySelector(".hasil");
  const sectionHasil = document.getElementById("hasil");

  let error = "";

  if (nama.length < 3) {
    error = "Nama minimal 3 karakter!";
  } else if (!email.includes("@")) {
    error = "Format email tidak valid!";
  } else if (!/^08[0-9]{8,11}$/.test(hp)) {
    error = "Nomor HP harus diawali 08, variabel angka, dan minimal 9 angka!";
  } else if (pesan.length < 5) {
    error = "Pesan terlalu pendek!";
  }

  if (error !== "") {
    notif.innerHTML = `<p style="color:red;">❌ ${error}</p>`;
  } else {
    notif.innerHTML = `<p style="color:green;">✅ Form berhasil dikirim!</p>`;

    // tampilkan section hasil
    sectionHasil.style.display = "block";

    if (kategori.value !== "") {
      const newItem = document.createElement("div");

      newItem.style.display = "flex";
      newItem.style.justifyContent = "space-between";
      newItem.style.alignItems = "center";

      const p = document.createElement("p");
      p.innerHTML = `✅ ${nama} memilih minat: <b>${kategori.value}</b>`;

      const btn = document.createElement("button");
      btn.textContent = "Lanjut";
      btn.classList.add("btn-lanjut");

      btn.addEventListener("click", () => {
        Swal.fire({
          title: "Berhasil!",
          text: "Form berhasil dikirim",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "https://adyatma86.github.io/LK-06/";
          }
        });
      });

      newItem.appendChild(p);
      newItem.appendChild(btn);

      hasil.appendChild(newItem);
    }

    form.reset();
  }
});

// ==========================
// REAL-TIME VALIDATION
// ==========================
const namaInput = document.getElementById("nama");
const errorNama = document.getElementById("errorNama");

namaInput.addEventListener("input", () => {
  if (namaInput.value.length < 3) {
    namaInput.style.border = "2px solid red";
    errorNama.textContent = "Nama harus minimal 3 karakter!";
  } else {
    namaInput.style.border = "2px solid green";
    errorNama.textContent = "";
  }
});

const selected = document.querySelector(".dropdown-selected");
const list = document.querySelector(".dropdown-list");
const input = document.getElementById("kategori");

selected.addEventListener("click", () => {
  list.style.display = list.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".dropdown-list div").forEach((item) => {
  item.addEventListener("click", () => {
    selected.textContent = item.textContent;
    input.value = item.dataset.value;
    list.style.display = "none";
  });
});

// Klik luar untuk nutup
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    list.style.display = "none";
  }
});
