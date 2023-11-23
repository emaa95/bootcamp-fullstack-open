import axios from "axios";
import { Flight } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllFlights = () => {
    return axios
    .get<Flight[]>(baseUrl)
    .then(response => response.data)
}

