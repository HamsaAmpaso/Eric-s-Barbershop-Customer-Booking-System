const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://eric-s-barbershop-customer-booking-system.onrender.com";

export async function bookAppointmentAPICaller(day_time, note){
    try{
        const response = await fetch(`${API_URL}/user/appointments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                day_time: day_time,
                note: note
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
             const response3 = await fetch(`${API_URL}/user/appointments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                day_time: day_time,
                note: note
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
            booked: false
        }
    }
}

export async function viewAllUserPendingAppointmentsAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/appointments/pending`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
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
             const response3 = await fetch(`${API_URL}/user/appointments/pending`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            }
        });

            const data3 = await response3.json();
            return data3;
          }

       }
        return data;

    }catch(err){
        return {
            success: false
        }
    }
}

export async function cancelAppointmentUserAPICaller(appointment_id, day_time){
    try{
        const response = await fetch(`${API_URL}/user/appointments/pending`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                 appointment_id: appointment_id,
                 day_time: day_time
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
             const response3 = await fetch(`${API_URL}/user/appointments/pending`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                 appointment_id: appointment_id,
                 day_time: day_time
            })
        });

            const data3 = await response3.json();
            return data3;
          }

       }
        return data;


    }catch(err){
        console.log(err);
        return {
           success: false,
           userCancel: false
        }
    }
}
export async function viewAllCompletedAppointmentsUserAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/appointments/completed`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
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
             const response3 = await fetch(`${API_URL}/user/appointments/completed`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            }
        });

            const data3 = await response3.json();
            return data3;
          }

       }
        return data;

    }catch(err){
        console.log(err);
        return {
            success: false
        }
    }
}
export async function viewNotificationsUserAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/notifications`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
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
             const response3 = await fetch(`${API_URL}/user/notifications`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            }
        });

            const data3 = await response3.json();
            return data3;
          }

       }
        return data;

    }catch(err){
        return {
            success: false
        }
    }
}