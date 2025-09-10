import { findQuizByUser, expand, addQuestion, removeOption, addOption, removeQuestion, addData, copyCode } from "./adminUtily.js"

const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');
const arrow = document.querySelector('#arrow');
const terminal = document.getElementById("btn-terminal")
const showTerminal = document.getElementById("Terminal")
const parent = document.getElementById("main")
const child = document.getElementById("child")
const btn = document.getElementById("btn")
const output = document.getElementById("prompt")


window.expand = expand
window.addQuestion = addQuestion
window.removeOption = removeOption
window.addOption = addOption
window.removeQuestion = removeQuestion
window.copyCode = copyCode
function generateRoomID() {
  return "room-" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4) + Date.now() + Date.now();
}
function adminID() {
  return "admin-" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4) + Date.now();
}

let app_admin_id = localStorage.getItem("adminID")

function handlegenerateadminIdBy() {
  const generateadminID = adminID();
  localStorage.setItem("adminID", generateadminID)
  return generateadminID;
}

if (!app_admin_id) {
  handlegenerateadminIdBy()
}


// socket.emit("Jion_Admin_Room", RoomID)

let names = document.getElementById("StudentsName")
let con = document.getElementById("container")



toggleBtn.addEventListener('click', () => {
  if (arrow.style.rotate === "180deg") {
    arrow.style.rotate = "0deg"
  } else {

    arrow.style.rotate = "180deg"
  }

  sidebar.classList.toggle('collapsed');
  toggleBtn.classList.toggle('collapsed');


});




window.addEventListener('load', () => {
  sidebar.classList.toggle('collapsed');
});



//load connect with quiz students 






//question builder



// Function to remove a question card


// Function to add a new option field with radio button


// Function to remove an option field


// Function to display the modal with a given message
function showModal(message) {
  document.getElementById('modalMessage').textContent = message;
  document.getElementById('popupModal').classList.add('active');
}

// Close the modal when clicking on the close icon
document.getElementById('closeModal').addEventListener('click', function () {
  document.getElementById('popupModal').classList.remove('active');
});

// Publish button functionality
document.getElementById('publishBtn').addEventListener('click', function (event) {
  const questionForms = document.querySelectorAll('.question-form');
  const payload = [];
  let quizName;
  let quizSubject;

  for (const form of questionForms) {
    if (!form.reportValidity()) {
      form.querySelector('input').focus();
      return;
    }
    const formData = new FormData(form);
    quizName = formData.get("quizName")
    quizSubject = formData.get("quizSubject")
    const questionText = formData.get('question');
    const options = formData.getAll('option[]');

    // Get selected radio button for the correct answer
    const questionId = form.dataset.questionId;
    const selectedRadio = form.querySelector('input[name="correctAnswer_' + questionId + '"]:checked');
    let correctAnswerIndex = selectedRadio ? selectedRadio.value : null;

    payload.push({ question: questionText, options: options, correctAnswer: correctAnswerIndex });
  }

  // Show "Publishing..." immediately in the popup
  showModal("Publishing...");

  let ID = {};
  let admin = {};
  admin.quizName = quizName;
  admin.quizSubject = quizSubject;
  let adminIdbyLocalstorage = localStorage.getItem("adminID")
  if (!adminIdbyLocalstorage) {
    adminIdbyLocalstorage = handlegenerateadminIdBy()
  }
  const RoomID = generateRoomID();
  admin.generateAdminIdbyfun = adminIdbyLocalstorage;
  ID.generateRoomIdbyfun = RoomID;


  // Replace '/create-quiz' with your actual endpoint
  fetch('/create-quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questions: payload, IDs: ID, adminData: admin })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('modalMessage').innerHTML = data.url;
    })
    .catch(error => {
      console.error(error);
    });
});

// Initialize with one question card
addQuestion();




//sidebar click function

// dashboard sidebar

document.getElementById("dashboard-sidebar").addEventListener(("click"), () => {

  document.querySelectorAll(".ul-box").forEach((element) => {
    const svg = element.querySelectorAll("svg")
    const span = element.querySelectorAll("span")

    terminal.style.backgroundColor = "";
    if (element.id !== "btn-terminal") {
      svg.forEach((svg) => {
        svg.style.color = "black"
      })
      span.forEach((span) => {
        span.style.color = "black"
      })
      element.style.backgroundColor = "";
    }
  });
  document.getElementById("appcontainermain").style.display = "none";
  document.getElementById("dashboard-svg").style.color = "white"
  document.getElementById("dashboard-sidebar").style.backgroundColor = "#6c63ff"
  document.getElementById("history-container").style.display = "none"
  document.querySelector("#dashboard-sidebar span").style.color = "white"

})

