let currentSong = new Audio();
function secondsToMinutesSeconds(seconds){
  if(isNaN(seconds)|| seconds<0){
    return "invalid input";
  }
  const minutes = Math.floor(seconds/60);
  const remainingSeconds = Math.floor(seconds / 60);

  const formattedMinutes = String(minutes).padStart(2,'0');
  const formattedMinutes = string(remainingSeconds).padStart(2,'0');

  return `${formattedMinutes}:${formattedSeconds}`
}
async function getSongs() {
  try{ //
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
  }//
  return songs;
}catch(error){
  console.log("error")
}//
}
const playMusic = (track)=>{
  currentSong.src="/songs/" + track
  currentSong.play()
  play.src ="pause.svg"
  document.querySelector(".songinfo").innerHTML= track
  document.querySelector(".songtime").innerHTML="00:00 / 00:00"
  // let audio = new Audio("/songs/" + track)
  //audio.play()
}

async function main() {
  //get the list of all the songs
  let songs = await getSongs();
  // console.log(songs)
  // var audio = new Audio(songs[1]);
  // audio.play();
  //show all the songs in the playlist
  let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li>
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div>${song.replaceAll("%20"," ")}</div>
                  <div>Shubh</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="play.svg" alt="">
                </div> </li>`;
  }
    //Attach an event listener to each song
    Array.from (document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
      e.addEventListener("click", element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
      })
    })

    ///attach an event listner to play, next and previous
    
    play.addEventListener("click",()=>{
      if(currentSong.paused){
        currentSong.play()
        play.src="pause.svg"
      }else{
        currentSong.pause()
          play.src="play.svg"
      }
    })

    //listen for time update event
    currentSong.addEventListener("timeupdate",()=>{
      console.log(currentSong.currentTime, currentSong.duration);
      document.querySelector("songtime").innerHTML = `
      ${secondsToMinutesSeconds(currentSong.currentTime)}`
    })
}

main()
