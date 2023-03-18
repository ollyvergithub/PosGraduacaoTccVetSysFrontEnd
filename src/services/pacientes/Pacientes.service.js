import api from '../api'

export const getPacientes = async () => {
    return (await api.get(`/api/pacientes/`, {})).data
};