//terminal sidebar

terminal.addEventListener("click", () => {
  if (getComputedStyle(showTerminal).display === "none") {
    showTerminal.style.display = "block";
    document.getElementById("a-btn-terminal").style.backgroundColor = "red"
    document.getElementById("terminal-svg").style.color = "white"
    terminal.querySelector("span").style.color = "white"
  } else {
    terminal.querySelector("span").style.color = "black"
    showTerminal.style.display = "none";
    document.getElementById("terminal-svg").style.color = "black"
    document.getElementById("a-btn-terminal").style.backgroundColor = ""
  }
});

//time sidebar
document.getElementById("time-sidebar").addEventListener("click", () => {
  document.querySelectorAll(".ul-box").forEach((element) => {
    const svg = element.querySelectorAll("svg")
    const span = element.querySelectorAll("span")

    terminal.style.backgroundColor = "";
    if (element.id !== "btn-terminal") {
      svg.forEach((svg) => {
        svg.style.color = "black"
      })
      span.forEach((span) => {
        span.style.color = "black"
      })
      element.style.backgroundColor = "";
    }
  });
  document.getElementById("time-svg").style.color = "white"
  document.getElementById("time-sidebar").style.backgroundColor = "#6c63ff"
  document.getElementById("history-container").style.display = "none"
  document.getElementById("appcontainermain").style.display = "none";
  document.querySelector("#time-sidebar span").style.color = "white"

});

//setting sidebar

document.getElementById("setting-button").addEventListener("click", () => {
  document.querySelectorAll(".ul-box").forEach((element) => {
    const svg = element.querySelectorAll("svg")
    const span = element.querySelectorAll("span")

    terminal.style.backgroundColor = "";
    if (element.id !== "btn-terminal") {
      svg.forEach((svg) => {
        svg.style.color = "black"
      })
      span.forEach((span) => {
        span.style.color = "black"
      })
      element.style.backgroundColor = "";
    }

  });
  document.getElementById("setting-svg").style.color = "white"
  document.getElementById("setting-button").style.backgroundColor = "#6c63ff"
  document.getElementById("history-container").style.display = "none"
  document.getElementById("appcontainermain").style.display = "flex"
  document.querySelector("#setting-button span").style.color = "white"
});

//history sidebar

document.getElementById("history-button").addEventListener("click", async () => {
  const quizes = await findQuizByUser()
  addData(quizes)
  document.querySelectorAll(".ul-box").forEach((element) => {
    const svg = element.querySelectorAll("svg")
    const span = element.querySelectorAll("span")

    terminal.style.backgroundColor = "";
    if (element.id !== "btn-terminal") {
      svg.forEach((svg) => {
        svg.style.color = "black"
      })
      span.forEach((span) => {
        span.style.color = "black"
      })
      element.style.backgroundColor = "";
    }
  });
  document.getElementById("history-svg").style.color = "white"
  document.getElementById("history-button").style.backgroundColor = "#6c63ff"
  document.getElementById("history-container").style.display = "block"
  document.getElementById("appcontainermain").style.display = "none";
  document.querySelector("#history-button span").style.color = "white"
});
document.getElementById("connect-button").addEventListener("click", () => {
  document.querySelectorAll(".ul-box").forEach((element) => {
    const svg = element.querySelectorAll("svg")
    const span = element.querySelectorAll("span")

    terminal.style.backgroundColor = "";
    if (element.id !== "btn-terminal") {
      svg.forEach((svg) => {
        svg.style.color = "black"
      })
      span.forEach((span) => {
        span.style.color = "black"
      })
      element.style.backgroundColor = "";
    }
  });
  document.getElementById("connect-svg").style.color = "white"
  document.getElementById("connect-button").style.backgroundColor = "#6c63ff"
  document.getElementById("history-container").style.display = "none"
  document.getElementById("appcontainermain").style.display = "none";
  document.querySelector("#connect-button span").style.color = "white"
});


function getcookies() {
  fetch("/get-cookies")
    .then(response => response.json())
    .then(data => {
      if (data.QuizID) {
        const userName = data.QuizID.userData.userName;
        const name = userName.split(" ")
        document.getElementById("sdiebar-text").textContent = name[0]
      }
    });


}

window.addEventListener("load", getcookies)
