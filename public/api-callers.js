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
export async function logoutAPICaller(){
    try{
       const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
       });

       const data = await response.json();
       
       if(response.status === 401){
           return {
            forceLogout: true
           }
       }
       if(data.tokenExpired){
          console.log("refreshed");
          const response2 = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
          });
          const data2 = await response2.json();

          if(data2.success){
             const response3 = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                }
              });

            const data3 = await response3.json();
            return data3;
          }

       }
       return data;

    }catch(err){
       return {
        success: false,
        logout: false
       }
    }
}


export async function loginAPICaller(username, password){
    try{
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              password: password
            })

        });
        const data = await response.json();
        return data;
    }catch(err){
        return {
            success: false,
            login: false
        }
    }
}