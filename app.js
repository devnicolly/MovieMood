AOS.init();

document.addEventListener("DOMContentLoaded", function() {
    const imgHeader = document.querySelector('.img-header');
    const images = ['imagens/logos-header.png', 'imagens/logo-moviemood-eyes-closed.png'];
    let index = 0;
  
    if (imgHeader) {
      setInterval(() => {
        index = 1 - index;
        imgHeader.src = images[index];
      }, 1000);
    }
  });
  

document.addEventListener("DOMContentLoaded", function() {
  async function getRandomUsers() {
      try {
          const response = await fetch('https://randomuser.me/api/?results=3');
          if (!response.ok) {
              throw new Error("Error with the request");
          }
          const data = await response.json();

          const commentDivs = document.querySelectorAll('.comment');
          
          const randomComments = [
              "I loved the production, it was so well done!",
              "The movie was kind of average, nothing too surprising.",
              "What a wonderful movie! Highly recommended!",
              "The story kept me hooked from start to finish, amazing!",
              "The characters were so deep, I really liked it!",
              "I think it could have been better in some areas, but it was worth it."
          ];

          function getRandomComment() {
              return randomComments[Math.floor(Math.random() * randomComments.length)];
          }

          data.results.forEach((user, index) => {
            if (commentDivs[index]) {
              const userContainer = document.createElement('div');
              userContainer.classList.add('user');
          
              const userText = document.createElement('p');
              userText.textContent = getRandomComment();
              userText.classList.add('user-text');
          
              const userInfo = document.createElement('div');
              userInfo.classList.add('user-info');
          
              const avatar = document.createElement('img');
              avatar.src = user.picture.large;
              avatar.alt = 'User Avatar';
              avatar.classList.add('user-avatar');
          
              const name = document.createElement('p');
              name.textContent = `${user.name.first} ${user.name.last}`;
              name.classList.add('user-name');
          
              userInfo.appendChild(avatar);
              userInfo.appendChild(name);
          
              userContainer.appendChild(userText);
              userContainer.appendChild(userInfo);
          
              commentDivs[index].appendChild(userContainer);
            }
          });
          

          $('.reviews').slick({
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
              prevArrow: '<img class="prev" src="imagens/previous.svg" alt="">',
              nextArrow: '<img class="next" src="imagens/next.svg" alt="">'
          });

      } catch (error) {
          console.error('Error fetching user data:', error);
      }
  }

  getRandomUsers();
});


function validateForm() {
    const email = document.getElementById("user_email").value.trim();
    const name = document.getElementById("user_name").value.trim();


    const errorLabel = document.getElementById("error-label");
    if (!email || !name) {
        errorLabel.textContent = "Please fill in all fields.";
        errorLabel.style.display = "block";
        return false;
    }

    errorLabel.style.display = "none";
    return true;
}

    
document.getElementById("newsletter-form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    
    if (!validateForm()) {
        return;
    }

    
    const formData = {
        user_email: document.getElementById("user_email").value, 
        user_name: document.getElementById("user_name").value,  
    };

    
    emailjs.send("service_ftpcxlq", "template_djd3l8g", formData, "yHDRO-xnTVvJRGJnG")
        .then((response) => {
            console.log("Email sent successfully!", response.status, response.text);
            alert("Thank you for subscribing!");
            document.getElementById("newsletter-form").reset(); 
        })
        .catch((error) => {
            console.error("Failed to send email:", error);
            alert("An error occurred. Please try again.");
        });
});

