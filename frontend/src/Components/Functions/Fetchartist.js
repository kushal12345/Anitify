import api from "../../Services/api";

const FetchArtist = async(userId, setdata) => {
    try {
       await api.get(`/api/artist/${userId}`)
        .then(response => {
          const data = response.data.result;
           setdata(data);
          })
        .catch(e => {
          console.error(e);
        }) 
      } catch (error) {
        console.log(error);
      }
} 

export default FetchArtist;
