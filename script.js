const form = document.querySelector('#captionForm');
const namaProduk = document.querySelector('#namaProduk');
const keunggulan = document.querySelector('#keunggulan');
const platform = document.querySelector('#platform');
const errorNama = document.querySelector('#errorNama');
const errorKeunggulan = document.querySelector('#errorKeunggulan');
const statusText = document.querySelector('#status');
const captionOutput = document.querySelector('#captionOutput');
const loadExample = document.querySelector('#loadExample');
const productList = document.querySelector('#productList');

const API_URL = 'https://dummyjson.com/products';

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
  return `Kenalkan ${data.namaProduk}! ${data.keunggulan}. Cocok untuk kamu yang ingin produk berkualitas. Pesan sekarang melalui ${data.platform}. #UMKM #ProdukPilihan`;
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

// Mengambil 1 sampel produk acak dari API untuk diisikan ke form
loadExample.addEventListener('click', async function () {
  statusText.textContent = 'Mengambil contoh data produk dari API...';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Data tidak dapat dibaca dari API.');

    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.products.length);
    const contoh = data.products[randomIndex];

    namaProduk.value = contoh.title;
    keunggulan.value = contoh.description;
    statusText.textContent = 'Contoh data berhasil dimuat dari API. Klik Buat Caption.';
  } catch (error) {
    statusText.textContent = 'Gagal mengambil contoh data dari API.';
    console.error('Error:', error);
  }
});

// Mengambil seluruh daftar produk dari API dan menampilkannya di halaman web
async function fetchProducts() {
  if (!productList) return;

  productList.innerHTML = '<p class="muted">Memuat data produk dari API...</p>';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Gagal mengambil data dari server API.');

    const data = await response.json();
    renderProducts(data.products.slice(0, 6)); // Menampilkan 6 produk pertama
  } catch (error) {
    productList.innerHTML = `<p class="error">Gagal memuat produk dari API. (${error.message})</p>`;
    console.error('Error fetching products:', error);
  }
}

function renderProducts(products) {
  productList.innerHTML = '';

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'item-card';

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <button type="button" class="use-product-btn">Pilih Produk Ini</button>
    `;

    // Event listener untuk memasukkan data dari katalog langsung ke dalam Form Input
    card.querySelector('.use-product-btn').addEventListener('click', () => {
      namaProduk.value = product.title;
      keunggulan.value = product.description;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      statusText.textContent = `Produk "${product.title}" dipilih! Klik tombol Buat Caption.`;
    });

    productList.appendChild(card);
  });
}

// Menjalankan fetch data API saat halaman selesai di-load
document.addEventListener('DOMContentLoaded', fetchProducts);