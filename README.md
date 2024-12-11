# Project Name
Program Backend API for Mobile Development.

## Description
This program uses the Express.js JavaScript framework which will display all data on the homepage, displaying detailed data on herbal plants. In addition, on the Backend or Admin side, you can post and delete data using Postman. Then, in this program there is also a search feature to search for herbal plants in the application. Applications are deployed using Google Cloud Run through Google Cloud Build and Google Container Registry. Then, Google Cloud Run will access Google Cloud SQL and Google Cloud Storage to retrieve image data and herbal application datasets.

## Key Features
- Home features
- Search features
  
## Installation
Steps to install and run this project on local.
1. Clone this repository:
   ```bash
   git clone https://github.com/HerbaMate-Bangkit-Capstone/HerbaMate--Model---CC.git

2. Extract and go to the project folder:
   ```bash
   cd HerbaMate--Mobile---CC

3. Install dependencies with npm:
   ```bash
   npm install body-parser cors express express-validator mysql2

4. Install nodemon to start the application with automatic refresh:
   - Install nodemon globally:
     ```bash
     npm install -g nodemon

   - Install the nodel locally in the project:
     ```bash
     npm install --save-dev nodemon

5. Create a new database and table in mysql:
   - Create database:
     ```bash
     CREATE DATABASE db_herbamate;
     
   - Create table:
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

