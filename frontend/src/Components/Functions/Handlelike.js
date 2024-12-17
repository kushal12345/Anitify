import api from "../../Services/api";

const likerequest = async(newliked, id, likedata, User) => {
    try {
        const response = await api.post(`/api/likes/${likedata}/${id}/${User.User._id}`, {
            "newLiked": newliked,
            "Authority": User.Authority
        });
        return (response.data.success===true)?response.data.result:null;
    } catch (error) {
        console.log("error in likerequest.js",error);
    }
}

export default likerequest;