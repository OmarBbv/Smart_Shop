import { Sequelize } from "sequelize";

const sequelize = new Sequelize("smart_shop", "postgres", "metroboomin2425", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  // logging: console.log,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL bağlantısı başarılı!");

    await sequelize.sync({ force: true }); // Geliştirme ortamı için(true etmek tum datalari siler)
    await sequelize.sync({ alter: true }); // Üretim ortamı için
    // console.log("✅ Veritabanı tabloları oluşturuldu veya güncellendi");

    return sequelize; // Başarılı olduğunu belirtmek için sequelize'i döndür
  } catch (error) {
    console.error("❌ Veritabanı bağlantı hatası:", error);
    throw error; // Hata fırlat ki yukarıdaki fonksiyon yakalasın
  }
};

export { sequelize, connectDB };
