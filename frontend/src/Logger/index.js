
import axios from "axios";

const logError = (error) => {
    axios.post(`https://anitify-api.vercel.app/log-error`,{
      body: error,
    }).then(res=>{
      console.log(res.data);
    })
  };
  
  export default logError;