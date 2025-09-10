export function showAuthenticate() {
    document.getElementById("container").style.display = "block";
    document.getElementById("quiz-card").style.display = "none";
}
export function showStart() {
    document.getElementById("container").style.display = "none";
    fetchQuiz()
}
export function quizStart() {
    document.getElementById("quiz-card").style.display = "block";
    setTimeout(() => {
        // Hide loader
        document.getElementById('loader').style.display = 'none';
        // Show content
        document.getElementById('content').style.opacity = '1';
    }, 1000);
}

function showCard() {
    document.getElementById('loader').style.display = 'none';
    // Show content
    document.getElementById('content').style.opacity = '1';
}
function hidecard() {
    document.getElementById('loader').style.display = 'none';
    // Show content
    document.getElementById('content').style.opacity = '1';
}
export function search() {
    const params = new URLSearchParams(window.location.search);
    let paramsValue = params.get("quizID")
    const presentQuizId = localStorage.getItem("quizId")
    console.log(typeof(presentQuizId));
    console.log( presentQuizId );
    
    if (presentQuizId === null) {
        console.log("null")
        localStorage.setItem("quizId", paramsValue)
    } if (presentQuizId) {
        if (presentQuizId === paramsValue){
        }else{
            localStorage.clear();
            localStorage.setItem("quizId", paramsValue)
        }

    }
}
export async function fetchQuiz() {
    try {
        const response = await fetch("/get-quiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quizId: localStorage.getItem("quizId") })
        });

        if (!response.ok) {
            document.getElementById('quiz-card').style.display = 'block';
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        quizStart()
        const data = await response.json();
        console.log("Fetched Quiz Data:", data);
        document.getElementById("quiz-title").textContent = data.data.quizName
        document.getElementById("quiz-subject").textContent = data.data.quizSubject


        return data; // Agar kahin use karna ho to return bhi kar sakte hain.
    } catch (error) {
        console.error("Error fetching quiz:", error);
    }
}
