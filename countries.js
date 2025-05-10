// Icônes personnalisées Attention/Danger 
var attentionIcon = L.icon({
  iconUrl: 'attention.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'attention-marker-icon'
});
var dangerIcon = L.icon({
  iconUrl: 'danger.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'danger-marker-icon'
});

// Fonction pour obtenir la catégorie d'un pays
function getCountryCategory(code) {
  if (['BEL', 'CAN', 'DNK', 'EST', 'FIN', 'GRC', 'HUN', 'IDN', 'ITA', 'LTU', 'LVA', 'MYS', 'NLD', 'PRT', 'SVN', 'TUN', 'USA'].includes(code))
    return { color: 'orange', icon: attentionIcon };
  if (['AUS', 'ARG', 'BRA', 'KHM', 'CHL', 'COL', 'MUS', 'IND', 'JPN', 'LAO', 'QAT', 'SGP', 'LKA', 'THA'].includes(code))
    return { color: 'red', icon: dangerIcon };
  return { color: 'green', icon: null };
}

// Fonction pour faire apparaître l'icone sur la capitale de chaque pays 

var countryIcons = {
    CAN:[45.4215,-75.6972], CHN:[39.9042,116.4074], KOR:[37.5665,126.9780],
    GRC:[37.9838,23.7275], IDN:[-6.2088,106.8456], ITA:[41.9028,12.4964],
    MYS:[3.1390,101.6869], PRT:[38.7169,-9.1399], TUN:[36.8065,10.1815],
    USA:[38.9072,-77.0369], AUS:[-35.2809,149.1300], ARG:[-34.6037,-58.3816],
    BRA:[-15.7801,-47.9292], KHM:[11.5564,104.9282], CHL:[-33.4489,-70.6693],
    COL:[4.7110,-74.0721], FIN:[60.1695,24.9354], MUS:[-20.1654,57.4896],
    IND:[28.6139,77.2090], JPN:[35.6895,139.6917], LAO:[17.9757,102.6331],
    NLD:[52.3676,4.9041], QAT:[25.2769,51.5200], SGP:[1.3521,103.8198],
    LKA:[6.9271,79.8612], THA:[13.7563,100.5018], NZL:[-41.2865,174.7762],
    GLP:[16.2650,-61.5500], MAR:[33.5731,-7.5898], MTQ:[14.6415,-61.0242],
    BEL:[50.8503, 4.3517], DNK: [55.6761, 12.5683], DZA : [36.7525, 3.04197],
    LVA: [56.9496, 24.1052], SVN: [46.0569, 14.5058], HUN: [47.4979, 19.0402], 
    LTU: [54.6872, 25.2797], EST: [59.4370, 24.7536],  
    
  };
  
  // Fonction pour obtenir le code ISO 2 à partir du code ISO 3 (je sais plus à quoi ça sert mais c'est important sinon ça casse tout)
  
      var iso3to2 = {
        CAN:'ca', CHN:'cn', KOR:'kr', GRC:'gr', IDN:'id', ITA:'it', MYS:'my', 
        PRT:'pt', TUN:'tn', USA:'us', AUS:'au', ARG:'ar', BRA:'br', KHM:'kh', 
        CHL:'cl', COL:'co', FIN:'fi', LVA:'lv', MUS:'mu', IND:'in', JPN:'jp', LAO:'la', 
        NLD:'nl', QAT:'qa', SGP:'sg', LKA:'lk', THA:'th', NZL:'nz', GLP:'gp', 
        MAR:'ma', MTQ:'mq', ESP:'es', GBR:'gb', BEL:'be', DNK:'dk', DZA:'dz', SVN:'sv', HUN:'hu', LTU:'lt', EST:'ee',
      };

      // Messages d'information pour chaque pays (petits tooltips)
  
      var countryMessages = {
    ARG: "<h3>Argentine</h3> <ul><li>Commerce des produits de la vape interdit</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"ARG\">Plus d'info</a>",
    AUS: "<h3>Australie</h3> <ul><li>Peu de vapeshops</li><li>Aucun produit de la vape en vente libre, ordonnance médicale nécessaire</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"AUS\">Plus d'info</a>",
    BEL: "<h3>Belgique</h3><ul><li>Les e-liquides sont taxés</li><li>Les puffs sont interdites</li><li>Emportez votre matériel avec vous.</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"BEL\">Plus d'info</a>",
    BRA: "<h3>Brésil</h3> <ul><li>Commerce des produits de la vape interdit</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"BRA\">Plus d'info</a>",
    CAN: "<h3>Canada</h3> <ul><li>La loi dépend des États. Renseignez-vous auprès des autorités de l'endroit où vous vous rendez.</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"CAN\">Plus d'info</a>",
    CHL: "<h3>Chili</h3> <ul><li>Commerce des produits de la vape interdit</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"CHL\">Plus d'info</a>",
    CHN: "<h3>Chine</h3> <ul><li>La vente en ligne des produits de la vape est interdite</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"CHN\">Plus d'info</a>",
    COL: "<h3>Colombie</h3> <ul><li>La vente des produits de la vape est interdite</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"COL\">Plus d'info</a>",
    DNK: "<h3>Danemark</h3> <ul><li>Les arômes sont interdits dans les e-liquides</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"DNK\">Plus d'info</a>",
    EST: "<h3>Estonie</h3> <ul><li>Les arômes sont interdits dans les e-liquides</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"EST\">Plus d'info</a>",      
    FIN: "<h3>Finlande</h3> <ul><li>La grande majorité des arômes sont interdits dans les e-liquides.</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"FIN\">Plus d'info</a>",
    GRC: "<h3>Grèce</h3> <ul><li>Taxation des e-liquides</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"GRC\">Plus d'info</a>",
    HUN: "<h3>Hongrie</h3> <ul><li><b>TOUS</b> les arômes sont interdits dans les e-liquides. Les vapoteurs ne sont autorisés qu'à vapoter une base neutre composée de PG, de VG, et éventuellement de nicotine</li><li>Apportez votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"HUN\">Plus d'info</a>",
    IDN: "<h3>Indonésie</h3> <ul><li>Les vape shops se trouvent principalement à Bali</li><li>Les e-liquides sont fortement taxés</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"IDN\">Plus d'info</a>",
    IND: "<h3>Inde</h3> <ul><li>Commerce des produits de la vape interdit</li><li>Législation peu claire sur l'utilisation du vaporisateur personnel</li><li>Nous vous déconseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"IND\">Plus d'info</a>",
    ITA: "<h3>Italie</h3> <ul><li>Les e-liquides sont taxés</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"ITA\">Plus d'info</a>",
    JPN: "<h3>Japon</h3> <ul><li>La nicotine est classifiée comme un médicament</li><li>Il est nécessaire d'obtenir une autorisation pour apporter vos e-liquides nicotinés</li><li>Nous vous conseillons de vous renseigner auprès des autorités locales</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"JPN\">Plus d'info</a>",
    KHM: "<h3>Cambodge</h3> <ul><li>Produits de la vape interdits</li><li>Nous vous déconseillons de vous rendre au Cambodge avec votre matériel</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"KHM\">Plus d'info</a>",
    LAO: "<h3>Laos</h3> <ul><li>Tous les produits de la vape sont interdits</li><li>Nous vous déconseillons de vous rendre au Laos avec votre matériel</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"LAO\">Plus d'info</a>",
    LTU: "<h3>Lituanie</h3> <ul><li>Les arômes sont interdits dans les e-liquides</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"LTU\">Plus d'info</a>", 
    LVA: "<h3>Lettonie</h3> <ul><li>Les arômes sont interdits dans les e-liquides</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"LVA\">Plus d'info</a>",
    LKA: "<h3>Sri Lanka</h3> <ul><li>Commerce des produits de la vape interdit</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"LKA\">Plus d'info</a>",
    MYS: "<h3>Malaisie</h3> <ul><li>Forte taxation des e-liquides</li><li>Vente des e-liquides nicotinés réservée aux pharmacies agréées</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"MYS\">Plus d'info</a>",
    MUS: "<h3>Île Maurice</h3> <ul><li>Commerce des produits de la vape interdit</li><li>Possibilité de rencontrer des problèmes à l'aéroport en cas de possession de produits de la vape</li><li>À vos risques et périls</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"MUS\">Plus d'info</a>",
    NLD: "<h3>Pays-Bas</h3> <ul><li>Les arômes sont interdits dans les e-liquides</li><li>Les puffs sont interdites</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"NLD\">Plus d'info</a>",
    PRT: "<h3>Portugal</h3> <ul><li>Les e-liquides sont taxés</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"PRT\">Plus d'info</a>",
    QAT: "<h3>Qatar</h3> <ul><li>Le vapotage est interdit</li><li>Nous vous déconseillons de vous rendre au Qatar avec votre matériel</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"QAT\">Plus d'info</a>",
    SGP: "<h3>Singapour</h3> <ul><li>Le vapotage est considéré comme un délit</li><li>Nous vous déconseillons <b>fortement</b> d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"SGP\">Plus d'info</a>",
    SVN: "<h3>Slovénie</h3> <ul><li>Les arômes sont interdits dans les e-liquides</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"SVN\">Plus d'info</a>", 
    THA: "<h3>Thaïlande</h3> <ul><li>La Thaïlande est l'un des pays les plus restrictifs au monde en matière de vapotage</li><li>Nous vous déconseillons <b>vivement</b> d'y apporter votre matériel</li><li>Certains touristes ont déjà été emprisonnés pour possession de produits de la vape</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"THA\">Plus d'info</a>",
    TUN: "<h3>Tunisie</h3> <ul><li>Très peu d'e-liquides autorisés</li><li>Nous vous conseillons d'apporter votre matériel avec vous</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"TUN\">Plus d'info</a>",
    USA: "<h3>USA</h3> <ul><li>La législation varie fortement d'un État à l'autre</li><li>Renseignez-vous auprès des autorités</li></ul> <a href=\"#\" class=\"more-info\" data-code=\"USA\">Plus d'info</a>"
  };
  
  // Messages d'information pour chaque pays (fullscreen tooltips)
  
  var detailedInfo = {
    ARG: `
      <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Argentine (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Argentine (2025)
      </h1>
      <img src="images-pays/arg.jpg" loading="lazy" alt="Argentine" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        En Argentine, la législation interdit :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">La fabrication, l'importation, la vente et la distribution de cigarettes électroniques et de dispositifs de vapotage,</span> conformément à la disposition <strong>ANMAT n° 3226/2011</strong>.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">La publicité et la promotion de ces produits.</span>
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Bien que l'usage personnel ne soit pas explicitement interdit, l'achat et l'approvisionnement en matériel sont difficiles en raison de l'absence de marché légal. Les voyageurs peuvent apporter leur propre équipement pour usage personnel, mais doivent faire preuve de discrétion, notamment dans les lieux publics où des interdictions locales peuvent s'appliquer.
      </p>

      <p class="mt-4">
        Des initiatives législatives visant à réguler et taxer les produits de vapotage ont été proposées, notamment dans le cadre de la <strong>loi "Omnibus"</strong> présentée en 2024. Cependant, ces propositions n'ont pas encore abouti à une réglementation officielle.
      </p>

      <p class="mt-4">
        Les contrevenants aux interdictions de vente et de distribution s'exposent à des sanctions administratives, telles que des amendes et la confiscation des produits.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://ecigintelligence.com/argentina-e-cigarette-tax-proposal-gives-local-industry-hope-for-vaping-regulation/" class="text-blue-600 underline hover:text-blue-800" target="_blank">ECigIntelligence</a>,
        <a href="#argentine" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

    `,

    AUS: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Australie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Australie (2025)
      </h1>
      <img src="images-pays/aus.jpg" loading="lazy" alt="Australie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Depuis le 1er juillet 2024, la vente de tous les produits de vapotage, y compris ceux sans nicotine, est restreinte aux pharmacies. Les produits doivent répondre à des normes strictes et ne sont disponibles que pour les adultes de 18 ans et plus, sous certaines conditions.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚚</span>
          <p>
            <span class="font-semibold">Importation :</span> Depuis le 1er mars 2024, l'importation de dispositifs de vapotage, accessoires et substances nécessite une licence et un permis délivrés par l'Office of Drug Control. Les voyageurs peuvent apporter jusqu'à 2 dispositifs, 20 accessoires et 200 mL de liquide, uniquement pour usage personnel.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🏪</span>
          <p>
            <span class="font-semibold">Vente au détail :</span> La vente de produits de vapotage est interdite en dehors des pharmacies. Les détaillants tels que les magasins de proximité, boutiques de vapotage et buralistes ne peuvent pas vendre ces produits, même avec une ordonnance.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> Toute forme de publicité, promotion ou parrainage des produits de vapotage est interdite.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les infractions peuvent entraîner des amendes allant jusqu'à 161 300 AUD pour les entreprises et 32 260 AUD pour les individus. Des peines d'emprisonnement peuvent également s'appliquer en cas de récidive ou de violations graves.
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Ces mesures visent à réduire l'accès des jeunes aux produits de vapotage et à contrôler le marché noir en expansion.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.tga.gov.au/products/unapproved-therapeutic-goods/vaping-hub/changes-regulation-vapes" class="text-blue-600 underline hover:text-blue-800" target="_blank">TGA - Changes to the regulation of vapes</a>,
        <a href="https://www.odc.gov.au/importers/importing-vaping-goods-australia" class="text-blue-600 underline hover:text-blue-800" target="_blank">ODC - Importing vaping goods into Australia</a>,
        <a href="#australie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  BEL: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Belgique (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Belgique (2025)
      </h1>
      <img src="images-pays/bel.jpg" loading="lazy" alt="Belgique" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        La Belgique a renforcé sa réglementation sur les produits de vapotage afin de protéger la santé publique, notamment celle des jeunes, et de réduire l'impact environnemental des dispositifs jetables.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction des cigarettes électroniques jetables :</span> Depuis le 1er janvier 2025, la vente de puffs est interdite sur l'ensemble du territoire belge, faisant de la Belgique le premier pays de l'UE à adopter une telle mesure. Cette décision vise à limiter l'accès des jeunes à ces produits attractifs et à réduire les déchets électroniques.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚪</span>
          <p>
            <span class="font-semibold">Interdiction d'exposition en point de vente :</span> À partir du 1er avril 2025, tous les produits du tabac et de vapotage doivent être retirés des étals des magasins. Ils ne peuvent plus être visibles pour les clients, quelle que soit la taille ou le type de commerce. Seules des listes standardisées mentionnant les marques et les prix peuvent être consultées sur demande.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🏷️</span>
          <p>
            <span class="font-semibold">Restrictions supplémentaires :</span> La vente de produits de vapotage est interdite dans les points de vente temporaires (festivals, marchés, etc.). De plus, les dispositifs de vapotage ne doivent pas comporter de fonctionnalités attractives pour les jeunes, telles que des lumières LED ou des designs ludiques.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💰</span>
          <p>
            <span class="font-semibold">Taxation des e-liquides :</span> Depuis le 1er janvier 2024, une taxe d'accise de 0,15 € par millilitre s'applique à tous les e-liquides, avec ou sans nicotine. Tous les produits doivent porter une marque fiscale attestant du paiement de cette taxe.
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Ces mesures s'inscrivent dans le cadre du plan national de lutte contre le tabac, lancé en 2022, qui vise à atteindre une génération sans tabac d'ici 2032. Les contrevenants s'exposent à des sanctions pouvant aller de 208 € à 8 000 € d'amende, voire à des peines de prison en cas de récidive.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.health.belgium.be/fr/news/extension-de-linterdiction-de-fumer-et-modifications-legislatives-concernant-les-produits-de" class="text-blue-600 underline hover:text-blue-800" target="_blank">SPF Santé publique</a>,
        <a href="https://www.theguardian.com/world/2025/jan/01/belgium-becomes-first-eu-country-to-ban-sale-of-disposable-vapes" class="text-blue-600 underline hover:text-blue-800" target="_blank">The Guardian</a>,
        <a href="https://www.generationsanstabac.org/en/actualites/belgique-interdiction-des-etals-pour-les-produits-du-tabac-et-du-vapotage-en-2025/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Génération Sans Tabac</a>,
        <a href="#belgique" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  BRA: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage au Brésil (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage au Brésil (2025)
      </h1>
      <img src="images-pays/bra.jpg" loading="lazy" alt="Brésil" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Au Brésil, la législation interdit :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">La fabrication, l’importation, la vente et la distribution de cigarettes électroniques et de tous dispositifs de vapotage.</span>
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Le transport, le stockage et la publicité de ces produits.</span>
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">✈️</span>
          <p>
            <span class="font-semibold">Leur entrée sur le territoire, même dans les bagages personnels.</span>
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Cette interdiction est fixée par la résolution <b>RDC n° 855</b> de l’Anvisa (2024).
      </p>

      <p class="mt-4">
        L’usage personnel n’est pas explicitement interdit par la loi, mais l’interdiction de transport et de stockage rend leur possession risquée au regard des contrôles.
      </p>

      <p class="mt-4">
        Les contrevenants s’exposent à des sanctions administratives : amendes, saisies, destruction des produits et suspension d’activités commerciales.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2024/anvisa-mantem-proibicao-de-cigarros-eletronicos" class="text-blue-600 underline hover:text-blue-800" target="_blank">Anvisa</a>,
        <a href="https://gsthr.org/countries/profile/bra/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Global State of Tobacco Harm Reduction</a>,
        <a href="https://www.reuters.com/world/americas/brazil-health-regulator-maintains-ban-e-cigarettes-2024-04-19/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Reuters</a>,
        <a href="#bresil" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  
  CAN: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage au Canada (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage au Canada (2025)
      </h1>
      <img src="images-pays/can.jpg" loading="lazy" alt="Canada" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Au Canada, la réglementation sur le vapotage est encadrée par la <strong>Loi sur le tabac et les produits de vapotage (LTPV)</strong>, avec des mesures renforcées en 2024 et 2025 pour limiter l'accès des jeunes et encadrer la commercialisation.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍂</span>
          <p>
            <span class="font-semibold">Restrictions sur les arômes :</span> Seules les saveurs de tabac, menthe ou menthol sont autorisées. Les sucres, édulcorants et la plupart des arômes sont interdits, sauf ceux spécifiquement prévus pour ces saveurs.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🛒</span>
          <p>
            <span class="font-semibold">Vente en ligne :</span> Des vérifications renforcées de l'âge et de l'identité sont obligatoires lors des ventes à distance pour limiter l'accès des jeunes.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💰</span>
          <p>
            <span class="font-semibold">Taxation :</span> Une taxe d'accise fédérale s'applique selon le volume. Par exemple, au Yukon en 2025 : 2,24 $ pour les deux premiers ml, puis 2,24 $ par tranche de 10 ml supplémentaires.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et emballage :</span> Publicité restreinte, emballages neutres, avertissements sanitaires obligatoires, sauf pour les produits approuvés comme aide au sevrage tabagique.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Attention : certaines provinces ou territoires appliquent des règles plus strictes (interdictions d'arômes, restrictions sur les points de vente). Il est recommandé de se renseigner localement avant tout achat ou voyage.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.canada.ca/fr/sante-canada/organisation/a-propos-sante-canada/legislation-lignes-directrices/lois-reglements/plan-reglementaire-prospectif/plan.html" class="text-blue-600 underline hover:text-blue-800" target="_blank">Santé Canada</a>,
        <a href="https://www.canada.ca/fr/sante-publique/nouvelles/2025/01/declaration-du-conseil-des-medecins-hygienistes-en-chef-sur-le-vapotage-de-nicotine-au-canada-dans-le-cadre-de-la-semaine-nationale-sans-fumee.html" class="text-blue-600 underline hover:text-blue-800" target="_blank">Santé publique Canada</a>,
        <a href="https://yukon.ca/fr/nouvelles/nouvel-accord-de-taxation-sur-les-produits-de-vapotage-prendra-effet-le-1er-janvier-2025" class="text-blue-600 underline hover:text-blue-800" target="_blank">Gouvernement du Yukon</a>,
        <a href="#canada" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  CHL: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage au Chili (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage au Chili (2025)
      </h1>
      <img src="images-pays/chl.jpg" loading="lazy" alt="Chili" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Depuis le 4 janvier 2024, le Chili a promulgué la <strong>Ley N° 21.642</strong>, qui établit un cadre réglementaire strict pour les dispositifs de vapotage, qu'ils contiennent ou non de la nicotine. Cette loi assimile les systèmes électroniques de distribution de nicotine (SEAN) et sans nicotine (SESN) aux produits du tabac, les soumettant ainsi à des restrictions similaires.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Interdiction de vente aux mineurs :</span> La vente, la distribution et la promotion de ces produits sont interdites aux personnes de moins de 18 ans, y compris les accessoires et les liquides de recharge.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> Toute forme de publicité, directe ou indirecte, est restreinte. Les informations autorisées doivent se limiter aux caractéristiques générales des produits, notamment pour les SESN à usage thérapeutique.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation dans les lieux publics :</span> L'usage de ces dispositifs est interdit dans les mêmes lieux que ceux où le tabac est proscrit, tels que les espaces publics fermés, les transports en commun et les établissements de santé, sauf exceptions médicales avec prescription.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Étiquetage et emballage :</span> Les produits doivent comporter des avertissements sanitaires sur les effets nocifs de leur consommation ou de l'exposition aux aérosols générés. Les emballages doivent également inclure des informations détaillées sur le fabricant, les ingrédients, la concentration en nicotine (maximum autorisé de 45 mg/ml) et les instructions d'utilisation.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🏭</span>
          <p>
            <span class="font-semibold">Obligations des fabricants :</span> Les entreprises doivent informer annuellement le ministère de la Santé des détails concernant les composants, les additifs et les substances utilisées dans leurs produits. L'utilisation d'additifs interdits ou non déclarés est proscrite.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les infractions à cette loi sont passibles de sanctions administratives, notamment des amendes pouvant aller jusqu'à 1 000 UTM (Unités Tributaires Mensuelles), des saisies de produits et des suspensions d'activités commerciales.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Cette législation vise à protéger la santé publique, en particulier celle des jeunes, en encadrant strictement la commercialisation et l'utilisation des produits de vapotage.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.bcn.cl/leychile/Navegar?idNorma=1199790&idVersion=Diferido" class="text-blue-600 underline hover:text-blue-800" target="_blank">Biblioteca del Congreso Nacional de Chile</a>,
        <a href="https://www.ispch.gob.cl/noticia/instituto-de-salud-publica-de-chile-isp-identifica-graves-danos-a-la-salud-de-las-personas-por-cigarrillos-electronicos-y-o-vapeadores/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Instituto de Salud Pública de Chile</a>,
        <a href="#chili" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  CHN: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Chine (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Chine (2025)
      </h1>
      <img src="images-pays/chn.jpg" loading="lazy" alt="Chine" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        En Chine continentale, les cigarettes électroniques sont soumises à une réglementation stricte, alignée sur celle des produits du tabac traditionnels.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction des arômes :</span> Depuis le 1er octobre 2022, seuls les e-liquides au goût de tabac sont autorisés. Les arômes fruités, mentholés ou autres sont interdits.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🛒</span>
          <p>
            <span class="font-semibold">Vente en ligne :</span> La vente de cigarettes électroniques sur Internet est interdite depuis 2019, tout comme leur publicité en ligne.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🏛️</span>
          <p>
            <span class="font-semibold">Réglementation :</span> Depuis 2021, les cigarettes électroniques sont intégrées au système de monopole d'État sur le tabac, avec des exigences strictes en matière de fabrication, de distribution et de vente.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💸</span>
          <p>
            <span class="font-semibold">Taxation :</span> Depuis octobre 2022, une taxe de consommation s'applique : 36 % au niveau de la production ou de l'importation, et 11 % au niveau de la distribution en gros.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation dans les lieux publics :</span> L'usage des cigarettes électroniques est interdit dans les lieux publics fermés, conformément aux réglementations locales, comme à Shanghai.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Les contrevenants s'exposent à des sanctions administratives, notamment des amendes, la confiscation des produits et la suspension des activités commerciales.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://zh.wikipedia.org/wiki/電子煙" class="text-blue-600 underline hover:text-blue-800" target="_blank">Wikipedia (chinois)</a>,
        <a href="#chine" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  COL: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Colombie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Colombie (2025)
      </h1>
      <img src="images-pays/col.jpg" loading="lazy" alt="Colombie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Depuis le 9 mai 2024, la <strong>Ley 2354</strong> est en vigueur en Colombie, établissant un cadre réglementaire strict pour les dispositifs de vapotage, qu'ils contiennent ou non de la nicotine. Cette loi étend les restrictions de la <strong>Ley Antitabaco (Ley 1335 de 2009)</strong> aux produits de vapotage, les assimilant aux produits du tabac traditionnels.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Interdiction de vente aux mineurs :</span> La vente, la distribution et la promotion de ces produits sont interdites aux personnes de moins de 18 ans.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> Toute forme de publicité, directe ou indirecte, est restreinte. Les informations autorisées doivent se limiter aux caractéristiques générales des produits.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation dans les lieux publics :</span> L'usage de ces dispositifs est interdit dans les mêmes lieux que ceux où le tabac est proscrit, tels que les espaces publics fermés, les transports en commun et les établissements de santé.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Étiquetage et emballage :</span> Les produits doivent comporter des avertissements sanitaires sur les effets nocifs de leur consommation ou de l'exposition aux aérosols générés. Les emballages doivent également inclure des informations détaillées sur le fabricant, les ingrédients, la concentration en nicotine et les instructions d'utilisation.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🏢</span>
          <p>
            <span class="font-semibold">Obligations des fabricants :</span> Les entreprises doivent informer annuellement le ministère de la Santé des détails concernant les composants, les additifs et les substances utilisées dans leurs produits. L'utilisation d'additifs interdits ou non déclarés est proscrite.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les infractions à cette loi sont passibles de sanctions administratives, notamment des amendes pouvant aller jusqu'à 400 salaires mensuels légaux minimaux en vigueur (SMLMV), des saisies de produits et des suspensions d'activités commerciales.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Cette législation vise à protéger la santé publique, en particulier celle des jeunes, en encadrant strictement la commercialisation et l'utilisation des produits de vapotage.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=240576" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ley 2354 de 2024 - Función Pública</a>,
        <a href="https://www.elespectador.com/salud/queda-en-firme-ley-que-regula-uso-de-cigarrillos-electronicos-y-vapeadores-en-colombia/" class="text-blue-600 underline hover:text-blue-800" target="_blank">El Espectador</a>,
        <a href="#colombie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,

    DNK: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage au Danemark (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage au Danemark (2025)
      </h1>
      <img src="images-pays/dnk.jpg" loading="lazy" alt="Danemark" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Au Danemark, la vente et l'utilisation de cigarettes électroniques sont autorisées, mais strictement encadrées :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> La vente est réservée aux personnes de 18 ans et plus.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍂</span>
          <p>
            <span class="font-semibold">Arômes :</span> Seuls les arômes tabac et menthol sont autorisés. Les arômes sucrés ou fruités sont interdits, y compris sur les emballages.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍬</span>
          <p>
            <span class="font-semibold">Puffs :</span> Les cigarettes électroniques jetables (puffs) contenant des arômes sucrés ou un taux de nicotine élevé sont interdites à la vente, à l'importation et à la possession, sauf dans la limite de 10 unités pour usage personnel lors de voyages.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> L'usage est interdit dans les lieux où fumer est prohibé, tels que les écoles, transports publics et lieux de travail, sauf dans les zones spécifiquement désignées.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> Toute forme de publicité ou de promotion des produits de vapotage est interdite, y compris en ligne et sur les points de vente, à l'exception des boutiques spécialisées.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage :</span> Les produits doivent être conditionnés dans des emballages neutres de couleur Pantone 448C, avec des avertissements sanitaires couvrant au moins 30 % des faces principales.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💧</span>
          <p>
            <span class="font-semibold">Concentration en nicotine :</span> Le taux maximal autorisé est de 20 mg/ml. Les réservoirs ne doivent pas dépasser 2 ml et les flacons de recharge 10 ml.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💶</span>
          <p>
            <span class="font-semibold">Fiscalité :</span> Une taxe est appliquée sur les e-liquides contenant de la nicotine, calculée en fonction de leur concentration.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Depuis janvier 2025, les contrevenants s'exposent à des amendes renforcées, à la saisie des produits illégaux et, en cas de récidive, à la suspension temporaire du droit de vendre des produits de vapotage.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures visent à protéger les jeunes et à encadrer strictement l'usage des produits de vapotage au Danemark.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.sst.dk/da/viden/tobak-og-nikotin/roegfri-fremtid" class="text-blue-600 underline hover:text-blue-800" target="_blank">Sundhedsstyrelsen – Røgfri Fremtid</a>,
        <a href="https://www.sik.dk/english/safety-regulations/e-cigarettes" class="text-blue-600 underline hover:text-blue-800" target="_blank">Danish Safety Technology Authority – E-cigarettes regulations</a>,
        <a href="https://ecigator.com/guide/europe-vape-laws-tpd-national/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="#danemark" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,

  EST: `

<head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Estonie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Estonie (2025)
      </h1>
      <img src="images-pays/est.jpg" alt="Estonie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        L’Estonie encadre très strictement la cigarette électronique ; les dernières modifications majeures sont entrées en vigueur entre 2020 et 2025.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> vente interdite aux moins de 18 ans.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍂</span>
          <p>
            <span class="font-semibold">Arômes :</span> seuls les arômes tabac et menthol sont autorisés ; toutes les autres saveurs sont prohibées, y compris pour les puffs.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💧</span>
          <p>
            <span class="font-semibold">Concentration en nicotine :</span> 20 mg/ml maximum ; réservoirs ≤ 2 ml et flacons de recharge ≤ 10 ml.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🛒</span>
          <p>
            <span class="font-semibold">Vente en ligne :</span> toute vente à distance, nationale ou transfrontalière, est interdite.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> promotion, sponsoring et exposition visible au public sont globalement interdits ; seules des informations neutres sont permises en boutique spécialisée.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> vapoter est interdit partout où fumer l’est, sauf dans les fumoirs désignés.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage :</span> avertissement sanitaire couvrant au moins 30 % des deux faces principales ; interdiction de visuels évoquant des saveurs ou des bénéfices sanitaires.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💶</span>
          <p>
            <span class="font-semibold">Fiscalité :</span> droit d’accise de 0,22 € par millilitre sur tous les e-liquides à compter du 1 janvier 2025.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> amendes, confiscation des produits et suspension de licence en cas de récidive.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ce cadre place l’Estonie parmi les pays européens les plus restrictifs, limitant sévèrement l’attractivité des produits de vapotage pour les jeunes.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.riigiteataja.ee/akt/107032023019" class="text-blue-600 underline hover:text-blue-800" target="_blank">Riigi Teataja – Tubaka- ja tubakatoodete seadus</a>,
        <a href="https://www.emta.ee/ariklient/maksud-ja-tasumine/aktsiisid/tubakatooted" class="text-blue-600 underline hover:text-blue-800" target="_blank">Maksu- ja Tolliamet – Barème d’accise 2025</a>,
        <a href="#estonie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>
  `,  

  FIN: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Finlande (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Finlande (2025)
      </h1>
      <img src="images-pays/fin.jpg" loading="lazy" alt="Finlande" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        La Finlande applique une réglementation stricte alignée sur la directive européenne (TPD), avec des restrictions nationales supplémentaires pour protéger la santé publique.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> Vente interdite aux moins de 18 ans.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍂</span>
          <p>
            <span class="font-semibold">Arômes :</span> Seuls les e-liquides goût tabac sont autorisés. Les arômes fruités, sucrés ou mentholés sont interdits, même sans nicotine.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> Toute publicité, promotion ou parrainage est interdite, y compris en ligne. Les produits doivent être dissimulés en magasin, sauf dans les boutiques spécialisées.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Usage en public :</span> Interdit dans les mêmes lieux que le tabac (espaces publics fermés, transports, établissements accueillant des mineurs).
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage :</span> Emballages neutres avec avertissements sanitaires couvrant au moins 32 % des faces principales.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💶</span>
          <p>
            <span class="font-semibold">Taxation :</span> Taxe d'accise de 0,30 € par millilitre sur tous les e-liquides, nicotinés ou non.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">✈️</span>
          <p>
            <span class="font-semibold">Importation personnelle :</span> Limité à 10 ml de liquide nicotiné par voyageur. Importer des dispositifs ou composants depuis l'étranger est interdit.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures visent à réduire l’attrait des produits, notamment chez les jeunes, et à encadrer strictement leur usage.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://valvira.fi/en/tobacco/unit-packets-of-electronic-cigarettes" class="text-blue-600 underline hover:text-blue-800" target="_blank">Valvira</a>,
        <a href="https://tulli.fi/en/restrictions/e-cigarettes/traveller-imports" class="text-blue-600 underline hover:text-blue-800" target="_blank">Finnish Customs</a>,
        <a href="https://www.tobaccocontrollaws.org/legislation/finland/e-cigarettes/main-policies" class="text-blue-600 underline hover:text-blue-800" target="_blank">Tobacco Control Laws</a>,
        <a href="#finlande" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  GRC: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Grèce (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Grèce (2025)
      </h1>
      <img src="images-pays/grc.jpg" loading="lazy" alt="Grèce" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        La Grèce applique une réglementation stricte sur les produits de vapotage, en conformité avec la directive européenne sur les produits du tabac (TPD), avec des mesures nationales supplémentaires :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> La vente de produits de vapotage est interdite aux personnes de moins de 18 ans.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍃</span>
          <p>
            <span class="font-semibold">Arômes :</span> Un projet de loi est en cours d'élaboration pour interdire tous les arômes de cigarettes électroniques, à l'exception du tabac naturel et de la menthe, afin de limiter l'accès des jeunes à ces produits.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> Toute forme de publicité, promotion ou parrainage des produits de vapotage est interdite, y compris en ligne et sur les points de vente.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> L'usage des cigarettes électroniques est interdit dans les lieux publics fermés, les transports en commun et les établissements accueillant des mineurs.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage :</span> Les produits doivent être conditionnés dans des emballages neutres avec des avertissements sanitaires couvrant au moins 32 % des faces principales.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💶</span>
          <p>
            <span class="font-semibold">Taxation :</span> Une taxe d'accise s'applique à tous les e-liquides, avec ou sans nicotine.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">✈️</span>
          <p>
            <span class="font-semibold">Importation personnelle :</span> Les voyageurs peuvent importer des produits de vapotage pour usage personnel, dans des limites raisonnables.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures visent à réduire l'attrait des produits de vapotage, en particulier chez les jeunes, et à encadrer strictement leur utilisation et leur commercialisation en Grèce.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://greekreporter.com/2025/04/23/greece-set-ban-teen-friendly-flavored-e-cigarettes/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Greek Reporter</a>,
        <a href="https://ecigator.com/guide/europe-vape-laws-tpd-national/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="#grece" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,

  HUN: `

<head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Hongrie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Hongrie (2025)
      </h1>
      <img src="images-pays/hun.jpg" alt="Hongrie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        La Hongrie applique l’un des cadres les plus stricts de l’UE :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> 18 ans pour l’achat, la détention et l’usage.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍂</span>
          <p>
            <span class="font-semibold">Arômes :</span> interdiction totale ; les e-liquides — avec ou sans nicotine — ne doivent contenir <em>aucun</em> additif aromatisant (tabac, menthol et saveurs neutres compris). Les puffs aromatisés sont donc illégaux.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💧</span>
          <p>
            <span class="font-semibold">Concentration en nicotine :</span> 20 mg/ml maximum ; cartouches ≤ 2 ml et flacons de recharge ≤ 10 ml.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🏪</span>
          <p>
            <span class="font-semibold">Canaux de vente :</span> produits disponibles uniquement dans les « Nemzeti Dohánybolt » (buralistes agréés). La vente en ligne et l’importation non agréée sont interdites.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> toute forme de promotion ou de sponsoring est prohibée, y compris sur Internet et réseaux sociaux.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> vapoter est interdit dans tous les espaces où fumer est proscrit (lieux de travail, établissements scolaires, transports, restauration, etc.).
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage :</span> avertissements sanitaires couvrant ≥ 30 % des deux faces principales ; liste complète des ingrédients sur l’étiquette.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💶</span>
          <p>
            <span class="font-semibold">Fiscalité :</span> droit d’accise spécifique sur tous les e-liquides, quel que soit leur taux de nicotine.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> confiscation des produits non conformes et amendes pouvant dépasser 5 000 € en cas de récidive.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ce dispositif, combiné à la vente exclusive en bureaux de tabac, vise à réduire fortement l’attractivité du vapotage — en particulier auprès des jeunes — et à aligner ces produits sur les restrictions applicables au tabac combustible.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://njt.hu/jogszabaly/2013-39-20-22" class="text-blue-600 underline hover:text-blue-800" target="_blank">Nemzeti Jogszabálytár – Décret gouvernemental 39/2013</a>,
        <a href="https://njt.hu/jogszabaly/1999-42-00-00" class="text-blue-600 underline hover:text-blue-800" target="_blank">Nemzeti Jogszabálytár – Loi XLII/1999 (protection des non-fumeurs)</a>,
        <a href="https://madosz.hu/news/view?id=13446" class="text-blue-600 underline hover:text-blue-800" target="_blank">NAV – Communiqué sur l’interdiction des e-cigarettes aromatisées</a>,
        <a href="#hongrie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>
  `,  

  IND: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Inde (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Inde (2025)
      </h1>
      <img src="images-pays/ind.jpg" loading="lazy" alt="Inde" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Depuis le 18 septembre 2019, l'Inde interdit strictement tous les produits de vapotage, conformément à la loi <strong>Prohibition of Electronic Cigarettes Act, 2019</strong>.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdictions totales :</span> La production, la fabrication, l'importation, l'exportation, le transport, la vente, la distribution, le stockage et la publicité des cigarettes électroniques et de leurs composants sont prohibés.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🙅‍♂️</span>
          <p>
            <span class="font-semibold">Usage personnel :</span> L'achat, la possession ou l'utilisation de dispositifs de vapotage sont illégaux, y compris pour un usage personnel. Aucun cadre légal ne permet leur importation ou leur utilisation individuelle.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les contrevenants s'exposent à des peines pouvant aller jusqu'à 1 an de prison ou 100 000 roupies d'amende pour une première infraction, et jusqu'à 3 ans de prison ou 500 000 roupies d'amende en cas de récidive.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔒</span>
          <p>
            <span class="font-semibold">Contrôles :</span> Les autorités ont le pouvoir de saisir et de détruire les produits illégaux, même sans mandat, et des opérations de confiscation sont régulièrement menées.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Cette interdiction vise à protéger la santé publique, notamment celle des jeunes, face aux risques associés aux dispositifs de vapotage.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://ntcp.mohfw.gov.in/assets/document/The-Prohibition-of-Electronic-Cigarettes-Production-Manufacture-Import-Export-Transport-Sale-Distribution-Storage-and-Advertisement%29-Act-2019.pdf" class="text-blue-600 underline hover:text-blue-800" target="_blank">Loi officielle (PDF)</a>,
        <a href="https://www.indiatoday.in/india/story/banned-yet-booming-online-vape-sale-thrive-unabated-indiatodayt-osint-2698369-2025-03-24" class="text-blue-600 underline hover:text-blue-800" target="_blank">India Today</a>,
        <a href="https://gsthr.org/countries/profile/ind/2/" class="text-blue-600 underline hover:text-blue-800" target="_blank">GSTHR</a>,
        <a href="#inde" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  IDN: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Indonésie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Indonésie (2025)
      </h1>
      <img src="images-pays/idn.jpg" loading="lazy" alt="Indonésie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Depuis la mise en œuvre du <strong>Règlement gouvernemental n° 28 de 2024</strong>, l'Indonésie a renforcé sa réglementation sur les produits de vapotage afin de protéger la santé publique, notamment celle des jeunes.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> La vente de produits de vapotage est interdite aux personnes de moins de 21 ans. Des contrôles d'identité stricts sont requis pour l'achat en ligne et en magasin.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🛑</span>
          <p>
            <span class="font-semibold">Restrictions de vente :</span> La vente de produits de vapotage est interdite :
            <ul class="pl-6 list-none">
              <li>Dans les distributeurs automatiques.</li>
              <li>À moins de 200 mètres des établissements scolaires et des aires de jeux.</li>
              <li>Sur les plateformes en ligne et les réseaux sociaux sans vérification d'âge rigoureuse.</li>
            </ul>
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> Toute forme de publicité pour les produits de vapotage est interdite sur les réseaux sociaux. Les publicités en ligne doivent inclure des avertissements sanitaires clairs et ne doivent pas cibler les jeunes.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage :</span> Les produits doivent comporter des avertissements sanitaires couvrant 50 % de la surface de l'emballage, avec des images et des textes dissuasifs. L'emballage doit également indiquer clairement que le produit contient de la nicotine et est interdit aux moins de 21 ans et aux femmes enceintes.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔬</span>
          <p>
            <span class="font-semibold">Normes de produit :</span> Les e-liquides doivent être conditionnés en flacons de 10 ou 20 ml pour les systèmes ouverts, et les cartouches pour les systèmes fermés ne doivent pas dépasser 2 ml. Tous les produits doivent être testés pour leur teneur en nicotine et en substances interdites avant la mise sur le marché.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les infractions aux réglementations peuvent entraîner des amendes, le retrait des produits du marché et des sanctions administratives supplémentaires.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures visent à réduire l'attrait des produits de vapotage, en particulier chez les jeunes, et à encadrer strictement leur utilisation et leur commercialisation en Indonésie.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.tilleke.com/insights/indonesia-imposes-stringent-requirements-on-electronic-cigarettes/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Tilleke & Gibbins</a>,
        <a href="https://www.reuters.com/world/asia-pacific/indonesia-raises-smoking-age-limit-will-curb-cigarette-advertising-2024-07-31/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Reuters</a>,
        <a href="https://www.vitalstrategies.org/indonesia-imposes-stricter-tobacco-controls-a-major-step-for-public-health/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Vital Strategies</a>,
        <a href="#indonesie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  ITA: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Italie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Italie (2025)
      </h1>
      <img src="images-pays/ita.jpg" loading="lazy" alt="Italie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        En 2025, l'Italie a renforcé sa réglementation sur les produits de vapotage afin de mieux encadrer leur utilisation et de protéger la santé publique.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> La vente de produits de vapotage est interdite aux personnes de moins de 18 ans.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🛒</span>
          <p>
            <span class="font-semibold">Vente en ligne :</span> Depuis le 1er janvier 2025, la vente en ligne de produits de vapotage contenant de la nicotine est interdite, y compris via les entrepôts fiscaux.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💰</span>
          <p>
            <span class="font-semibold">Taxation :</span>
            <ul class="pl-6 list-none">
              <li>Les e-liquides nicotinés sont soumis à une taxe de consommation augmentée à 16 % en 2025, avec une hausse prévue à 17 % en 2026.</li>
              <li>Les e-liquides sans nicotine et les arômes concentrés sont taxés à hauteur de 0,90 € par 10 ml en 2025, avec une augmentation à 1,00 € en 2026.</li>
            </ul>
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📑</span>
          <p>
            <span class="font-semibold">Étiquetage fiscal :</span> Depuis le 1er novembre 2024, tous les produits doivent porter une vignette fiscale attestant du paiement des taxes. La vente de produits sans cette vignette est illégale et passible de sanctions.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> Toute forme de publicité ou de promotion des produits de vapotage est interdite, y compris les remises commerciales et les affichages en magasin. Seules les informations techniques sur les produits sont autorisées.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> L'usage des cigarettes électroniques est interdit dans les lieux publics fermés tels que les hôpitaux, les établissements scolaires, les centres d'emploi et les transports en commun. Dans les restaurants, bars et commerces, l'autorisation de vapoter est à la discrétion du responsable de l'établissement.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚆</span>
          <p>
            <span class="font-semibold">Transport :</span> L'utilisation de la cigarette électronique est interdite dans les trains, les avions et les navires, sauf dans les zones fumeurs désignées. Il est recommandé de se renseigner auprès du personnel avant de vapoter.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚗</span>
          <p>
            <span class="font-semibold">Conduite :</span> Bien qu'il n'existe pas de législation spécifique sur le vapotage en voiture, il est interdit de fumer en présence de mineurs ou de femmes enceintes. Il est conseillé de faire preuve de prudence et de bon sens lors de l'utilisation de la cigarette électronique au volant.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures visent à encadrer strictement l'utilisation des produits de vapotage et à limiter leur accessibilité, notamment chez les jeunes.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://ecigator.com/news/italy-ecigarette-tax-online-ban/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="https://ecigator.com/guide/where-can-you-vape-in-italy/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator Guide</a>,
        <a href="https://ecigintelligence.com/italy-e-cigarette-regulation-april-2025/" class="text-blue-600 underline hover:text-blue-800" target="_blank">ECigIntelligence</a>,
        <a href="#italie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  JPN: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage au Japon (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage au Japon (2025)
      </h1>
      <img src="images-pays/jpn.jpg" loading="lazy" alt="Japon" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Au Japon, la réglementation sur les produits de vapotage distingue strictement les produits contenant de la nicotine de ceux qui en sont dépourvus.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Vente de produits nicotinés :</span> La vente de e-liquides contenant de la nicotine est interdite sur le territoire japonais, car la nicotine est classée comme substance pharmaceutique. Aucun produit de vapotage nicotiné n'a été approuvé à la vente à ce jour.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Importation pour usage personnel :</span> Les particuliers peuvent importer jusqu'à 120 ml de e-liquide nicotiné par personne pour un usage personnel, ce qui correspond à environ un mois de consommation. Cette importation ne nécessite pas d'autorisation spéciale, à condition de ne pas dépasser cette limite. Au-delà, une demande de certificat d'importation de médicament (Yakkan Shoumei) est requise auprès du ministère de la Santé, du Travail et des Affaires sociales.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔢</span>
          <p>
            <span class="font-semibold">Nombre d'appareils :</span> Il est permis d'importer jusqu'à deux dispositifs de vapotage pour usage personnel.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💧</span>
          <p>
            <span class="font-semibold">Produits sans nicotine :</span> Les e-liquides sans nicotine peuvent être achetés librement au Japon par les personnes âgées de 20 ans et plus, dans les boutiques spécialisées, les supérettes ou en ligne.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> Le vapotage est soumis aux mêmes restrictions que le tabagisme. Il est interdit de vapoter dans les lieux publics en dehors des zones fumeurs désignées ("kitsuenjo"), que ce soit en intérieur ou en extérieur. Vapoter en marchant ou dans des zones non autorisées peut entraîner des amendes.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚆</span>
          <p>
            <span class="font-semibold">Transports et hébergements :</span> Le vapotage est interdit dans les transports en commun (trains, bus, avions), sauf dans les espaces fumeurs spécifiquement aménagés. Dans les hôtels, il est généralement permis de vapoter uniquement dans les chambres fumeurs.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Il est recommandé aux voyageurs de respecter scrupuleusement ces règles, de transporter leurs dispositifs de vapotage dans leur bagage à main et de se renseigner sur les zones fumeurs disponibles.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://ecigator.com/guide/vape-laws-and-regulations-in-japan/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="https://gsthr.org/countries/profile/jpn/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Global State of Tobacco Harm Reduction</a>,
        <a href="https://faq.japan-travel.jnto.go.jp/en/faq/articles/102086" class="text-blue-600 underline hover:text-blue-800" target="_blank">Japan National Tourism Organization</a>,
        <a href="#japon" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,

  KHM: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage au Cambodge (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage au Cambodge (2025)
      </h1>
      <img src="images-pays/khm.jpg" loading="lazy" alt="Cambodge" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Depuis 2014, le Cambodge interdit :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            La vente, l'importation et l'utilisation de cigarettes électroniques, de shishas et de produits de tabac chauffé.
          </p>
        </li>
      </ul>

      <p class="mb-6 leading-relaxed">
        Cette interdiction est établie par la circulaire n° 001/14 Sor.Nor.No.NACD émise par l'Autorité nationale de lutte contre la drogue.
      </p>

      <p class="mb-6 leading-relaxed">
        En mai 2025, le Premier ministre Hun Manet a réaffirmé cette position en rejetant toute proposition d'investissement liée aux e-cigarettes, même pour l'exportation, lors du lancement du Plan national de lutte contre le cancer 2025–2030.
      </p>

      <p class="mb-6 leading-relaxed">
        Bien que l'usage personnel ne soit pas explicitement criminalisé, les autorités confisquent systématiquement les dispositifs trouvés. Il est donc fortement déconseillé d'apporter ou d'utiliser du matériel de vape sur le territoire cambodgien.
      </p>

      <p class="mb-6 leading-relaxed">
        Les contrevenants peuvent faire l'objet de saisies, et les produits sont généralement détruits. Aucun cadre légal ne prévoit d'amendes ou de poursuites pénales à ce jour, mais les contrôles sont stricts et fréquents.
      </p>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures visent à protéger la population, notamment les jeunes, des effets nocifs du vapotage et à prévenir une nouvelle vague d'addiction à la nicotine.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://nacdcambodia.gov.kh/article/11" class="text-blue-600 underline hover:text-blue-800" target="_blank">Autorité nationale de lutte contre la drogue (NACD)</a>,
        <a href="https://www.khmertimeskh.com/501479087/hun-manet-rejects-e-cigarette-investment-amid-cancer-plan-launch/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Khmer Times</a>,
        <a href="https://gsthr.org/countries/profile/khm/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Global State of Tobacco Harm Reduction</a>,
        <a href="#cambodge" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  LAO: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage au Laos (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage au Laos (2025)
      </h1>
      <img src="images-pays/lao.jpg" loading="lazy" alt="Laos" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Le Laos applique une interdiction stricte des produits de vapotage, dans le cadre d'une politique de santé publique visant à réduire la consommation de nicotine, en particulier chez les jeunes.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction de vente et d'utilisation :</span> La vente, l'importation, la distribution et l'utilisation de cigarettes électroniques sont interdites sur l'ensemble du territoire, conformément à la Loi sur le contrôle du tabac et à ses décrets d'application.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> Toute forme de publicité, de promotion ou de parrainage des produits de vapotage est interdite, y compris en ligne et sur les points de vente.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Classification comme substance addictive :</span> En 2023, le gouvernement a annoncé son intention d'inclure les cigarettes électroniques dans la liste des substances et précurseurs classés comme addictifs dans la législation sur la prévention et le contrôle des drogues, renforçant ainsi leur statut d'interdiction.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> Les produits de vapotage sont interdits dans les lieux publics, les transports en commun, les établissements éducatifs et de santé, ainsi que dans les zones désignées sans fumée.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚠️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les contrevenants s'exposent à des sanctions administratives, telles que des amendes et la confiscation des produits. Les autorités appliquent strictement ces mesures, avec des saisies fréquentes de dispositifs illégaux.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures visent à protéger la population, notamment les jeunes, des effets nocifs du vapotage et à prévenir une nouvelle vague d'addiction à la nicotine.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://gsthr.org/countries/profile/lao/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Global State of Tobacco Harm Reduction</a>,
        <a href="https://laotiantimes.com/2023/11/30/laos-to-ban-e-cigarettes-amid-growing-concerns/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Laotian Times</a>,
        <a href="https://www.tobaccocontrollaws.org/legislation/lao-pdr" class="text-blue-600 underline hover:text-blue-800" target="_blank">Tobacco Control Laws</a>,
        <a href="#laos" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,

  LKA: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage au Sri Lanka (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage au Sri Lanka (2025)
      </h1>
      <img src="images-pays/lka.jpg" loading="lazy" alt="Sri Lanka" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Le Sri Lanka applique une interdiction stricte des produits de vapotage, couvrant tous les aspects liés aux cigarettes électroniques :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction complète :</span> La <strong>Prohibited Tobacco Products Regulations n°1 de 2016</strong> interdit la fabrication, l'importation, la vente et la distribution de cigarettes électroniques, y compris celles contenant du tabac. Bien que la loi mentionne spécifiquement les e-cigarettes contenant du tabac, cette disposition est appliquée à toutes les e-cigarettes.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚷</span>
          <p>
            <span class="font-semibold">Usage personnel :</span> L'utilisation des dispositifs de vapotage est également interdite. Les voyageurs ne doivent pas apporter de matériel de vape, même pour un usage personnel, sous peine de confiscation, d'amendes ou d'emprisonnement.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> Toute forme de publicité, de promotion ou de parrainage des produits de vapotage est interdite.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les contrevenants s'exposent à des sanctions sévères, incluant des amendes et des peines d'emprisonnement.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔍</span>
          <p>
            <span class="font-semibold">Application stricte :</span> Les autorités sri-lankaises mènent des contrôles réguliers pour détecter et confisquer les produits interdits. Les voyageurs sont tenus de respecter ces réglementations pour éviter des sanctions.
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Il est fortement déconseillé d'apporter ou d'utiliser des dispositifs de vapotage au Sri Lanka. Les autorités appliquent une politique de tolérance zéro à l'égard du vapotage.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.tobaccocontrollaws.org/legislation/sri-lanka/e-cigarettes/main-policies" class="text-blue-600 underline hover:text-blue-800" target="_blank">Tobacco Control Laws</a>,
        <a href="https://ecigator.com/guide/can-you-vape-in-sri-lanka/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="https://travel-eat-love.de/en/sri-lanka/smoking-in-sri-lanka-what-is-allowed/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Travel Eat Love</a>,
        <a href="#sri-lanka" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,

  LVA: `

<head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Lettonie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Lettonie (2025)
      </h1>
      <img src="images-pays/lva.jpg" alt="Lettonie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Depuis le <strong>1<sup>er</sup> janvier 2025</strong>, la Lettonie applique un cadre parmi les plus stricts d’Europe :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> 20 ans pour acheter ou posséder des produits de vapotage.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍂</span>
          <p>
            <span class="font-semibold">Arômes :</span> seuls les arômes donnant goût ou odeur de tabac sont autorisés ; toutes les autres saveurs sont interdites, y compris pour les puffs jetables.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💧</span>
          <p>
            <span class="font-semibold">Concentration en nicotine :</span> 20 mg/ml maximum ; réservoirs limités à 2 ml et flacons de recharge à 10 ml.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> vapoter est interdit partout où fumer l’est (écoles, transports, lieux de travail, restaurants, etc.).
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> toute forme de promotion ou d’exposition visible au public est prohibée, sauf information neutre dans les boutiques spécialisées.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage :</span> avertissements sanitaires couvrant au moins 30 % des deux faces principales ; interdiction de visuels évoquant des saveurs ou des remises.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💶</span>
          <p>
            <span class="font-semibold">Fiscalité :</span> droit d’accise de 0,29 € par millilitre sur tous les e-liquides, avec ou sans nicotine.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> amendes pouvant atteindre 1 420 € pour les points de vente en cas d’infraction.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures visent à limiter l’attractivité du vapotage chez les jeunes et à harmoniser la réglementation lettone avec les exigences les plus restrictives de l’Union européenne.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://likumi.lv/ta/id/282077" class="text-blue-600 underline hover:text-blue-800" target="_blank">Likumi.lv – Loi sur la circulation des produits du tabac et des e-cigarettes</a>,
        <a href="https://www.fm.gov.lv/en/excise-duty-0" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ministère des Finances – Barème des accises 2025</a>,
        <a href="#lettonie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>
`,
  
  LTU: `
<head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Lituanie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Lituanie (2025)
      </h1>
      <img src="images-pays/ltu.jpg" alt="Lituanie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Depuis le <strong>1<sup>er</sup> juillet 2022</strong>, la Lituanie applique un cadre très restrictif pour les cigarettes électroniques :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> 18 ans pour acheter, posséder ou utiliser des produits de vapotage.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍂</span>
          <p>
            <span class="font-semibold">Arômes :</span> seules les saveurs donnant <em>goût / odeur tabac</em> sont autorisées ; toute autre saveur est interdite, y compris pour les puffs et les liquides sans nicotine.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💧</span>
          <p>
            <span class="font-semibold">Concentration en nicotine :</span> 20 mg/ml maximum ; réservoirs ≤ 2 ml ; flacons de recharge ≤ 10 ml.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> vapoter est interdit partout où fumer l’est (lieux de travail, transports, établissements scolaires, restauration…).
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> promotion, parrainage et vente à distance de produits de vapotage sont totalement prohibés.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage :</span> avertissement sanitaire couvrant ≥ 30 % des faces principales ; interdiction de visuels évoquant des saveurs.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💶</span>
          <p>
            <span class="font-semibold">Fiscalité :</span> droit d’accise de <em>0,63 € par millilitre</em> sur tous les e-liquides, avec ou sans nicotine.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> amendes administratives, saisie des produits et suspension de licence pour les détaillants récidivistes.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ce dispositif place la Lituanie parmi les pays européens les plus stricts, en particulier grâce à l’interdiction générale des arômes et à une fiscalité élevée.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://e-seimas.lrs.lt/portal/legalAct/lt/TAD/956e3e82158311e9bd28d9a28a9e9ad9" class="text-blue-600 underline hover:text-blue-800" target="_blank">Loi I-1143 – Contrôle du tabac et des produits connexes</a>,
        <a href="https://ntakd.lrv.lt/en/eu-ceg/electronic-cigarettes-and-their-refill-containers/" class="text-blue-600 underline hover:text-blue-800" target="_blank">NTAKD – Interdiction des arômes (depuis le 1/07/2022)</a>,
        <a href="https://finmin.lrv.lt/en/competence-areas/taxation/main-taxes/excise-duties/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ministère des Finances – Barème d’accise 2025</a>,
        <a href="#lituanie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>
`,


  MUS: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage à l'Île Maurice (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage à l'Île Maurice (2025)
      </h1>
      <img src="images-pays/mus.jpg" loading="lazy" alt="Île Maurice" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Depuis l'entrée en vigueur des <strong>Public Health (Restrictions on Tobacco Products) Regulations 2022</strong>, l'Île Maurice applique une interdiction stricte des produits de vapotage :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction totale :</span> La fabrication, l'importation, la distribution, la vente et la publicité des cigarettes électroniques, e-liquides (avec ou sans nicotine) et accessoires sont interdites. Cette mesure vise à protéger la santé publique, notamment celle des jeunes, en limitant l'accès à ces produits.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🙅‍♂️</span>
          <p>
            <span class="font-semibold">Usage personnel :</span> Bien que la loi ne précise pas explicitement l'interdiction de l'usage personnel, les autorités appliquent une tolérance zéro. Les voyageurs sont fortement déconseillés d'apporter des dispositifs de vapotage, même pour usage personnel, sous peine de confiscation ou d'amende.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les contrevenants s'exposent à des sanctions administratives, telles que des amendes, la confiscation des produits et, dans certains cas, des poursuites judiciaires. Les autorités douanières et policières appliquent strictement ces mesures.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔄</span>
          <p>
            <span class="font-semibold">Alternatives :</span> Pour les personnes souhaitant arrêter de fumer, des thérapies de remplacement de la nicotine, telles que les gommes ou les patchs, sont disponibles légalement à Maurice. Il est recommandé de se renseigner auprès des pharmacies locales pour plus d'informations.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures s'inscrivent dans le cadre du <strong>Plan national de lutte antitabac 2022-2026</strong>, qui vise à réduire la consommation de tabac et de produits associés dans le pays.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.tobaccocontrollaws.org/legislation/mauritius/e-cigarettes/main-policies" class="text-blue-600 underline hover:text-blue-800" target="_blank">Tobacco Control Laws</a>,
        <a href="https://ecigator.com/guide/mauritius-vaping-laws-travelers/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="https://health.govmu.org/health/wp-content/uploads/2023/03/National-Action-Plan-for-Tobacco-Control-2022-2026.pdf" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ministère de la Santé de Maurice</a>
      </p>
    </section>
  </main>
</body>

  `,

  MYS: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Malaisie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Malaisie (2025)
      </h1>
      <img src="images-pays/mys.jpg" loading="lazy" alt="Malaisie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        La Malaisie a instauré une réglementation stricte sur les produits de vapotage à travers la <strong>Loi sur le contrôle des produits du tabac pour la santé publique (Acte 852)</strong>, entrée en vigueur le 1er octobre 2024. Cette loi vise à encadrer la vente, l'utilisation et la promotion des produits de vapotage pour protéger la santé publique, notamment celle des jeunes.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📋</span>
          <p>
            <span class="font-semibold">Enregistrement des produits :</span> Tous les e-liquides, avec ou sans nicotine, doivent être enregistrés auprès du ministère de la Santé. Les fabricants doivent fournir des analyses de laboratoire et obtenir une certification de conformité aux normes locales.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔢</span>
          <p>
            <span class="font-semibold">Limitation de la nicotine :</span> La concentration maximale autorisée est actuellement de 35 mg/ml, réduite à 20 mg/ml à partir du 1er octobre 2025. De plus, le volume maximal des cartouches sera limité à 2 ml à partir du 1er octobre 2026.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Interdiction de vente aux mineurs :</span> La vente de produits de vapotage aux personnes de moins de 18 ans est strictement interdite, avec des sanctions sévères en cas de non-respect.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> Toute forme de publicité, de promotion ou de parrainage des produits de vapotage est interdite, y compris en ligne et sur les points de vente.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage et étiquetage :</span> Les produits doivent afficher des avertissements sanitaires graphiques couvrant une partie significative de l'emballage, conformément aux spécifications du ministère de la Santé.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🏪</span>
          <p>
            <span class="font-semibold">Affichage en point de vente :</span> L'exposition des produits de vapotage est interdite en dehors des boutiques spécialisées. Dans ces boutiques, les produits ne doivent pas être visibles depuis l'extérieur.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🛒</span>
          <p>
            <span class="font-semibold">Vente en ligne et distributeurs automatiques :</span> La vente de produits de vapotage en ligne et via des distributeurs automatiques est interdite.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🗺️</span>
          <p>
            <span class="font-semibold">Réglementation au niveau des États :</span> Certains États, tels que Johor, Kelantan et Terengganu, ont imposé des interdictions supplémentaires sur la vente de produits de vapotage en refusant d'accorder des licences commerciales aux détaillants.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures visent à réduire l'accès des jeunes aux produits de vapotage et à contrôler le marché pour assurer la sécurité des consommateurs.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://codeblue.galencentre.org/2024/10/government-mandates-graphic-health-warning-labels-on-vape-packaging-limits-nicotine-content/" class="text-blue-600 underline hover:text-blue-800" target="_blank">CodeBlue</a>,
        <a href="https://www.malaymail.com/news/malaysia/2025/04/24/act-852-in-force-health-ministry-cracks-down-on-vape-sales-and-use-among-minors/174390" class="text-blue-600 underline hover:text-blue-800" target="_blank">Malay Mail</a>,
        <a href="https://nsa-legal.com/posts/malaysias-vaping-regulations-a-new-era-for-public-health-and-industry-compliance" class="text-blue-600 underline hover:text-blue-800" target="_blank">NSA Legal</a>,
        <a href="#ile-maurice" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  
  NLD: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage aux Pays-Bas (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage aux Pays-Bas (2025)
      </h1>
      <img src="images-pays/nld.jpg" loading="lazy" alt="Pays-Bas" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Les Pays-Bas ont mis en place une réglementation stricte sur les produits de vapotage afin de protéger la santé publique, notamment celle des jeunes :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction des arômes :</span> Depuis le 1er janvier 2023, seuls les e-liquides au goût de tabac sont autorisés. Les arômes sucrés, fruités ou mentholés sont interdits, même pour les produits sans nicotine. Les stocks existants pouvaient être écoulés jusqu'au 1er janvier 2024. Cette mesure a conduit à une réduction significative de l'usage du vapotage, avec environ 22 % des utilisateurs ayant cessé complètement et 40 % ayant réduit leur consommation.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🏪</span>
          <p>
            <span class="font-semibold">Restrictions de vente :</span> Depuis le 1er juillet 2024, la vente de produits de vapotage est interdite dans les supermarchés, hôtels, restaurants et bars. À partir de 2025, seuls les magasins spécialisés seront autorisés à vendre ces produits.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🛒</span>
          <p>
            <span class="font-semibold">Interdiction de la vente en ligne :</span> Depuis le 1er juillet 2023, la vente en ligne de tabac et de produits de vapotage est interdite, tant au niveau national qu'international.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> Toute forme de publicité, de promotion ou de parrainage des produits de vapotage est interdite, à l'exception des boutiques spécialisées.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage neutre :</span> Depuis le 1er octobre 2020, les produits de vapotage doivent être conditionnés dans des emballages neutres de couleur vert-brun foncé, sans éléments attractifs pour les jeunes.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> L'usage des cigarettes électroniques, avec ou sans nicotine, est interdit dans tous les lieux publics fermés, y compris les établissements d'enseignement et les transports en commun.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> La vente de produits de vapotage est interdite aux personnes de moins de 18 ans.
          </p>
        </li>
      </ul>

      <p class="mt-6 text-sm leading-relaxed italic">
        Ces mesures s'inscrivent dans le cadre du Plan national de prévention visant à atteindre une génération sans tabac d'ici 2040.
      </p>

      <p class="mt-4 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.government.nl/topics/smoking/government-measures-to-discourage-smoking" class="text-blue-600 underline hover:text-blue-800" target="_blank">Gouvernement des Pays-Bas</a>,
        <a href="https://nltimes.nl/2025/03/18/one-five-vapers-quit-e-cigarettes-flavor-ban" class="text-blue-600 underline hover:text-blue-800" target="_blank">NL Times</a>,
        <a href="https://tobaccoreporter.com/2025/03/18/report-dutch-flavor-ban-is-working/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Tobacco Reporter</a>,
        <a href="#pays-bas" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  PRT: `
    <head>
    <!-- 👇🏻 Petite feuille de style fallback si Tailwind ne se charge pas (HTML ouvert en local) -->
    <style>
      .list-none { list-style: none; padding-left: 0; }
      .flex { display: flex; }
      .gap-3 { gap: 0.75rem; }
      .text-xl { font-size: 1.25rem; }
      .rounded-2xl { border-radius: 1rem; }
      .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
      .bg-white { background:#fff; }
      .p-6 { padding: 1.5rem; }
      .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
      /* Ajoutez ici d'autres classes si nécessaire */
    </style>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Réglementation sur le vapotage au Portugal</title>

    <!-- Tailwind via CDN (production : installez-le localement pour de meilleures perfs) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Police moderne -->
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Inter", sans-serif;
      }
    </style>
  </head>
  <body class="bg-gray-50 text-gray-800 antialiased">
    <main class="max-w-3xl mx-auto p-6">
      <!-- Bloc réglementation -->
      <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Réglementation sur le vapotage au Portugal
        </h1>
        <img src="images-pays/prt.jpg" loading="lazy" alt="Tunisie" class="mb-4" />
        <p class="mb-6 leading-relaxed">
          Le Portugal applique une réglementation stricte sur les produits de
          vapotage, alignée sur la directive européenne sur les produits du
          tabac (TPD), avec des mesures supplémentaires spécifiques :
        </p>

        <ul class="space-y-4 list-none pl-0">
          <li class="flex gap-3">
            <span class="text-blue-600 text-xl">🔞</span>
            <p>
              <span class="font-semibold">Âge minimum :</span> La vente de
              produits de vapotage est interdite aux personnes de moins de
              18 ans.
            </p>
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 text-xl">🚭</span>
            <p>
              <span class="font-semibold">Utilisation en public :</span> Le
              vapotage est interdit dans les lieux publics fermés, y compris
              les bars, restaurants, transports en commun et lieux de travail.
              Des zones spécifiquement désignées peuvent être prévues dans
              certains établissements.
            </p>
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 text-xl">🛒</span>
            <p>
              <span class="font-semibold">Vente en ligne :</span> La vente en
              ligne de produits contenant de la nicotine est interdite. Seuls
              les produits sans nicotine peuvent être vendus en ligne.
            </p>
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 text-xl">📢</span>
            <p>
              <span class="font-semibold">Publicité & promotion :</span> Toute
              forme de publicité, de promotion ou de parrainage des produits de
              vapotage est interdite, sauf dans les boutiques spécialisées.
            </p>
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 text-xl">📦</span>
            <p>
              <span class="font-semibold">Emballage & étiquetage :</span> Les
              produits doivent comporter des avertissements sanitaires couvrant
              au moins 30 % des faces principales de l'emballage. Les arômes
              sont autorisés, mais les produits doivent être conformes aux
              exigences de la TPD.
            </p>
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 text-xl">💧</span>
            <p>
              <span class="font-semibold">Concentration en nicotine :</span> Le
              taux maximal autorisé est de 20 mg/ml. Les flacons de recharge ne
              doivent pas dépasser 10 ml, et les réservoirs des dispositifs ne
              doivent pas dépasser 2 ml.
            </p>
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 text-xl">💶</span>
            <p>
              <span class="font-semibold">Taxation :</span> Une taxe d'accise
              de 0,323 € par millilitre s'applique à tous les e‑liquides
              contenant de la nicotine. Les produits sans nicotine ne sont pas
              soumis à cette taxe.
            </p>
          </li>
          <li class="flex gap-3">
            <span class="text-blue-600 text-xl">⚖️</span>
            <p>
              <span class="font-semibold">Sanctions :</span> Les contrevenants
              s'exposent à des amendes pouvant aller jusqu'à 750 € pour usage
              dans des zones interdites, et à des sanctions administratives
              pour non‑conformité des produits ou des points de vente.
            </p>
          </li>
        </ul>

        <p class="mt-6 text-sm leading-relaxed italic">
          Ces mesures visent à protéger la santé publique, notamment celle des
          jeunes, et à réduire l'accès aux produits de vapotage. Il est
          recommandé aux voyageurs d'apporter leur propre matériel et
          consommables, en respectant les réglementations locales.
        </p>

        <p class="mt-4 text-sm">
          <span class="font-semibold">Sources :</span>
          <a
            href="https://ecigintelligence.com"
            class="text-blue-600 underline hover:text-blue-800"
            >ECigIntelligence</a
          >,
          <a
            href="https://www.theportugalnews.com"
            class="text-blue-600 underline hover:text-blue-800"
            >The Portugal News</a
          >,
          <a href="https://ecigator.com" class="text-blue-600 underline hover:text-blue-800">Ecigator</a>,
          <a href="#" class="text-blue-600 underline hover:text-blue-800">Source</a>
        </p>
      </section>

    
    </main>
  </body>
  `,
  
  QAT: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage au Qatar (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage au Qatar (2025)
      </h1>
      <img src="images-pays/qat.jpg" loading="lazy" alt="Qatar" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Le Qatar applique une interdiction stricte et complète des produits de vapotage :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction totale :</span> Depuis 2014, la fabrication, l'importation, la vente, la distribution, l'affichage, la publicité et l'utilisation des cigarettes électroniques et des e-liquides sont illégales. Cette interdiction a été renforcée par la <strong>Loi n° 10 de 2016 sur le contrôle du tabac</strong>.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚷</span>
          <p>
            <span class="font-semibold">Usage personnel :</span> L'utilisation personnelle des dispositifs de vapotage est également interdite. Les voyageurs ne doivent pas apporter de matériel de vape, même pour un usage personnel, sous peine de confiscation, d'amendes ou d'emprisonnement.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> Toute forme de publicité, de promotion ou de parrainage des produits de vapotage est interdite, conformément à l'article 9 de la Loi n° 10 de 2016.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les contrevenants s'exposent à des sanctions sévères, incluant des amendes et des peines d'emprisonnement pouvant aller jusqu'à trois mois.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🩺</span>
          <p>
            <span class="font-semibold">Avertissements sanitaires :</span> Le ministère de la Santé publique (MoPH) met en garde contre les risques pour la santé associés aux cigarettes électroniques, notamment les maladies cardiovasculaires, les accidents vasculaires cérébraux, le cancer, les lésions pulmonaires et la dépendance à la nicotine.
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Il est fortement déconseillé d'apporter ou d'utiliser des dispositifs de vapotage au Qatar. Les autorités appliquent une politique de tolérance zéro à l'égard du vapotage.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://gsthr.org/countries/profile/qat/2/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Global State of Tobacco Harm Reduction</a>,
        <a href="https://www.tobaccocontrollaws.org/legislation/qatar/e-cigarettes/main-policies" class="text-blue-600 underline hover:text-blue-800" target="_blank">Tobacco Control Laws</a>,
        <a href="https://thepeninsulaqatar.com/article/27/06/2024/moph-warns-against-e-cigarettes-highlighting-significant-health-risks" class="text-blue-600 underline hover:text-blue-800" target="_blank">The Peninsula Qatar</a>,
        <a href="#qatar" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  SGP: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage à Singapour (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage à Singapour (2025)
      </h1>
      <img src="images-pays/sgp.jpg" loading="lazy" alt="Singapour" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Singapour applique une politique de tolérance zéro envers le vapotage, avec une interdiction totale couvrant tous les aspects liés aux cigarettes électroniques :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction complète :</span> La <strong>Loi sur le contrôle de la publicité et de la vente du tabac (TCASA)</strong> interdit l'importation, la vente, la distribution, la possession, l'utilisation et l'achat de cigarettes électroniques, e-liquides (avec ou sans nicotine) et dispositifs de vapotage. Cette interdiction s'étend également aux produits de tabac chauffé et aux dispositifs similaires.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions sévères :</span> Les contrevenants s'exposent à des amendes allant jusqu'à 2 000 SGD pour la possession, l'utilisation ou l'achat de dispositifs de vapotage. Les infractions liées à l'importation, la vente ou la distribution peuvent entraîner des amendes pouvant atteindre 10 000 SGD, une peine d'emprisonnement allant jusqu'à six mois, ou les deux. En cas de récidive, les peines peuvent être doublées.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚨</span>
          <p>
            <span class="font-semibold">Application stricte :</span> Les autorités, notamment la Health Sciences Authority (HSA) et l'Immigration and Checkpoints Authority (ICA), mènent des contrôles réguliers aux points d'entrée du pays, dans les écoles, les lieux publics et en ligne pour détecter et confisquer les produits interdits. Les voyageurs sont tenus de déclarer tout dispositif de vapotage à leur arrivée et de le remettre aux autorités pour éviter des sanctions.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">✈️</span>
          <p>
            <span class="font-semibold">Impact sur les voyageurs :</span> Il est fortement déconseillé d'apporter des dispositifs de vapotage à Singapour, même pour un usage personnel. Les voyageurs en transit doivent s'assurer que ces produits restent dans leurs bagages à main et ne sont pas utilisés pendant leur séjour.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📚</span>
          <p>
            <span class="font-semibold">Mesures éducatives :</span> Le gouvernement singapourien mène des campagnes de sensibilisation pour informer le public, en particulier les jeunes, des dangers du vapotage et des conséquences légales associées. Des programmes de soutien sont également mis en place pour aider les contrevenants à cesser l'utilisation de ces produits.
          </p>
        </li>
      </ul>

      <p class="mt-6">
        En raison de ces réglementations strictes, il est impératif de ne pas apporter ou utiliser de produits de vapotage à Singapour pour éviter des sanctions sévères.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.hsa.gov.sg/tobacco-regulation/vaping-enforcement" class="text-blue-600 underline hover:text-blue-800" target="_blank">Health Sciences Authority</a>,
        <a href="https://www.moh.gov.sg/newsroom/penalties-for-vaping" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ministère de la Santé</a>,
        <a href="https://www.moh.gov.sg/newsroom/multi-agency-effort-to-step-up-vaping-enforcement-and-education" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ministère de la Santé</a>,
        <a href="https://ecigator.com/guide/can-you-bring-vapes-into-singapore/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="https://www.channelnewsasia.com/singapore/vape-vaping-cna-explains-hsa-moe-moh-4519186" class="text-blue-600 underline hover:text-blue-800" target="_blank">CNA</a>,
        <a href="#singapour" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,

  SVN: `

<head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Slovénie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Slovénie (2025)
      </h1>
      <img src="images-pays/svn.jpg" alt="Slovénie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        Le 24 avril 2025 marque l’entrée en vigueur d’un dispositif particulièrement strict :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔞</span>
          <p>
            <span class="font-semibold">Âge minimum :</span> vente interdite aux moins de 18 ans.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Arômes :</span> tous les arômes sont bannis dans les e-liquides (avec ou sans nicotine) à l’exception du <em>strict goût tabac</em>.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🍃</span>
          <p>
            <span class="font-semibold">Puffs jetables :</span> soumis aux mêmes règles ; tout dispositif aromatisé devient illégal à la vente ou à l’importation.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🔬</span>
          <p>
            <span class="font-semibold">Concentration en nicotine :</span> plafond de 20 mg/ml ; réservoirs limités à 2 ml et flacons de recharge à 10 ml.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> vapoter est prohibé dans tous les espaces fermés où fumer est interdit (lieux de travail, écoles, transports, restauration, etc.).
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité :</span> toute forme de promotion ou de parrainage des produits de vapotage est interdite, y compris en ligne.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📦</span>
          <p>
            <span class="font-semibold">Emballage :</span> avertissements sanitaires couvrant au moins 30 % des faces principales ; visuels évoquant des saveurs proscrits.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💵</span>
          <p>
            <span class="font-semibold">Fiscalité :</span> accise spécifique : environ 0,18 €/ml pour les liquides nicotinés et 0,10 €/ml sans nicotine.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> amendes pouvant atteindre 5 000 € et saisie des produits non conformes.
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Ce cadre place la Slovénie parmi les pays européens les plus restrictifs à l’égard du vapotage, en ciblant tout particulièrement l’attractivité des saveurs auprès des jeunes.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.uradni-list.si/_pdf/2024/Ur/u2024031.pdf" class="text-blue-600 underline hover:text-blue-800" target="_blank">Uradni list RS – ZOUTPI-B (31/2024)</a>,
        <a href="https://www.uradni-list.si/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Uradni list RS – Pravilnik 96/2024</a>,
        <a href="https://www.tobak.si/ords/r/tob/enhome/home" class="text-blue-600 underline hover:text-blue-800" target="_blank">NIJZ – Portail national « tobak.si »</a>,
        <a href="#slovenie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>
  `,
  
  THA: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Thaïlande (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Thaïlande (2025)
      </h1>
      <img src="images-pays/tha.jpg" loading="lazy" alt="Thaïlande" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        La Thaïlande applique une interdiction stricte et complète des produits de vapotage :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction totale :</span> Depuis 2014, la fabrication, l'importation, la vente, la distribution, la possession et l'utilisation de cigarettes électroniques, de e-liquides (avec ou sans nicotine) et de dispositifs de vapotage sont illégales. Cette interdiction a été renforcée par la <strong>Loi sur le contrôle du tabac de 2014</strong> et le <strong>Code des douanes</strong>.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚷</span>
          <p>
            <span class="font-semibold">Usage personnel :</span> La simple possession ou l'utilisation de dispositifs de vapotage est considérée comme une infraction grave. Les contrevenants, y compris les touristes, peuvent être accusés de possession de marchandises de contrebande, passible d'une amende pouvant atteindre cinq fois la valeur des produits saisis ou d'une peine d'emprisonnement pouvant aller jusqu'à 5 ans, voire les deux.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">✈️</span>
          <p>
            <span class="font-semibold">Importation :</span> L'importation de dispositifs de vapotage est illégale. Les voyageurs ne doivent pas apporter de matériel de vape, même pour un usage personnel, sous peine de confiscation, d'amendes ou d'emprisonnement.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> Toute forme de publicité, de promotion ou de parrainage des produits de vapotage est interdite. Les autorités surveillent activement les plateformes en ligne pour détecter et supprimer les contenus liés au vapotage.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> Les contrevenants s'exposent à des sanctions sévères, incluant des amendes pouvant atteindre 30 000 THB (environ 900 USD) et des peines d'emprisonnement pouvant aller jusqu'à 10 ans, en fonction de la gravité de l'infraction.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚨</span>
          <p>
            <span class="font-semibold">Application stricte :</span> Les autorités thaïlandaises mènent des contrôles réguliers pour détecter et confisquer les produits interdits. En février 2025, une campagne nationale a conduit à l'arrestation de 690 personnes et à la saisie de près de 455 000 produits de vapotage.
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Il est fortement déconseillé d'apporter ou d'utiliser des dispositifs de vapotage en Thaïlande. Les autorités appliquent une politique de tolérance zéro à l'égard du vapotage.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://iamkohchang.com/blog/vaping-in-thailand.html" class="text-blue-600 underline hover:text-blue-800" target="_blank">iamkohchang.com</a>,
        <a href="https://ecigator.com/news/thailand-vape-users-5-years-prison-risk/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="https://filtermag.org/thailand-vape-crackdown/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Filter Magazine</a>,
        <a href="https://www.nationthailand.com/news/general/40047198" class="text-blue-600 underline hover:text-blue-800" target="_blank">The Nation Thailand</a>,
        <a href="#thailande" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  TUN: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage en Tunisie (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage en Tunisie (2025)
      </h1>
      <img src="images-pays/tun.jpg" loading="lazy" alt="Tunisie" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        En Tunisie, le vapotage est autorisé mais encadré par une réglementation spécifique :
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">✅</span>
          <p>
            <span class="font-semibold">Statut légal :</span> Les cigarettes électroniques et les e-liquides sont légaux, mais leur vente et distribution sont soumises à des restrictions. La Régie Nationale des Tabacs et des Allumettes (RNTA) supervise la commercialisation de ces produits.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🛂</span>
          <p>
            <span class="font-semibold">Importation personnelle :</span> Les voyageurs peuvent apporter leur matériel de vapotage pour usage personnel. Il est recommandé de déclarer ces produits à la douane à l'arrivée.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">💧</span>
          <p>
            <span class="font-semibold">Restrictions sur les e-liquides :</span> Les contenants ne doivent pas dépasser 100 ml, et le volume total de liquides ne peut excéder 1 litre.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚭</span>
          <p>
            <span class="font-semibold">Utilisation en public :</span> Le vapotage est interdit dans les lieux publics fermés, tels que les restaurants, bars et hôtels. Il est conseillé de vapoter discrètement dans les espaces ouverts et de respecter les panneaux d'interdiction.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> Toute forme de publicité pour les produits de vapotage est interdite.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Réglementation en évolution :</span> Le ministère de la Santé travaille sur un projet de loi visant à encadrer davantage l'utilisation des cigarettes électroniques, notamment pour lutter contre l'usage chez les jeunes.
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Il est recommandé aux voyageurs de se renseigner sur les réglementations locales avant de vapoter en Tunisie et de faire preuve de discrétion pour éviter tout désagrément.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://ecigator.com/fr/regulation-fr/tunisia-vaping-laws-regulations-guide/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="https://www.tunisienumerique.com/tunisie-quand-les-panneaux-publicitaires-font-de-la-resistance-la-vape-en-vedette-malgre-les-interdictions/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Tunisie Numérique</a>,
        <a href="https://www.2firsts.com/news/tunisia-drafts-e-cigarette-regulation-to-combat-teen-usage" class="text-blue-600 underline hover:text-blue-800" target="_blank">2Firsts</a>,
        <a href="#tunisie" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  USA: `
    <head>
  <style>
    .list-none { list-style: none; padding-left: 0; }
    .flex { display: flex; }
    .gap-3 { gap: 0.75rem; }
    .text-xl { font-size: 1.25rem; }
    .rounded-2xl { border-radius: 1rem; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); }
    .bg-white { background:#fff; }
    .p-6 { padding: 1.5rem; }
    .max-w-3xl { max-width: 48rem; margin-left:auto; margin-right:auto; }
  </style>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Législation sur le vapotage aux États-Unis (2025)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: "Inter", sans-serif; }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
  <main class="max-w-3xl mx-auto p-6">
    <section class="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Législation sur le vapotage aux États-Unis (2025)
      </h1>
      <img src="images-pays/usa.jpg" loading="lazy" alt="USA" class="mb-4" />
      <p class="mb-6 leading-relaxed">
        La réglementation du vapotage aux États-Unis repose sur une combinaison de lois fédérales et de réglementations spécifiques à chaque État, visant à encadrer la vente, la distribution et l'utilisation des produits de vapotage.
      </p>

      <ul class="space-y-4 list-none pl-0">
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🎂</span>
          <p>
            <span class="font-semibold">Âge légal :</span> La loi fédérale interdit la vente de produits du tabac, y compris les cigarettes électroniques, aux personnes de moins de 21 ans. Les détaillants doivent vérifier l'âge des acheteurs à l'aide d'une pièce d'identité avec photo pour toute personne de moins de 30 ans.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">✔️</span>
          <p>
            <span class="font-semibold">Autorisation des produits :</span> Tous les produits de vapotage doivent obtenir une autorisation de mise sur le marché de la FDA via le processus PMTA (Premarket Tobacco Product Application). En 2025, la FDA a autorisé uniquement certains produits aux arômes de tabac ou de menthol, rejetant plus d'un million de demandes pour des produits aromatisés jugés attractifs pour les jeunes.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🚫</span>
          <p>
            <span class="font-semibold">Interdiction des arômes :</span> En avril 2025, la Cour suprême a confirmé la décision de la FDA d'interdire la commercialisation des e-liquides aromatisés (fruits, desserts, etc.), considérés comme particulièrement attractifs pour les jeunes.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">🌍</span>
          <p>
            <span class="font-semibold">Réglementations étatiques :</span> Certains États, tels que la Californie, New York et le Massachusetts, ont mis en place des lois plus strictes, interdisant la vente de produits de vapotage aromatisés et imposant des taxes spécifiques. D'autres États exigent que les produits soient enregistrés dans des répertoires d'État et approuvés par la FDA avant leur commercialisation.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">📢</span>
          <p>
            <span class="font-semibold">Publicité et promotion :</span> La publicité pour les produits de vapotage est strictement encadrée, avec des restrictions sur les supports et les messages utilisés, notamment pour éviter de cibler les jeunes.
          </p>
        </li>
        <li class="flex gap-3">
          <span class="text-blue-600 text-xl">⚖️</span>
          <p>
            <span class="font-semibold">Sanctions :</span> La vente ou la distribution de produits de vapotage non autorisés peut entraîner des sanctions sévères, y compris des amendes, la saisie des produits et des poursuites judiciaires. En 2024, la FDA a émis plus de 800 lettres d'avertissement à des détaillants pour la vente de produits non autorisés.
          </p>
        </li>
      </ul>

      <p class="mt-6">
        Il est essentiel de se renseigner sur les lois spécifiques de l'État dans lequel vous vous trouvez, car les réglementations peuvent varier considérablement d'un État à l'autre.
      </p>

      <p class="mt-6 text-sm">
        <span class="font-semibold">Sources :</span>
        <a href="https://www.fda.gov/tobacco-products/ctp-newsroom/year-review-fdas-progress-tobacco-product-regulation-2024" class="text-blue-600 underline hover:text-blue-800" target="_blank">FDA</a>,
        <a href="https://www.washingtonpost.com/politics/2025/04/02/ecigarettes-vapes-supreme-court-case/" class="text-blue-600 underline hover:text-blue-800" target="_blank">The Washington Post</a>,
        <a href="https://ecigator.com/lounge/us-ecig-regulations-2025-difference/" class="text-blue-600 underline hover:text-blue-800" target="_blank">Ecigator</a>,
        <a href="#usa" class="text-blue-600 underline hover:text-blue-800">Source</a>
      </p>
    </section>
  </main>
</body>

  `,
  
  };