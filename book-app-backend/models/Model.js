const tf = require('@tensorflow/tfjs-node');
const books = require("../data/web_book_data.json");

async function loadModel() {
    model = await tf.loadLayersModel("file://D:/books-app/books-backend/myExpressApp/data/model_json/model.json", false);
}

const books_array = tf.range(0, books.length);
const books_length = books.length;

const getRecommendations = async (userId) => {
    let user = tf.fill([books_length], Number(userId));
    await loadModel();
    predictions_tensor = await model.predict([books_array, user]).reshape([7860]);
    predictions = predictions_tensor.arraySync();
    
    let recommendations = []
    for (let i = 0; i < 6; i++) {
        max = predictions_tensor.argMax().arraySync();
        recommendations.push(books[max]);
        predictions.splice(max, 1);  
        predictions_tensor = tf.tensor(predictions); 
    }
    
    return recommendations;
}

module.exports = {
    getRecommendations
};