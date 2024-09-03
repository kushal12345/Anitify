import logger from "../../Logger/config.js";

function logError (url,app) {
    app.post(url, (req, res) => {
        const error = `Method:${req.method} , URL:${req.url} , Origin:${req.headers.origin} , Message:${req.body.body}`;
        logger.error(error);
        res.status(200).send('Error logged');
      });    
}

export default logError;