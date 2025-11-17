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
<img src="${video.thumb}" alt="vignette">
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
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('hidden');

    // Titre
    document.getElementById('videoTitle').innerText = video.title;

    // Conteneur vidéo : iframe Google Drive
    const container = document.getElementById('videoPlayerContainer');
    container.innerHTML = `
        <iframe 
            src="${video.stream}" 
            width="690" 
            height="562" 
            allow="autoplay" 
            allowfullscreen
            frameborder="0">
        </iframe>
    `;

    // Lien téléchargement
    document.getElementById('downloadBtn').href = video.download;
};
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeBtn');
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('videoPlayerContainer');

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        container.innerHTML = '';
    });
});


