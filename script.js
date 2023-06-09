let navbar = document.querySelector('.navbar');

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");


let track_index = 0;
let isPlaying = false;
let updateTimer;


let curr_track = document.createElement('audio');


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2add1f82f1msh460a3d26359039fp15a61ajsn61ea02484071',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

function playMusic(){
    loadTrack(track_index);
// fetch('https://spotify23.p.rapidapi.com/tracks/?ids=4WNcduiCmDNfmTEz7JvmLv', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
}
let track_list = [
    {
        name: "Boss Party",
        artist: "DSP",
        image: "image",
        path: "songs\\[iSongs.info] 01 - Boss Party.mp3"

    },
{
	name: "Ranjithame",
	artist: "Vijay",
	image: "Image URL",
	path: "songs\\[iSongs.info] 01 - Ranjithame.mp3"
},
{
	name: "Mass Anthem",
	artist: "singer",
	image: "Image URL",
	path: "songs\\[iSongs.info] 01 - Jai Balayya Mass Anthem.mp3"
},
{
	name: "Almost",
	artist: "James",
	image: "Image URL",
	path: "songs\\[iSongs.info] 01 - Almost Padipoyindhe Pilla.mp3",
},
{
    name:"18 pages",
    artists:"Prudhvi",
    image:"image url",
    path:"songs\\[iSongs.info] 01 - Nannaya Raasina.mp3"
}
];

function loadTrack(track_index) {
    
    clearInterval(updateTimer);
    resetValues();
    
    
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    
    updateTimer = setInterval(seekUpdate, 1000);
    
    
    curr_track.addEventListener("ended", nextTrack);
    
    
    random_bg_color();
    }
    
    function random_bg_color() {
    
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    
    document.body.style.background = bgColor;
    }
    
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }

    function playpauseTrack() {
        
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        
        curr_track.play();
        isPlaying = true;
        
        
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        
        curr_track.pause();
        isPlaying = false;
        
        
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        
        loadTrack(track_index);
        playTrack();
        }

        
        function seekTo() {
            
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
           
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
            



window.onscroll = () =>{
    navbar.classList.remove('active');
}


$(document).ready(function(){

    $('.button').click(function(){
        $(this).addClass('active').siblings().removeClass('active');

        var filter = $(this).attr('data-filter')

        if(filter == 'all'){
            $('.gallery .image').show(400);
        }
        else{
            $('.gallery .image').not('.' +filter).hide(200);
            $('.gallery .image').filter('.' +filter).show(200);
        }

    });

    $('.gallery').magnificPopup({
        delegate:'a',
        type:'image',
        gallery:{
            enabled:true,
        }
    });

});