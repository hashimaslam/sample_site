const API_KEY = "AIzaSyBxeZZZi7lfH4XeoBNtX8FWa3jQUK40yNI";
let URL = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}`;
let start = 0;
let limit = 3;

const videoIds = [
  "lR7XZH-8U_A",
  "SDddvPHkmmY",
  "jxiPMVQantQ",
  "f06866miRHc",
  "sKyEHNPNK-c",
  "Wyr-KKwYlM4",
  "NJIO_W_vEl4",
  "YOCUjEUn8DQ",
  "SIBQ7Ssj-Jw",
  "P8ywSnXUO58",
  "ueinBaUWehQ",
  "5T1j5DzmqNM",
  "UnQyHwQ5JsM",
];
let IDlist;
function fetchVideos() {
  IDlist = videoIds.slice(start, limit).join(",");
  console.log(IDlist);

  if (!IDlist.length) {
    return;
  }
  fetch(`${URL}&id=${IDlist}&part=snippet`)
    .then((res) => res.json())
    .then((data) => {
      addLoader();
      data.items.map((item) => {
        let node = `<iframe
        width="300"
        height="250"
        src="https://www.youtube.com/embed/${item.id}"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        class='iframe-style'
      ></iframe>
      <div class="vid-wrapper">
      <div class="vid-title">
      ${item.snippet.title}
      </div>
      <div class="vid-small">samll title</div>
      </div>
      `;
        let videoPlayer = document.createElement("div");
        videoPlayer.id = "video-player";
        videoPlayer.insertAdjacentHTML("afterbegin", node);
        document.getElementById("container").appendChild(videoPlayer);
      });
      removeLoader();
    })
    .catch((err) => {
      removeLoader();
    });

  start = start + 3;
  limit += 3;
}
fetchVideos();

//Scroll Loader
window.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchVideos();
    }
  },
  {
    passive: true,
  }
);
window.addEventListener(
  "touchmove",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      fetchVideos();
    }
  },
  {
    passive: true,
  }
);

//Theme Switch
const themeSwitch = document.querySelector("input");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
});

//Loader

function addLoader() {
  document.getElementById("loader").style.visibility = "visible";
  return;
}

function removeLoader() {
  document.getElementById("loader").style.visibility = "hidden";
  return;
}
