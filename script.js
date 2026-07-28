const form = document.querySelector('#captionForm');
const namaProduk = document.querySelector('#namaProduk');
const keunggulan = document.querySelector('#keunggulan');
const platform = document.querySelector('#platform');
const errorNama = document.querySelector('#errorNama');
const errorKeunggulan = document.querySelector('#errorKeunggulan');
const statusText = document.querySelector('#status');
const captionOutput = document.querySelector('#captionOutput');
const loadExample = document.querySelector('#loadExample');

function resetError() {
  errorNama.textContent = '';
  errorKeunggulan.textContent = '';
}

function validateInput() {
  resetError();
  let valid = true;

  if (namaProduk.value.trim().length < 3) {
    errorNama.textContent = 'Nama produk minimal 3 karakter.';
    valid = false;
  }

  if (keunggulan.value.trim().length < 10) {
    errorKeunggulan.textContent = 'Keunggulan produk minimal 10 karakter.';
    valid = false;
  }

  return valid;
}

function createCaption(data) {
  return `Kenalkan ${data.namaProduk}! ${data.keunggulan}. Cocok untuk kamu yang ingin produk lokal berkualitas. Pesan sekarang melalui ${data.platform}. #UMKM #ProdukLokal`;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validateInput()) {
    statusText.textContent = 'Periksa kembali data produk.';
    captionOutput.hidden = true;
    return;
  }

  const data = {
    namaProduk: namaProduk.value.trim(),
    keunggulan: keunggulan.value.trim(),
    platform: platform.value
  };

  captionOutput.textContent = createCaption(data);
  captionOutput.hidden = false;
  statusText.textContent = 'Caption berhasil dibuat dengan JavaScript.';
});

loadExample.addEventListener('click', async function () {
  statusText.textContent = 'Mengambil contoh data produk...';

  try {
    const response = await fetch('data/contoh-produk.json');
    if (!response.ok) throw new Error('Data tidak dapat dibaca.');

    const contoh = await response.json();
    namaProduk.value = contoh.namaProduk;
    keunggulan.value = contoh.keunggulan;
    platform.value = contoh.platform;
    statusText.textContent = 'Contoh data berhasil dimuat. Klik Buat Caption.';
  } catch (error) {
    statusText.textContent = 'Gagal mengambil contoh data. Jalankan lewat Live Server.';
    console.error(error);
  }
});