const tf = require('@tensorflow/tfjs-node');
const connection = require('../config/database');
const loadModel = require('./loadModel');

let model;

// Muat model ML saat server dijalankan
(async () => {
    try {
        model = await loadModel();
        console.log("Model berhasil dimuat!");
    } catch (error) {
        console.error("Gagal memuat model:", error);
    }
})();

// Fungsi untuk mengonversi gejala ke format input model
function convertSymptomsToInput(system, symptoms) {
    const symptomMap = {
        "Sistem Internal": [
            "Perut kembung", "Mual", "Diare", "Gangguan pencernaan", "Sembelit", "Demam", "Tidak nafsu makan",
            "Nyeri haid", "Sakit perut", "Kolesterol", "Darah tinggi", "Dehidrasi", "Panas dalam", "Bau mulut",
            "Sakit gigi", "Gusi berdarah", "Kram perut"
        ],
        "Sistem Eksternal": [
            "Kulit gatal", "Kulit kusam", "Jerawat", "Kulit kering", "Kulit kasar", "Kulit berminyak",
            "Luka", "Luka bakar ringan", "Nyeri otot", "Nyeri sendi", "Iritasi kulit", "Pembengkakan", "Bau badan"
        ],
        "Sistem Saraf dan Pernapasan": [
            "Batuk", "Sakit tenggorokan", "Tenggorokan kering", "Tenggorokan gatal", "Pusing", "Sakit kepala",
            "Kelelahan", "Susah tidur", "Stres", "Sariawan", "Mimisan", "Mata lelah", "Lemas", "Pilek"
        ]
    };

    const allSymptoms = symptomMap[system];
    const inputVector = allSymptoms.map(symptom => (symptoms.includes(symptom) ? 1 : 0));
    return inputVector;
}

// Fungsi untuk mendapatkan rekomendasi herbal berdasarkan prediksi
async function getHerbalRecommendations(predictions) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT name FROM herbals", (err, results) => {
            if (err) return reject(err);

            // Peta tanaman herbal berdasarkan skor prediksi
            const herbs = results.map((row, index) => ({
                name: row.name,
                score: predictions[index] || 0
            }));

            // Urutkan berdasarkan skor tertinggi dan ambil 5 terbaik
            const topHerbs = herbs
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map(item => item.name);

            resolve(topHerbs);
        });
    });
}

// Fungsi utama untuk melakukan prediksi
async function predictHerbs(system, symptoms) {
    if (!model) throw new Error("Model belum dimuat!");

    const symptomInput = convertSymptomsToInput(system, symptoms);
    const tensorInput = tf.tensor([symptomInput]);

    const predictions = model.predict(tensorInput).dataSync();
    const recommendedHerbs = await getHerbalRecommendations(predictions);

    return recommendedHerbs;
}

module.exports = { predictHerbs };
