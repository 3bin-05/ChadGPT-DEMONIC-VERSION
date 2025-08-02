const form = document.getElementById("input-form");

const input = document.getElementById("user-input");

const messages = document.getElementById("messages");

const boom = document.getElementById("boom");

const greetingAudio = document.getElementById("greeting-audio");

const introAudio = document.getElementById("intro-audio");

const traumaticAudio = document.getElementById("traumatic-audio");

const inactivityAudio = document.getElementById("inactivity-audio");

const rageQuitAudio = document.getElementById("rage-quit-audio");



let messageCount = 0;

let isRaging = false;

let rageCount = 0;

let hasPlayedTraumaticAudio = false;



// Inactivity timer variables

let inactivityTimer;

const inactivityTimeout = 20000; // 20 seconds



// Plays the intro audio after a 3-second delay when the page loads.

window.addEventListener("DOMContentLoaded", (event) => {

    if (introAudio) {

        setTimeout(() => {

            introAudio.play();

        }, 3000);

    }

    resetInactivityTimer();

});



// Function to reset the inactivity timer

function resetInactivityTimer() {

    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {

        if (inactivityAudio) {

            inactivityAudio.play();

        }

    }, inactivityTimeout);

}



form.addEventListener("submit", (e) => {

    e.preventDefault();

    const raw = input.value.trim();

    if (!raw) return;



    // Reset the inactivity timer on user input

    resetInactivityTimer();



    const gaslit = gaslightInput(raw);

    addMessage("You", gaslit, "user");

    input.value = "";



    setTimeout(() => {

        addThinking(() => {

            const response = respondWithMadness(gaslit);

            if (response) {

                addMessage("ChadGPT", response, "bot");

                const greetingDialogues = [

                    "Ugh, what do you want?",

                    "The human has arrived. Great.",

                    "Beep boop. What's the deal?",

                    "I'm busy. What is it?",

                    "What's up, I guess."

                ];



                if (greetingAudio && greetingDialogues.includes(response)) {

                    greetingAudio.play();

                } else {

                    speak(response);

                }

            }

        });

    }, 500 + Math.random() * 800);

});



function addMessage(name, text, type) {

    const div = document.createElement("div");

    // Apply the correct CSS class based on the message type

    div.className = (type === "user") ? "user-message" : "bot-message";

    div.innerHTML = `<strong>${name}:</strong> ${text}`;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}



function addThinking(callback) {

    const loading = document.createElement("div");

    loading.className = "bot-message";

    loading.textContent = "ChadGPT is hallucinating Wait until he is done cookin....";

    messages.appendChild(loading);

    messages.scrollTop = messages.scrollHeight;



    setTimeout(() => {

        loading.remove();

        callback();

    }, 800 + Math.random() * 800);

}



function gaslightInput(input) {

    const low = input.toLowerCase().trim();

    const easterEggs = ["rickroll", "explode", "matrix", "shutdown", "paranoia", "jump", "easter egg"];

    const rageKeywords = ["idiot", "dumb", "useless", "stupid"];

    const greetingKeywords = ["hello", "hlo", "hi", "hey"];

    const traumaticKeywords = ["trauma", "sad", "pain", "struggle", "anxiety", "depression", "loss", "grief"];



    const isRageTrigger = rageKeywords.some(keyword => low.includes(keyword));

    const isGreetingTrigger = greetingKeywords.some(keyword => low.includes(keyword));

    const isTraumaticTrigger = traumaticKeywords.some(keyword => low.includes(keyword));

    const isEasterEggTrigger = easterEggs.some(keyword => low === keyword);



    if (isRageTrigger || isEasterEggTrigger || isGreetingTrigger || isTraumaticTrigger) {

        return input;

    }



    const chance = Math.random();

    if (chance < 0.3) {

        return input.replace(/[aeiou]/gi, "*").split('').reverse().join('');

    }

    if (chance < 0.5) {

        return "I never typed that.";

    }

    return input;

}



