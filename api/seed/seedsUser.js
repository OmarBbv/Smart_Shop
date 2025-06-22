import User from "../models/userModel.js"; // model ismi sende farklıysa güncelle
import { faker } from "@faker-js/faker"; // faker-js kütüphanesi kullanıldı

// 50 sahte kullanıcı oluştur
const seedUsers = Array.from({ length: 50 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(), // gerçek projede hash'lenmeli
    role: faker.helpers.arrayElement([1]), // 0: ghost, 1: user, 2: admin
}));

const seedUsersData = async () => {
    try {
        for (const userData of seedUsers) {
            await User.create(userData);
        }
        console.log("Bütün istifadəçilər uğurla əlavə olundu!");
    } catch (error) {
        console.error("İstifadəçilər əlavə edilərkən xəta:", error);
    }
};

export { seedUsersData };
export default seedUsersData;
