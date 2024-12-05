import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
    baseURL: "https://sky-scrapper.p.rapidapi.com",
    headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
    },
});

interface ApiResponse<T> {
    data: T;
    status: string;
}

export interface FilterParams {
    [key: string]: string | number | boolean | undefined;
}

const apiService = {
    async searchAirport(filters: FilterParams): Promise<ApiResponse<any>> {
        const config: AxiosRequestConfig = {
            params: filters,
        };

        try {
            const response = await apiClient.get<ApiResponse<any>>("api/v1/flights/searchAirport", config);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching data from API 1:", error.message);
            throw error.response?.data || error;
        }
    },

    async getFlights(filters: FilterParams): Promise<ApiResponse<any>> {
        const config: AxiosRequestConfig = {
            params: filters,
        };

        try {
            const response = await apiClient.get<ApiResponse<any>>("/api/v2/flights/searchFlights", config);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching data from API 2:", error.message);
            throw error.response?.data || error;
        }
    },
};

export default apiService;
