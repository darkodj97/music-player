const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');


// Music
const songs = [
    {
        name: 'song-1',
        displayName: 'Under The Bridge',
        artist: 'Red Hot Chilli Peppers'
    },
    {
        name: 'song-2',
        displayName: 'Californication',
        artist: 'Red Hot Chilli Peppers'
    },
    {
        name: 'song-3',
        displayName: 'Dani California',
        artist: `Red Hot Chilli Peppers`
    },
    {
        name: 'song-4',
        displayName: 'By The Way',
        artist: 'Red Hot Chilli Peppers'
    }
];
let i = 0;

function changingSong() {
    music.setAttribute('src', `music/${songs[i].name}.mp3`);
    image.setAttribute('src', `img/${songs[i].name}.jpg`);
    title.textContent = songs[i].displayName;
    artist.textContent = songs[i].artist;
}
// Next song
function next() {
    i++;
    isPlaying = false;
    if (i === songs.length) {
        i = 0;
    }
    changingSong();
    playMusic();
}
// Previous song
function previous() {
    i--;
    if (i === -1) {
        i = songs.length - 1;
    }
    isPlaying = false;
    changingSong()
    playMusic();
}


// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    music.pause();
}

function playMusic() {
    if(!isPlaying) {
        playSong();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        pauseSong();
        playBtn.classList.replace('fa-pause', 'fa-play');
        playBtn.setAttribute('title', 'Play');
    }

}

// Update progess bar and time

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        // Delay switching duration elemnt to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Play/Pause Event Listener
playBtn.addEventListener('click', playMusic);

// Next event listener
nextBtn.addEventListener('click', next);

// Previous event listener
prevBtn.addEventListener('click', previous);

// time event listener
music.addEventListener('timeupdate', updateProgressBar)

music.addEventListener('ended', next);

progressContainer.addEventListener('click', setProgressBar);

// On load
changingSong();