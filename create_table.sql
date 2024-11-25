CREATE TABLE herbals (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    latin_name VARCHAR(50) NOT NULL,
    local_name VARCHAR(100) NOT NULL,
    image_link VARCHAR(255),
    description TEXT,
    disease VARCHAR(255),
    composition TEXT
);

/* OUTPUT
{
    "code" : 200,
    "message" : "Success get detail herbs",
    "data" : {
        "name" : "Bawang Merah",
        "latin_name" : "(Allium Cepa)",
        "local_name" : [
            "Bawang abang mirah (Aceh)",
            "Pia (Batak)",
            "Bawang abang (Palembang)",
            "Bawang sirah, barambang sirah, dasun merah (Minangkabau)"
        ],
        "description" : "Herba semusim, tidak berbatang. Daun tunggal memeluk umbi lapis. Umbi lapis menebal dan berdaging, warna merah keputihan. Perbungaan berbentuk bongkol, mahkota bunga berbentuk bulat telur. Buah batu bulat, berwarna hijau. Biji segi tiga warna hitam. Bagian yang digunakan umbinya.",
        "disease" : [
            "Batuk",
            "Haid tidak teratur",
            "Kencing manis"
        ],
        "composition" : "Minyak atsiri, sikloalin, metilaliin, dihidroaliin, flavonglikosida, kuersetin, saponin, peptida, fitchormon, vitamin dan zat pati."
    }
}
*/