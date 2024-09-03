
import axios from "axios";

const logError = (error) => {
    axios.post(`http://localhost:9000/log-error`,{
      body: error,
    }).then(res=>{
      console.log(res.data);
    })
  };
  
  export default logError;