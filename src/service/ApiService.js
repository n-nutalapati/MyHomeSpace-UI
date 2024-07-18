import axios from "axios";

class ApiService {

    static BASE_URL = "http://localhost:8080/api/mdb";

    /**
     * API Calls for Notes
    */

    static async createNote(noteData, token){
        try{
            const response = await axios.post(`${ApiService.BASE_URL}/createNote`, noteData,  
                { headers: {Authorization: `Bearer ${token}`} }
            );
            return response.data;

        }catch(e){
            throw e;
        }
    }

    static async getNotes(userId, token){
        try{
            const response = await axios.get(`${ApiService.BASE_URL}/getNotes/${userId}`,
                { headers: {Authorization: `Bearer ${token}`} }
            );
            return response.data;

        }catch(e){
            throw e;
        }
    }

    static async deleteNote(noteId, token){
        try{
            const response = await axios.delete(`${ApiService.BASE_URL}/deleteNote/${noteId}`,  {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;

        }catch(e){
            throw e;
        }
    }

    static async updateNote(noteId, noteData, token){
        try{
            const response = await axios.put(`${ApiService.BASE_URL}/updateNote/${noteId}`,  noteData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;

        }catch(e){
            throw e;
        }
    }

    /**
     * API Calls for Menus
    */

    static async createMenu(menuData, token){
        try{
            const response = await axios.post(`${ApiService.BASE_URL}/createMenu`, menuData,  
                { headers: {Authorization: `Bearer ${token}`} }
            );
            return response.data;

        }catch(e){
            throw e;
        }
    }

    static async getMenus(userId, token){
        try{
            const response = await axios.get(`${ApiService.BASE_URL}/getMenus/${userId}`,
                { headers: {Authorization: `Bearer ${token}`} }
            );
            return response.data;

        }catch(e){
            throw e;
        }
    }

    static async updateMenu(menuId, menuData, token){
        try{
            const response = await axios.put(`${ApiService.BASE_URL}/updateMenu/${menuId}`,  menuData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;

        }catch(e){
            throw e;
        }
    }

    static async deleteMenu(menuId, token){
        try{
            const response = await axios.delete(`${ApiService.BASE_URL}/deleteMenu/${menuId}`,  {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;

        }catch(e){
            throw e;
        }
    }

}

export default ApiService;