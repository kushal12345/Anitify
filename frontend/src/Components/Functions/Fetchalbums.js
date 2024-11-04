import api from "../../Services/api";

 const fetchAlbums =  (userId, setdata, album, name) => {
    try {
        api.get(`/api/albums/${userId}`)
        .then(response => {
          const data = response.data;
           setdata(data);
           album(data.result[0])
           name(data.artistdetails[0])
          })
        .catch(e => {
          console.error(e);
        })
    } catch (error) {
        console.log('Error fetching album:',error);
    }
}

export default fetchAlbums;