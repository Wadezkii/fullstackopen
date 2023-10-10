import axios from "axios";

const baseUrl = "/api/diagnoses";

const getDiagnoses = async () => {
    const response = await axios.get(baseUrl); 
    return response.data;
}

export default { getDiagnoses }