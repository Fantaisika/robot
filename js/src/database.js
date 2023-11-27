import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoDbUrl = process.env.DB_CONN_STRING;
mongoose.connect(mongoDbUrl, {
    retryWrites: true,
    w: "majority",    
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
    dbName: process.env.MONGODB_DB_NAME,
    authSource : "admin",

}); 

// Obtenez l'objet de connexion par défaut
const thisDb = mongoose.connection;
thisDb.on('error', function (){
 console.log('Erreur lors de la connexion à la base de données MongoDB :')
});
thisDb.once('open', function () {
    console.log('Connexion réussie à la base de données MongoDB !');
    // Placez ici le code supplémentaire que vous souhaitez exécuter après la connexion
});// Exportez l'objet de connexion pour une utilisation dans d'autres parties de votre application si nécessaire
export default {thisDb};