document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    const signUpForm = document.getElementById("modal-login");
    signUpForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const userName = document.getElementById("userName").value.trim();
      const name = document.getElementById("name").value.trim();
      const surname = document.getElementById("surname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const birthDate = document.getElementById("birthDate").value;
      const password = document.getElementById("password").value.trim();
      const passwordRepeat = document.getElementById("passwordRepeat").value.trim();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      if (password !== passwordRepeat) {
        alert("Passwords do not match. Please enter matching passwords.");
        return;
      }

      const user = {
        userName,
        name,
        surname,
        email,
        phone,
        birthDate,
        password,
      };
  
      console.log(users);
      users.push(user);
  
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(user));
  

      
      signUpForm.reset();
      window.location.href = "/index.html";
    });
  });
  