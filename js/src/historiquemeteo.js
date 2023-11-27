import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import dbMongoose from "./database.js";

dotenv.config();

var thisDb = dbMongoose.thisDb;

//Schéma pour les données à stocker
const { Schema } = mongoose;
mongoose.Connection = thisDb;

/*-----------------------------historiquemeteo-----------------------------*/
const historiqueMeteoSchema = new Schema({
    city: String,
    weatherHistory: [
        {
            timestamp: Number,
            coord: {
                lon: Number,
                lat: Number,
            },
            weather: [
                {
                    id: Number,
                    main: String,
                    description: String,
                    icon: String,
                },
            ],
            base: String,
            main: {
                temp: Number,
                feels_like: Number,
                temp_min: Number,
                temp_max: Number,
                pressure: Number,
                humidity: Number,
            },
            visibility: Number,
            wind: {
                speed: Number,
                deg: Number,
            },
            clouds: {
                all: Number,
            },
            sys: Schema.Types.Mixed,
            timezone: Number,
            id: Number,
            name: String,
            cod: Number,
        },
    ],
});

const HISTORIQUEMETEO = mongoose.model('HISTORIQUEMETEO', historiqueMeteoSchema);

// Liste des départements en France
const departements = [
    'Ain', 'Aisne', 'Allier', 'Alpes-de-Haute-Provence', 'Hautes-Alpes', 'Alpes-Maritimes', 'Ardèche', 'Ardennes',
    'Ariège', 'Aube', 'Aude', 'Aveyron', 'Bouches-du-Rhône', 'Calvados', 'Cantal', 'Charente', 'Charente-Maritime',
    'Cher', 'Corrèze', 'Côte-d\'Or', 'Côtes-d\'Armor', 'Creuse', 'Dordogne', 'Doubs', 'Drôme', 'Eure', 'Eure-et-Loir',
    'Finistère', 'Gard', 'Haute-Garonne', 'Gers', 'Gironde', 'Hérault', 'Ille-et-Vilaine', 'Indre', 'Indre-et-Loire',
    'Isère', 'Jura', 'Landes', 'Loir-et-Cher', 'Loire', 'Haute-Loire', 'Loire-Atlantique', 'Loiret', 'Lot', 'Lot-et-Garonne',
    'Lozère', 'Maine-et-Loire', 'Manche', 'Marne', 'Haute-Marne', 'Mayenne', 'Meurthe-et-Moselle', 'Meuse', 'Morbihan',
    'Moselle', 'Nièvre', 'Nord', 'Oise', 'Orne', 'Pas-de-Calais', 'Puy-de-Dôme', 'Pyrénées-Atlantiques', 'Hautes-Pyrénées',
    'Pyrénées-Orientales', 'Bas-Rhin', 'Haut-Rhin', 'Rhône', 'Haute-Saône', 'Saône-et-Loire', 'Sarthe', 'Savoie', 'Haute-Savoie',
    'Paris', 'Seine-Maritime', 'Seine-et-Marne', 'Yvelines', 'Deux-Sèvres', 'Somme', 'Tarn', 'Tarn-et-Garonne', 'Var', 'Vaucluse',
    'Vendée', 'Vienne', 'Haute-Vienne', 'Vosges', 'Yonne', 'Territoire de Belfort', 'Essonne', 'Hauts-de-Seine', 'Seine-Saint-Denis',
    'Val-de-Marne', 'Val-d\'Oise', 'Guadeloupe', 'Martinique', 'Guyane', 'La Réunion', 'Mayotte', 'Saint-Pierre-et-Miquelon'
];

