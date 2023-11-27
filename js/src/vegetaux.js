import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import dbMongoose from "./database.js";

dotenv.config();

var thisDb = dbMongoose.thisDb;

//Schéma pour les données à stocker
const { Schema } = mongoose;
mongoose.Connection = thisDb;

/*-----------------------------liste_de_vegetaux_par_departement-----------------------------*/
const vegetauxSchema = new Schema({
    nom: String,            
    dates: {
        plantation: Date, 
        recolte: Date,    
    },
    besoinsEauParSemaine:String ,    
    typeEngrais: String,
}); 

const vegetauxParDepartementSchema = new Schema({
    departement: String, // Nom du département
    ville: String,       // Nom de la ville associée au département
    vegetaux: [vegetauxSchema], // Liste des légumes pour le département
});

// Modèle MongoDB basé sur le schéma pour la liste de légumes par département
const VegetauxParDepartement = mongoose.model('VegetauxParDepartement', vegetauxParDepartementSchema);

// Liste de légumes avec leurs caractéristiques
const vegetauxParDepartement = [
    
        {
            departement: 'Ain',
            ville: 'Bourg-en-Bresse',
            legumes: [
                {
                    nom: 'Carotte',
                    dates: {
                        plantation: new Date('2023-01-01'),
                        recolte: new Date('2023-03-01'),
                    },
                    besoinsEauParSemaine: '3 Litres',
                    typeEngrais: 'Engrais A',
                },
                {
                    nom: 'Laitue',
                    dates: {
                        plantation: new Date('2023-02-01'),
                        recolte: new Date('2023-04-01'),
                    },
                    besoinsEauParSemaine: '2 Litres',
                    typeEngrais: 'Engrais B',
                },
                {
                    nom: 'Radis',
                    dates: {
                        plantation: new Date('2023-03-01'),
                        recolte: new Date('2023-05-01'),
                    },
                    besoinsEauParSemaine: '1.5 Litres',
                    typeEngrais: 'Engrais C',
                },
                {
                    nom: 'Tomate',
                    dates: {
                        plantation: new Date('2023-04-01'),
                        recolte: new Date('2023-06-01'),
                    },
                    besoinsEauParSemaine: '4 Litres',
                    typeEngrais: 'Engrais D',
                },
                {
                    nom: 'Courgette',
                    dates: {
                        plantation: new Date('2023-05-01'),
                        recolte: new Date('2023-07-01'),
                    },
                    besoinsEauParSemaine: '3.5 Litres',
                    typeEngrais: 'Engrais E',
                },
            ],
        },
        {
            departement: 'Aisne',
            ville: 'Laon',
            vegetaux: [
                {
                    nom: 'Pomme de terre',
                    dates: {
                        plantation: new Date('2023-01-15'),
                        recolte: new Date('2023-04-01'),
                    },
                    besoinsEauParSemaine: '4 Litres',
                    typeEngrais: 'Engrais F',
                },
                {
                    nom: 'Épinard',
                    dates: {
                        plantation: new Date('2023-02-01'),
                        recolte: new Date('2023-04-15'),
                    },
                    besoinsEauParSemaine: '2.5 Litres',
                    typeEngrais: 'Engrais G',
                },
                {
                    nom: 'Haricot vert',
                    dates: {
                        plantation: new Date('2023-03-01'),
                        recolte: new Date('2023-06-01'),
                    },
                    besoinsEauParSemaine: '3 Litres',
                    typeEngrais: 'Engrais H',
                },
                {
                    nom: 'Chou-fleur',
                    dates: {
                        plantation: new Date('2023-04-01'),
                        recolte: new Date('2023-07-01'),
                    },
                    besoinsEauParSemaine: '3.5 Litres',
                    typeEngrais: 'Engrais I',
                },
                {
                    nom: 'Fraise',
                    dates: {
                        plantation: new Date('2023-05-01'),
                        recolte: new Date('2023-06-15'),
                    },
                    besoinsEauParSemaine: '2 Litres',
                    typeEngrais: 'Engrais J',
                },
            ],
        },
        {
            departement: 'Allier',
            ville: 'Moulins',
            vegetaux: [
                {
                    nom: 'Aubergine',
                    dates: {
                        plantation: new Date('2023-02-01'),
                        recolte: new Date('2023-05-01'),
                    },
                    besoinsEauParSemaine: '4 Litres',
                    typeEngrais: 'Engrais K',
                },
                {
                    nom: 'Poivron',
                    dates: {
                        plantation: new Date('2023-03-01'),
                        recolte: new Date('2023-06-01'),
                    },
                    besoinsEauParSemaine: '3 Litres',
                    typeEngrais: 'Engrais L',
                },
                {
                    nom: 'Brocoli',
                    dates: {
                        plantation: new Date('2023-04-01'),
                        recolte: new Date('2023-07-01'),
                    },
                    besoinsEauParSemaine: '3.5 Litres',
                    typeEngrais: 'Engrais M',
                },
                {
                    nom: 'Poireau',
                    dates: {
                        plantation: new Date('2023-05-01'),
                        recolte: new Date('2023-08-01'),
                    },
                    besoinsEauParSemaine: '2 Litres',
                    typeEngrais: 'Engrais N',
                },
                {
                    nom: 'Betterave',
                    dates: {
                        plantation: new Date('2023-06-01'),
                        recolte: new Date('2023-09-01'),
                    },
                    besoinsEauParSemaine: '3 Litres',
                    typeEngrais: 'Engrais O',
                },
            ],
        },
        {
            departement: 'Alpes-de-Haute-Provence',
            ville: 'Digne-les-Bains',
            vegetaux: [
                {
                    nom: 'Céleri',
                    dates: {
                        plantation: new Date('2023-03-01'),
                        recolte: new Date('2023-06-01'),
                    },
                    besoinsEauParSemaine: '3 Litres',
                    typeEngrais: 'Engrais P',
                },
                {
                    nom: 'Concombre',
                    dates: {
                        plantation: new Date('2023-04-01'),
                        recolte: new Date('2023-07-01'),
                    },
                    besoinsEauParSemaine: '2 Litres',
                    typeEngrais: 'Engrais Q',
                },
                {
                    nom: 'Haricot sec',
                    dates: {
                        plantation: new Date('2023-05-01'),
                        recolte: new Date('2023-08-01'),
                    },
                    besoinsEauParSemaine: '3 Litres',
                    typeEngrais: 'Engrais R',
                },
                {
                    nom: 'Piment',
                    dates: {
                        plantation: new Date('2023-06-01'),
                        recolte: new Date('2023-09-01'),
                    },
                    besoinsEauParSemaine: '2 Litres',
                    typeEngrais: 'Engrais S',
                },
                {
                    nom: 'Artichaut',
                    dates: {
                        plantation: new Date('2023-07-01'),
                        recolte: new Date('2023-10-01'),
                    },
                    besoinsEauParSemaine: '4 Litres',
                    typeEngrais: 'Engrais T',
                },
            ],
        },
        {
            departement: 'Hautes-Alpes',
            ville: 'Gap',
            vegetaux: [
                {
                    nom: 'Chou',
                    dates: {
                        plantation: new Date('2023-04-01'),
                        recolte: new Date('2023-07-01'),
                    },
                    besoinsEauParSemaine: '3.5 Litres',
                    typeEngrais: 'Engrais U',
                },
                {
                    nom: 'Navet',
                    dates: {
                        plantation: new Date('2023-05-01'),
                        recolte: new Date('2023-08-01'),
                    },
                    besoinsEauParSemaine: '2 Litres',
                    typeEngrais: 'Engrais V',
                },
                {
                    nom: 'Cresson',
                    dates: {
                        plantation: new Date('2023-06-01'),
                        recolte: new Date('2023-09-01'),
                    },
                    besoinsEauParSemaine: '3 Litres',
                    typeEngrais: 'Engrais W',
                },
                {
                    nom: 'Pois',
                    dates: {
                        plantation: new Date('2023-07-01'),
                        recolte: new Date('2023-10-01'),
                    },
                    besoinsEauParSemaine: '2.5 Litres',
                    typeEngrais: 'Engrais X',
                },
                {
                    nom: 'Roquette',
                    dates: {
                        plantation: new Date('2023-08-01'),
                        recolte: new Date('2023-11-01'),
                    },
                    besoinsEauParSemaine: '2 Litres',
                    typeEngrais: 'Engrais Y',
                },
                
            ],
        },

        {  departement: 'Alpes-Maritimes',
        ville: 'Nice',
        vegetaux: [
            {
                nom: 'Poivron',
                dates: {
                    plantation: new Date('2023-02-01'),
                    recolte: new Date('2023-05-01'),
                },
                besoinsEauParSemaine: '4 Litres',
                typeEngrais: 'Engrais K',
            },
            {
                nom: 'Courgette',
                dates: {
                    plantation: new Date('2023-03-01'),
                    recolte: new Date('2023-06-01'),
                },
                besoinsEauParSemaine: '3 Litres',
                typeEngrais: 'Engrais L',
            },
            {
                nom: 'Tomate cerise',
                dates: {
                    plantation: new Date('2023-04-01'),
                    recolte: new Date('2023-07-01'),
                },
                besoinsEauParSemaine: '3.5 Litres',
                typeEngrais: 'Engrais M',
            },
            {
                nom: 'Basilic',
                dates: {
                    plantation: new Date('2023-05-01'),
                    recolte: new Date('2023-08-01'),
                },
                besoinsEauParSemaine: '2 Litres',
                typeEngrais: 'Engrais N',
            },
            {
                nom: 'Radis',
                dates: {
                    plantation: new Date('2023-06-01'),
                    recolte: new Date('2023-09-01'),
                },
                besoinsEauParSemaine: '3 Litres',
                typeEngrais: 'Engrais O',
            },
        ],
    },

    {
        departement: 'Ardèche',
        ville: 'Privas',
        vegetaux: [
            {
                nom: 'Pomme de terre',
                dates: {
                    plantation: new Date('2023-01-15'),
                    recolte: new Date('2023-04-01'),
                },
                besoinsEauParSemaine: '4 Litres',
                typeEngrais: 'Engrais F',
            },
            {
                nom: 'Épinard',
                dates: {
                    plantation: new Date('2023-02-01'),
                    recolte: new Date('2023-04-15'),
                },
                besoinsEauParSemaine: '2.5 Litres',
                typeEngrais: 'Engrais G',
            },
            {
                nom: 'Haricot vert',
                dates: {
                    plantation: new Date('2023-03-01'),
                    recolte: new Date('2023-06-01'),
                },
                besoinsEauParSemaine: '3 Litres',
                typeEngrais: 'Engrais H',
            },
            {
                nom: 'Chou-fleur',
                dates: {
                    plantation: new Date('2023-04-01'),
                    recolte: new Date('2023-07-01'),
                },
                besoinsEauParSemaine: '3.5 Litres',
                typeEngrais: 'Engrais I',
            },
            {
                nom: 'Fraise',
                dates: {
                    plantation: new Date('2023-05-01'),
                    recolte: new Date('2023-06-15'),
                },
                besoinsEauParSemaine: '2 Litres',
                typeEngrais: 'Engrais J',
            },
        ],
    },
    
    {
        departement: 'Ardennes',
        ville: 'Charleville-Mézières',
        vegetaux: [
            {
                nom: 'Poireau',
                dates: {
                    plantation: new Date('2023-01-15'),
                    recolte: new Date('2023-04-01'),
                },
                besoinsEauParSemaine: '3.5 Litres',
                typeEngrais: 'Engrais K',
            },
            {
                nom: 'Betterave',
                dates: {
                    plantation: new Date('2023-02-01'),
                    recolte: new Date('2023-05-01'),
                },
                besoinsEauParSemaine: '2 Litres',
                typeEngrais: 'Engrais L',
            },
            {
                nom: 'Poivron',
                dates: {
                    plantation: new Date('2023-03-01'),
                    recolte: new Date('2023-06-01'),
                },
                besoinsEauParSemaine: '3 Litres',
                typeEngrais: 'Engrais M',
            },
            {
                nom: 'Céleri',
                dates: {
                    plantation: new Date('2023-04-01'),
                    recolte: new Date('2023-07-01'),
                },
                besoinsEauParSemaine: '4 Litres',
                typeEngrais: 'Engrais N',
            },
            {
                nom: 'Melon',
                dates: {
                    plantation: new Date('2023-05-01'),
                    recolte: new Date('2023-08-01'),
                },
                besoinsEauParSemaine: '3 Litres',
                typeEngrais: 'Engrais O',
            },
        ],
    },
    
    {
        departement: 'Ariège',
        ville: 'Foix',
        vegetaux: [
            {
                nom: 'Aubergine',
                dates: {
                    plantation: new Date('2023-01-15'),
                    recolte: new Date('2023-04-01'),
                },
                besoinsEauParSemaine: '3.5 Litres',
                typeEngrais: 'Engrais P',
            },
            {
                nom: 'Concombre',
                dates: {
                    plantation: new Date('2023-02-01'),
                    recolte: new Date('2023-05-01'),
                },
                besoinsEauParSemaine: '2 Litres',
                typeEngrais: 'Engrais Q',
            },
            {
                nom: 'Artichaut',
                dates: {
                    plantation: new Date('2023-03-01'),
                    recolte: new Date('2023-06-01'),
                },
                besoinsEauParSemaine: '3 Litres',
                typeEngrais: 'Engrais R',
            },
            {
                nom: 'Endive',
                dates: {
                    plantation: new Date('2023-04-01'),
                    recolte: new Date('2023-07-01'),
                },
                besoinsEauParSemaine: '4 Litres',
                typeEngrais: 'Engrais S',
            },
            {
                nom: 'Myrtille',
                dates: {
                    plantation: new Date('2023-05-01'),
                    recolte: new Date('2023-08-01'),
                },
                besoinsEauParSemaine: '3 Litres',
                typeEngrais: 'Engrais T',
            },
        ],
    },
     
 {
    departement: 'Aube',
    ville: 'Troyes',
    vegetaux: [
        {
            nom: 'Pastèque',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais U',
        },
        {
            nom: 'Radis noir',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais V',
        },
        {
            nom: 'Topinambour',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais W',
        },
        {
            nom: 'Navet',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais X',
        },
        {
            nom: 'Asperge',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Y',
        },
    ],
},
{
    departement: 'Aude',
    ville: 'Carcassonne',
    vegetaux: [
        {
            nom: 'Cresson',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais AA',
        },
        {
            nom: 'Fenouil',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais BB',
        },
        {
            nom: 'Panais',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais CC',
        },
        {
            nom: 'Piment',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais DD',
        },
        {
            nom: 'Cerise',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais EE',
        },
    ],
},


{
    departement: 'Aveyron',
    ville: 'Rodez',
    vegetaux: [
        {
            nom: 'Brocoli',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais FF',
        },
        {
            nom: 'Oignon',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais GG',
        },
        {
            nom: 'Courge',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais HH',
        },
        {
            nom: 'Mâche',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais II',
        },
        {
            nom: 'Kiwi',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais JJ',
        },
    ],
},
{
    departement: 'Bouches-du-Rhône',
    ville: 'Marseille',
    vegetaux: [
        {
            nom: 'Aneth',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais KK',
        },
        {
            nom: 'Pois',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais LL',
        },
        {
            nom: 'Avocat',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais MM',
        },
        {
            nom: 'Chicorée',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais NN',
        },
        {
            nom: 'Pamplemousse',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais OO',
        },
    ],
},

{
    departement: 'Cantal',
    ville: 'Aurillac',
    vegetaux: [
        {
            nom: 'Courge musquée',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais AA',
        },
        {
            nom: 'Échalote',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais BB',
        },
        {
            nom: 'Chou-rave',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais CC',
        },
        {
            nom: 'Fève',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais DD',
        },
        {
            nom: 'Mûre',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais EE',
        },
    ],
},

{
    departement: 'Charente',
    ville: 'Angoulême',
    vegetaux: [
        {
            nom: 'Carotte violette',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais FF',
        },
        {
            nom: 'Poire',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais GG',
        },
        {
            nom: 'Ciboulette',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais HH',
        },
        {
            nom: 'Radis rose',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais II',
        },
        {
            nom: 'Cassis',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais JJ',
        },
    ],
},
{
    departement: 'Charente-Maritime',
    ville: 'La Rochelle',
    vegetaux: [
        {
            nom: 'Aubergine',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais KK',
        },
        {
            nom: 'Concombre',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais LL',
        },
        {
            nom: 'Artichaut',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais MM',
        },
        {
            nom: 'Endive',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais NN',
        },
        {
            nom: 'Myrtille',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais OO',
        },
    ],
},

{
    departement: 'Cher',
    ville: 'Bourges',
    vegetaux: [
        {
            nom: 'Brocoli',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais PP',
        },
        {
            nom: 'Carotte orange',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais QQ',
        },
        {
            nom: 'Haricot rouge',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais RR',
        },
        {
            nom: 'Céleri-rave',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais SS',
        },
        {
            nom: 'Pêche',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais TT',
        },
    ],
},
{
    departement: 'Corrèze',
    ville: 'Tulle',
    vegetaux: [
        {
            nom: 'Poire Williams',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais UU',
        },
        {
            nom: 'Radis rose',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais VV',
        },
        {
            nom: 'Topinambour',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais WW',
        },
        {
            nom: 'Navet blanc',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais XX',
        },
        {
            nom: 'Abricot',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais YY',
        },
    ],
},
{
    departement: 'Côte-d\'Or',
    ville: 'Dijon',
    vegetaux: [
        {
            nom: 'Courgette jaune',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais ZZ',
        },
        {
            nom: 'Brocoli',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais AAA',
        },
        {
            nom: 'Pomme de terre vitelotte',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais BBB',
        },
        {
            nom: 'Radis noir',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais CCC',
        },
        {
            nom: 'Framboise',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais DDD',
        },
    ],
},
{
    departement: 'Côtes-d\'Armor',
    ville: 'Saint-Brieuc',
    vegetaux: [
        {
            nom: 'Laitue iceberg',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais EEE',
        },
        {
            nom: 'Carotte nantaise',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais FFF',
        },
        {
            nom: 'Tomate cerise',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais GGG',
        },
        {
            nom: 'Concombre de mer',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais HHH',
        },
        {
            nom: 'Mûre',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais III',
        },
    ],
},
{
    departement: 'Creuse',
    ville: 'Guéret',
    vegetaux: [
        {
            nom: 'Potiron',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais JJJ',
        },
        {
            nom: 'Poire Conférence',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais KKK',
        },
        {
            nom: 'Carotte de sable',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais LLL',
        },
        {
            nom: 'Artichaut breton',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais MMM',
        },
        {
            nom: 'Pomme Reinette',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais NNN',
        },
    ],
},
{
    departement: 'Dordogne',
    ville: 'Périgueux',
    vegetaux: [
        {
            nom: 'Cauliflower',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais OOO',
        },
        {
            nom: 'Poivron rouge',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais PPP',
        },
        {
            nom: 'Pomme de terre ratte',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais QQQ',
        },
        {
            nom: 'Tomate coeur de boeuf',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais RRR',
        },
        {
            nom: 'Pomme golden',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais SSS',
        },
    ],
},
{
    departement: 'Doubs',
    ville: 'Besançon',
    vegetaux: [
        {
            nom: 'Asperge blanche',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais TTT',
        },
        {
            nom: 'Pomme de terre roseval',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais UUU',
        },
        {
            nom: 'Carotte chantenay',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais VVV',
        },
        {
            nom: 'Radis rose ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais WWW',
        },
        {
            nom: 'Fraise mara des bois',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais XXX',
        },
    ],
},
{
    departement: 'Drôme',
    ville: 'Valence',
    vegetaux: [
        {
            nom: 'Courgette verte',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais YYY',
        },
        {
            nom: 'Brocoli',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais ZZZ',
        },
        {
            nom: 'Carotte nantaise',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais AAA',
        },
        {
            nom: 'Poivron rouge',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais BBB',
        },
        {
            nom: 'Fraise gariguette',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais CCC',
        },
    ],
},
{
    departement: 'Eure',
    ville: 'Évreux',
    vegetaux: [
        {
            nom: 'Chou de Milan',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais DDD',
        },
        {
            nom: 'Pomme de terre vitelotte',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais EEE',
        },
        {
            nom: 'Radis noir',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais FFF',
        },
        {
            nom: 'Poivron jaune',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais GGG',
        },
        {
            nom: 'Myrtille',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais HHH',
        },
    ],
},
{
    departement: 'Eure-et-Loir',
    ville: 'Chartres',
    vegetaux: [
        {
            nom: 'Laitue romaine',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais III',
        },
        {
            nom: 'Carotte chantenay',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais JJJ',
        },
        {
            nom: 'Tomate cerise',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais KKK',
        },
        {
            nom: 'Courgette jaune',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais LLL',
        },
        {
            nom: 'Fraise mara des bois',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais MMM',
        },
    ],
},
{
    departement: 'Finistère',
    ville: 'Quimper',
    vegetaux: [
        {
            nom: 'Brocoli',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais NNN',
        },
        {
            nom: 'Chou frisé',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais OOO',
        },
        {
            nom: 'Carotte orange',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais PPP',
        },
        {
            nom: 'Radis rouge',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais QQQ',
        },
        {
            nom: 'Fraise ciflorette',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais RRR',
        },
    ],
},
{
    departement: 'Gard',
    ville: 'Nîmes',
    vegetaux: [
        {
            nom: 'Céleri branche',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais SSS',
        },
        {
            nom: 'Aubergine',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais TTT',
        },
        {
            nom: 'Chou de Bruxelles',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais UUU',
        },
        {
            nom: 'Poivron vert',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais VVV',
        },
        {
            nom: 'Melon charentais',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais WWW',
        },
    ],
},
{
    departement: 'Haute-Garonne',
    ville: 'Toulouse',
    vegetaux: [
        {
            nom: 'Poireau',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais XXX',
        },
        {
            nom: 'Betterave rouge',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais YYY',
        },
        {
            nom: 'Poivron jaune',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais ZZZ',
        },
        {
            nom: 'Céleri rave',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais AAA',
        },
        {
            nom: 'Kiwi',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais BBB',
        },
    ],
},

{
    departement: 'Gers',
    ville: 'Auch',
    vegetaux: [
        {
            nom: 'Cresson alénois',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais CCC',
        },
        {
            nom: 'Haricot sec',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais DDD',
        },
        {
            nom: 'Laitue iceberg',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais EEE',
        },
        {
            nom: 'Piment fort',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais FFF',
        },
        {
            nom: 'Pomme golden',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais GGG',
        },
    ],
},
{
    departement: 'Gironde',
    ville: 'Bordeaux',
    vegetaux: [
        {
            nom: 'Échalote grise',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais HHH',
        },
        {
            nom: 'Pois mange-tout',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais III',
        },
        {
            nom: 'Carotte jaune',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais JJJ',
        },
        {
            nom: 'Champignon de Paris',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais KKK',
        },
        {
            nom: 'Banane plantain',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais LLL',
        },
    ],
},
{
    departement: 'Hérault',
    ville: 'Montpellier',
    vegetaux: [
        {
            nom: 'Tomate cerise',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais MMM',
        },
        {
            nom: 'Oignon blanc',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais NNN',
        },
        {
            nom: 'Concombre anglais',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais OOO',
        },
        {
            nom: 'Framboise rouge',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais PPP',
        },
        {
            nom: 'Mangue',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais QQQ',
        },
    ],
},
{
    departement: 'Ille-et-Vilaine',
    ville: 'Rennes',
    legumes: [
        {
            nom: 'Carotte violette',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Phosphatés (P)',
        },
        {
            nom: 'Chou rouge',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
        {
            nom: 'Pomme reinette',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Cerfeuil frisé',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Pêche de vigne',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Minéraux',
        },
    ],
}
,
{
    departement: 'Indre',
    ville: 'Châteauroux',
    vegetaux: [
        {
            nom: 'Aubergine listada',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais WWWW',
        },
        {
            nom: 'Courgette jaune',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais XXXX',
        },
        {
            nom: 'Tomate ananas',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais YYYY',
        },
        {
            nom: 'Blette à cardes multicolores',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais ZZZZ',
        },
        {
            nom: 'Raisin chasselas',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais AAAA',
        },
    ],
},
{
    departement: 'Indre-et-Loire',
    ville: 'Tours',
    vegetaux: [
        {
            nom: 'Céleri-rave',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais BBBB',
        },
        {
            nom: 'Échalote grise',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-05-01'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais CCCC',
        },
        {
            nom: 'Fraise des bois',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais DDDD',
        },
        {
            nom: 'Oignon rouge',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais EEEE',
        },
        {
            nom: 'Poire comice',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-08-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais FFFF',
        },
    ],
},

{
    departement: 'Isère',
    ville: 'Grenoble',
    vegetaux: [
        {
            nom: 'Pomme de terre nouvelle',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Épinard savoyard',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot vert dauphinois',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou-fleur alpin',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise du Vercors',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Jura',
    ville: 'Lons-le-Saunier',
    vegetaux: [
        {
            nom: 'Courge jurassienne',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Salade des lacs',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Carotte comtoise',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Poireau montagnard',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Myrtille du Jura',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Landes',
    ville: 'Mont-de-Marsan',
    vegetaux: [
        {
            nom: 'Maïs gascon',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Courgette landaise',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Tomate aquitaine',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Asperge landaise',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Framboise des Landes',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Loir-et-Cher',
    ville: 'Blois',
    vegetaux: [
        {
            nom: 'Chasselas de la Loire',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Courgette blésoise',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Tomate val de Loire',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Asperge solognote',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise de la vallée',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},

{
    departement: 'Loire',
    ville: 'Saint-Étienne',
    vegetaux: [
        {
            nom: 'Pomme de terre stéphanoise',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Cresson du Forez',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot vert stéphanois',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou de la Loire',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise stéphanoise',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Haute-Loire',
    ville: 'Le Puy-en-Velay',
    vegetaux: [
        {
            nom: 'Lentille du Velay',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Chou vert vellave',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Carotte du Velay',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Poireau de Haute-Loire',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Myrtille du Velay',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Loire-Atlantique',
    ville: 'Nantes',
    vegetaux: [
        {
            nom: 'Radis nantais',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Courgette nantaise',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot nantais',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou-fleur nantais',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise nantaise',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Loiret',
    ville: 'Orléans',
    vegetaux: [
        {
            nom: 'Carotte orléanaise',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Tomate orléanaise',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Pomme de terre orléanaise',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Épinard orléanais',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise orléanaise',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Lot-et-Garonne',
    ville: 'Agen',
    legumes: [
        {
            nom: 'Prune ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Asperge ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Tomate ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Ail ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Lozère',
    ville: 'Mende',
    vegetaux: [
        {
            nom: 'Cèpe lozérien',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre lozérienne',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Poire lozérienne',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Noisette lozérienne',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise lozérienne',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
}
,
{
    departement: 'Maine-et-Loire',
    ville: 'Angers',
    legumes: [
        {
            nom: 'Pomme ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Champignon',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Tomate ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Poire ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
}
,
{
    departement: 'Manche',
    ville: 'Cherbourg-en-Cotentin',
    vegetaux: [
        {
            nom: 'Artichaut ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Tomate cotentine',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou-fleur ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Marne',
    ville: 'Reims',
    vegetaux: [
        {
            nom: 'Champignon rémois',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Raisin marnais',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Radis ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Champignon de Paris',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Rhubarbe marnaise',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Haute-Marne',
    ville: 'Chaumont',
    vegetaux: [
        {
            nom: 'Haricot haut-marnais',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Chou chalonnais',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Betterave haut-marnaise',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Tomate chaumontaise',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Pomme de terre haut-marnaise',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},

{
    departement: 'Mayenne',
    ville: 'Laval',
    vegetaux: [
        {
            nom: 'Carotte mayennaise',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Laitue lavalloise',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Radis mayennais',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Pomme lavalloise',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Chou mayennais',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Meurthe-et-Moselle',
    ville: 'Nancy',
    vegetaux: [
        {
            nom: 'Laitue nancéienne',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Courgette nancéienne',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot meurthois',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Pomme nancéienne',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Tomate meurthoise',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Meuse',
    ville: 'Bar-le-Duc',
    vegetaux: [
        {
            nom: 'Asperge ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Morbihan',
    ville: 'Vannes',
    vegetaux: [
        {
            nom: 'Tomate morbihannaise',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre morbihannaise',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot morbihannais',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou morbihannais',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise morbihannaise',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Moselle',
    ville: 'Metz',
    vegetaux: [
        {
            nom: 'Radis',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
}
,
{
    departement: 'Nièvre',
    ville: 'Nevers',
    vegetaux: [
        {
            nom: 'Courgette ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Nord',
    ville: 'Lille',
    vegetaux: [
        {
            nom: 'Tomate ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Oise',
    ville: 'Beauvais',
    vegetaux: [
        {
            nom: 'Carotte ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Orne',
    ville: 'Alençon',
    vegetaux: [
        {
            nom: 'Tomate ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    departement: 'Pas-de-Calais',
    ville: 'Calais',
    vegetaux: [
        {
            nom: 'Radis ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},

{
    departement: 'Puy-de-Dôme',
    ville: 'Clermont-Ferrand',
    vegetaux: [
        {
            nom: 'Carotte ',
            dates: {
                plantation: new Date('2023-01-15'),
                recolte: new Date('2023-04-01'),
            },
            besoinsEauParSemaine: '4 Litres',
            typeEngrais: 'Engrais à Libération Lente',
        },
        {
            nom: 'Pomme de terre ',
            dates: {
                plantation: new Date('2023-02-01'),
                recolte: new Date('2023-04-15'),
            },
            besoinsEauParSemaine: '2.5 Litres',
            typeEngrais: 'Engrais Foliaires',
        },
        {
            nom: 'Haricot ',
            dates: {
                plantation: new Date('2023-03-01'),
                recolte: new Date('2023-06-01'),
            },
            besoinsEauParSemaine: '3 Litres',
            typeEngrais: 'Engrais Complets (NPK)',
        },
        {
            nom: 'Chou ',
            dates: {
                plantation: new Date('2023-04-01'),
                recolte: new Date('2023-07-01'),
            },
            besoinsEauParSemaine: '3.5 Litres',
            typeEngrais: 'Engrais Organique',
        },
        {
            nom: 'Fraise ',
            dates: {
                plantation: new Date('2023-05-01'),
                recolte: new Date('2023-06-15'),
            },
            besoinsEauParSemaine: '2 Litres',
            typeEngrais: 'Engrais Potassiques (K)',
        },
    ],
},
{
    "Pyrénées-Atlantiques": {
      "ville": "Pau",
      "vegetaux": [
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Lilas",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Hautes-Pyrénées": {
      "ville": "Tarbes",
      "vegetaux": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Pyrénées-Orientales": {
      "ville": "Perpignan",
      "vegetaux": [
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Bambou",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Bas-Rhin": {
      "ville": "Strasbourg",
      "vegetaux": [
        {
          "nom": "Hêtre",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Érable",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Magnolia",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    }
  },
  {
    "Haut-Rhin": {
      "ville": "Mulhouse",
      "vegetaux": [
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Lilas",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Rhône": {
      "ville": "Lyon",
      "vegetaux": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Saône-et-Loire": {
      "ville": "Chalon-sur-Saône",
      "vegetaux": [
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Bambou",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Sarthe": {
      "ville": "Le Mans",
      "vegetaux": [
        {
          "nom": "Hêtre",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Érable",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Magnolia",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    }
  },
  {
    "Savoie": {
      "ville": "Chambéry",
      "vegetaux": [
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Lilas",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Haute-Savoie": {
      "ville": "Annecy",
      "vegetaux": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Paris": {
      "ville": "Paris",
      "vegetaux": [
        {
          "nom": "Fougère",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Lys",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Seine-Maritime": {
      "ville": "Rouen",
      "vegetaux": [
        {
          "nom": "Hêtre",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Érable",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Magnolia",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    }
  },
  {
    "Seine-et-Marne": {
      "ville": "Meaux",
      "vegetaux": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Yvelines": {
      "ville": "Versailles",
      "vegetaux": [
        {
          "nom": "Fougère",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Lys",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Deux-Sèvres": {
      "ville": "Niort",
      "vegetaux": [
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Bambou",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Somme": {
      "ville": "Amiens",
      "vegetaux": [
        {
          "nom": "Hêtre",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Érable",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Magnolia",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    }
  },
  {
    "Tarn": {
      "ville": "Albi",
      "vegetaux": [
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Lilas",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Tarn-et-Garonne": {
      "ville": "Montauban",
      "vegetaux": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Var": {
      "ville": "Toulon",
      "vegetaux": [
        {
          "nom": "Fougère",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Lys",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Vaucluse": {
      "ville": "Avignon",
      "vegetaux": [
        {
          "nom": "Hêtre",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Érable",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Magnolia",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    }
  },
  {
    "Vendée": {
      "ville": "La Roche-sur-Yon",
      "vegetaux": [
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Lilas",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Vienne": {
      "ville": "Poitiers",
      "vegetaux": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Haute-Vienne": {
      "ville": "Limoges",
      "vegetaux": [
        {
          "nom": "Fougère",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Lys",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Vosges": {
      "ville": "Épinal",
      "vegetaux": [
        {
          "nom": "Hêtre",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Érable",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Magnolia",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    }
  },
  {
    "Yonne": {
      "ville": "Auxerre",
      "vegetaux": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Territoire de Belfort": {
      "ville": "Belfort",
      "vegetaux": [
        {
          "nom": "Fougère",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Lys",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Essonne": {
      "ville": "Évry",
      "vegetaux": [
        {
          "nom": "Hêtre",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Érable",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Magnolia",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Olivier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Hauts-de-Seine": {
      "ville": "Nanterre",
      "vegetaux": [
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Lilas",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    }
  },
  {
    "Seine-Saint-Denis": {
      "ville": "Saint-Denis",
      "vegetaux": [
        {
          "nom": "Tournesol",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Dahlia",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Chrysanthème",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Bambou",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Bougainvillier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Val-de-Marne": {
      "ville": "Créteil",
      "vegetaux": [
        {
          "nom": "Lilas",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Val-d'Oise": {
      "ville": "Cergy",
      "vegetaux": [
        {
          "nom": "Fougère",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Lys",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Guadeloupe": {
      "ville": "Pointe-à-Pitre",
      "vegetaux": [
        {
          "nom": "Bananier",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Canna",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Hibiscus",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Vanille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Ananas",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    }
  },
  {
    "Martinique": {
      "ville": "Fort-de-France",
      "vegetaux": [
        {
          "nom": "Bananier",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Canna",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Hibiscus",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Vanille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Ananas",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Guyane": {
      "ville": "Cayenne",
      "vegetaux": [
        {
          "nom": "Fougère",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Lys",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "La Réunion": {
      "ville": "Saint-Denis",
      "vegetaux": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Mayotte": {
      "ville": "Mamoudzou",
      "vegetaux": [
        {
          "nom": "Tournesol",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Dahlia",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Chrysanthème",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Bambou",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Bougainvillier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    }
  },{
    "Ain": {
      "Oyonnax": [
        {
          "nom": "Tournesol",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Dahlia",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Chrysanthème",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Bambou",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Bougainvillier",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ],
      "Ambérieu-en-Bugey": [
        {
          "nom": "Fougère",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Lys",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Aisne": {
      "Saint-Quentin": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ],
      "Soissons": [
        {
          "nom": "Bananier",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Canna",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Hibiscus",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Vanille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Ananas",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Allier": {
      "Vichy": [
        {
          "nom": "Fougère",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Lys",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Pivoine",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Tulipe",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ],
      "Montluçon": [
        {
          "nom": "Bananier",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Canna",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Hibiscus",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Vanille",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Ananas",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ]
    },
    "Alpes-de-Haute-Provence": {
      "Manosque": [
        {
          "nom": "Lavande",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Jonquille",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        },
        {
          "nom": "Orchidée",
          "dates": {
            "plantation": "2023-03-01",
            "recolte": "2023-06-01"
          },
          "besoinsEauParSemaine": "3 Litres",
          "typeEngrais": "Engrais Complets (NPK)"
        },
        {
          "nom": "Marguerite",
          "dates": {
            "plantation": "2023-04-01",
            "recolte": "2023-07-01"
          },
          "besoinsEauParSemaine": "3.5 Litres",
          "typeEngrais": "Engrais Organique"
        },
        {
          "nom": "Rose",
          "dates": {
            "plantation": "2023-05-01",
            "recolte": "2023-06-15"
          },
          "besoinsEauParSemaine": "2 Litres",
          "typeEngrais": "Engrais Potassiques (K)"
        }
      ],
      "Sisteron": [
        {
          "nom": "Bananier",
          "dates": {
            "plantation": "2023-01-15",
            "recolte": "2023-04-01"
          },
          "besoinsEauParSemaine": "4 Litres",
          "typeEngrais": "Engrais à Libération Lente"
        },
        {
          "nom": "Canna",
          "dates": {
            "plantation": "2023-02-01",
            "recolte": "2023-04-15"
          },
          "besoinsEauParSemaine": "2.5 Litres",
          "typeEngrais": "Engrais Foliaires"
        }
    ]
  }
}
       
  

  
  
   
  

  







    
];

// Enregistrez les données dans MongoDB
async function saveVegetauxParDepartement() {
    try {
        for (const vegetaux of vegetauxParDepartement) {
            const newVegetauxParDepartement = new VegetauxParDepartement(vegetaux);
            await newVegetauxParDepartement.save();
            console.log(`Données vegetaux pour ${vegetaux.ville}, ${vegetaux.departement} enregistrées avec succès.`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données vegetaux :', error);
    }
}

// Appeler la fonction pour enregistrer les données dans MongoDB
saveVegetauxParDepartement();