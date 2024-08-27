import logger from "../../Logger/config.js";

function startServer (app,PORT){
    try {
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
            logger.error(`Server started running on PORT:${PORT}`);
        })        
    } catch (error) {
        logger.error("error occured at Startserver.js",error);
    }

}

export default startServer;