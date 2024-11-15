let currentSong = new Audio();
let songs;
function secondsToMinutesSeconds(seconds) {
  // Ensure seconds is an integer
  seconds = Math.floor(seconds);
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format with leading zero if necessary
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
  try {
    //
    let a = await fetch("http://127.0.0.1:5500/Clones-with-new-feature/songs/");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    //extractimg anchor tag
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
      const element = as[index];
      if (element.href.endsWith(".mp3")) {
        songs.push(element.href.split("/songs/")[1]);
      }
    } //
    return songs;
  } catch (error) {
    console.log("error");
  } //
}
const playMusic = (track, pause = false) => {
  currentSong.src = "/Clones-with-new-feature/songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  //get the list of all the songs
  songs = await getSongs();
  playMusic(songs[0], true);
  // console.log(songs)
  // var audio = new Audio(songs[1]);
  // audio.play();
  //show all the songs in the playlist
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div>${song.replaceAll("%20", " ")}</div>
                  <div>Shubh</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="play.svg" alt="">
                </div> </li>`;
  }
  //Attach an event listener to each song
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
       playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  ///attach an event listner to play, next and previous

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  //listen for timeupdate event
  currentSong.addEventListener("timeupdate", () => {
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });
  //add an event listner to seekbar
  document.querySelector(".seekbar").addEventListener("click", e=> {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent) / 100;
  });
  //add an event listner for hamburger
  document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left='0'
  })
  //add an event listner for close button
  document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left='-120%'
  })
  //Add an event listner to previous 
  previous.addEventListener("click",()=>{
    console.log("previous clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if((index-1) >= 0){
      playMusic(songs[index-1])
    }
  })
  //Add an event listner tonext
  next.addEventListener("click",()=>{
    currentSong.pause()
    console.log("next clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if((index+1)<songs.length){
      playMusic(songs[index+1])
    }
    
  })
  //Add an vent to volume
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    console.log("setting volume to", e.target.value,"/100")
    currentSong.volume =parseInt(e.target.value)/100
  })
}

main();

//as a beginner we always write like this to check whether the code is working or not

// //Add an event listner to previous and next
// previous.addEventListener("click",()=>{
//   console.log("previous clicked")
//   console.log(previousSong.src)
// })