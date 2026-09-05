import { confirmingPasswordAPICaller } from "./api-callers.js";
import { cancelAccountConfirmationAPICaller } from "./api-callers.js";
import { logoutAPICaller } from "./api-callers.js";
import { loginAPICaller } from "./api-callers.js";
import { bookAppointmentAPICaller } from "./user-api-callers.js";
import { getPendingAppointmentsAdminAPICaller } from "./admin-api-callers.js";
const socket = io("http://localhost:3000");
(()=>{
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
    const notifSound = new Audio("./sounds/notification.wav");
    const viewAllPedingAppointmentsAdminBTN = document.querySelector("#view-appointments-admin");
    const viewALLPendingAppointmentsErrorBox = document.querySelector("#pending-appointments-error-box");
    const closeViewPEndingAPPOIntmentsErrorBox = document.querySelector(".okay-pending");

    if(status === "account-pending"){
       confirmSignupBOX.classList.add("using");
       overlay.classList.add("active");
   }

   if(status === "logged-in" && role === 'user'){
       userDiv.classList.add("logged-in");
       main.classList.add("logged-in");
       topBookNow.classList.add("hide");
   }
   if(status === "logged-in" && role === 'admin'){
       adminDiv.classList.add("logged-in");
       main.classList.add("logged-in");
       topBookNow.classList.add("hide");
       socket.on("new-appointment", (data)=>{
         console.log(data.message);
         notificationMEssage.textContent = data.message;
         notificationDiv.classList.add("go");
         setTimeout(()=>{
           notificationDiv.classList.remove("go");
         }, 5000);
         notifSound.play();
       });
   }

   viewAllPedingAppointmentsAdminBTN.addEventListener("click", async () => {
      try{
         adminNav.classList.remove("using");
         overlay.classList.remove("active");
         const appointments = await getPendingAppointmentsAdminAPICaller();
         if(appointments.forceLogout){
          forceLogout();
         }
         if(!appointments.success){
          viewALLPendingAppointmentsErrorBox.classList.add("shown");
          overlay.classList.add("active");
         }
         console.log(appointments.datas);
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

   confirmWalkinBTN.addEventListener("click", ()=>{
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
       const logout = await logoutAPICaller();
       if(logout.forceLogout){
        forceLogout();
       }
       if(!logout.success){
          logoutErrorBox.classList.add("shown");
          overlay.classList.add("active");
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
         }

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
       localStorage.setItem("status", "logged-out");
       localStorage.setItem("role", "none");
       console.log("force logout!");
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
       }
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
        "http://localhost:3000/auth/signup/google",
        "googleSignup",
        "width=500,height=600"
       );
       signupBox.classList.remove("using");
       overlay.classList.remove("active");

       
       
      
       
    });

    window.addEventListener("message", (event) => {

    if (event.origin !== "http://localhost:3000") {
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
        }
      }


      
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



   
})();