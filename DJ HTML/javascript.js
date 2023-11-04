const audio1 = document.getElementById("songplayer");
audio1.volume = 0.3;
var songArr = [];

document.addEventListener("DOMContentLoaded", function () {
    //load songs from json file
    loadSongs();
    //load playlists from json file
    loadPlaylists();
});

function loadSongs(){
    let jsonFileURL = 'json_data/songs.json';

    fetch(jsonFileURL)
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("starting loading songs:" + data.songs.length);

            let songlist = document.getElementById("song-list");
            
            var addIcon = "Icons/temp_add.png";
            var playIcon = "Icons/temp_play.png";
            let i = 0;

            songArr = data.songs;

            for (; i < songArr.length; i++){
                //name
                let s_name = songArr[i].name;
                //artist
                let s_artist = songArr[i].artist
                //cover
                let s_cover = songArr[i].cover;
                //file
                let s_file = songArr[i].file;
                //songid
                let s_songid = songArr[i].songid;

                let htmlContent = `
                <div class="side-tab-list-item" songID="${s_songid}">
                    <div><img src="${s_cover}" alt="SongImage." style="width:90%;height:90%;"></div>
                    <div class="song-name">${s_name}</div>
                    <div class="song-artist" style="margin-left:auto">${s_artist}</div>
                    <div style="width:100px;height:100px;">
                        <button class="add-button" tabindex="0" style="width:90%;height:90%;">
                            <img src="${addIcon}" alt="Image Button" style="width:100%;height:90%;">
                        </button>
                        <div class="dropdown-content" style="max-height:150px;overflow-y: scroll;">
                            <a href="#">Playlist 0</a>
                            <a href="#">Playlist 1</a>
                        </div>
                    </div>
                    <div><img src="${playIcon}" alt="PlayImage." style="width:90%;height:90%;" onclick="playSong(this)"></div>
                </div>
                `;

                songlist.innerHTML += htmlContent;
                console.log(songArr[i]);
            }
            console.log("finished loading");
        })
        .catch(error => {
            console.error('Error', error);
        });
}

function loadPlaylists(){
    let jsonFileURL = 'json_data/playlists.json';

    fetch(jsonFileURL)
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("starting loading playlists:" + data.playlists.length);

            let songlist = document.getElementById("playlist-list");
            
            var playIcon = "Icons/temp_play.png";
            let i = 0;

            for (; i < data.playlists.length; i++){
                //name
                let p_name = data.playlists[i].name;
                //cover
                let p_cover = data.playlists[i].cover;
                //songs
                let p_songlist = data.playlists[i].songs;

                let htmlContent = `
                <div class="side-tab-list-item">
                    <div><img src="${p_cover}" alt="PlaylistImage." style="width:90%;height:90%;"></div>
                    <div class="playlist-name">${p_name}</div>
                    <div style="margin-left:auto"></div>
                    <div><img src="${playIcon}" alt="PlaylistImage." style="width:90%;height:90%;" onclick="playPlaylist(this)"></div>
                    <div class="songlist" style="display:none" data-song-list='[`;

                //for each song in playlist, add its songid to htmlContent
                for (let j = 0; j < p_songlist.length-1; j++){
                    htmlContent += `"${p_songlist[j]}",`;
                }
                htmlContent += (`"${p_songlist[p_songlist.length-1]}"]'></div>`);

                songlist.innerHTML += htmlContent;
                console.log(data.playlists[i]);
            }
            console.log("finished loading");
        })
        .catch(error => {
            console.error('Error', error);
        });
}

//starts playing selected song
function playSong(song){
    let currSongCover = document.getElementById("curr-song-cover");
    let currSongName = document.getElementById("curr-song-name");
    let currSongArtist = document.getElementById("curr-song-artist");

    let parentDiv = song.parentElement.parentElement;
    let s_id = parentDiv.getAttribute("songID");
    let newSongCover = songArr[s_id].cover;
    let newSongName = songArr[s_id].name;
    let newSongArtist = songArr[s_id].artist;
    let newSongURL = songArr[s_id].file;

    currSongCover.setAttribute("src", newSongCover);
    currSongName.innerHTML = newSongName;
    currSongArtist.innerHTML = newSongArtist;
    audio1.setAttribute("src", newSongURL);
    audio1.play();

    console.log("Playing: " + newSongName + " by " + newSongArtist);
}

