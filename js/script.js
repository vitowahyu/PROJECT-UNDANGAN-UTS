// Data Undangan
const tanggalakad = new Date(2026, 11, 12, 8, 0, 0);
const tanggalselesai = new Date(2026, 11, 12, 14, 0, 0);
const lokasikalender = "Beach Hawai pink";

const dataacara = [
    {
        judul: "Akad Nikah",
        hari: "Sabtu",
        tanggal: "12",
        bulan: "Desember 2026",
        jam: "08.00 WIB",
        tempat: "The Garden Venue Hawai Beach",
        alamat: "Jl.beach hawai pink, Denmark ",
        peta: "https://maps.google.com",
        foto: "asset/image/venue/venue 1.jpg"
    },
        {
        judul: "Resepsi",
        hari: "Sabtu",
        tanggal: "12",
        bulan: "Desember 2026",
        jam: "11.00 - 14.00 WIB",
        tempat: "The Beach Hawai hotel",
        alamat: "Jl. Melati No.5 , Beach Hawai hotel, Denmark",
        peta: "https://maps.google.com",
        foto: "asset/image/venue/venue 2.jpg"
    }
];

const datahadiah = [
    { bank: "BNI", nomor: "1234567890", nama: "Putri Aurora Bintang Maharini", wa: "6281234567890" },
    { bank: "MANDIRI", nomor: "9876543210123", nama: "Bhumi Dyaksa Putra Perkasa", wa: "6281234567890" }
];

// fungsi bantu
function acak(min, max) {
    return min + Math.random() * (max - min);
}
function pilihacak(daftar) {
    return daftar[Math.floor(Math.random() * daftar.length)];
}
function tampilkannotifikasi(pesan) {
    document.getElementById("pesantoast").textContent = pesan;
    const toastelement = document.getElementById("notifikasitoast");
    new bootstrap.Toast(toastelement).show();
}
function tampilkannotifikasi(pesan) {
    document.getElementById("pesantoast").textContent = pesan;
    const toastelement = document.getElementById("notifikasitoast");
    new bootstrap.Toast(toastelement).show();
}

// Nama Tamu 
const parameterurl = new URLSearchParams(window.location.search);
const namadariurl = parameterurl.get("to");

if (namadariurl) {
    document.getElementById("namatamu").textContent = namadariurl;
    document.getElementById("inputnama").value = namadariurl;
}

// Animasi Cover & Musik
const cover = document.getElementById("sampuldepan");
const btnbuka = document.getElementById("tombolbuka");
const bgmusic = document.getElementById("musiklatar");
const isihalamanutama = document.getElementById("isihalamanutama");
const navigasibawah = document.getElementById("navigasibawah");
let isplaying = false;

btnbuka.addEventListener("click", () => {
    btnbuka.disabled = true;

    cover.classList.add("opening");
        setTimeout(() => {
            cover.classList.add("entering");
            bgmusic.play();
            isplaying = true;
        setTimeout(() => {
            isihalamanutama.classList.add("in");
            }, 600);
            }, 1400);
        setTimeout(() => {
            cover.classList.add("gone");
            document.body.classList.remove("locked");
            navigasibawah.classList.add("show");
    }, 3200);
});

// Countdown Timer
const targetdate = tanggalakad.getTime();

function perbaruihitungan() {
    const now = new Date().getTime();
    const distance = targetdate - now;
    if (distance < 0) return;
    document.getElementById("tekshari").textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById("teksjam").textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById("teksmenit").textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById("teksdetik").textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
}
perbaruihitungan();
setInterval(perbaruihitungan, 1000);

// Tombol Simpan di Kalender
function formatkalender(tanggal) {
    return tanggal.toISOString().replace(/[-:]|\.\d{3}/g, "");
}
document.getElementById("tombolkalender").href =
    "https://www.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("The Wedding of Bhumi & Aurora") +
    "&dates=" + formatkalender(tanggalakad) + "/" + formatkalender(tanggalselesai) +
    "&location=" + encodeURIComponent(lokasikalender);

// Kartu Rangkaian Acara
const daftaracara = document.getElementById("daftaracara");
dataacara.forEach((acara) => {
    daftaracara.innerHTML += `
        <div class="col-md-6 col-lg-5">
            <div class="frame event h-100">
                <img src="${acara.foto}" alt="Lokasi ${acara.judul}" class="foto-acara" loading="lazy">
                <p class="eyebrow">${acara.judul}</p>
                <div class="d-flex justify-content-center align-items-baseline gap-2 my-2">
                    <span class="d">${acara.tanggal}</span>
                    <span class="m">${acara.hari}<br>${acara.bulan}</span>
                </div>
                <p class="mb-1"><b>${acara.jam}</b></p>
                <h3>${acara.tempat}</h3>
                <p class="text-muted-w small">${acara.alamat}</p>
                <a class="btn btn-wed-outline rounded-pill btn-sm px-3" href="${acara.peta}" target="_blank" rel="noopener">Google Maps</a>
            </div>
        </div>
    `;
});

