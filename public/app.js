import { confirmingPasswordAPICaller } from "./api-callers.js";
import { cancelAccountConfirmationAPICaller } from "./api-callers.js";
import { logoutAPICaller } from "./api-callers.js";
import { loginAPICaller } from "./api-callers.js";
import { bookAppointmentAPICaller } from "./user-api-callers.js";
import { getPendingAppointmentsAdminAPICaller } from "./admin-api-callers.js";
import { markAsDoneAppointmentAPICaller } from "./admin-api-callers.js";
import { cancelAppointmentAdminAPICaller } from "./admin-api-callers.js";
import { viewAllUserPendingAppointmentsAPICaller } from "./user-api-callers.js";
import { cancelAppointmentUserAPICaller } from "./user-api-callers.js";
import { viewAllCompletedAppointmentsUserAPICaller } from "./user-api-callers.js";
import { getCompletedAppointmentsADMINSIDEAPICaller } from "./admin-api-callers.js";
import { viewCancelledAppointmentsAPICaller } from "./admin-api-callers.js";
import { viewNotificationsUserAPICaller } from "./user-api-callers.js";
import { viewAdminNotificationsAPICaller } from "./admin-api-callers.js";
import { addWalkinAPICaller } from "./admin-api-callers.js";
import { dashboardAPICaller } from "./admin-api-callers.js";
const notifSound = new Audio("./sounds/notification.wav");



const socket = io("https://eric-s-barbershop-customer-booking-system.onrender.com", {
    withCredentials: true
});

socket.on("connect", () => {
    console.log("SOCKET CONNECTED:", socket.id);
    registerSocket();
});

socket.on("notification", (notification) => {
    console.log("NOTIFICATION RECEIVED:", notification);

    notifSound.play().catch(err => {
        console.log("Notification sound blocked:", err);
    });

    const div = document.createElement("div");
    div.classList.add("notification");

    const parent = document.querySelector(".body");

    if (!parent) return;

    parent.appendChild(div);

    const h2 = document.createElement("h2");
    h2.textContent = "You have a new notification check it out!";
    div.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = notification.message;
    div.appendChild(p);

    div.classList.add("go");

    setTimeout(() => {
        div.remove();
    }, 4000);

    getUserAppointments();
});

socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
    console.log("Socket connection error:", error.message);
});