const citiesByDepartment = {
    'Ain': ['Bourg-en-Bresse', 'Oyonnax', 'Ambérieu-en-Bugey'],
    'Aisne': ['Laon', 'Saint-Quentin', 'Soissons'],
    'Allier': ['Moulins', 'Vichy', 'Montluçon'],
    'Alpes-de-Haute-Provence': ['Digne-les-Bains', 'Manosque', 'Sisteron'],
    'Hautes-Alpes': ['Gap', 'Briançon', 'Embrun'],
    'Alpes-Maritimes': ['Nice', 'Cannes', 'Antibes'],
    'Ardèche': ['Privas', 'Annonay', 'Tournon-sur-Rhône'],
    'Ardennes': ['Charleville-Mézières', 'Sedan', 'Rethel'],
    'Ariège': ['Foix', 'Pamiers', 'Saint-Girons'],
    'Aube': ['Troyes', 'Romilly-sur-Seine', 'La Chapelle-Saint-Luc'],
    'Aude': ['Carcassonne', 'Narbonne', 'Castelnaudary'],
    'Aveyron': ['Rodez', 'Millau', 'Villefranche-de-Rouergue'],
    'Bouches-du-Rhône': ['Marseille', 'Aix-en-Provence', 'Arles'],
    'Calvados': ['Caen', 'Hérouville-Saint-Clair', 'Lisieux'],
    'Cantal': ['Aurillac', 'Saint-Flour', 'Mauriac'],
    'Charente': ['Angoulême', 'Cognac', 'Soyaux'],
    'Charente-Maritime': ['La Rochelle', 'Saintes', 'Rochefort'],
    'Cher': ['Bourges', 'Vierzon', 'Saint-Amand-Montrond'],
    'Corrèze': ['Tulle', 'Brive-la-Gaillarde', 'Ussel'],
    'Côte-d\'Or': ['Dijon', 'Beaune', 'Chenôve'],
    'Côtes-d\'Armor': ['Saint-Brieuc', 'Dinan', 'Lannion'],
    'Creuse': ['Guéret', 'La Souterraine', 'Aubusson'],
    'Dordogne': ['Périgueux', 'Bergerac', 'Sarlat-la-Canéda'],
    'Doubs': ['Besançon', 'Montbéliard', 'Pontarlier'],
    'Drôme': ['Valence', 'Montélimar', 'Romans-sur-Isère'],
    'Eure': ['Évreux', 'Vernon', 'Louvier'],
    'Eure-et-Loir': ['Chartres', 'Dreux', 'Châteaudun'],
    'Finistère': ['Quimper', 'Brest', 'Concarneau'],
    'Gard': ['Nîmes', 'Alès', 'Bagnols-sur-Cèze'],
    'Haute-Garonne': ['Toulouse', 'Colomiers', 'Tournefeuille'],
    'Gers': ['Auch', 'Condom', 'Mirande'],
    'Gironde': ['Bordeaux', 'Merignac', 'Pessac'],
    'Hérault': ['Montpellier', 'Béziers', 'Sète'],
    'Ille-et-Vilaine': ['Rennes', 'Saint-Malo', 'Fougères'],
    'Indre': ['Châteauroux', 'Issoudun', 'Déols'],
    'Indre-et-Loire': ['Tours', 'Joué-lès-Tours', 'Saint-Cyr-sur-Loire'],
    'Isère': ['Grenoble', 'Saint-Martin-d\'Hères', 'Échirolles'],
    'Jura': ['Lons-le-Saunier', 'Dole', 'Champagnole'],
    'Landes': ['Mont-de-Marsan', 'Dax', 'Biscarrosse'],
    'Loir-et-Cher': ['Blois', 'Vendôme', 'Romorantin-Lanthenay'],
    'Loire': ['Saint-Étienne', 'Roanne', 'Saint-Chamond'],
    'Haute-Loire': ['Le Puy-en-Velay', 'Monistrol-sur-Loire', 'Yssingeaux'],
    'Loire-Atlantique': ['Nantes', 'Saint-Nazaire', 'Saint-Herblain'],
    'Loiret': ['Orléans', 'Fleury-les-Aubrais', 'Saint-Jean-de-Braye'],
    'Lot': ['Cahors', 'Figeac', 'Gourdon'],
    'Lot-et-Garonne': ['Agen', 'Villeneuve-sur-Lot', 'Marmande'],
    'Lozère': ['Mende', 'Marvejols', 'Saint-Chély-d\'Apcher'],
    'Maine-et-Loire': ['Angers', 'Cholet', 'Saumur'],
    'Manche': ['Cherbourg-en-Cotentin', 'Saint-Lô', 'Granville'],
    'Marne': ['Reims', 'Châlons-en-Champagne', 'Épernay'],
    'Haute-Marne': ['Chaumont', 'Langres', 'Saint-Dizier'],
    'Mayenne': ['Laval', 'Mayenne', 'Château-Gontier'],
    'Meurthe-et-Moselle': ['Nancy', 'Vandœuvre-lès-Nancy', 'Lunéville'],
    'Meuse': ['Bar-le-Duc', 'Commercy', 'Verdun'],
    'Morbihan': ['Vannes', 'Lorient', 'Ploemeur'],
    'Moselle': ['Metz', 'Thionville', 'Montigny-lès-Metz'],
    'Nièvre': ['Nevers', 'Cosne-Cours-sur-Loire', 'Varennes-Vauzelles'],
    'Nord': ['Lille', 'Roubaix', 'Tourcoing'],
    'Oise': ['Beauvais', 'Compiègne', 'Creil'],
    'Orne': ['Alençon', 'Flers', ],
    'Pas-de-Calais': ['Calais', 'Boulogne-sur-Mer', 'Arras'],
    'Puy-de-Dôme': ['Clermont-Ferrand', 'Cournon-d\'Auvergne', 'Riom'],
    'Pyrénées-Atlantiques': ['Pau', 'Bayonne', 'Anglet'],
    'Hautes-Pyrénées': ['Tarbes', 'Lourdes', 'Bagnères-de-Bigorre'],
    'Pyrénées-Orientales': ['Perpignan', 'Canet-en-Roussillon', 'Saint-Estève'],
    'Bas-Rhin': ['Strasbourg', 'Haguenau', 'Illkirch-Graffenstaden'],
    'Haut-Rhin': ['Mulhouse', 'Colmar', 'Saint-Louis'],
    'Rhône': ['Lyon', 'Villeurbanne', 'Vénissieux'],
    'Saône-et-Loire': ['Chalon-sur-Saône', 'Mâcon', 'Le Creusot'],
    'Sarthe': ['Le Mans', 'La Flèche', 'Sablé-sur-Sarthe'],
    'Savoie': ['Chambéry', 'Aix-les-Bains', 'Albertville'],
    'Haute-Savoie': ['Annecy', 'Annemasse', 'Thonon-les-Bains'],
    'Paris': ['Paris'],
    'Seine-Maritime': ['Rouen', 'Le Havre', 'Dieppe'],
    'Seine-et-Marne': ['Meaux', 'Melun', 'Chelles'],
    'Yvelines': ['Versailles', 'Sartrouville', 'Mantes-la-Jolie'],
    'Deux-Sèvres': ['Niort', 'Bressuire', 'Parthenay'],
    'Somme': ['Amiens', 'Abbeville', 'Albert'],
    'Tarn': ['Albi', 'Castres', 'Gaillac'],
    'Tarn-et-Garonne': ['Montauban', 'Castelsarrasin', 'Moissac'],
    'Var': ['Toulon', 'La Seyne-sur-Mer', 'Hyères'],
    'Vaucluse': ['Avignon', 'Orange', 'Carpentras'],
    'Vendée': ['La Roche-sur-Yon', 'Les Sables-d\'Olonne', 'Challans'],
    'Vienne': ['Poitiers', 'Châtellerault', 'Buxerolles'],
    'Haute-Vienne': ['Limoges', 'Saint-Junien', 'Panazol'],
    'Vosges': ['Épinal', 'Saint-Dié-des-Vosges', 'Gérardmer'],
    'Yonne': ['Auxerre', 'Sens', 'Joigny'],
    'Territoire de Belfort': ['Belfort'],
    'Essonne': ['Évry', 'Corbeil-Essonnes', 'Massy'],
    'Hauts-de-Seine': ['Nanterre', 'Boulogne-Billancourt', 'Colombes'],
    'Seine-Saint-Denis':['Saint-Denis', 'Montreuil', 'Aulnay-sous-Bois'],
    'Val-de-Marne': ['Créteil', 'Vitry-sur-Seine', 'Champigny-sur-Marne'],
    'Val-d\'Oise': ['Cergy', 'Pontoise', 'Argenteuil'],
    'Guadeloupe': ['Pointe-à-Pitre', 'Basse-Terre', 'Les Abymes'],
    'Martinique': ['Fort-de-France', 'Le Lamentin', 'Schoelcher'],
    'Guyane': ['Cayenne', 'Matoury', 'Saint-Laurent-du-Maroni'],
    'La Réunion': ['Saint-Denis', 'Saint-Paul', 'Saint-Pierre'],
    'Mayotte': ['Mamoudzou', 'Dzaoudzi', 'Koungou'],
};

