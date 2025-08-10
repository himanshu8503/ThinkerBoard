import ratelimit from "../config/upstash.js"


const rateLimiter = async(req,res,next) => {
    try {
      const {success} = await ratelimit.limit("my-limite-key");
      
      if(!success){
        return res.status(429).json({
            msg:"Too many requests, please try again later",
        });
      }

      next()
    } catch (error) {
        console.log("Rate limiter Error: ",error);
        next(error);
    }
}


export default rateLimiter;
