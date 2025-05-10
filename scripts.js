/* === Détection mobile === */
// Déclarez isMobile comme une variable globale
var isMobile = false;

// Détecter mobile
function detectMobile() {
  isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) || window.innerWidth <= 768;
  if (isMobile) {
    document.body.classList.add('is-mobile');
    console.log('Mode mobile activé');
  } else {
    document.body.classList.remove('is-mobile');
    console.log('Mode desktop activé');
  }
}

// Appeler la fonction au chargement de la page
detectMobile();

// Réagir aux changements de taille de la fenêtre
window.addEventListener('resize', detectMobile);

/* === Configuration de la carte === */
// Centrage et zoom selon device
var mapCenter = isMobile ? [50, 10] : [20, 0];
var mapZoom = isMobile ? 4 : 3;

// Vérifiez si une carte existe déjà
if (typeof map !== 'undefined' && map !== null) {
  map.remove(); // Supprime l'instance existante de la carte
}

var map = L.map('map', {
  center: mapCenter,       // Coordonnées du centre de la carte
  zoom: mapZoom,           // Niveau de zoom
  maxZoom: 19,             // Limite du zoom maximum
  minZoom: 2,              // Limite du zoom minimum
  crs: L.CRS.EPSG3857,     // Système de coordonnées par défaut (si nécessaire)
  
  
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,            // Maximum zoom pour cette couche de tuiles
  noWrap: true            // Empêche la répétition horizontale des tuiles
}).addTo(map);


// Couches de base
var baseMaps = {
  "Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'),
  "Dark": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png')
};

L.control.layers(baseMaps).addTo(map);

// Détecter le changement de couche pour activer/désactiver le mode sombre
map.on('baselayerchange', function(event) {
  if (event.name === "Dark") { 
    document.body.classList.add('dark-mode'); 
  } else {
    document.body.classList.remove('dark-mode'); 
  }
});

/* === Gestion des événements de la carte === */
// Détection de mouvement de la carte
map.on('dragstart', function () {
  map.closePopup();
  var fullscreenTooltip = document.getElementById('fullscreen-tooltip');
  var closeTooltip = document.getElementById('close-tooltip');
  if (fullscreenTooltip) fullscreenTooltip.style.display = 'none';
  if (closeTooltip) closeTooltip.style.display = 'none';
  document.body.classList.remove('tooltip-open');
});

// Détection de clic sur la carte
map.on('click', function () {
  map.closePopup();
  var fullscreenTooltip = document.getElementById('fullscreen-tooltip');
  var closeTooltip = document.getElementById('close-tooltip');
  if (fullscreenTooltip) fullscreenTooltip.style.display = 'none';
  if (closeTooltip) closeTooltip.style.display = 'none';
  document.body.classList.remove('tooltip-open');
});

/* === Chargement des données GeoJSON === */
function style(feature) {
  var code = feature.properties.shapeGroup || feature.properties.GID_0;
  var cat = getCountryCategory(code);
  return {
    fillColor: cat.color,
    color: 'black',
    weight: 1,
    fillOpacity: 0.7
  };
}

fetch('all_countries.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: style,
      onEachFeature: function (feature, layer) {
        var code = feature.properties.shapeGroup || feature.properties.GID_0;
        if (countryMessages[code]) {
          layer.bindPopup(
            countryMessages[code].replace(
              '<h3>',
              '<h3><img src="https://flagcdn.com/32x24/' +
              iso3to2[code] +
              '.png" class="flag-icon"> '
            ),
            { className: 'custom-tooltip', maxWidth: 250 }
          );
        }
      }
    }).addTo(map);
  })
  .catch(err => console.error('Erreur lors du chargement du GeoJSON', err));

/* === Ajout des marqueurs === */
Object.keys(countryIcons).forEach(function (code) {
  var coords = countryIcons[code],
    cat = getCountryCategory(code);
  if (!cat.icon) return;

  var marker = L.marker(coords, { icon: cat.icon }).addTo(map);
  marker.bindPopup(
    countryMessages[code]
      ? countryMessages[code].replace('<h3>', '<h3><img src="https://flagcdn.com/32x24/' + iso3to2[code] + '.png" class="flag-icon"> ')
      : "Pas de message défini",
    { className: 'custom-tooltip', maxWidth: 250 }
  );

  marker.on('click', function () {
    marker.openPopup();
    console.log('Popup affiché pour le marqueur :', code);
  });
});

/* === Légende === */
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function () {
  var div = L.DomUtil.create('div', 'info legend');
  var cols = ['green', 'orange', 'red'];
  var labs = ['Voyagez tranquilles', 'Des précautions sont à prévoir', 'Pays déconseillé'];

  if (isMobile) {
    div.innerHTML = '<button id="legend-toggle">Afficher légende</button>' +
      '<div id="legend-content" style="display:none;"></div>';
    setTimeout(() => {
      var content = document.getElementById('legend-content');
      var btn = document.getElementById('legend-toggle');
      cols.forEach(function (c, i) {
        content.innerHTML += '<i style="background:' + c + ';width:18px;height:18px;display:inline-block;margin-right:8px"></i>' +
          labs[i] + '<br>';
      });
      btn.addEventListener('click', function () {
        if (content.style.display === 'none') {
          content.style.display = 'block';
          btn.textContent = 'Masquer légende';
        } else {
          content.style.display = 'none';
          btn.textContent = 'Afficher légende';
        }
      });
    }, 0);
  } else {
    cols.forEach(function (c, i) {
      div.innerHTML += '<i style="background:' + c + ';width:18px;height:18px;display:inline-block;margin-right:8px"></i>' +
        labs[i] + '<br>';
    });
  }
  return div;
};
legend.addTo(map);

/* === Logo === */
var LogoControl = L.Control.extend({
  options: { position: 'bottomleft' },
  onAdd: function () {
    var img = L.DomUtil.create('img', 'company-logo');
    img.src = 'logo.png';
    img.alt = 'Logo de mon entreprise';
    img.onclick = function () { window.open('https://fr.vapingpost.com/', '_blank'); };
    return img;
  }
});
map.addControl(new LogoControl());

/* === Gestion des tooltips plein écran === */
document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('more-info')) {
    e.preventDefault();
    var code = e.target.getAttribute('data-code');
    var content = detailedInfo[code] || "<h2>Informations non disponibles</h2><p>Désolé, nous n'avons pas encore de détails pour ce pays.</p>";

    if (map.isFullscreen()) map.toggleFullscreen();

    var tooltipContent = document.getElementById('tooltip-content');
    var fullscreenTooltip = document.getElementById('fullscreen-tooltip');
    var closeTooltip = document.getElementById('close-tooltip');

    if (tooltipContent && fullscreenTooltip && closeTooltip) {
      tooltipContent.innerHTML = content;
      fullscreenTooltip.style.display = 'block';
      closeTooltip.style.display = 'block';
      document.body.classList.add('tooltip-open');
      console.log('Tooltip affiché');
    } else {
      console.error('Les éléments DOM nécessaires pour les tooltips fullscreen sont introuvables.');
    }
  }
});

var closeTooltip = document.getElementById('close-tooltip');
if (closeTooltip) {
  closeTooltip.addEventListener('click', function () {
    var fullscreenTooltip = document.getElementById('fullscreen-tooltip');
    if (fullscreenTooltip) fullscreenTooltip.style.display = 'none';
    closeTooltip.style.display = 'none';
    document.body.classList.remove('tooltip-open');
  });
} else {
  console.error('Le bouton #close-tooltip est introuvable dans le DOM.');
}