6. Configure the database in the **database.js** file:
   ```bash
   const db = mysql.createConnection({
        host: 'nama_host_Anda',
        user: 'nama_user_Anda',
        password: 'password_connection_Anda',
        database: 'nama_database'
    });

7. Run the program:
   - Run the project with nodes:
     ```bash
     npm run start

   - Run the project with nodemon:
     ```bash
     npm run start:dev

8. Testing on Postman:
   - Home
     - GET all data herbs:
       - Endpoint:
         ```bash
         http://localhost:3000/herb

       - Method:
         ```bash
         GET
         
       - Response body:
         ```bash
         {
            "code": 200,
            "message": "Success Get All Data Herbal",
            "data": [
                {
                  "id": 1,
                  "name": "Adas",
                  "latin_name": "(Foeniculum vulgare)",
                  "image_link": "image_link_herbals",
                  "description": "tanaman rempah yang memiliki aroma khas dan sering digunakan sebagai bumbu dapur maupun obat tradisional. Tanaman ini memiliki daun halus berbentuk panjang dengan biji kecil yang mengandung minyak atsiri. Biasanya tumbuh di daerah beriklim hangat dengan tanah yang subur. Selain digunakan dalam masakan, tanaman ini dipercaya memiliki efek menenangkan. Khasiat utamanya meliputi meredakan perut kembung, memperlancar pencernaan, dan mengatasi gangguan pernapasan ringan."
                },
                {
                  "id": 2,
                  "name": "Akar manis",
                  "latin_name": "(Glycyrrhiza glabra)",
                  "image_link": "image_link_herbals",
                  "description": "tanaman perdu yang sering tumbuh di daerah tropis, dikenal dengan rasa manis yang berasal dari akarnya. Tanaman ini memiliki batang bercabang, daun majemuk, dan bunga kecil yang berwarna biru hingga ungu. Akar tanaman ini kaya akan senyawa glycyrrhizin yang memberikan rasa manis alami dan khasiat medis. Dalam pengobatan tradisional, sering digunakan untuk meredakan radang tenggorokan dan batuk. Tanaman ini juga diketahui memiliki sifat antiinflamasi dan meningkatkan kesehatan sistem imun."
                },
                dst.
            ]
        }

     - GET detail data herb by ID:
       - Endpoint:
         ```bash
         http://localhost:3000/herb/{Id}
         
       - Method:
         ```bash
         GET
         
       - Request:
         ```bash
         http://localhost:3000/herb/1
         
       - Response body:
         ```bash
         {
    "code": 200,
    "message": "Success Get Herb Details",
    "data": {
        "id": 1,
        "name": "Adas",
        "latin_name": "(Foeniculum vulgare)",
        "local_name": [
            "Hades (Sunda, Bali)",
            "Adas Londa",
            "Adas Landi (Jawa)",
            "Adhas (Madura)",
            "Wala Wunga (Sumba)",
            "Das Pedas (Aceh)",
            "Adeh, Manih (Minangkabau)"
        ],
        "image_link": "image_link_herbals",
        "description": "tanaman rempah yang memiliki aroma khas dan sering digunakan sebagai bumbu dapur maupun obat tradisional. Tanaman ini memiliki daun halus berbentuk panjang dengan biji kecil yang mengandung minyak atsiri. Biasanya tumbuh di daerah beriklim hangat dengan tanah yang subur. Selain digunakan dalam masakan, tanaman ini dipercaya memiliki efek menenangkan. Khasiat utamanya meliputi meredakan perut kembung, memperlancar pencernaan, dan mengatasi gangguan pernapasan ringan.",
        "disease": [
            "Batuk",
            "Sesak nafas",
            "Sariawan",
            "Haid tidak teratur",
            "Perut kembung",
            "Mual",
            "ASI sedikit",
            "Diare",
            "Susah tidur"
        ],
        "composition": "Minyak atsiri (anethole, fenchone, estragole), flavonoid, vitamin C, kalsium, magnesium, serat."
    }
}

     - POST data herb:
       - Endpoint:
         ```bash
         http://localhost:3000/herb/store
         
       - Method:
         ```bash
         POST
         
       - Request body:
         ```bash
         {
    "name": "Rambutan",
    "latin_name": "(Nephelium lappaceum)",
    "local_name": 
        ["Corogol (Jawa)", "Sagalong (Kalimantan)", "Lahi (Nusa Tenggara)"],
    "image_link": "image_link_herbals",
    "description": "tanaman buah tropis dengan kulit berbulu yang sering dikonsumsi. Buahnya kaya akan vitamin C dan senyawa bioaktif dengan sifat antioksidan. Khasiatnya meliputi membantu meningkatkan daya tahan tubuh, melindungi kesehatan kulit, dan memperbaiki fungsi pencernaan. Selain itu, tanaman ini juga dipercaya mampu menurunkan kadar kolesterol.",
    "disease": ["Sakit tenggorokan", "Gangguan pencernaan", "Kulit gatal", "Kelelahan", "Batuk"],
    "composition": "Vitamin C, flavonoid, saponin"
}

       - Response body:
         ```bash
         {
    "code": 201,
    "message": "Data added successfully",
    "data": {
        "id": 203,
        "name": "Rambutan",
        "latin_name": "(Nephelium lappaceum)",
        "local_name": [
            "Corogol (Jawa)",
            "Sagalong (Kalimantan)",
            "Lahi (Nusa Tenggara)"
        ],
        "image_link": "image_link_herbals",
        "description": "tanaman buah tropis dengan kulit berbulu yang sering dikonsumsi. Buahnya kaya akan vitamin C dan senyawa bioaktif dengan sifat antioksidan. Khasiatnya meliputi membantu meningkatkan daya tahan tubuh, melindungi kesehatan kulit, dan memperbaiki fungsi pencernaan. Selain itu, tanaman ini juga dipercaya mampu menurunkan kadar kolesterol.",
        "disease": [
            "Sakit tenggorokan",
            "Gangguan pencernaan",
            "Kulit gatal",
            "Kelelahan",
            "Batuk"
        ],
        "composition": "Vitamin C, flavonoid, saponin"
    }
}

     - DELETE data herb by ID:
       - Endpoint:
         ```bash
         http://localhost:3000/herb/delete/{Id}
         
       - Method:
         ```bash
         DELETE
         
       - Request:
         ```bash
         http://localhost:3000/herb/delete/203
         
       - Response body:
         ```bash
         {
    "code": 200,
    "message": "Delete Data Successfully"
}

   - Search
     - Endpoint:
       ```bash
       http://localhost:3000/herbs/search?q=nama_tanaman
       
     - Method:
       ```bash
       GET
       
     - Request:
       ```bash
       http://localhost:3000/herbs/search?q=temu
       
     - Response body:
       ```bash
       {
    "code": 200,
    "message": "Herbs found successfully",
    "data": [
        {
            "id": 187,
            "name": "Temu Hitam",
            "latin_name": "(Curcuma aeruginosa)",
            "image_link": "https://storage.googleapis.com/c242-ps076-herbamate-bucket/img-homapage/Temu%20hitam.jpg",
            "description": "tanaman herbal dengan rimpang gelap yang sering digunakan untuk kesehatan. Rimpangnya mengandung senyawa bioaktif dengan sifat antiinflamasi dan antikanker. Khasiatnya meliputi membantu meningkatkan fungsi hati, melindungi tubuh dari radikal bebas, dan memperbaiki kesehatan pencernaan. Selain itu, tanaman ini juga dipercaya mampu meningkatkan daya tahan tubuh."
        },
        {
            "id": 188,
            "name": "Temu Kunci",
            "latin_name": "(Boesenbergia pandurata)",
            "image_link": "https://storage.googleapis.com/c242-ps076-herbamate-bucket/img-homapage/Temu%20kunci.jpg",
            "description": "tanaman herbal dengan rimpang kecil yang sering digunakan dalam pengobatan tradisional. Rimpangnya mengandung senyawa bioaktif dengan sifat antioksidan dan memperbaiki metabolisme. Khasiatnya meliputi membantu meningkatkan nafsu makan, menjaga kesehatan pencernaan, dan memperbaiki fungsi hati. Selain itu, tanaman ini juga dipercaya mampu meningkatkan daya tahan tubuh."
        },
        {
            "id": 189,
            "name": "Temu Putih",
            "latin_name": "(Curcuma zedoaria)",
            "image_link": "https://storage.googleapis.com/c242-ps076-herbamate-bucket/img-homapage/Temu%20putih.jpg",
            "description": "tanaman herbal dengan rimpang putih yang sering digunakan untuk kesehatan. Rimpangnya mengandung senyawa bioaktif dengan sifat antikanker dan antiinflamasi. Khasiatnya meliputi membantu meningkatkan fungsi hati, melawan sel kanker, dan memperbaiki kesehatan pencernaan. Selain itu, tanaman ini juga dipercaya mampu memperbaiki metabolisme tubuh."
        },
        {
            "id": 190,
            "name": "Temu Putri",
            "latin_name": "(Curcuma petiolata)",
            "image_link": "https://storage.googleapis.com/c242-ps076-herbamate-bucket/img-homapage/Temu%20putri.jpg",
            "description": "tanaman herbal yang memiliki rimpang khas dengan aroma harum dan digunakan secara tradisional dalam pengobatan herbal. Rimpangnya mengandung senyawa aktif seperti kurkumin, minyak atsiri, dan antioksidan. Khasiatnya meliputi membantu mengatasi gangguan pencernaan, meredakan peradangan, dan meningkatkan daya tahan tubuh. Selain untuk kesehatan, tanaman ini juga memiliki nilai estetika sebagai tanaman hias karena bentuk daunnya yang menarik."
        },
        {
            "id": 192,
            "name": "Temulawak",
            "latin_name": "(Curcuma xanthorrhiza)",
            "image_link": "https://storage.googleapis.com/c242-ps076-herbamate-bucket/img-homapage/Temulawak.jpg",
            "description": "tanaman herbal dengan rimpang berwarna kuning yang sering digunakan dalam pengobatan tradisional. Rimpangnya mengandung senyawa bioaktif dengan sifat antiradang dan memperbaiki metabolisme. Khasiatnya meliputi membantu meningkatkan fungsi hati, melancarkan pencernaan, dan memperbaiki kesehatan tubuh secara keseluruhan. Selain itu, tanaman ini juga dipercaya mampu meningkatkan imunitas."
        }
    ]
}



