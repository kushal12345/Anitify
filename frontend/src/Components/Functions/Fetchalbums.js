import api from "../../Services/api";

 const fetchAlbums =  (userId, setdata, album) => {
  
    try {
        api.get(`/api/albums/${userId}`)
        .then(response => {
          const data = response.data;
           setdata(data);
           album(data.result)
          })
        .catch(e => {
          console.error(e);
        })
    } catch (error) {
        console.log('Error fetching album:',error);
    }
}

export default fetchAlbums;