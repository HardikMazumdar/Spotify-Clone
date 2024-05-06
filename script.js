console.log("Hello World");
const playbackPositions = {};
var ctr1;
let songIndex = 0;
let audioElement = new Audio('y2mate.com - Scorpions  No One Like You Audio_480p.mp4');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName')
let songs = [
    { songName: "Let Me Love You", filePath: "Let-Me-Love-You(PaglaSongs).mp3", coverPath: "lmlu.jpg" },
    { songName: "No One Like You", filePath: "y2mate.com - Scorpions  No One Like You Audio_480p.mp4", coverPath: "no_one_like_you.jpeg" },
    { songName: "Maahi - Rock With Me", filePath: "128-Maahi (Rock with Me) - RAAZ - The Mystery Continues 128 Kbps.mp3", coverPath: "maahi.jpg" },
    { songName: "Tu Hi Haqeeqaat", filePath: "Tu Hi Haqeeqat - Tum Mile 128 Kbps.mp3", coverPath: "tu_hi_haqeeqat.jpg" },
    { songName: "Pareshaan", filePath: "3 Pareshaan.mp3", coverPath: "Pareshaan-Ishaqzaade-500-500.jpg" },
    { songName: "Ghungroo", filePath: "Ghungroo - War 128 Kbps.mp3", coverPath: "ghungroo.jpg" },
    { songName: "Kya Mujhe Pyaar Hai", filePath: "Kya Mujhe Pyaar Hai - Woh Lamhe 128 Kbps.mp3", coverPath: "kmph.jpg" },
    { songName: "Tujhe Sochta Hoon", filePath: "Tujhe Sochta Hoon - Jannat 2-(DJMaza).mp3", coverPath: "tsh.jpg" },
    { songName: "Still Loving You", filePath: "Scorpions_-_Still_Loving_You_(Jesusful.com).mp3", coverPath: "still_loving_you.jpeg" },
];

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        makeAllPlays();
        let play = document.getElementById(songIndex);
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        makeAllPlays();
        let play = document.getElementById(songIndex);
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

    element.addEventListener('click', (e) => {
        if ((audioElement.paused || audioElement.currentTime <= 0)) {
            makeAllPlays();
            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");
            songIndex = parseInt(element.id);
            audioElement.src = songs[songIndex].filePath;
            if (playbackPositions[songIndex]) {
                audioElement.currentTime = playbackPositions[songIndex];
            }

            audioElement.play();
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
            masterSongName.innerText = songs[songIndex].songName;
            gif.style.opacity = 1;
            console.log(e.target.id, element.id);
        }
        else {
            playbackPositions[songIndex] = audioElement.currentTime;
            audioElement.pause();
            masterPlay.classList.remove("fa-pause");
            masterPlay.classList.add("fa-play");
            gif.style.opacity = 0;
            element.classList.remove('fa-pause');
            element.classList.add('fa-play');
        }
    })
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    makeAllPlays();
    let play = document.getElementById(songIndex);
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;

});
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    makeAllPlays();
    let play = document.getElementById(songIndex);
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;

});
