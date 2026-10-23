const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const projects = {
  barangku: {
    eyebrow: 'PROJECT / 001 · UI/UX DESIGN',
    title: 'BarangKu — Aplikasi Inventaris',
    description: 'Konsep aplikasi stok gudang yang berfokus pada kemudahan melihat, mencari, dan mengelola barang. Detail berikut merupakan ringkasan konsep proyek dan bisa disesuaikan dengan hasil yang benar-benar sudah dibuat.',
    learn: ['Menyusun alur halaman dan navigasi aplikasi.', 'Merancang tampilan yang konsisten untuk kebutuhan gudang.', 'Mengembangkan konsep fitur seperti login, stok, riwayat, dan profil.']
  },
  dijkstra: {
    eyebrow: 'PROJECT / 002 · ALGORITHM',
    title: 'Optimasi Rute Pengiriman',
    description: 'Proyek pembelajaran algoritma Dijkstra pada graf jalan. Bobot dapat mewakili jarak, waktu tempuh, atau konsumsi bahan bakar, lalu algoritma digunakan untuk mencari jalur dengan total bobot paling kecil.',
    learn: ['Memodelkan titik lokasi sebagai simpul dan jalan sebagai sisi graf.', 'Membandingkan rute berdasarkan bobot yang dipilih.', 'Mengolah data tabel dan menampilkan jalur hasil perhitungan.']
  },
  portfolio: {
    eyebrow: 'PROJECT / 003 · WEB DEVELOPMENT',
    title: 'Website CV & Portofolio',
    description: 'Website satu halaman yang menyajikan profil, latar belakang, perjalanan belajar, keterampilan, dan karya. Dibangun menggunakan HTML, CSS, dan JavaScript tanpa framework.',
    learn: ['Menyusun struktur konten dengan HTML semantik.', 'Membuat layout responsif dengan CSS.', 'Menambahkan menu mobile, animasi saat scroll, dan dialog detail proyek dengan JavaScript.']
  }
};

const dialog = document.getElementById('projectDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogDescription = document.getElementById('dialogDescription');
const dialogEyebrow = document.getElementById('dialogEyebrow');
const dialogLearn = document.getElementById('dialogLearn');

document.querySelectorAll('.project-detail').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    dialogEyebrow.textContent = project.eyebrow;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogLearn.replaceChildren(...project.learn.map(item => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    }));
    dialog.showModal();
  });
});

document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
document.getElementById('dialogOk').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

const toast = document.getElementById('toast');
let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.getElementById('copyEmail').addEventListener('click', async () => {
  const emailLink = document.getElementById('emailLink');
  const email = emailLink.getAttribute('href').replace('mailto:', '');
  if (!email || email === 'emailkamu@example.com') {
    showToast('Ganti email contoh di index.html terlebih dahulu.');
    return;
  }
  try {
    await navigator.clipboard.writeText(email);
    showToast('Email berhasil disalin.');
  } catch {
    showToast('Email kamu: ' + email);
  }
});
