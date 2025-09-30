import cloudinary from "@/lib/cloudinary";

export async function uploadBlogImageToCloudinary(file: File, folder = "products") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_blogs");
    const res = await fetch("https://api.cloudinary.com/v1_1/demznoxwp/image/upload", {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    return data.secure_url;
}