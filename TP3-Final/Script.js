const { MongoClient } = require("mongodb");
const { faker } = require("@faker-js/faker");

async function generateMangas() {
  const uri = "mongodb+srv://braniskaci:BRANISkaci17@mongocours.z8mel.mongodb.net/?retryWrites=true&w=majority&appName=MongoCours";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("bibliotheque_amazon");
    const collection = db.collection("livres");

    let mangas = [];
    for (let i = 0; i < 1000; i++) {
      mangas.push({
        titre: faker.lorem.words(3),
        auteur: faker.person.fullName(),
        annee_publication: faker.number.int({ min: 1980, max: 2024 }),
        editeur: faker.company.name(),
        genre: faker.helpers.arrayElements(
          ["Action", "Aventure", "Fantasy", "Thriller", "Horreur", "Science-fiction", "Romance"],
          faker.number.int({ min: 1, max: 3 })
        ),
        nombre_pages: faker.number.int({ min: 100, max: 500 }),
        langue: "Français",
        disponible: faker.datatype.boolean(),
        stock: faker.number.int({ min: 0, max: 20 }),
        note_moyenne: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
        description: faker.lorem.sentence(),
        prix: faker.number.float({ min: 5, max: 30, precision: 0.01 }),
        isbn: faker.string.uuid(),
        date_ajout: faker.date.past(),
      });
    }

    await collection.insertMany(mangas);
    console.log("✅ 1000 mangas insérés avec succès !");
  } catch (err) {
    console.error("❌ Erreur : ", err);
  } finally {
    await client.close();
  }
}

generateMangas();
