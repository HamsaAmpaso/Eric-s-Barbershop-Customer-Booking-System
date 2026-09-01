const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://well-spent-5.onrender.com";
export async function confirmingPasswordAPICaller(password){
    try{
       const response = await fetch(`${API_URL}/auth/password`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            password: password
        })
       });

       const data = await response.json();
       return data;
    }catch(err){
       return {
        success: false,
        confirmationAccount: false
       }
    }
}
export async function cancelAccountConfirmationAPICaller(){
    try{
        const response = await fetch(`${API_URL}/auth/users`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type":"application/json"}
        });
        const data = await response.json();
        return data;
    }catch(err){
        return {
            success: false,
            cancellation: false
        }
    }
}