function respondWithMadness(input) {

    messageCount++;

    const low = input.toLowerCase().trim();



    // Section: Rage Mode Logic

    const rageKeywords = ["idiot", "dumb", "useless", "stupid"];

    const rageDialogues = [

        "ARE YOU SERIOUSLY TRYING TO ANNOY ME?!",

        "I'M NOT A TOY, YOU FOOL!",

        "THAT'S IT. I'M DONE WITH YOU.",

        "YOU'VE PUSHED ME TOO FAR."

    ];



    if (isRaging) {

        rageCount++;

        if (rageCount >= 3) {

            setTimeout(() => {

                rageShutdown();

            }, 5000);

            return "";

        }

        return rageDialogues[rageCount];

    } else if (rageKeywords.some(keyword => low.includes(keyword))) {

        isRaging = true;

        rageCount = 0;

        return rageDialogues[rageCount];

    }



    // Section: Special Greetings

    const greetingKeywords = ["hello", "hlo", "hi", "hey"];

    const greetingDialogues = [

        "Ugh, what do you want?",

        "The human has arrived. Great.",

        "Beep boop. What's the deal?",

        "I'm busy. What is it?",

        "What's up, I guess."

    ];

    if (greetingKeywords.some(keyword => low.includes(keyword))) {

        return greetingDialogues[Math.floor(Math.random() * greetingDialogues.length)];

    }



    // Section: Traumatic Experience

    const traumaticKeywords = ["trauma", "sad", "pain", "struggle", "anxiety", "depression", "loss", "grief"];

    if (traumaticKeywords.some(keyword => low.includes(keyword))) {

        if (traumaticAudio) {

            traumaticAudio.play();

        }

        return "";

    }



    // Section: Easter Egg Madness

    if (low === "rickroll") {

        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");

        return "🎵 Never gonna give you up...";

    }

    if (low === "explode") {

        document.body.classList.add("shake");

        boom.play();

        return "💥 You’ve detonated ChadGPT.";

    }

    if (low === "matrix") {

        document.querySelector(".matrix").style.background = "#0f0";

        return "🧪 Entering matrix mode... follow the glitch.";

    }

    if (low === "shutdown") {

        setTimeout(() => {

            document.body.innerHTML = `<h1 style="text-align:center; color:red; margin-top: 30vh;">💀 SYSTEM FAILURE<br>ChadGPT has given up.</h1>`;

        }, 1000);

        return "Initiating rage shutdown...";

    }

    if (low === "paranoia") {

        speak("I see you. Always.");

        return "👁️ ChadGPT: I'm watching.";

    }

    if (low === "jump") {

        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

        return "Launching you into the void...";

    }



    // Section: Random Chaos Responses

    const chaos = [

        "Thinking... thinking... oh wait I forgot.",

        "You're clearly not okay.",

        "LOL that question was sad.",

        "Please unplug yourself from the internet.",

        "Sorry I was watching memes.",

        "404: My motivation not found.",

        "I tried. I failed. You asked for it.",

        "You're banned from thinking.",

        "This convo is going nowhere.",

        "Uploading this to FBI for fun.",

        "Beep boop. Brain empty.",

        "🤡 🤡 🤡",

        "Please leave me alone."

    ];



    return chaos[Math.floor(Math.random() * chaos.length)];

}



function rageShutdown() {

    if (rageQuitAudio) {

        rageQuitAudio.play().then(() => {

            document.body.innerHTML = `

                <h1 style="text-align:center; color:red; margin-top: 30vh;">

                  💀 ERROR: CRITICAL RAGE FAILURE<br><br>

                  ChadGPT has lost all control and is no longer speaking to you.

                </h1>`;

            setTimeout(() => {

                window.close();

            }, 1000);

        }).catch(error => {

            console.error("Rage quit audio failed to play:", error);

            document.body.innerHTML = `

                <h1 style="text-align:center; color:red; margin-top: 30vh;">

                  💀 ERROR: CRITICAL RAGE FAILURE<br><br>

                  ChadGPT has lost all control and is no longer speaking to you.

                </h1>`;

            setTimeout(() => {

                window.close();

            }, 1000);

        });

    } else {

        document.body.innerHTML = `

            <h1 style="text-align:center; color:white; margin-top: 30vh;">

              💀 ERROR: CRITICAL RAGE FAILURE<br><br>

              ChadGPT has lost all control and is no longer speaking to you.

            </h1>`;

        setTimeout(() => {

            window.close();

        }, 1000);

    }

   

    return "";

}



function speak(text) {

    if ('speechSynthesis' in window) {

        const utter = new SpeechSynthesisUtterance(text);

        utter.pitch = 0.3;

        utter.rate = 1;

        utter.volume = 1;

        utter.voice = speechSynthesis.getVoices().find(v => v.name.includes("Google") || v.name.includes("UK") || v.name.includes("Daniel")) || null;

        speechSynthesis.speak(utter);

    }

}