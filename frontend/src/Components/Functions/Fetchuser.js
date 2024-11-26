import api from "../../Services/api";

const FetchUser = async(userId, setdata) => {
    try {
       await api.get(`/api/user/${userId}`)
        .then(response => {
          const data = response.data.result;
           setdata(data);
          })
        .catch(e => {
          //console.error(e);
        }) 
      } catch (error) {
        //console.log(error);
      }
} 

export default FetchUser;
