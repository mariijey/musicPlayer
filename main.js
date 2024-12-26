    //constants
    var musicList = [
        {
          id: 0,
          name: "Someone like you",
          singer: "Addel",
          isFavor: false,
          src: "./files/Adele-Someone-Like-You-(TrendyBeatz.com).mp3",
        },
        {
          id: 1,
          name: "dont you remember",
          singer: "AAddel",
          isFavor: true,
          src: "./files/Dont_You_Remember.mp3",
        },
        {
          id: 2,
          name: "one and only",
          singer: "AADEL",
          isFavor: false,
          src: "./files/ADELE_-_One_And_Only.mp3",
        },
      ];
      var currentIndexTrack = 0;
      var favorList = [];
      var audio = document.getElementById("audio");
      var playButton = document.getElementById("play");
      var previousButton = document.getElementById("previous");
      var nextButton = document.getElementById("next");
      var controllers = document.getElementById("controllers");
      var currentTime = document.querySelector(".current-time");
      var totalTime = document.querySelector(".total-time");
      var progressBar = document.getElementById("audio-player");
      var favor = document.getElementById("favor");
      var shuffleBtn = document.getElementById("shuffle");
      console.log("audio", audio);

      controllers.addEventListener("click", function (e) {
        if (event.target.id === "previous") {
          previous();
        }
        if (event.target.id === "next") {
          next();
        }
        if (event.target.id === "shuffle") {
          shuffle();
        }
      });
      // add to favor list
      favor.addEventListener("click", function () {
        toggleFavorList(currentIndexTrack);
      });

      //load track music
      function loadMusic() {
        var src = musicList[currentIndexTrack].src;
        audio.setAttribute("src", src);
        document.querySelector(".name-music").innerHTML =
          musicList[currentIndexTrack].name;
        document.querySelector(".singer").innerHTML =
          musicList[currentIndexTrack].singer;
        favor.innerHTML = musicList[currentIndexTrack].isFavor
          ? '<i class="fa fa-heart red"></i>'
          : '<i class="fa fa-heart white"></i>';
        audio.load();
      }
      loadMusic();

      //play music
      playButton.addEventListener("click", function () {
        if (
          currentIndexTrack >= 0 &&
          currentIndexTrack <= musicList.length - 1
        ) {
          if (audio.paused) {
            console.log("hi");
            audio.play();
            playButton.innerText = "❚❚";
            // Start playing if paused
          } else {
            playButton.innerText = "▶";
            audio.pause(); // Pause if playing
          }
        }
      });

      //render all music
      function renderAllMusic(arrayListMusic) {
        var containerAllMusic = document.getElementById("container-all-music");
        containerAllMusic.innerHTML = "";

        arrayListMusic.forEach(function (track, i) {
          var div = document.createElement("div");
          div.classList.add("track");
          div.innerHTML = `<p>${track.name} - ${track.singer}</p>`;
          containerAllMusic.appendChild(div);
          div.addEventListener("click", function () {
            currentIndexTrack = track.id;
            loadMusic();
            audio.play();
            playButton.innerText = "❚❚";
          });
        });
      }
      renderAllMusic(musicList);
      // shuffle music
      function shuffle() {
        var shuffleList = [...musicList];
        for (var i = shuffleList.length - 1; i > 0; i--) {
          var randomIndex = Math.floor(Math.random() * i);
          [shuffleList[randomIndex], shuffleList[i]] = [
            shuffleList[i],
            shuffleList[randomIndex],
          ];
        }
        renderAllMusic(shuffleList);
        return shuffleList;
      }

      //next music
      function next() {
        currentIndexTrack++;
        if (currentIndexTrack > musicList.length - 1) {
          currentIndexTrack = 0;
        }
        loadMusic();
        audio.play();
        playButton.innerText = "❚❚";
      }

      //previous music
      function previous() {
        currentIndexTrack--;
        if (currentIndexTrack < 0) {
          currentIndexTrack = musicList.length - 1;
        }
        loadMusic();
        audio.play();
        playButton.innerText = "❚❚"; // Start playing if paused
      }

      function toggleFavorList(currentIndexTrack) {
        var track = musicList.find(function (item, i) {
          return item.id === currentIndexTrack;
        });
        track.isFavor = !track.isFavor; // Toggle isFavor original array
        console.log("musicList", musicList, track.isFavor);
        favor.innerHTML = track.isFavor
          ? '<i class="fa fa-heart red"></i>'
          : '<i class="fa fa-heart-o white"></i>';
      }
      // ***************************************metadata**********************************************
      function formatTime(time) {
        var minuets = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        return minuets + ":" + seconds;
      }

      // Update current time and progress bar dynamically
      audio.addEventListener("timeupdate", function () {
        var time = formatTime(audio.currentTime);
        currentTime.innerHTML = time;
        progressBar.value = Math.floor(audio.currentTime);
      });

      //total time music
      audio.addEventListener("loadedmetadata", function () {
        var time = formatTime(audio.duration);
        totalTime.innerHTML = time;
        progressBar.max = Math.floor(audio.duration);
      });

      //  progressBar
      progressBar.addEventListener("input", function () {
        audio.currentTime = progressBar.value;
      });