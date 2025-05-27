import axios from 'axios';
import apiConfig from './apiConfig';


/**
 * Wrapper générique pour tous les appels API GET.
 * @param path  – chemin relatif (ex. "/pokemon")
 * @param params – query params optionnels
 * @returns données typées en T
 */
export async function getAxiosInstance<T>(path: string, params?: Record<string, any>): Promise<T>{
    try{
        const response = await apiConfig.get<T>(path, {params});
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



