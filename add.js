/* elementlere ulasip obje olarak kullanma, yakalama*/
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')

const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')

const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

// şarkı sırası
let index;

// döngü durumu
let loop = true;

// şarkı listesi obje olarak
const songsList = [
  {
    name: "Affet",
    link: "mp3/Affet.mp3",
    artist: "Müslüm Gürses",
    image: "img/Affet.png",
  },
  {
    name: "Çeşmi Siyahım",
    link: "mp3/Çeşmi Siyahım.mp3",
    artist: "Ahmet Aslan",
    image: "img/Çeşmi Siyahım.png",
  },
  {
    name: "Dönence",
    link: "mp3/Dönence.mp3",
    artist: "Barış Manço",
    image: "img/Dönence.png",
  },
  {
    name: "Elfida",
    link: "mp3/Elfida.mp3",
    artist: "Haluk Levent",
    image: "img/Elfida.png",
  },
  {
    name: "Islak Islak",
    link: "mp3/Islak Islak.mp3",
    artist: "Cem Karaca",
    image: "img/Islak Islak.png",
  },
  {
    name: "Kaç Kadeh Kırıldı Sarhoş Gönlümde",
    link: "mp3/Kaç Kadeh Kırıldı Sarhoş Gönlümde.mp3",
    artist: "Müslüm Gürses",
    image: "img/Kaç Kadeh Kırıldı Sarhoş Gönlümde.png",
  },
  {
    name: "Sen Gel Diyorsun Öf Öf",
    link: "mp3/Sen Gel Diyorsun Öf Öf.mp3",
    artist: "Cem Adrian",
    image: "img/Sen Gel Diyorsun Öf Öf.png",
  },
  {
    name: "Vasiyet",
    link: "mp3/Vasiyet.mp3",
    artist: "Sagopa Kajmer",
    image: "img/Vasiyet.png",
  },
  {
    name: "Yaz Dostum",
    link: "mp3/Yaz Dostum.mp3",
    artist: "Barış Manço",
    image: "img/Yaz Dostum.png",
  },
];

//zaman düzenleme
const timeFormatter = (timeInput) =>{
  let minute = Math.floor(timeInput / 60)
  minute = minute < 10 ? "0" + minute : minute
  let second = Math.floor(timeInput % 60)
  second = second < 10 ? "0" + second : second
  return `${minute}:${second}`
}

//sartki atama
const setSong = (arrayIndex) => {
  let {name, link, artist, image} = songsList[arrayIndex]
  //audio atanacak
  audio.src = link
  songName.innerHTML = name
  songArtist.innerHTML = artist
  songImage.src = image

  audio.onloadeddata = () =>{
      maxDuration.innerText = timeFormatter(audio.duration)
      //en fazla vakti ver max duration
  }
  //container eger gorunuyorsa yok et
  playListContainer.classList.add('hide')
  playAudio()
}

const playAudio = () =>{
  audio.play()
  pauseButton.classList.remove('hide')
  playButton.classList.add('hide')
}

const pauseAudio = () =>{
  audio.pause()
  pauseButton.classList.add('hide')
  playButton.classList.remove('hide')
}

const nextSong = () => {
  if (!loop) {
      if (index == (songsList.length - 1)) {
          index = 0
      } else {
          index +=1
      }
      setSong(index)
      playAudio()
  } else {
      let randIndex = Math.floor(Math.random() * songsList.length)
      console.log(randIndex)
      setSong(randIndex)
      playAudio()
  }
}

const previousSong = () =>{
  if(index > 0){
      pauseAudio()
      index-=1
  } else {
      index = songsList.length - 1
  }
  setSong(index)
  playAudio()
}

audio.onended = () =>{
  nextSong()
}


progressBar.addEventListener("click",(event) =>{
  let coordStart = progressBar.getBoundingClientRect().left


  let coordEnd = event.clientX
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth

  currentProgress.style.width = progress * 100 + "%"

  audio.currentTime = progress * audio.duration

  console.log(coordStart)
  console.log(coordEnd)
  console.log(progress)
  console.log(audio.currentTime)


  audio.play()
  pauseButton.classList.remove('hide')
  playButton.classList.add('hide')
})

//karistir tiklanildiginda
shuffleButton.addEventListener('click',()=>{
  if (shuffleButton.classList.contains('active')) {
      shuffleButton.classList.remove('active')
      loop = true
      console.log('karistirma kapali')
  } else {
      shuffleButton.classList.add('active')
      loop = false
      console.log("karistirma acik")
  }
})

//tekrar et butonu tiklanildiginda
repeatButton.addEventListener('click',()=>{
  if (repeatButton.classList.contains('active')) {
      repeatButton.classList.remove('active')
      loop = false
      console.log('tekrar kapali')
  } else {
      repeatButton.classList.add('active')
      loop = true
      console.log("tekrar acik")
  }
})


const initializePlayList = () =>{
  for (const i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
    onclick="setSong(${i})">
    <div class="playlist-image-container">
     <img src="${songsList[i].image}"/>
     </div>
     <div class="playlist-song-details">
      <span id="playlist-song-name">
       ${songsList[i].name}
       </span>
       <span id="playlist-song-artist-album">
       ${songsList[i].artist}
       </span>
      </div>
     </li>`
  }
}

playListButton.addEventListener('click',()=>{
  playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click',()=>{
  playListContainer.classList.add('hide')
})

//play button
playButton.addEventListener('click',playAudio)
//durdur button
pauseButton.addEventListener('click',pauseAudio)
//sonrakine git
nextButton.addEventListener('click',nextSong)
//oncekine git
prevButton.addEventListener('click',previousSong)


setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime) 
  currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))*100 + "%"
}, 1000);

//zaman guncellemesini yakala
audio.addEventListener('timeupdate',()=>{
  currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//ekran yuklenildiginde
window.onload = () =>{
  index = 0
  setSong(index)
  pauseAudio()
  initializePlayList()
  //oynatma listesini ayarla
}