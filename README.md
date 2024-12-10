# Project Name
Program Backend API untuk Mobile Development

## Description
Program ini menggunakan kerangka kerja atau framework JavaScript Express.js yang dimana akan menampilkan semua data pada beranda, menampilkan detail data pada tanaman herbal.
Selain itu, pada sisi Backend atau Admin bisa melakukan Post dan Delete data menggunakan Postman. Kemudian, pada program ini juga terdapat fitur search untuk mencari tanaman herbal
yang ada pada aplikasi. Aplikasi di deploy menggunakan Google Cloud Run melalui Google Cloud Build dan Google Container Registry. Lalu, dari Google Cloud Run akan mengakses Google Cloud SQL
dan Google Cloud Storage untuk mengambil data gambar dan dataset herbal aplikasi.

## Key Features
- Beranda
- Search
  
## Installation
Langkah-langkah untuk menginstal dan menjalankan proyek ini di lokal.
1. Clone repositori ini:
   ```bash
   git clone https://github.com/HerbaMate-Bangkit-Capstone/HerbaMate--Model---CC.git

2. Extract dan masuk ke folder project:
   ```bash
   cd HerbaMate--Mobile---CC

3. Install dependencies dengan npm:
   ```bash
   npm install body-parser cors express express-validator mysql2

4. Install nodemon untuk start aplikasi dengan refresh otomatis:
   - Install nodemon secara global:
     ```bash
     npm install -g nodemon

   - Install nodel secara lokal di project:
     ```bash
     npm install --save-dev nodemon

6. Create database dan tabel baru pada mysql:
   ```bash
   CREATE TABLE herbals (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    latin_name VARCHAR(100) NOT NULL,
    local_name VARCHAR(255) NOT NULL,
    image_link VARCHAR(255),
    description TEXT,
    disease VARCHAR(255),
    composition TEXT
    );

7. Lakukan konfigurasi database pada file database.js:
   ```bash
   const db = mysql.createConnection({
        host: 'nama_host_Anda',
        user: 'nama_user_Anda',
        password: 'password_connection_Anda',
        database: 'nama_database'
    });

8. Jalankan program:
   - Run project dengan node:
     ```bash
     npm run start

   - Run project dengan nodemon:
     ```bash
     npm run start:dev

10. Testing pada Postman:
    - GET all data herbs:
      ```bash
     http://localhost:3000/herb
    
    - GET detail data by id:
      ```bash
     http://localhost:3000/herb/{Id}
    
    - POST data herb:
      ```bash
     http://localhost:3000/herb/store
    
    - DELETE data herb by id:
      ```bash
     http://localhost:3000/herb/delete
    
    - GET data by keyword to search:
      ```bash
     http://localhost:3000/herbs/search?q=nama_tanaman

12. Contoh Request:
   ```bash
   {
    "name": "Rambutan",
    "latin_name": "(Nephelium lappaceum)",
    "local_name": 
        ["Corogol (Jawa)", "Sagalong (Kalimantan)", "Lahi (Nusa Tenggara)"],
    "image_link": "link_gambar_tanaman_herbal",
    "description": "tanaman buah tropis dengan kulit berbulu yang sering dikonsumsi. Buahnya kaya akan vitamin C dan senyawa bioaktif dengan sifat antioksidan. Khasiatnya meliputi membantu meningkatkan daya tahan tubuh, melindungi kesehatan kulit, dan memperbaiki fungsi pencernaan. Selain itu, tanaman ini juga dipercaya mampu menurunkan kadar kolesterol.",
    "disease": ["Sakit tenggorokan", "Gangguan pencernaan", "Kulit gatal", "Kelelahan", "Batuk"],
    "composition": "Vitamin C, flavonoid, saponin"
    }




