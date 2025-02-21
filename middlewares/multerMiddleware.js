import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|bmp|tiff|webp|svg|pdf|docx|xls|xlsx|ppt|pptx/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(file.originalname.split(".").pop().toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Unsupported file format'), false);
    }
});

export default upload;