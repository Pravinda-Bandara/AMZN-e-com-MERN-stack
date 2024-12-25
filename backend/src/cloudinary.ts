// cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: 'dpu2jrz7m',
    api_key: '648865774194352',
    api_secret: 'JI6ePI6Sc6XOKENqK2oCfV9gDtM',
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: 'products', // Cloudinary folder
            format: 'png', // Format (optional)
            public_id: `${Date.now()}-${file.originalname}`, // Unique identifier
        };
    },
});

export const upload = multer({ storage });