// Kartu Hadiah 
const daftarhadiah = document.getElementById("daftarhadiah");
datahadiah.forEach((hadiah, urutan) => {
    daftarhadiah.innerHTML += `
        <div class="col-md-6 col-lg-5">
            <div class="frame h-100">
                <div class="bank">${hadiah.bank}</div>
                <div class="text-muted-w small">No. Rekening</div>
                <div class="acc-no" id="norekening${urutan}">${hadiah.nomor}</div>
                <div class="text-muted-w small mb-3">a.n. ${hadiah.nama}</div>
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <button type="button" class="btn btn-wed rounded-pill btn-sm px-3" onclick="copyrekening('norekening${urutan}', this)">Salin No</button>
                    <a class="btn btn-wed-outline rounded-pill btn-sm px-3" href="https://api.whatsapp.com/send?phone=${hadiah.wa}" target="_blank" rel="noopener">Konfirmasi WhatsApp</a>
                </div>
            </div>
        </div>
    `;
});

// Salin Nomor Rekening
function copyrekening(elementid, btnelement) {
    const texttocopy = document.getElementById(elementid).innerText;
    const tempinput = document.createElement("textarea");
    tempinput.value = texttocopy;
    document.body.appendChild(tempinput);
    tempinput.select();
    document.execCommand("copy");
    document.body.removeChild(tempinput);

    const originaltext = btnelement.innerHTML;
    btnelement.innerHTML = "✓ Tersalin!";
    btnelement.classList.add("tersalin");
    tampilkannotifikasi("Nomor rekening disalin");

    setTimeout(() => {
        btnelement.innerHTML = originaltext;
        btnelement.classList.remove("tersalin");
    }, 2000);
}

// Form RSVP
const formrsvp = document.getElementById("formulirrsvp");
const daftarucapan = document.getElementById("daftarucapan");

function tambahucapan(nama, status, jumlah, pesan, waktu) {
    const inisial = nama.substring(0, 2).toUpperCase();
    const carducapan = document.createElement("div");
    carducapan.classList.add("wish");

    carducapan.innerHTML = `
        <div class="d-flex gap-3">
            <div class="inisial-ucapan"></div>
            <div class="w-100">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <strong class="nama-ucapan d-block"></strong>
                        <small class="status-ucapan"></small>
                    </div>
                    <small class="waktu-ucapan"></small>
                </div>
                <p class="isi-ucapan mb-0 mt-2 fst-italic"></p>
            </div>
        </div>
    `;
    carducapan.querySelector(".inisial-ucapan").textContent = inisial;
    carducapan.querySelector(".nama-ucapan").textContent = nama;
    carducapan.querySelector(".status-ucapan").textContent = "✓ " + status + " (" + jumlah + " orang)";
    carducapan.querySelector(".waktu-ucapan").textContent = waktu;
    carducapan.querySelector(".isi-ucapan").textContent = "“" + pesan + "”";

    daftarucapan.prepend(carducapan);
}
tambahucapan("Keluarga Besar", "Hadir", "2", "Barakallahu lakuma wa baraka alaikuma. Semoga sakinah, mawaddah, warahmah.", "Beberapa hari lalu");

formrsvp.addEventListener("submit", (e) => { 
    e.preventDefault();
//ID INPUT
    const nama = document.getElementById("inputnama").value;
    const status = document.getElementById("inputkehadiran").value;
    const jumlah = document.getElementById("inputjumlahtamu").value;
    const pesan = document.getElementById("inputpesan").value;
    if (!nama || !pesan) return;

    tambahucapan(nama, status, jumlah, pesan, "Baru saja");
    formrsvp.reset();
    tampilkannotifikasi("Ucapan berhasil dikirim!");
});

// ASSET KELOPAK JATUH
const wadahkelopak = document.getElementById("kelopakbunga");

for (let i = 0; i < 16; i++) {
    const kelopak = document.createElement("span");
    const ukuran = acak(18, 32);
    kelopak.classList.add("petal", "petal-" + (i % 3 + 1));
    kelopak.style.left = acak(0, 100) + "%";
    kelopak.style.width = ukuran + "px";
    kelopak.style.height = ukuran + "px";
    kelopak.style.animationDuration = acak(9, 18) + "s";
    kelopak.style.animationDelay = "-" + acak(0, 14) + "s";
    wadahkelopak.appendChild(kelopak);
}

// Aset Dekorasi 
const folderornamen = "asset/image/ornamen/";
const faktor = window.innerWidth < 600 ? 0.65 : 1;
const jumlahdekor = { awan: 4, bungabawah: 8, gantung: 4, bungabesar: 2, kupu: 1, kilau: 10 };
const gambarbungatepi = ["bunga-tepi.png", "bunga-tepi-2.png"];
const gambargantung = ["gantung-1.png", "gantung-2.png"];

