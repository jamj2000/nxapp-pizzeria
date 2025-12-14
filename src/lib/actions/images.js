'use server'
import cloudinary from "@/lib/cloudinary"



export async function uploadImage(file) {
    // console.log(file);

    const fileBuffer = await file.arrayBuffer();

    let mime = file.type;
    let encoding = "base64";
    let base64Data = Buffer.from(fileBuffer).toString("base64");
    let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

    try {
        const result = await cloudinary.uploader.upload(fileUri, {
            invalidate: true,
            folder: "pizzeria",
            public_id: file.name.split(".").slice(0, -1).join("."),
            aspect_ratio: "1.0",
            width: 800,
            crop: "fill",
            gravity: "center",
            format: 'avif'
        });
        // console.log(result);
        return result.secure_url;
    } catch (error) {
        console.log(error);
        return null;
    }
}

