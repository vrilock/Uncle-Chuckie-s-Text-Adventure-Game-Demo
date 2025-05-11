
const audio = document.getElementById('myAudio');
        const muteButton = document.getElementById('muteButton');

        muteButton.addEventListener('click', function() {
            if (audio.muted) {
                audio.muted = false;
                muteButton.textContent = 'Mute';
            } else {
                audio.muted = true;
                muteButton.textContent = 'Unmute';
            }
        });


let score = 0;
const gameText = document.getElementById("gameText");
const scoreDisplay = document.getElementById("scoreDisplay");
let scenes = {};

function updateScore(points) {
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;
}

document.getElementById("restart").onclick = function() {
    score = 0;
    updateScore(0);
    gameText.textContent = "Game reset. Score: 0";
    document.getElementById('game').style.display = 'none';
    document.getElementById('introContent').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('startGameButton').style.display = 'block';
    document.getElementById('introText').style.display = 'block';
};

fetch('scenes.json')
    .then(response => response.json())
    .then(data => {
        scenes = data;
    })
    .catch(error => {
        console.error('Error loading scenes:', error);
        gameText.textContent = 'Failed to load scenes. Please try again later.';
    });

function goToScene(sceneName) {
    const scene = scenes[sceneName];
    if (!scene) {
        gameText.textContent = 'Scene not found. Please try another choice.';
        return;
    }

    if (scene.choices && scene.choices.length > 0) {
        updateScore(5);
        gameText.textContent = "Good choice! +5 points";
    } else {
        gameText.textContent = "";
    }

    document.getElementById('storyText').innerText = scene.text;

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    if (scene.choices) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice.button;
            button.className = 'button';
            button.onclick = () => goToScene(choice.action);
            choicesDiv.appendChild(button);
        });
    }
}

document.getElementById('startGameButton').addEventListener('click', function () {
    document.getElementById('startGameButton').style.display = 'none';
    document.getElementById('introText').style.display = 'none';
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('introContent').style.display = 'block';
    document.getElementById('startAdventureButton').style.visibility = 'visible';
});

document.getElementById('startAdventureButton').addEventListener('click', function () {
    document.getElementById('introContent').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    goToScene('introScene');
});



/*const audio = document.getElementById('custom-audio');


const playPauseButton = document.getElementById('play-pause');
const seekBar = document.getElementById('seek-bar');

Play/Pause toggle
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent ='Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
    });

// Update the seek bar 
audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
});

// Seek audio
seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
}); */