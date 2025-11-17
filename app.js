// Charger la base de données des vidéos
fetch('videos.json')
.then(res => res.json())
.then(videos => initGallery(videos));


function initGallery(videos) {
const gallery = document.getElementById('gallery');
const search = document.getElementById('search');


function render(items) {
gallery.innerHTML = '';


items.forEach(video => {
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = `
<img src="${video.thumbnail}" alt="vignette">
<div class="info">
<strong>${video.title}</strong><br>
<small>${video.year}</small>
</div>
`;
card.onclick = () => openLightbox(video);
gallery.appendChild(card);
});
}


search.addEventListener('input', () => {
const q = search.value.toLowerCase();
const filtered = videos.filter(v =>
v.title.toLowerCase().includes(q) ||
String(v.year).includes(q) ||
(v.people && v.people.some(p => p.toLowerCase().includes(q)))
);
render(filtered);
});


render(videos);
}


// LIGHTBOX
function openLightbox(video) {
document.getElementById('lightbox').classList.remove('hidden');
document.getElementById('videoTitle').innerText = video.title;
document.getElementById('videoPlayer').src = video.stream;
document.getElementById('downloadBtn').href = video.download;
}


document.getElementById('closeBtn').onclick = () => {
document.getElementById('lightbox').classList.add('hidden');
document.getElementById('videoPlayer').pause();
};