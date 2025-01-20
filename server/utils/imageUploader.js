const cloudinary = require("cloudinary").v2
// Use dynamic import for p-limit
let pLimit;

(async () => {
  const module = await import("p-limit");
  pLimit = module.default;
})();




function imageUploader(images,folder,height,quality){
    try {
        const limit = pLimit(10)
        return Promise.all(
            
            images.map((image) =>{
                const options = {folder}
                if(height){
                    options.height;
                }
                if(quality){
                    options.quality;
                }

                options.resource_type = "auto"
                return limit(async () =>{
                    const result = await cloudinary.uploader.upload(image.tempFilePath,options)
                    return result;
                })
            })
        )
        
    
    } catch (error) {
        console.log("error uploading to cloudinary",error);
    }
    
}

module.exports = imageUploader