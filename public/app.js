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
    const topBookNow = document.querySelector("#top-book-now");

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
       let hasError = false;
       
      

       if(hasError)return;
       
      
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

        // Close your signup modal
        
        main.classList.add("logged-in");
        localStorage.setItem("status", "logged-in");
        userDiv.classList.add("logged-in");

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
       
          signupPasswordErr.textContent = "";
          signupPasswordErr.classList.remove("errored");
         
        });
    })

    confirmLoginBTN.addEventListener("click", ()=>{
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
      loginBox.classList.remove("using");
      loginUsernameErr.textContent = "";
      loginPasswordErr.classList.remove("errored");
      loginPasswordErr.textContent = "";
      loginUsernameErr.classList.remove("errored");
      loginPasswordInput.value ="";
      loginUsernameInput.value = "";
      overlay.classList.remove("active");

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