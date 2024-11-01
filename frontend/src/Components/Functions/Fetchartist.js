import api from "../../Services/api";

const FetchArtist = (userId, setimage, setFormData) => {
    try {
        api.get(`/api/artist/${userId}`)
        .then(response => {
          const data = response.data.result;
          setimage(data.image);
          setFormData({
            country:data.country, 
            email:data.email,
            name:data.name,
            bio:data.bio,
            })
          })
        .catch(e => {
          console.error(e);
        })
      } catch (error) {
        console.log(error);
      }
} 

export default FetchArtist;
