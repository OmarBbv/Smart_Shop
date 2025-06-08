import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = 'uploads/products';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error('Sadece resim dosyalarına izin verilir.'));
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: { files: 10 }
}).array('images', 10);

export default upload;
