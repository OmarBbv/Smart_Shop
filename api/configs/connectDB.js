import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('smart_shop', 'postgres', 'metroboomin2425', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL bağlantısı başarılı!');

    await sequelize.sync({ alter: true });
    console.log('✅ Veritabanı tabloları oluşturuldu veya güncellendi');
  } catch (error) {
    console.error('❌ Veritabanı bağlantı hatası:', error);
    process.exit(1); 
  }
};

export { sequelize, connectDB };