function registerSocket() {
    const userId = localStorage.getItem("userId");

    console.log("USER ID:", userId);

    if (!userId) {
        console.log("No userId in localStorage");
        return;
    }

    console.log("Sending register:", userId);

    socket.emit("register", userId);
}


   const userDiv = document.querySelector(".user-mode");
   const menu = document.querySelector("#menu");
   const main = document.querySelector(".main");
   const nav = document.querySelector(".nav");
   const overlay = document.querySelector(".overlay");
   const close_nav = document.querySelector("#close-nav");
   const one= document.querySelector("#one");
   const two = document.querySelector("#two");
   const three = document.querySelector("#three");
   const first = document.querySelector("#first");
   const second = document.querySelector("#second");
   const third = document.querySelector("#third");
   const topBookNow = document.querySelector("#top-book-now");
   const adminDiv = document.querySelector(".admin-mode");
   const cancelAppointmentErrorBox = document.querySelector("#cancel-appointment-error-box");
   const closeCancelAppointmentErrorBox = document.querySelector(".okay-cancel-appointment");

   const confirmSignupBOX = document.querySelector("#confirm-signup-box");
   const passwordInputConfirmation = document.querySelector("#password-input-signup-confirmation")
   const confirmingSignupBTN = document.querySelector("#signup-btn-password");
   const cancelConfirmation = document.querySelector("#signup-cancel-btn-password");
   const passwordConfirmationError = document.querySelector("#password-confirmation-error");

   const confirmationErrorBox = document.querySelector("#confirm-account-error-box");
   const closeConfirmationErrorBox = document.querySelector(".okay-confirmation-acount");

   const cancelConfirmationErrorBox = document.querySelector("#cancel-confirm-account-error-box");
   const closeCancelConfirmationErrorBox = document.querySelector(".okay-cancel-confirmation-acount");

   const userNav = document.querySelector(".user-nav");
   const viewUserNav = document.querySelector("#menu-user");
   const closeUserNav = document.querySelector("#close-nav-user");
   const logoutBTN = document.querySelector("#log-out-btn");
   const logoutErrorBox = document.querySelector("#logout-error-box");
   const closeLogoutErrorBox = document.querySelector(".okay-logout");

   const bookAnAppointmentBTN = document.querySelector("#user-book-now-btn");
   const bookAnppointmentBox = document.querySelector("#book-appointment-input-box");
   const dayTimeInput = document.querySelector("#day-and-time-input");
   const dayTimeError = document.querySelector("#day-and-time-error");
   const noteInput = document.querySelector("#note-input");
   const noteError = document.querySelector("#note-error");
   const confirmBookingBTn = document.querySelector("#confirm-booking-btn");
   const cancelBooking = document.querySelector("#cancel-booking-btn");
    const status = localStorage.getItem("status");
    const role = localStorage.getItem("role");
    const bookingErrorBox = document.querySelector("#booking-appointment-error-box");
    const closeBookingErrorBox = document.querySelector(".okay-booking");
    const notificationDiv = document.querySelector(".notification");
    const notificationMEssage = document.querySelector("#message");

    const viewAllPedingAppointmentsAdminBTN = document.querySelector("#view-appointments-admin");
    const viewALLPendingAppointmentsErrorBox = document.querySelector("#pending-appointments-error-box");
    const closeViewPEndingAPPOIntmentsErrorBox = document.querySelector(".okay-pending");
    const markAsDoneApoointmentErrorBox = document.querySelector("#mark-as-done-appointment-error-box");
    const closeMarkAsDoneAppointmentErrorBox = document.querySelector(".okay-mark-as-done");

   const viewAPPOINTMENTSUSERBTN = document.querySelector("#view-appointments");
   const viewUserAppointmentsErrorBox = document.querySelector("#view-user-appointments-error-box");
   const closeViewUserAppointmentsErrorBox = document.querySelector(".okay-user-appointments");
   const guideText = document.querySelector(".h2-on-user");
   const hairCutGrid = document.querySelector(".haircut-grid");
   const userCancelAppointmentErrorBox = document.querySelector("#user-cancel-appointment-error-box");
   const closeUserCancelAppointmentErrorBox = document.querySelector(".okay-user-cancel-appointments");
   const viewCompletedUserAppointmentsBTN = document.querySelector("#view-completed");
   const viewCompletedAppointmentsErrorBox = document.querySelector("#user-completed-appointment-error-box");
   const closeViewCompletedAppointmentsErrorBox = document.querySelector(".okay-user-completed-appointments");
   const viewCompletedAppointmentsADMINACTIONBTN = document.querySelector("#view-completed-admin");
   const viewCompletedAppointmentsADMINERRORBOX = document.querySelector("#admin-completed-appointment-error-box");
   const closeViewCompletedADMINErroBOx = document.querySelector(".okay-admin-completed-appointments");
   const viewAllCancelledAppointments = document.querySelector("#view-all-calcelled-appointments");
   const viewCancelledAppointmentsErrorBox = document.querySelector("#admin-cancelled-view-appointment-error-box");
   const closeViewCancelledAppointmentsErrorBox = document.querySelector(".okay-admin-cancelled-view-appointments");
   const viewNotificationsUserBTN = document.querySelector("#user-notifications");


    if(status === "account-pending"){
       confirmSignupBOX.classList.add("using");
       overlay.classList.add("active");
   }

   if(status === "logged-in" && role === 'user'){
       userDiv.classList.add("logged-in");
       main.classList.add("logged-in");
       topBookNow.classList.add("hide");
       registerSocket();
       
      
   }
   if(status === "logged-in" && role === 'admin'){
      getPendingAppointmentsADMIN();
       adminDiv.classList.add("logged-in");
       main.classList.add("logged-in");
       topBookNow.classList.add("hide");
       socket.on("new-appointment", (data)=>{
         console.log(data.message);
         notifSound.play();
         notificationMEssage.textContent = data.message;
         notificationDiv.classList.add("go");
         setTimeout(()=>{
           notificationDiv.classList.remove("go");
         }, 5000);

         
         

         notificationDiv.addEventListener("click", async ()=>{
         try{
         notificationDiv.classList.remove("go");
         ("active");
         const appointments = await getPendingAppointmentsAdminAPICaller();
         if(appointments.forceLogout){
          forceLogout();
         }
         if(!appointments.success){
          viewALLPendingAppointmentsErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
         }
         renderPendingAppointments(appointments.datas);
      }catch(err){
         console.log(err);
         viewALLPendingAppointmentsErrorBox.classList.add("shown");
         overlay.classList.add("active");
         return;
      }
         });


         getPendingAppointmentsADMIN();

         
       });

       registerSocket()
       
   }

   const userNotificationsDiv = document.querySelector("#user-notifications-div");
   const userViewNotificationsErroBox = document.querySelector("#user-view-notifications-error-box");
   const closeUserViewNotificationsErrorBox = document.querySelector(".okay-user-view-notifications");

   const adminNotificationsDiv = document.querySelector("#admin-notifications-div");
   const viewAdminNotificationsBTN = document.querySelector("#admin-notifications");
   const adminViewNotificationErrorBox = document.querySelector("#admin-view-notifications-error-box");
   const closeAdminViewNotificationsErrorBox = document.querySelector(".okay-admin-view-notifications");
   const dashboardBTN = document.querySelector("#dashboard");
   const dashboardErrorBOx = document.querySelector("#admin-dashboard-error-box");
   const closeDashboardErrorBox = document.querySelector(".okay-admin-dashboard");
   const dashboardDiv = document.querySelector(".dashboard-div");

   function renderDashboard(obj){
      dashboardDiv.innerHTML = "";
      dashboardDiv.classList.add("show");
      const todayAppointmentsDiv = document.createElement("div");
      todayAppointmentsDiv.classList.add("board");
      todayAppointmentsDiv.id = "todayAppointments";
      dashboardDiv.appendChild(todayAppointmentsDiv);
      const todayAppointmentsP = document.createElement("p");
      todayAppointmentsP.textContent = `Appointments Today`;
      todayAppointmentsDiv.appendChild(todayAppointmentsP);
      const todayAppointmentValue = document.createElement("h3");
      todayAppointmentValue.textContent = obj.appointmentsToday;
      todayAppointmentsDiv.appendChild(todayAppointmentValue);

      const revenueTodayDiv = document.createElement("div");
      revenueTodayDiv.classList.add("board");
      revenueTodayDiv.id = "revenueToday";
      dashboardDiv.appendChild(revenueTodayDiv);
      const revenueTodatP = document.createElement("p");
      revenueTodatP.textContent = "Revenue Today";
      revenueTodayDiv.appendChild(revenueTodatP);
      const revenueTodayValue = document.createElement("h3");
      revenueTodayValue.textContent = `${obj.revenueToday}₱`;
      revenueTodayDiv.appendChild(revenueTodayValue);

      const completedTodayDiv = document.createElement("div");
      completedTodayDiv.classList.add("board");
      completedTodayDiv.id = "completedToday";
      dashboardDiv.appendChild(completedTodayDiv);
      const compleetdTodayP = document.createElement("p");
      compleetdTodayP.textContent = 'Completed Today';
      completedTodayDiv.appendChild(compleetdTodayP);
      const compleetdTodayValue = document.createElement("h3");
      compleetdTodayValue.textContent = obj.completedToday;
      completedTodayDiv.appendChild(compleetdTodayValue);

      const cancelledTodayDiv = document.createElement("div");
      cancelledTodayDiv.classList.add("board");
      cancelledTodayDiv.id = "cancelledToday";
      dashboardDiv.appendChild(cancelledTodayDiv);
      const cancelledTodayP = document.createElement("p");
      cancelledTodayP.textContent = "Cancelled Today";
      cancelledTodayDiv.appendChild(cancelledTodayP);
      const cancelledTodayValue = document.createElement("h3");
      cancelledTodayValue.textContent = obj.cancelledToday;
      cancelledTodayDiv.appendChild(cancelledTodayValue);

      const totalIncomeDiv = document.createElement("div");
      totalIncomeDiv.classList.add("board");
      totalIncomeDiv.id = "totalIncome";
      dashboardDiv.appendChild(totalIncomeDiv);
      const totalIncomeP =  document.createElement("p");
      totalIncomeP.textContent = "Total Income";
      totalIncomeDiv.appendChild(totalIncomeP);
      const totalIncomeValue = document.createElement("h3");
      totalIncomeValue.textContent = `${obj.totalIncome}₱`;
      totalIncomeDiv.appendChild(totalIncomeValue);

      const allCancelledDiv = document.createElement("div");
      allCancelledDiv.classList.add("board");
      allCancelledDiv.id = "cancelledOverall";
      dashboardDiv.appendChild(allCancelledDiv);
      const allCancelledP = document.createElement("p");
      allCancelledP.textContent = "Cancelled";
      allCancelledDiv.appendChild(allCancelledP);
      const allCancelledValue = document.createElement("h3");
      allCancelledValue.textContent = obj.allCancelled;
      allCancelledDiv.appendChild(allCancelledValue);

      const allPendingDiv = document.createElement("div");
      allPendingDiv.classList.add("board");
      allPendingDiv.id = "pendingOverall";
      dashboardDiv.appendChild(allPendingDiv);
      const allPendingP = document.createElement("p");
      allPendingP.textContent = "Pending";
      allPendingDiv.appendChild(allPendingP);
      const allPendingValue = document.createElement("h3");
      allPendingValue.textContent = obj.allPending;
      allPendingDiv.appendChild(allPendingValue);

      const appointmentsPerDayDiv = document.createElement("div");
      appointmentsPerDayDiv.classList.add("board");
      appointmentsPerDayDiv.id = "appointmentsPerDay";
      dashboardDiv.appendChild(appointmentsPerDayDiv);
      const canvas = document.createElement("canvas");
      appointmentsPerDayDiv.appendChild(canvas);
      
      const dates = obj.appointmentsPerDay.map((a)=> new Date(a.day).toLocaleDateString());
      const numbers = obj.appointmentsPerDay.map((a)=> a.number);

       const expenseChart = new Chart(canvas, {
        type: "bar",

        data: {
            labels: dates,

            datasets: [
                {
                    label: "Daily Completed Appointments",
                    data: numbers
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });


    const comparisonDiv = document.createElement("div");
    comparisonDiv.classList.add("board");
    comparisonDiv.id = "comparison";
    dashboardDiv.appendChild(comparisonDiv);
    const pie = document.createElement("canvas");
    comparisonDiv.appendChild(pie);

    const expenseChart2 = new Chart(pie, {
        type: "pie",

        data: {
            labels: ["Walk in", "Online"],

            datasets: [
                {
                    label: "Appointment Distribution",
                     data: [
                      obj.comparison.walkin,
                      obj.comparison.online
                     ]
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });





   }

   closeDashboardErrorBox.addEventListener("click", ()=>{
      dashboardErrorBOx.classList.remove("shown");
      overlay.classList.remove("active");
   });

   dashboardBTN.addEventListener("click", async ()=>{
        adminNav.classList.remove("using");
        overlay.classList.remove("active");
        container.innerHTML = "";
        container.classList.add("hide");
        try{
           const dashboard = await dashboardAPICaller();
           if(dashboard.forceLogout){
            forceLogout();
           }
           if(!dashboard.success){
             dashboardErrorBOx.classList.add("shown");
             overlay.classList.add("active");
             return;
           }
           console.log(dashboard.datas);
           renderDashboard(dashboard.datas);
        }catch(err){
         console.log(err);
         dashboardErrorBOx.classList.add("shown");
         overlay.classList.add("active");
        }
   });

   async function getDashboard(){
        adminNav.classList.remove("using");
        overlay.classList.remove("active");
        container.innerHTML = "";
        container.classList.add("hide");
        try{
           const dashboard = await dashboardAPICaller();
           if(dashboard.forceLogout){
            forceLogout();
           }
           if(!dashboard.success){
             dashboardErrorBOx.classList.add("shown");
             overlay.classList.add("active");
             return;
           }
           console.log(dashboard.datas);
           renderDashboard(dashboard.datas);
        }catch(err){
         console.log(err);
         dashboardErrorBOx.classList.add("shown");
         overlay.classList.add("active");
        }
   }


     function renderAdminNotifications(arr){
      adminNotificationsDiv.innerHTML = "";
      const text = document.createElement("h3");
      text.textContent = `Your Notifications`;
      adminNotificationsDiv.appendChild(text);
      arr.forEach((a)=>{
        const notif = document.createElement("div");
        notif.classList.add("notif")
        adminNotificationsDiv.appendChild(notif);
        const subject = document.createElement("h4");
        subject.textContent = `${a.type}`;
        notif.appendChild(subject);
        const message = document.createElement("p");
        message.textContent = a.message;
        notif.appendChild(message);
        const time = document.createElement("p");
        time.textContent = new Date(a.created_at).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        });
        notif.appendChild(time);
      });
   }

   closeAdminViewNotificationsErrorBox.addEventListener("click", ()=>{
      adminViewNotificationErrorBox.classList.remove("shown");
      overlay.classList.remove("active");
   });

   viewAdminNotificationsBTN.addEventListener("click", async ()=>{
     adminNav.classList.remove("using");
     overlay.classList.add("active");
     adminNotificationsDiv.classList.add("show");
     try{
        const notifications = await viewAdminNotificationsAPICaller();

        if(notifications.forceLogout){
         forceLogout();
        }
        if(!notifications.success){
            adminViewNotificationErrorBox.classList.add("shown");
            overlay.classList.add("active");
             adminNotificationsDiv.classList.remove("show");
            return;
            
        }
        renderAdminNotifications(notifications.datas);
     }catch(err){
        console.log(err);
        adminViewNotificationErrorBox.classList.add("shown");
            overlay.classList.add("active");
            adminNotificationsDiv.classList.remove("show");
     }
   });

   
   


   function renderUserNotifications(arr){
      userNotificationsDiv.innerHTML = "";
      const text = document.createElement("h3");
      text.textContent = `Your Notifications`;
      userNotificationsDiv.appendChild(text);
      arr.forEach((a)=>{
        const notif = document.createElement("div");
        notif.classList.add("notif")
        userNotificationsDiv.appendChild(notif);
        const subject = document.createElement("h4");
        subject.textContent = `${a.type}`;
        notif.appendChild(subject);
        const message = document.createElement("p");
        message.textContent = a.message;
        notif.appendChild(message);
        const time = document.createElement("p");
        time.textContent = new Date(a.created_at).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        });
        notif.appendChild(time);
      });
   }

   closeUserViewNotificationsErrorBox.addEventListener("click", ()=>{
      userViewNotificationsErroBox.classList.remove("shown");
      overlay.classList.remove("active");
   });

   viewNotificationsUserBTN.addEventListener("click", async ()=>{
      userNav.classList.remove("using");
      overlay.classList.add("active");
      userNotificationsDiv.classList.add("show");
      try{
         const notifications = await viewNotificationsUserAPICaller();
         if(notifications.forceLogout){
            forceLogout();
         }
         if(!notifications.success){
            userViewNotificationsErroBox.classList.add("shown");
            overlay.classList.add("active");
            userNotificationsDiv.classList.remove("show");
            return;
         }
         console.log(notifications.datas);
         renderUserNotifications(notifications.datas);
      }catch(err){
         console.log(err);
         userViewNotificationsErroBox.classList.add("shown");
         overlay.classList.add("active");
           userNotificationsDiv.classList.remove("show"); 
      }
   });

   closeViewCancelledAppointmentsErrorBox.addEventListener("click", ()=>{
      viewCancelledAppointmentsErrorBox.classList.remove("shown");
       overlay.classList.remove("active");
   });

   viewAllCancelledAppointments.addEventListener("click", async ()=>{
      adminNav.classList.remove("using");
      overlay.classList.remove("active");
      try{
         const appointments = await viewCancelledAppointmentsAPICaller();
         if(appointments.forceLogout){
            forceLogout();
         }
         if(!appointments.success){
            viewCancelledAppointmentsErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
         }
         console.log(appointments.datas)

         renderCancelledAppointments(appointments.datas);
      }catch(err){
            console.log(err);
            viewCancelledAppointmentsErrorBox.classList.add("shown");
            overlay.classList.add("active");
      }
   });

    function renderCancelledAppointments(arr){
       container.classList.remove("hide");
      dashboardDiv.innerHTML = "";
      dashboardDiv.classList.remove("show");
      container.innerHTML = "";
      const guide = document.createElement("h2");
      guide.textContent = `Cancelled Appointments`;
      container.appendChild(guide);
      arr.forEach((a)=>{
         const slot = document.createElement("div");
         slot.classList.add("slot");
         slot.classList.add("completed");
         container.appendChild(slot);
         const bookedBy = document.createElement("p");
         bookedBy.textContent = `Booker: ${a.username.split("@")[0]}`;
         slot.appendChild(bookedBy);
         const dayAndTime = document.createElement("p");
         dayAndTime.textContent = `Time: ${new Date(a.day_time).toLocaleString("en-US", {
           month: "long",
           day: "numeric",
           year: "numeric",
           hour: "numeric",
           minute: "2-digit",
         })}`
         slot.appendChild(dayAndTime);
         slot.dataset.note = `Note: ${a.note}.`;
         const status = document.createElement("p");
         status.textContent = `Status: ${a.status}` ;
         slot.appendChild(status);
         const note = document.createElement("p");
         note.textContent = `Note: ${a.note}`;
         slot.appendChild(note);
        
      }); }

    function renderCompletedAppointments(arr){
       container.classList.remove("hide");
      container.innerHTML = "";
      dashboardDiv.innerHTML = "";
      dashboardDiv.classList.remove("show");
      const guide = document.createElement("h2");
      guide.textContent = `Completed Appointments`;
      container.appendChild(guide);
      arr.forEach((a)=>{
         const slot = document.createElement("div");
         slot.classList.add("slot");
         slot.classList.add("completed");
         container.appendChild(slot);
         const bookedBy = document.createElement("p");
         bookedBy.textContent = `Booker: ${a.username.split("@")[0]}`;
         slot.appendChild(bookedBy);
         const dayAndTime = document.createElement("p");
         dayAndTime.textContent = `Time: ${new Date(a.day_time).toLocaleString("en-US", {
           month: "long",
           day: "numeric",
           year: "numeric",
           hour: "numeric",
           minute: "2-digit",
         })}`
         slot.appendChild(dayAndTime);
         slot.dataset.note = `Note: ${a.note}.`;
         const status = document.createElement("p");
         status.textContent = `Status: ${a.status}` ;
         slot.appendChild(status);
         const note = document.createElement("p");
         note.textContent = `Note: ${a.note}`;
         slot.appendChild(note);
        
      }); }

   closeViewCompletedADMINErroBOx.addEventListener("click", ()=>{
      viewCompletedAppointmentsADMINERRORBOX.classList.remove("shown");
      overlay.classList.remove("active");
   })

   viewCompletedAppointmentsADMINACTIONBTN.addEventListener("click", async ()=>{
     adminNav.classList.remove("using");
     overlay.classList.remove("active");
     try{
       const appointments = await getCompletedAppointmentsADMINSIDEAPICaller();
       if(appointments.forceLogout){
         forceLogout();
       }
       if(!appointments.success){
         viewCompletedAppointmentsADMINERRORBOX.classList.add("shown");
         overlay.classList.add("active");
         return;
       }
       renderCompletedAppointments(appointments.datas);
     }catch(err){
         viewCompletedAppointmentsADMINERRORBOX.classList.add("shown");
         overlay.classList.add("active");
     }
   });



   
   function renderUserCompletedAppointments(arr){
      containerUser.innerHTML = "";
      guideText.textContent = `Your Completed Appointments`;
      hairCutGrid.classList.add("hide");
      containerUser.classList.add("show");
      viewHaircutsUser.classList.add("show");
      arr.forEach((a)=>{
         const slot = document.createElement("div");
         slot.classList.add("slot");
         slot.classList.add("completed");
         containerUser.appendChild(slot);
         const bookedBy = document.createElement("p");
         bookedBy.textContent = `Booker: ${a.username.split("@")[0]}`;
         slot.appendChild(bookedBy);
         const dayAndTime = document.createElement("p");
         dayAndTime.textContent = `Time: ${new Date(a.day_time).toLocaleString("en-US", {
           month: "long",
           day: "numeric",
           year: "numeric",
           hour: "numeric",
           minute: "2-digit",
         })}`
         slot.appendChild(dayAndTime);
         slot.dataset.note = `Note: ${a.note}.`;
         const status = document.createElement("p");
         status.textContent = `Status: ${a.status}` ;
         slot.appendChild(status);
         const note = document.createElement("p");
         note.textContent = `Note: ${a.note}`;
         slot.appendChild(note);
      });
   }


   viewCompletedUserAppointmentsBTN.addEventListener("click", async ()=>{
      userNav.classList.remove("using");
      overlay.classList.remove("active");
     try{
       const appointments = await viewAllCompletedAppointmentsUserAPICaller();
       if(appointments.forceLogout){
         forceLogout();
       }
       if(!appointments.success){
         viewCompletedAppointmentsErrorBox.classList.add("shown");
         overlay.classList.add("active");
         return;
       }
       renderUserCompletedAppointments(appointments.datas);
     }catch(err){
        viewCompletedAppointmentsErrorBox.classList.add("shown");
        overlay.classList.add("active");
     }
   });

   closeViewCompletedAppointmentsErrorBox.addEventListener("click", ()=>{
      viewCompletedAppointmentsErrorBox.classList.remove("shown");
      overlay.classList.remove("active");
   });


   


    async function getPendingAppointmentsADMIN(){
      try{
         
         const appointments = await getPendingAppointmentsAdminAPICaller();
         if(appointments.forceLogout){
          forceLogout();
         }
         if(!appointments.success){
          viewALLPendingAppointmentsErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
         }
         renderPendingAppointments(appointments.datas);
      }catch(err){
         console.log(err);
         viewALLPendingAppointmentsErrorBox.classList.add("shown");
         overlay.classList.add("active");
      }
    }

   
   const container = document.querySelector(".appointments-container");
   const containerUser = document.querySelector(".appointments-container-user");
   const viewHaircutsUser = document.querySelector("#view-haircuts-user");
   

   closeMarkAsDoneAppointmentErrorBox.addEventListener("click", ()=>{
      markAsDoneApoointmentErrorBox.classList.remove("shown");
      overlay.classList.remove("active");
   });

   viewHaircutsUser.addEventListener("click", ()=>{
      userNav.classList.remove("using");
      overlay.classList.remove("active");
      containerUser.innerHTML = "";
      guideText.textContent = `Our Sharp Cuts`;
      hairCutGrid.classList.remove("hide");
      containerUser.classList.remove("show");
      viewHaircutsUser.classList.remove("show");
   });

   async function getUserAppointments(){
      try{
           userNav.classList.remove("using");
           overlay.classList.remove("active");
           const appointments = await viewAllUserPendingAppointmentsAPICaller();
           if(appointments.forceLogout){
            forceLogout()
           }
           if(!appointments.success){
            viewUserAppointmentsErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
           }
           console.log(appointments);
           renderUserPendingAppointments(appointments.datas);

        }catch(err){
           console.log(err);
           viewUserAppointmentsErrorBox.classList.add("shown");
           overlay.classList.add("active");
        }
   }
   

   function renderUserPendingAppointments(arr){
      containerUser.innerHTML = "";
      guideText.textContent = `Your Pending Appointments`;
      hairCutGrid.classList.add("hide");
      containerUser.classList.add("show");
      viewHaircutsUser.classList.add("show");
      arr.forEach((a)=>{
         const slot = document.createElement("div");
         slot.classList.add("slot");
         containerUser.appendChild(slot);
         const bookedBy = document.createElement("p");
         bookedBy.textContent = `Booker: ${a.username.split("@")[0]}`;
         slot.appendChild(bookedBy);
         const dayAndTime = document.createElement("p");
         dayAndTime.textContent = `Time: ${new Date(a.day_time).toLocaleString("en-US", {
           month: "long",
           day: "numeric",
           year: "numeric",
           hour: "numeric",
           minute: "2-digit",
         })}`
         slot.appendChild(dayAndTime);
         slot.dataset.note = `Note: ${a.note}.`;
         const status = document.createElement("p");
         status.textContent = `Status: ${a.status}` ;
         slot.appendChild(status);
         const cancelAppointmentBTN = document.createElement("button");
         cancelAppointmentBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>`;
         slot.appendChild(cancelAppointmentBTN);
         cancelAppointmentBTN.dataset.appointment_id = a.appointment_id;
         cancelAppointmentBTN.id = "cancel-appointment";
         cancelAppointmentBTN.addEventListener("click", async ()=>{
            try{
               const cancelling = await cancelAppointmentUserAPICaller(a.appointment_id, a.day_time);
               if(cancelling.forceLogout){
                  forceLogout();
               }
               if(!cancelling.success){
                   userCancelAppointmentErrorBox.classList.add("shown");
                   overlay.classList.add("active");
               }
               getUserAppointments();
            }catch(err){
              console.log(err);
              userCancelAppointmentErrorBox.classList.add("shown");
              overlay.classList.add("active");
            }
         });
      
      });
   }
   closeUserCancelAppointmentErrorBox.addEventListener("click", ()=>{
      userCancelAppointmentErrorBox.classList.remove("shown");
      overlay.classList.remove("active");
   });

   function renderPendingAppointments(arr){
       container.classList.remove("hide");
      dashboardDiv.innerHTML = "";
      dashboardDiv.classList.remove("show");
      container.innerHTML = "";
      const guide = document.createElement("h2");
      guide.textContent = `Pending Appointments`;
      container.appendChild(guide);
      arr.forEach((a)=>{
         
         const slot = document.createElement("div");
         slot.classList.add("slot");
         container.appendChild(slot);
         const bookedBy = document.createElement("p");
         bookedBy.textContent = `Booker: ${a.username.split("@")[0].slice(0, 12)}`;
         slot.appendChild(bookedBy);
         const dayAndTime = document.createElement("p");
         dayAndTime.textContent = `Time: ${new Date(a.day_time).toLocaleString("en-US", {
           month: "long",
           day: "numeric",
           year: "numeric",
           hour: "numeric",
           minute: "2-digit",
         })}`
         slot.appendChild(dayAndTime);
         slot.dataset.note = `Note: ${a.note}.`;
         const status = document.createElement("p");
         status.textContent = `Status: ${a.status}` ;
         slot.appendChild(status);
         const markAsDoneBTN = document.createElement("button");
         markAsDoneBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v255l-80 80v-175H200v400h248l80 80H200Zm0-560h560v-80H200v80Zm0 0v-80 80ZM662-60 520-202l56-56 85 85 170-170 56 57L662-60Z"/></svg>`;
         slot.appendChild(markAsDoneBTN);
         markAsDoneBTN.dataset.appointment_id = a.appointment_id;
         markAsDoneBTN.addEventListener("click", async ()=>{
            try{
            const markAsDone = await markAsDoneAppointmentAPICaller(a.appointment_id, a.scheduled_by);
            if(markAsDone.forceLogout){
               forceLogout();
            }
            if(!markAsDone.success){
               markAsDoneApoointmentErrorBox.classList.add("shown");
               overlay.classList.add("active");
               return;
            }
            getPendingAppointmentsADMIN();
         }catch(err){
            markAsDoneApoointmentErrorBox.classList.add("shown");
            overlay.classList.add("active");
         }
         });
         const cancelAppointmentBTN = document.createElement("button");
         cancelAppointmentBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>`;
         slot.appendChild(cancelAppointmentBTN);
         cancelAppointmentBTN.dataset.appointment_id = a.appointment_id;
         cancelAppointmentBTN.id = "cancel-appointment";
         cancelAppointmentBTN.addEventListener("click", async ()=>{
            try{
            const cancelApp = await cancelAppointmentAdminAPICaller(a.appointment_id, a.scheduled_by);
            if(cancelApp.forceLogout){
               forceLogout();
            }
            if(!cancelApp.success){
               cancelAppointmentErrorBox.classList.add("shown");
               overlay.classList.add("active");
               return;
            }
            getPendingAppointmentsADMIN();

         }catch(err){
            console.log(err);

         }
         });
      }); }




      viewAPPOINTMENTSUSERBTN.addEventListener("click", async ()=>{
        try{
           userNav.classList.remove("using");
           overlay.classList.remove("active");
           const appointments = await viewAllUserPendingAppointmentsAPICaller();
           if(appointments.forceLogout){
            forceLogout()
           }
           if(!appointments.success){
            viewUserAppointmentsErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
           }
           console.log(appointments);
           renderUserPendingAppointments(appointments.datas);

        }catch(err){
           console.log(err);
           viewUserAppointmentsErrorBox.classList.add("shown");
           overlay.classList.add("active");
        }
      });


      closeViewUserAppointmentsErrorBox.addEventListener("click", ()=>{
         viewUserAppointmentsErrorBox.classList.remove("shown");
         overlay.classList.remove("active");
      })

      closeCancelAppointmentErrorBox.addEventListener("click", ()=>{
         cancelAppointmentErrorBox.classList.remove("shown");
         overlay.classList.remove("active");
      })


   viewAllPedingAppointmentsAdminBTN.addEventListener("click", async () => {
      try{
         adminNav.classList.remove("using");
         overlay.classList.remove
         ("active");
         const appointments = await getPendingAppointmentsAdminAPICaller();
         if(appointments.forceLogout){
          forceLogout();
         }
         if(!appointments.success){
          viewALLPendingAppointmentsErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
         }
         console.log(appointments.datas);
         renderPendingAppointments(appointments.datas);
      }catch(err){
         console.log(err);
         viewALLPendingAppointmentsErrorBox.classList.add("shown");
         overlay.classList.add("active");
      }
   });
   closeViewPEndingAPPOIntmentsErrorBox.addEventListener("click", ()=>{
      viewALLPendingAppointmentsErrorBox.classList.remove("shown");
      overlay.classList.remove("active");
   })
   

   const viewAdminNav = document.querySelector("#menu-admin");
   const adminNav = document.querySelector(".admin-nav");
   const closeAdminNav = document.querySelector("#close-nav-admin");
   const adminLogoutBTN = document.querySelector("#log-out-btn-admin");

   const walkInDiv = document.querySelector("#walk-in-appointment-input-box");
   const dayAndTimeErrorWalkin = document.querySelector("#day-and-time-error-walk-in");
   const dayAndTimeInputWalkin = document.querySelector("#day-and-time-input-walk-in");
   const confirmWalkinBTN = document.querySelector("#confirm-booking-btn-walk-in");
   const cancelWalkin = document.querySelector("#cancel-booking-btn-walk-in");
   const addWalkinBTN = document.querySelector("#the-add-walk-in");

   addWalkinBTN.addEventListener("click", ()=>{
      walkInDiv.classList.add("using");
      overlay.classList.add("active");
   });

   const addWalkinAppointmentsErrorBox = document.querySelector("#admin-add-walkin-error-box");
   const closeAddWalkinAppointmentsErrorBox= document.querySelector(".okay-admin-add-walkin");

   closeAddWalkinAppointmentsErrorBox.addEventListener("click", ()=>{
       addWalkinAppointmentsErrorBox.classList.remove("shown");
       overlay.classList.remove("active");
   })

   confirmWalkinBTN.addEventListener("click", async ()=>{
    let hasError = false;
    const appointmentTime = new Date(dayAndTimeInputWalkin.value);
     if(dayAndTimeInputWalkin.value === "" || appointmentTime.getTime() > Date.now()){
       dayAndTimeErrorWalkin.textContent = "Please enter a proper walkin date and time must be before or during this day!"
       dayAndTimeErrorWalkin.classList.add("errored");
       dayAndTimeInputWalkin.value = "";
       hasError = true;
     }
     if(hasError)return;
     const walkinDateAndTime = new Date(dayAndTimeInputWalkin.value).toISOString();
     try{
       const add = await addWalkinAPICaller(walkinDateAndTime);
       if(add.forceLogout){
         forceLogout();
       }
       if(!add.success){
          addWalkinAppointmentsErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
       }

       getDashboard();
       
     }catch(err){
      console.log(err);
       addWalkinAppointmentsErrorBox.classList.add("shown");
       overlay.classList.add("active");
     }
     dayAndTimeErrorWalkin.textContent = "";
     dayAndTimeErrorWalkin.classList.remove("errored");
     dayAndTimeInputWalkin.value = "";
      walkInDiv.classList.remove("using");
      overlay.classList.remove("active");
   });

   cancelWalkin.addEventListener("click", ()=>{
      dayAndTimeErrorWalkin.textContent = "";
     dayAndTimeErrorWalkin.classList.remove("errored");
     dayAndTimeInputWalkin.value = "";
      walkInDiv.classList.remove("using");
      overlay.classList.remove("active");
   });


   







   viewAdminNav.addEventListener("click", ()=>{
     adminNav.classList.add("using");
     overlay.classList.add("active");
   });
   closeAdminNav.addEventListener("click", ()=>{
     adminNav.classList.remove("using");
     overlay.classList.remove("active");
   });

     adminLogoutBTN.addEventListener("click", async ()=>{
     try{
       container.innerHTML = "";
       const logout = await logoutAPICaller();
       if(logout.forceLogout){
        forceLogout();
       }
       if(!logout.success){
          logoutErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
       }
       adminDiv.classList.remove("logged-in");
       main.classList.remove("logged-in");
       topBookNow.classList.remove("hide");
       localStorage.setItem("status", "logged-out");
       localStorage.setItem("role", "none");
       adminNav.classList.remove("using");
       overlay.classList.remove("active");
     }catch(err){
        logoutErrorBox.classList.add("shown");
        overlay.classList.add("active");
     }
   });


   closeBookingErrorBox.addEventListener("click", ()=>{
      bookingErrorBox.classList.remove("shown");
      overlay.classList.remove("active");
   });


   











   confirmBookingBTn.addEventListener("click", async ()=>{
      try{
         let hasError = false;
         const appointmentTime = new Date(dayTimeInput.value);
         if(dayTimeInput.value === "" || appointmentTime.getTime() <= Date.now()){
            dayTimeError.textContent = "Please choose a proper day and time for your appointment!";
            dayTimeError.classList.add("errored");
            hasError = true;
         }
         if(noteInput.value.trim() === ""){
            noteError.textContent = "Please enter a note if you dont have any note type none!";
            noteError.classList.add("errored");
            hasError = true;
         }
         if (noteInput.value.trim().length > 30) {
            noteError.textContent = "Note must not exceed 30 characters!";
            noteError.classList.add("errored");
            noteInput.value = "";
            hasError = true;
}
         if(hasError)return;
         const dayAndTime = new Date(dayTimeInput.value).toISOString();
         const note = noteInput.value.trim();

         const booking = await bookAppointmentAPICaller(dayAndTime, note);
         if(booking.forceLogout){
            forceLogout();
         }
         if(!booking.success){
           bookingErrorBox.classList.add("shown");
           overlay.classList.add("active");
           return;
         }

         getUserAppointments();

         dayTimeInput.value = "";
         noteInput.value = "";
         dayTimeError.textContent = "";
         noteError.textContent = "";
         dayTimeError.classList.remove("errored");
         noteError.classList.remove("errored");
         bookAnppointmentBox.classList.remove("using");
         overlay.classList.remove("active");


      }catch(err){
         bookingErrorBox.classList.add("shown");
         overlay.classList.add("active");
      }
   });

   cancelBooking.addEventListener("click", ()=>{
      dayTimeInput.value = "";
      noteInput.value = "";
      dayTimeError.textContent = "";
      noteError.textContent = "";
      dayTimeError.classList.remove("errored");
      noteError.classList.remove("errored");
      bookAnppointmentBox.classList.remove("using");
      overlay.classList.remove("active");
      
   });

   bookAnAppointmentBTN.addEventListener("click", ()=>{
      bookAnppointmentBox.classList.add("using");
      overlay.classList.add("active");
   });

   closeLogoutErrorBox.addEventListener("click", ()=>{
     overlay.classList.remove("active");
     logoutErrorBox.classList.remove("shown");
     forceLogout();

   });



   closeUserNav.addEventListener("click", ()=>{
      userNav.classList.remove("using");
      overlay.classList.remove("active");
   });

   viewUserNav.addEventListener("click", ()=>{
      userNav.classList.add("using");
      overlay.classList.add("active");
   });

  

   function forceLogout(){
       userDiv.classList.remove("logged-in");
       main.classList.remove("logged-in");
       topBookNow.classList.remove("hide");
       container.innerHTML = "";
       localStorage.setItem("status", "logged-out");
       localStorage.setItem("role", "none");
       console.log("force logout!");
       adminNav.classList.remove("using");
       overlay.classList.remove("active");
       adminDiv.classList.remove("logged-in");
    
   }

   logoutBTN.addEventListener("click", async ()=>{
      
     try{
       const logout = await logoutAPICaller();
       if(logout.forceLogout){
        forceLogout();
       }
       if(!logout.success){
          logoutErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
       }
       container.innerHTML = "";
       userDiv.classList.remove("logged-in");
       main.classList.remove("logged-in");
       topBookNow.classList.remove("hide");
       localStorage.setItem("status", "logged-out");
       localStorage.setItem("role", "none");
       userNav.classList.remove("using");
       overlay.classList.remove("active");
       
     }catch(err){
         logoutErrorBox.classList.add("shown");
        overlay.classList.add("active");
     }
   });








   cancelConfirmation.addEventListener("click", async ()=>{
      try{
         const data = await cancelAccountConfirmationAPICaller();
         if(data.success){
             confirmSignupBOX.classList.remove("using");
             overlay.classList.remove("active");
             localStorage.setItem("status", "logged-out");
             passwordConfirmationError.textContent = "";
             passwordConfirmationError.classList.remove("errored");
             passwordInputConfirmation.value ="";

         }else{
             confirmSignupBOX.classList.remove("using");
             overlay.classList.remove("active");
             passwordConfirmationError.textContent = "";
             passwordConfirmationError.classList.remove("errored");
             passwordInputConfirmation.value ="";
             cancelConfirmationErrorBox.classList.add("shown");
             overlay.classList.add("active");
             return;
         }
      }catch(err){
        console.log(err);
         cancelConfirmationErrorBox.classList.add("shown");
             overlay.classList.add("active");
      }
   });

   closeCancelConfirmationErrorBox.addEventListener("click", ()=>{
       cancelConfirmationErrorBox.classList.remove("shown");
       overlay.classList.remove("active");
   });


   closeConfirmationErrorBox.addEventListener("click", ()=>{
      confirmationErrorBox.classList.remove("shown");
      overlay.classList.remove("active");
   })





   confirmingSignupBTN.addEventListener("click", async ()=>{
    let hasError = false;
      if(passwordInputConfirmation.value.trim() === ""){
          passwordConfirmationError.textContent = "Please type a proper password for your account!";
          passwordConfirmationError.classList.add("errored");
          hasError = true;
      }
      if(hasError)return;
      const password = passwordInputConfirmation.value.trim();
      try{
         const call = await confirmingPasswordAPICaller(password);
         if(call.validationError){
            passwordConfirmationError.textContent = "Please type a proper password for your account must be atleast 8 letters and must be combination of both letters and numbers!";
            passwordConfirmationError.classList.add("errored");
            passwordInputConfirmation.value ="";
            return;
         }
         if(!call.success){
             confirmSignupBOX.classList.remove("using");
             passwordConfirmationError.textContent = "";
             passwordConfirmationError.classList.remove("errored");
             passwordInputConfirmation.value ="";
            confirmationErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
         }
         main.classList.add("logged-in");
         localStorage.setItem("status", "logged-in");
         userDiv.classList.add("logged-in")
         confirmSignupBOX.classList.remove("using");
         overlay.classList.remove("active");
         passwordConfirmationError.textContent = "";
         passwordConfirmationError.classList.remove("errored");
         passwordInputConfirmation.value ="";
         localStorage.setItem("role", call.role);
         topBookNow.classList.add("hide");
         localStorage.setItem("userId", call.userId);
         
         registerSocket();



      }catch(err){
        console.log(err);
        confirmationErrorBox.classList.add("shown");
        overlay.classList.add("active");

      }
   });





   const observer = new IntersectionObserver((entries)=>{
       if(entries[0].isIntersecting){
        entries[0].target.classList.add("slide");
       }
    }, {
        threshold: 0.6 
    });
   const observer2 = new IntersectionObserver((entries)=>{
       if(entries[0].isIntersecting){
        entries[0].target.classList.add("slide");
       }
    }, {
        threshold: 0.6 
    });

   const observer3 = new IntersectionObserver((entries)=>{
       if(entries[0].isIntersecting){
        entries[0].target.classList.add("slide");
       }
    }, {
        threshold: 0.6 
    });
      const observer4 = new IntersectionObserver((entries)=>{
       if(entries[0].isIntersecting){
        entries[0].target.classList.add("slide");
       }
    }, {
        threshold: 0.6 
    });
   const observer5 = new IntersectionObserver((entries)=>{
       if(entries[0].isIntersecting){
        entries[0].target.classList.add("slide");
       }
    }, {
        threshold: 0.6 
    });

   const observer6 = new IntersectionObserver((entries)=>{
       if(entries[0].isIntersecting){
        entries[0].target.classList.add("slide");
       }
    }, {
        threshold: 0.6 
    });
    const viewLoginBox = document.querySelector("#login-p");
    const loginBox = document.querySelector("#login-box");
    const cancelLogin= document.querySelector("#cancel-btn");
    const viewLSignupBox = document.querySelector("#signup-p");
    const signupBox = document.querySelector("#signup-box");
    const closeSignupBox = document.querySelector("#signup-cancel-btn");
    const credentialsBTN = document.querySelector("#go-to-credentials");
    const credentials = document.querySelector(".credentials");
    const haircutsBTN = document.querySelector("#go-to-haircuts");
    const haircuts = document.querySelector(".haircuts");
    const bookNowBTN = document.querySelector("#book-now-btn");
    const bookBTN = document.querySelector("#book");
    const confirmLoginBTN = document.querySelector("#login-btn");
    const loginUsernameErr = document.querySelector("#username-err");
    const loginUsernameInput = document.querySelector("#username-input");
    const loginPasswordErr = document.querySelector("#password-err");
    const loginPasswordInput = document.querySelector("#password-input");
    const inputs = document.querySelectorAll(".inputs");
    const confirmSignupBTN = document.querySelector("#signup-btn");
    
    
    const storyBookBTN = document.querySelector("#story-book-btn");
    const callBookBTN = document.querySelector("#call-book-now");
    

    const signupBtn = document.querySelector("#signup-btn");

    

    topBookNow.addEventListener("click", ()=>{
      loginBox.classList.add("using");
       
      overlay.classList.add("active");
    });

    callBookBTN.addEventListener("click", ()=>{
      loginBox.classList.add("using");
       
      overlay.classList.add("active");
    });

    storyBookBTN.addEventListener("click", ()=>{
        loginBox.classList.add("using");
       
        overlay.classList.add("active");
    });

    confirmSignupBTN.addEventListener("click", ()=>{
    
       
      
        const popup = window.open(
        "https://eric-s-barbershop-customer-booking-system.onrender.com/auth/signup/google",
        "googleSignup",
        "width=500,height=600"
       );
       signupBox.classList.remove("using");
       overlay.classList.remove("active");

       
       
      
       
    });

    window.addEventListener("message", (event) => {

    if (event.origin !== "https://eric-s-barbershop-customer-booking-system.onrender.com") {
        return;
    }

    if (event.data === "google-signup-success") {

        console.log("Google signup successful!");

        confirmSignupBOX.classList.add("using");
        overlay.classList.add("active");
        localStorage.setItem("status", "account-pending");



        // Close your signup modal
        
        /*main.classList.add("logged-in");
        localStorage.setItem("status", "logged-in");
        userDiv.classList.add("logged-in");*/

        // Optional:
        // update UI here
        // show user's name
        // change Login button to Logout, etc.
    }

});

    inputs.forEach((i)=>{
        i.addEventListener("input", ()=>{
          loginUsernameErr.textContent = "";
          loginPasswordErr.classList.remove("errored");
          loginPasswordErr.textContent = "";
          loginUsernameErr.classList.remove("errored");
          passwordConfirmationError.textContent = "";
          passwordConfirmationError.classList.remove("errored");
          dayTimeError.textContent = "";
          noteError.textContent = "";
          dayTimeError.classList.remove("errored");
          noteError.classList.remove("errored");
           dayAndTimeErrorWalkin.textContent = "";
     dayAndTimeErrorWalkin.classList.remove("errored");
          
         
        });
    })

    confirmLoginBTN.addEventListener("click", async ()=>{
    try{
      let hasError = false;
      if(loginUsernameInput.value.trim() === ""){
        loginUsernameErr.textContent = "Please enter a proper email address!";
        loginUsernameErr.classList.add("errored");
        hasError = true;
      }
      if(loginPasswordInput.value.trim() === ""){
        loginPasswordErr.textContent = "Please enter a proper account password!";
        loginPasswordErr.classList.add("errored");
        hasError = true;
      }

      if(hasError)return;
      const username = loginUsernameInput.value.trim();
      const password = loginPasswordInput.value.trim();

      let hasErrorAgain = false;

      const login = await loginAPICaller(username, password);
      if(login.userDoesNotExists){
        loginUsernameErr.textContent = "This user does not exist!";
        loginUsernameErr.classList.add("errored");
        loginPasswordInput.value ="";
        loginUsernameInput.value = "";
        hasErrorAgain = true;
      }
      if(login.wrongPassword){
        loginPasswordErr.textContent = "Wrong password try again!";
        loginPasswordErr.classList.add("errored");
        loginPasswordInput.value ="";
        hasErrorAgain = true;
      }
      if(login.attempts){
        loginUsernameErr.textContent = "You have reached maximun login attempts try again later!";
        loginUsernameErr.classList.add("errored");
        loginPasswordInput.value ="";
        loginUsernameInput.value = "";
        hasErrorAgain = true;
      }
      if(hasErrorAgain)return;

      if(login.success){
        if(login.role === 'user'){
        loginBox.classList.remove("using");
        loginUsernameErr.textContent = "";
        loginPasswordErr.classList.remove("errored");
        loginPasswordErr.textContent = "";
        loginUsernameErr.classList.remove("errored");
        loginPasswordInput.value ="";
        loginUsernameInput.value = "";
        overlay.classList.remove("active");
        userDiv.classList.add("logged-in");
        main.classList.add("logged-in");
        topBookNow.classList.add("hide");
        localStorage.setItem("status", "logged-in");
        localStorage.setItem("role", login.role);
        }
        if(login.role === 'admin'){
            loginBox.classList.remove("using");
            loginUsernameErr.textContent = "";
            loginPasswordErr.classList.remove("errored");
            loginPasswordErr.textContent = "";
            loginUsernameErr.classList.remove("errored");
            loginPasswordInput.value ="";
            loginUsernameInput.value = "";
            overlay.classList.remove("active");
            main.classList.add("logged-in");
            topBookNow.classList.add("hide");
            localStorage.setItem("status", "logged-in");
            localStorage.setItem("role", login.role);
            adminDiv.classList.add("logged-in");
      try{
         const appointments = await getPendingAppointmentsAdminAPICaller();
         if(appointments.forceLogout){
          forceLogout();
         }
         if(!appointments.success){
          viewALLPendingAppointmentsErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
         }
         renderPendingAppointments(appointments.datas);
      }catch(err){
         console.log(err);
         viewALLPendingAppointmentsErrorBox.classList.add("shown");
         overlay.classList.add("active");
      }
        }
      }


      localStorage.setItem("userId", login.userId);
      
      registerSocket();


      
    }catch(err){
        console.log(err);
    }

    });


    bookBTN.addEventListener("click", ()=>{
         loginBox.classList.add("using");
       
        overlay.classList.add("active");
    });

    bookNowBTN.addEventListener("click", ()=>{
        loginBox.classList.add("using");
       
        overlay.classList.add("active");
    });

    credentialsBTN.addEventListener("click", () => {
       credentials.scrollIntoView({
        behavior: "smooth"
       });
       nav.classList.remove("open");
       overlay.classList.remove("active");
    });

     haircutsBTN.addEventListener("click", () => {
       haircuts.scrollIntoView({
        behavior: "smooth"
       });
       nav.classList.remove("open");
       overlay.classList.remove("active");
    });

    closeSignupBox.addEventListener("click", ()=>{
       signupBox.classList.remove("using");
       overlay.classList.remove("active");
       
       
    });

    viewLSignupBox.addEventListener("click", ()=>{
       signupBox.classList.add("using");
       nav.classList.remove("open");
       overlay.classList.add("active");
    });

    viewLoginBox.addEventListener("click", ()=>{
        loginBox.classList.add("using");
        nav.classList.remove("open");
        overlay.classList.add("active");
    })

    cancelLogin.addEventListener("click", ()=>{
        loginBox.classList.remove("using");
        loginUsernameErr.textContent = "";
        loginPasswordErr.classList.remove("errored");
        loginPasswordErr.textContent = "";
        loginUsernameErr.classList.remove("errored");
        loginPasswordInput.value ="";
        loginUsernameInput.value = "";
        overlay.classList.remove("active");
    })



   menu.addEventListener("click", ()=>{
    nav.classList.add("open");
    overlay.classList.add("active");
   });

   overlay.addEventListener("click", ()=>{
    nav.classList.remove("open");
    overlay.classList.remove("active");
    loginBox.classList.remove("using");
     signupBox.classList.remove("using");
     loginUsernameErr.textContent = "";
      loginPasswordErr.classList.remove("errored");
      loginPasswordErr.textContent = "";
      loginUsernameErr.classList.remove("errored");
      loginPasswordInput.value ="";
      loginUsernameInput.value = "";
      confirmationErrorBox.classList.remove("shown");
      cancelConfirmationErrorBox.classList.remove("shown");
      userNav.classList.remove("using");
      logoutErrorBox.classList.remove("shown");
       bookAnppointmentBox.classList.remove("using");
        dayTimeInput.value = "";
         noteInput.value = "";
         dayTimeError.textContent = "";
         noteError.textContent = "";
         dayTimeError.classList.remove("errored");
         noteError.classList.remove("errored");
         adminNav.classList.remove("using");
          dayAndTimeErrorWalkin.textContent = "";
     dayAndTimeErrorWalkin.classList.remove("errored");
     dayAndTimeInputWalkin.value = "";
      walkInDiv.classList.remove("using");
      overlay.classList.remove("active");
       bookingErrorBox.classList.remove("shown");
        viewALLPendingAppointmentsErrorBox.classList.remove("shown");
        markAsDoneApoointmentErrorBox.classList.remove("shown");
        cancelAppointmentErrorBox.classList.remove("shown");
        viewUserAppointmentsErrorBox.classList.remove("shown");
        viewCompletedAppointmentsErrorBox.classList.remove("shown");
        userCancelAppointmentErrorBox.classList.remove("shown");
         viewCompletedAppointmentsADMINERRORBOX.classList.remove("shown");
          userNotificationsDiv.classList.remove("show");
           userViewNotificationsErroBox.classList.remove("shown");
           adminNotificationsDiv.classList.remove("show");
           adminViewNotificationErrorBox.classList.remove("shown");
           addWalkinAppointmentsErrorBox.classList.remove("shown");
       
   });

   close_nav.addEventListener("click", ()=>{
    nav.classList.remove("open");
    overlay.classList.remove("active");
   });

   observer.observe(one);
   observer2.observe(two);
   observer3.observe(three);
   observer4.observe(first);
   observer5.observe(second);
   observer6.observe(third);



   