// Fonction pour récupérer et enregistrer les données météorologiques pour une liste de villes
async function fetchAndSaveWeatherHistoriqueMeteo(cities) {
    for (const city of cities) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&APPID=${apikey}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            if (data.cod === 200) {
                // Recherchez le document existant dans la base de données
                const existingData = await HISTORIQUEMETEO.findOne({ name: city });

                if (existingData) {
                    // Ajoutez les nouvelles données à l'historique
                    existingData.weatherHistory.push({
                        timestamp: Date.now(),
                        coord: data.coord,
                        weather: data.weather,
                        base: data.base,
                        main: data.main,
                        visibility: data.visibility,
                        wind: data.wind,
                        clouds: data.clouds,
                        sys: data.sys,
                        timezone: data.timezone,
                        id: data.id,
                        name: data.name,
                        cod: data.cod,
                    });

                    await existingData.save();
                    console.log(`Historique météo pour ${city} mises à jour avec succès :`, data);
                } else {
                    // Créez un nouveau document avec les données météorologiques
                    let newHistoriqueMeteoData = new HISTORIQUEMETEO ({
                        city: city,
                        weatherHistory: [{
                            timestamp: Date.now(),
                            coord: data.coord,
                            weather: data.weather,
                            base: data.base,
                            main: data.main,
                            visibility: data.visibility,
                            wind: data.wind,
                            clouds: data.clouds,
                            sys: data.sys,
                            timezone: data.timezone,
                            id: data.id,
                            cod: data.cod,
                        }],
                    });

                    await newHistoriqueMeteoData.save();
                    console.log(`Historique météo pour ${city} enregistrées avec succès :`, data);
                }
            } else {
                console.error(`Erreur lors de la requête à l'API pour ${city} :`, data.message);
            }
        } catch (error) {
            console.error(`Erreur lors de la requête à l'API pour ${city} :`, error);
        }
    }
}
