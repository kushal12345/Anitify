import api from "../../Services/api";
const fetchLike = async (param, data, userId) => {
    if (data) {
        try {
            const response = await api.get(`/api/likestatus/${param}/${data._id}/${userId}`);
            return response.data ? response.data.result : null;
        } catch (error) {
            console.error(`Error fetching like for ${param}`, error);
            throw error; // Optionally rethrow the error for handling in the calling function
        }
    }
};

export default fetchLike;