function hitung(jumlah) {
    return Math.max(1, Math.round(jumlah * faktor));
}
function buatdekor(bagian, kelas, namafile, gaya) {
    const dekor = document.createElement("div");
    dekor.className = "dekor " + kelas;
    dekor.style.cssText = gaya;
    dekor.innerHTML = '<img src="' + folderornamen + namafile + '" alt="">';
    bagian.appendChild(dekor);
}

function pasangdekorasi(bagian) {
    const kelaslapis = ["awan-jauh", "awan-tengah", "awan-dekat"];
    const lebarlapis = [90, 140, 210];
    const durasilapis = [95, 70, 48];

    for (let i = 0; i < hitung(jumlahdekor.awan); i++) {
        const lapis = i % 3;
        const durasi = durasilapis[lapis] * acak(0.9, 1.1);
        buatdekor(bagian, "awan " + kelaslapis[lapis], "awan.png",
            "top:" + acak(2, 82) + "%; width:" + lebarlapis[lapis] * acak(0.85, 1.15) + "px; animation-duration:" + durasi + "s; animation-delay:-" + acak(0, durasi) + "s;");
    }
    const banyakbunga = hitung(jumlahdekor.bungabawah);

    for (let i = 0; i < banyakbunga; i++) {
        const belakang = i % 2;
        const lebar = belakang ? acak(34, 46) : acak(52, 72);
        buatdekor(bagian, belakang ? "bunga-bawah bunga-belakang" : "bunga-bawah", pilihacak(gambarbungatepi),
            "left:" + (i + acak(0.1, 0.9)) / banyakbunga * 100 + "%; width:" + lebar + "px; animation-duration:" + acak(3.5, 6.5) + "s; animation-delay:-" + acak(0, 6) + "s;");
    }
        for (let i = 0; i < hitung(jumlahdekor.gantung); i++) {
        const sisi = i % 2 ? "right" : "left";
        buatdekor(bagian, "gantung", pilihacak(gambargantung),
            sisi + ":" + acak(1, 12) + "%; width:" + acak(46, 70) + "px; animation-duration:" + acak(5, 8) + "s; animation-delay:-" + acak(0, 8) + "s;");
    }

        if (bagian.id === "halamanutama") {
        for (let i = 0; i < jumlahdekor.bungabesar; i++) {
            const lebar = acak(170, 260);
            const sisi = i % 2 ? "right" : "left";
            buatdekor(bagian, "bunga-besar", "bunga-mekar.png",
                sisi + ":" + (-lebar * 0.45) + "px; top:" + acak(10, 70) + "%; width:" + lebar + "px; animation-duration:" + acak(60, 110) + "s;");
        }
    }
    
    for (let i = 0; i < jumlahdekor.kupu; i++) {
        buatdekor(bagian, "kupu", "kupu-terbang.gif",
            "top:" + acak(10, 60) + "%; width:" + acak(30, 42) + "px; animation-duration:" + acak(20, 30) + "s; animation-delay:-" + acak(0, 25) + "s;");
    }

    for (let i = 0; i < hitung(jumlahdekor.kilau); i++) {
        const kilau = document.createElement("div");
        kilau.className = "dekor bintang-kilau";
        kilau.style.left = acak(2, 98) + "%";
        kilau.style.top = acak(2, 98) + "%";
        kilau.style.animationDuration = acak(2, 4.5) + "s";
        kilau.style.animationDelay = "-" + acak(0, 4) + "s";
        bagian.appendChild(kilau);
    }
}

document.querySelectorAll("section, footer").forEach((bagian) => {
    pasangdekorasi(bagian);
});

const elemenreveal = document.querySelectorAll(".reveal, .reveal-hero");

elemenreveal.forEach((wadah) => {
    const anak = wadah.querySelectorAll(".frame, .avatar-img, .kotak-foto, .tl, .count-box");
    anak.forEach((item, urutan) => {
        item.classList.add("pop");
        item.style.transitionDelay = (urutan * 110) + "ms";
    });
});

const garisprogres = document.getElementById("garisprogres");
const sections = document.querySelectorAll("section");
const navlinks = document.querySelectorAll(".nav-link");

function tampilkansaatscroll() {
    document.querySelectorAll(".reveal").forEach((elemen) => {
        const posisi = elemen.getBoundingClientRect().top;
        if (posisi < window.innerHeight - 60) {
            elemen.classList.add("in");
        }
    });
}

function perbaruiprogres() {
    const tinggi = document.documentElement.scrollHeight - window.innerHeight;
    const persen = tinggi > 0 ? (window.scrollY / tinggi) * 100 : 0;
    garisprogres.style.width = persen + "%";
}

function perbaruinavigasi() {
    let current = "";
    sections.forEach((section) => {
        const sectiontop = section.offsetTop;
        if (window.scrollY >= (sectiontop - 250)) {
            current = section.getAttribute("id");
        }
    });

    navlinks.forEach((link) => {
        link.classList.remove("aktif");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("aktif");
        }
    });
}
window.addEventListener("scroll", () => {     
    tampilkansaatscroll();
    perbaruiprogres();
    perbaruinavigasi();
});

tampilkansaatscroll();