function playSongFromIndex(index){
    let currSongCover = document.getElementById("curr-song-cover");
    let currSongName = document.getElementById("curr-song-name");
    let currSongArtist = document.getElementById("curr-song-artist");
    
    let newSongCover = songArr[index].cover;
    let newSongName = songArr[index].name;
    let newSongArtist = songArr[index].artist;
    let newSongURL = songArr[index].file;

    currSongCover.setAttribute("src", newSongCover);
    currSongName.innerHTML = newSongName;
    currSongArtist.innerHTML = newSongArtist;
    audio1.setAttribute("src", newSongURL);
    audio1.play();

    console.log("Playing: " + newSongName + " by " + newSongArtist);
}

function playPlaylist(playlist){
    alert("currently playlist play is broken");
    //from parent, find element with class="songlist"
    let parentDiv = playlist.parentElement.parentElement;
    let p_list = JSON.parse(parentDiv.querySelector(".songlist").getAttribute("data-song-list"));
    
    //access attribute: song-lists for array of songIDs
    console.log(parentDiv);
    console.log(p_list);

    for (let i = 0; i < p_list.length; i++){
        playSongFromIndex(p_list[i]);
    }
}


/*
<div class="side-tab-list-item">
    <div><img src="Icons/temp_playlist.png" alt="PlaylistImage." style="width:90%;height:90%;"></div>
    <div class="playlist-name">Playlist name</div>
    <div style="margin-left:auto"></div>
    <div><img src="Icons/temp_play.png" alt="PlaylistImage." style="width:90%;height:90%;" onclick="playPlaylist()"></div>
    <div id="playlistSongs" style="display:none">
        <ul>
            <li>song1url</li>
            <li>song2url</li>
        </ul>
    </div>
</div>
*/


/*function playPlaylist(playlist){
	//start playing first song in playlist
	alert("Playing playlist");
    //if currplaylist == thisplaylist, invalid

    var songlist = document.getElementsByClassName("playlistsongs");
    var list = document.songlist.getElementById("playlistSongs")

    for (var i = 0, len = list.length; i < len; i++){
        console.log(list[i]);
        //play song[i]
        //wait for song to finish
    }
}
*/
//function addSongToPlaylist(){
//    alert("Adding song to playlist");
	//let temp = document.getElementById("tempID").parentElement;
	//present dropdown of available playlists
	//add song from database to playlist

    //if song already in playlist, invalid
//}

/*
function searchPlaylist(){
	//alert("Searched for playlist");
    //if search == "", invalid

    let x = document.forms["playlistform"]["playlistname"].value;
    if (x == ""){
        alert("Please enter a playlist name");
        return false;
    }
}

function searchSong(){
	let x = document.forms["songform"]["songname"].value;
    if (x == ""){
        alert("Please enter a song name");
        return false;
    }
}

//plays a random song from playlist; if no playlist is playing, error
function playShuffle(){
    //TEMP goes through array of 3 diff songs
}
*/
/*
//const playPauseButton = document.getElementById("play-pause-button");
const pauseButton = document.getElementById("pause-button");
const volumeSlider = document.getElementById("volume-slider");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
let isPlaying = false;

const audioPlayer = new Audio();
audioPlayer.controls = false;
audioPlayer.src = "Songs/song0.mp3";

// Function to toggle play/pause
function togglePlayPause() {
    console.log("IN TOGGLEPLAYPAUSE");
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    pauseButton.classList.toggle("pause", isPlaying);
}

// Function to update the progress bar based on audio current time
function updateProgressBar() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = progressPercentage + "%";
}

// Update the progress bar when the audio is played or seeked
audioPlayer.addEventListener("timeupdate", updateProgressBar);

progressBar.addEventListener("click", function (e) {
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime = (clickX / progressBarWidth) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
    updateProgressBar();
});

volumeSlider.addEventListener("input", function () {
    audioPlayer.volume = volumeSlider.value;
});

const audioContainer = document.querySelector(".audio-container");
audioContainer.appendChild(audioPlayer);
*/