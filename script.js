console.log("welcomeittt")

// initialize the var 
let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgessbar = document.getElementById('myProgessbar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let currsongname = document.getElementById('pop');

var list = Array.from(document.getElementsByClassName('songItemplay'));

let songs = [
    { songname: "YOU HAUNT ME", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songname: "Born Into Pain (feat. Lily Potter) ", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songname: "Empty (Live)", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songname: "Ain't No Sunshine", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songname: "Something (Demo)", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songname: "Eleanor Rigby - Remastered 2009", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songname: "Marcel", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songname: "Coffee Story", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songname: "Line of Fire", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" }
]
// let audioElement= new Audio('1.mp3');
// audioElement.play();

// handle play/pause click 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        currsongname.innerText = songs[songindex].songname;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        list[songindex].classList.add('fa-pause-circle');

        // fa-2x fa-circle-play
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})


// listen to event 
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);

    myProgessbar.value = progress;


    if(audioElement.currentTime==audioElement.duration){
        myProgessbar.value = 0;
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }


})

myProgessbar.addEventListener('change', () => {
    console.log('change');
    audioElement.currentTime = (myProgessbar.value * audioElement.duration) / 100;
})



songItem.forEach((element, i) => {
    console.log(i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songname;


})
const makeallplay = () => {

    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {

        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}
let flag = true;
Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        if (e.target.id == songindex ) {


            if (flag) {
                audioElement.pause();
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-circle-play');

                gif.style.opacity = 0;
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-circle-play');
                flag = false;

            } else {
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;

                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-pause-circle');
                flag = true;

            }
           

        } else {
            console.log(e.target);
            makeallplay();

            songindex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause-circle');

            audioElement.src = `songs/${songindex + 1}.mp3`;
            audioElement.play();
            currsongname.innerText = songs[songindex].songname;
            audioElement.currentTime = 0;

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            flag = true;

        }

    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 8) {
        songindex = 0;
    } else {
        songindex++;
    }

    audioElement.src = `songs/${songindex + 1}.mp3`;
    audioElement.play();
    currsongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    makeallplay();
    list[songindex].classList.add('fa-pause-circle');




})
document.getElementById('prev').addEventListener('click', () => {
    if (songindex == 0) {
        songindex = 8;
    } else {
        songindex--;
    }
    audioElement.src = `songs/${songindex + 1}.mp3`;
    audioElement.play();
    currsongname.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;


    makeallplay();
    list[songindex].classList.add('fa-pause-circle');


})
