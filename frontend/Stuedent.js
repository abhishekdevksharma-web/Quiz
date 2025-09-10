import { showAuthenticate, showStart, quizStart, search, fetchQuiz } from "./utilities.js"
let userID = localStorage.getItem("userID")
if (!userID) {
  userID = generateUniqueID()
  localStorage.setItem("userID", userID)
}
let socket;
search()
const inputField = document.getElementById("input");
const room1 = document.getElementById("room");
const submitBtn = document.querySelector(".submit-btn");
const studentProfileNameName = document.querySelector(".student-name");



function generateUniqueID() {
  return 'Student-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

//quiz DOM related work

function getCookieValue(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue); // Decode in case of encoding
    }
  }
  return null;
}

document.querySelectorAll("input[type='radio']").forEach(input => {
  input.addEventListener("change", function () {
    const quizData = JSON.parse(localStorage.getItem("quizProgress")) || {};
    const a = quizData[this.name] = this.value;
    localStorage.setItem("quizProgress", JSON.stringify(quizData));

    if (socket.connected) {
      setTimeout(() => {

        const quizDataOBJ = { data: quizData }
        const localdata = localStorage.getItem("Studentname")
        const Q = getCookieValue("QuizID")
        quizDataOBJ.QuizID = Q
        quizDataOBJ.localdata = localdata

        socket.emit("handleAnswer", quizDataOBJ)
      }, 100);
    } else {
      console.log("Socket is not connected.");
    }
  });
});


function loadDataByLocal() {
  checkLocalData()
  const getDataByLocal = JSON.parse(localStorage.getItem("quizProgress"))
  for (let key in getDataByLocal) {
    let option = document.querySelector(`input[name="${key}"][value="${getDataByLocal[key]}"]`);

    if (option) {
      option.checked = true;
    }
  }
};

function checkLocalData() {
  const localName = localStorage.getItem("Studentname");
  if (!localName) {
    showAuthenticate()
  } else {
    loadDataByCookies()
  }

}
//form show on web after verify the student


document.getElementById("Authencate-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Page reload hone se roka

  const form = event.target;
  const formData = new FormData(form);
  formData.append("userID", userID)
  // formData.append("quizID", quizID)
  const response = await fetch("/authenticate", {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  const Studentname = data.name
  localStorage.setItem("Studentname", JSON.stringify(data))


  if (response.ok) {
    loadDataByCookies()
    // quizStart()
    fetchQuiz()
  } else {
    document.getElementById("error").innerText = data.error;
  }

});

function loadDataByCookies() {
  const localName = localStorage.getItem("Studentname");
  let a = null;
  try {
    a = JSON.parse(localName);
  } catch (error) {
    console.error("Invalid JSON:", error);
  }

  if (a && a.name) {
    studentProfileNameName.textContent = a.name;
  } else {
    studentProfileNameName.textContent = "Guest";
  }

  showStart()
}


window.addEventListener("load", loadDataByLocal)



// console.log(getCookieValue("QuizID"));



// ripple effect btn

const btn = document.getElementById('rippleBtn');

btn.addEventListener('click', async function (e) {
  // Ripple effect
  const rect = this.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  this.appendChild(ripple);
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });

  // Button text update: "Starting Quiz" ke sath blinking dots
  btn.innerHTML = "Starting Quiz <span class='dots'><span>.</span><span>.</span><span class='last-dot'>.</span></span>";

  // Last dot (third dot) par animation end hone ka event lagate hain.
  const lastDot = btn.querySelector('.last-dot');
  lastDot.addEventListener('animationend', () => {
    const localValue = localStorage.getItem("Studentname")
    // Blinking dots 3 times complete hone ke baad fetch request fire karein
    fetch("/registerStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: localValue
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errMsg => { throw new Error(errMsg) });
        }
        return response.json(); // If JSON response is expected
      })
      .then(data => {
        console.log('Fetch completed:', data);
        btn.textContent = "Quiz Started";
        alert(data.res);
      })
      .catch(error => {
        console.error('Fetch error:', error.message);
        btn.textContent = "Try Again";
      });
  });
});

window.addEventListener('load', () => { });
