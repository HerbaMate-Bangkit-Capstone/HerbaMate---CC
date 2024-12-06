const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    try {
        console.log("Memulai proses pemuatan model...");
        const model = await tf.loadGraphModel('https://storage.googleapis.com/c242-ps076-herbamate-bucket/model-in-herbamate/model.json');
        console.log("Model berhasil dimuat.");
        return model;
    } catch (error) {
        console.error("Gagal memuat model:", error);
        throw error;
    }
}

module.exports = loadModel;
