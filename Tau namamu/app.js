// Menampilkan daftar dari API Atlas Academy

fetch('https://api.atlasacademy.io/')
  .then((response) => response.json())
  .then((data) => console.log(data));