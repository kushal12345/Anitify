

export const fetchAlbums = async () => {
    try {
       const response = await api.get(`/api/albums/${cookies.User._id}`);
       const albums = response.data;
       console.log(albums);
       albums.result?setAlbums(albums.result):setAlbums(Array(8).fill(0))
    } catch (error) {
        console.log('Error fetching album:',error);
    }
}