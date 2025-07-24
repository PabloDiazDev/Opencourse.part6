import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

export const createAnecdote = async (content) => {
    // Validación: rechazar si es muy corto
    if (content.length < 5) {
        throw new Error('Anecdote must be at least 5 characters long')
    }
    
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object);
    return response.data;
}

export const updateAnecdote = async (id, anecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, anecdote);
    return response.data;
}