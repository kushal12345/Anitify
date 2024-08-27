import logger from "../../Logger/config.js";

function logError (url,app) {
    app.post(url, (req, res) => {
        const error = req.body.error;
        logger.error(error);
        res.status(200).send('Error logged');
      });    
}

export default logError;