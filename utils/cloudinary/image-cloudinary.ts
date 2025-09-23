import cloudinary from "@/lib/cloudinary";

export async function uploadBlogImageToCloudinary(file:File,folder="products"){
    const arrayBuffer=await file.arrayBuffer();
    const buffer=Buffer.from(arrayBuffer);
    return new Promise<any>((resolve,reject)=>{
        const stream=cloudinary.uploader.upload_stream(
            {folder},
            (err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            }
        )
        stream.end(buffer);
    })
}