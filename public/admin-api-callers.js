 const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://well-spent-5.onrender.com";
export async function getPendingAppointmentsAdminAPICaller(){
    try{
        const response = await fetch(`${API_URL}/admin/appointments/pending`, {
          method: "GET",
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
             const response3 = await fetch(`${API_URL}/admin/appointments/pending`, {
          method: "GET",
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
        return{
            success: false,
            datas: null
        }
    }
}

export async function markAsDoneAppointmentAPICaller(appointment_id){
  try{
    const response = await fetch(`${API_URL}/admin/appointments/pending`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        appointment_id: appointment_id
      })
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
             const response3 = await fetch(`${API_URL}/admin/appointments/pending`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        appointment_id: appointment_id
      })
    });
            const data3 = await response3.json();
            return data3;
          }

       }
        return data;
    
  }catch(err){
    return {
      success: false,
      markAsDone: false
    }
  }
}