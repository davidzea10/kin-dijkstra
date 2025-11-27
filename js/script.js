// Configuration de l'API Google Maps
let map;
let directionsService;
let directionsRenderer;
let autocompleteStart;
let autocompleteEnd;
let startMarker;
let endMarker;
let currentRoute = null;

// Initialisation de la carte
function initMap() {
    try {
        // Centre par défaut: Kinshasa
        const kinshasa = { lat: -4.3276, lng: 15.3136 };
        
        // Créer la carte
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('❌ Élément map introuvable');
            return;
        }

        map = new google.maps.Map(mapElement, {
            zoom: 12,
            center: kinshasa,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
        });

        // Initialiser les services
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true, // On utilise nos propres marqueurs
            polylineOptions: {
                strokeColor: '#667eea',
                strokeWeight: 5
            }
        });

        // Initialiser l'autocomplétion pour les champs de saisie
        const startInput = document.getElementById('start');
        const endInput = document.getElementById('end');
        
        if (startInput) {
            autocompleteStart = new google.maps.places.Autocomplete(
                startInput,
                { types: ['geocode'] }
            );
        }

        if (endInput) {
            autocompleteEnd = new google.maps.places.Autocomplete(
                endInput,
                { types: ['geocode'] }
            );
        }

        // Écouter le clic sur le bouton de calcul
        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculateRoute);
        }
        
        // Écouter les boutons de partage et sauvegarde
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) shareBtn.addEventListener('click', shareRoute);
        
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveToHistory);
        
        const exportPdfBtn = document.getElementById('exportPdfBtn');
        if (exportPdfBtn) exportPdfBtn.addEventListener('click', exportToPDF);
        
        const copyLinkBtn = document.getElementById('copyLinkBtn');
        if (copyLinkBtn) copyLinkBtn.addEventListener('click', copyShareLink);
        
        const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearHistory);
        
        
        // Fermer la modal de partage
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                const shareModal = document.getElementById('shareModal');
                if (shareModal) shareModal.style.display = 'none';
            });
        }
        
        // Fermer la modal en cliquant à l'extérieur
        const shareModal = document.getElementById('shareModal');
        if (shareModal) {
            shareModal.addEventListener('click', (e) => {
                if (e.target.id === 'shareModal') {
                    shareModal.style.display = 'none';
                }
            });
        }

        // Charger l'historique au démarrage
        loadHistory();
        
        // Vérifier si on a des paramètres dans l'URL (pour le partage)
        checkUrlParams();

        console.log('✅ Carte initialisée avec succès!');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        alert('❌ Erreur lors de l\'initialisation de la carte. Vérifiez la console pour plus de détails.');
    }
}

// Fonction pour créer des marqueurs personnalisés
function createCustomMarker(position, color, label) {
    return new google.maps.Marker({
        position: position,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 3
        },
        label: {
            text: label,
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold'
        },
        zIndex: 1000
    });
}

// Fonction pour calculer l'itinéraire
function calculateRoute() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const travelMode = document.getElementById('travelMode').value;

    if (!start || !end) {
        alert('⚠️ Veuillez remplir les deux champs (départ et destination)');
        return;
    }

    // Afficher le loader
    const btn = document.getElementById('calculateBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    
    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';

    // Préparer la requête - SIMPLIFIÉE sans trafic
    // Moto utilise DRIVING pour l'API Google Maps
    const apiTravelMode = travelMode === 'MOTORCYCLE' ? 'DRIVING' : travelMode;
    
    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode[apiTravelMode],
        unitSystem: google.maps.UnitSystem.METRIC
    };

    // Calculer l'itinéraire
    directionsService.route(request, (result, status) => {
        btn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';

        if (status === 'OK') {
            // Sauvegarder l'itinéraire actuel
            currentRoute = {
                start: start,
                end: end,
                travelMode: travelMode,
                result: result
            };

            // Afficher l'itinéraire sur la carte
            directionsRenderer.setDirections(result);

            // Supprimer les anciens marqueurs
            if (startMarker) startMarker.setMap(null);
            if (endMarker) endMarker.setMap(null);

            // Créer les marqueurs personnalisés
            const route = result.routes[0];
            const leg = route.legs[0];
            
            startMarker = createCustomMarker(leg.start_location, '#4caf50', 'D');
            endMarker = createCustomMarker(leg.end_location, '#f44336', 'A');

            // Extraire les informations
            document.getElementById('distance').textContent = leg.distance.text;
            document.getElementById('duration').textContent = leg.duration.text;

            // Afficher le panneau de résultats
            document.getElementById('resultsPanel').style.display = 'block';

            // Afficher les instructions
            displayInstructions(leg.steps);

            console.log('✅ Itinéraire calculé avec succès!');
        } else {
            // Gestion spécifique des erreurs
            let errorMessage = '❌ Erreur: ' + status;
            
            if (status === 'ZERO_RESULTS') {
                if (travelMode === 'BICYCLING') {
                    errorMessage += '\n\n⚠️ Aucun itinéraire vélo trouvé.\n\nSuggestions:\n- Essayez avec le mode "Marche" ou "Voiture"\n- Vérifiez que les adresses sont correctes\n- Les itinéraires vélo peuvent ne pas être disponibles pour cette zone';
                } else if (travelMode === 'TRANSIT') {
                    errorMessage += '\n\n⚠️ Aucun itinéraire de transport en commun trouvé.\n\nSuggestions:\n- Essayez avec le mode "Marche" ou "Voiture"\n- Vérifiez que les adresses sont correctes\n- Les transports en commun peuvent ne pas être disponibles pour cette zone';
                } else {
                    errorMessage += '\n\n⚠️ Aucun itinéraire trouvé.\n\nVérifiez que:\n- Vos adresses sont correctes et complètes\n- Les deux points sont accessibles\n- Essayez avec des adresses plus précises';
                }
            } else if (status === 'NOT_FOUND') {
                errorMessage += '\n\n⚠️ Adresse introuvable.\n\nVérifiez que:\n- Les adresses sont correctement écrites\n- Les noms de lieux sont valides\n- Essayez avec des adresses plus précises';
            } else if (status === 'OVER_QUERY_LIMIT') {
                errorMessage += '\n\n⚠️ Limite de requêtes dépassée.\n\nVotre clé API a atteint sa limite quotidienne.';
            } else if (status === 'REQUEST_DENIED') {
                errorMessage += '\n\n⚠️ Requête refusée.\n\nVérifiez que:\n- Votre clé API est valide\n- Les services Google Maps sont activés\n- Les restrictions de votre clé API permettent cette utilisation';
            } else {
                errorMessage += '\n\nVérifiez que:\n- Vos adresses sont correctes\n- Votre clé API est valide\n- Les services Google Maps sont activés';
            }
            
            alert(errorMessage);
            console.error('Erreur:', status, 'Mode:', travelMode);
        }
    });
}

// Fonction pour afficher les instructions de navigation
function displayInstructions(steps) {
    const instructionsList = document.getElementById('instructionsList');
    instructionsList.innerHTML = '';

    steps.forEach((step, index) => {
        const instructionItem = document.createElement('div');
        instructionItem.className = 'instruction-item';
        
        // Nettoyer le HTML des instructions
        const instruction = step.instructions.replace(/<[^>]*>/g, '');
        
        instructionItem.innerHTML = `
            <strong>Étape ${index + 1}:</strong> ${instruction}
            <br><small style="color: #666;">Distance: ${step.distance.text} | Durée: ${step.duration.text}</small>
        `;
        
        instructionsList.appendChild(instructionItem);
    });

    document.getElementById('instructionsPanel').style.display = 'block';
}

// Fonction pour sauvegarder dans l'historique
function saveToHistory() {
    if (!currentRoute) {
        alert('⚠️ Aucun itinéraire à sauvegarder');
        return;
    }

    const history = getHistory();
    const routeData = {
        id: Date.now(),
        start: currentRoute.start,
        end: currentRoute.end,
        travelMode: currentRoute.travelMode,
        distance: document.getElementById('distance').textContent,
        duration: document.getElementById('duration').textContent,
        timestamp: new Date().toISOString()
    };

    // Ajouter au début de l'historique
    history.unshift(routeData);

    // Limiter à 20 itinéraires
    if (history.length > 20) {
        history.pop();
    }

    // Sauvegarder dans localStorage
    localStorage.setItem('routeHistory', JSON.stringify(history));
    
    // Recharger l'affichage
    loadHistory();
    
    alert('✅ Itinéraire sauvegardé dans l\'historique!');
}

// Fonction pour récupérer l'historique
function getHistory() {
    const history = localStorage.getItem('routeHistory');
    return history ? JSON.parse(history) : [];
}

// Fonction pour charger et afficher l'historique
function loadHistory() {
    const history = getHistory();
    const historyList = document.getElementById('historyList');
    const historyPanel = document.getElementById('historyPanel');

    if (history.length === 0) {
        historyPanel.style.display = 'none';
        return;
    }

    historyPanel.style.display = 'block';
    historyList.innerHTML = '';

    history.forEach((item) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const modeIcons = {
            'DRIVING': '🚗',
            'MOTORCYCLE': '🏍️',
            'WALKING': '🚶',
            'BICYCLING': '🚴',
            'TRANSIT': '🚌'
        };

        historyItem.innerHTML = `
            <div class="history-item-info">
                <div class="history-item-route">${item.start} → ${item.end}</div>
                <div class="history-item-details">${item.distance} • ${item.duration}</div>
            </div>
            <div class="history-item-mode">${modeIcons[item.travelMode] || '🚗'}</div>
        `;

        // Cliquer sur un élément de l'historique pour le charger
        historyItem.addEventListener('click', () => {
            document.getElementById('start').value = item.start;
            document.getElementById('end').value = item.end;
            document.getElementById('travelMode').value = item.travelMode;
            calculateRoute();
        });

        historyList.appendChild(historyItem);
    });
}

// Fonction pour effacer l'historique
function clearHistory() {
    if (confirm('⚠️ Êtes-vous sûr de vouloir effacer tout l\'historique?')) {
        localStorage.removeItem('routeHistory');
        loadHistory();
    }
}

// Fonction pour partager l'itinéraire
function shareRoute() {
    if (!currentRoute) {
        alert('⚠️ Aucun itinéraire à partager');
        return;
    }

    // Créer un lien avec les paramètres encodés
    const params = new URLSearchParams({
        start: currentRoute.start,
        end: currentRoute.end,
        mode: currentRoute.travelMode
    });

    const shareLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    // Afficher dans la modal
    document.getElementById('shareLink').value = shareLink;
    document.getElementById('shareModal').style.display = 'flex';
    document.getElementById('shareSuccess').style.display = 'none';
}

// Fonction pour copier le lien de partage
function copyShareLink() {
    const shareLinkInput = document.getElementById('shareLink');
    shareLinkInput.select();
    shareLinkInput.setSelectionRange(0, 99999); // Pour mobile

    try {
        navigator.clipboard.writeText(shareLinkInput.value);
        document.getElementById('shareSuccess').style.display = 'block';
        setTimeout(() => {
            document.getElementById('shareSuccess').style.display = 'none';
        }, 3000);
    } catch (err) {
        // Fallback pour les anciens navigateurs
        document.execCommand('copy');
        document.getElementById('shareSuccess').style.display = 'block';
        setTimeout(() => {
            document.getElementById('shareSuccess').style.display = 'none';
        }, 3000);
    }
}

// Fonction pour vérifier les paramètres URL (partage)
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get('start');
    const end = urlParams.get('end');
    const mode = urlParams.get('mode');

    if (start && end) {
        document.getElementById('start').value = decodeURIComponent(start);
        document.getElementById('end').value = decodeURIComponent(end);
        if (mode) {
            document.getElementById('travelMode').value = mode;
        }
        // Calculer automatiquement l'itinéraire
        setTimeout(() => calculateRoute(), 500);
    }
}

// Fonction pour exporter en PDF
async function exportToPDF() {
    if (!currentRoute) {
        alert('⚠️ Aucun itinéraire à exporter');
        return;
    }

    // Vérifier si les bibliothèques sont chargées
    if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
        alert('❌ Les bibliothèques PDF ne sont pas chargées. Veuillez recharger la page.');
        console.error('html2canvas ou jsPDF non disponible');
        return;
    }

    try {
        // Afficher un message de chargement
        const btn = document.getElementById('exportPdfBtn');
        if (!btn) return;
        
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '⏳ Génération du PDF...';

        // Attendre que la carte soit complètement chargée
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Capturer la carte
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            throw new Error('Élément map introuvable');
        }

        const mapCanvas = await html2canvas(mapElement, {
            useCORS: true,
            logging: false,
            scale: 2
        });

        // Créer le PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Ajouter le titre
        pdf.setFontSize(18);
        pdf.text('Itinéraire Calculé', pdfWidth / 2, 15, { align: 'center' });

        // Informations de l'itinéraire
        pdf.setFontSize(12);
        let yPos = 25;
        pdf.text(`Départ: ${currentRoute.start}`, 10, yPos);
        yPos += 7;
        pdf.text(`Destination: ${currentRoute.end}`, 10, yPos);
        yPos += 7;
        
        const distance = document.getElementById('distance').textContent;
        const duration = document.getElementById('duration').textContent;
        pdf.text(`Distance: ${distance} | Durée: ${duration}`, 10, yPos);
        yPos += 7;

        // Ajouter la carte
        const imgWidth = pdfWidth - 20;
        const imgHeight = (mapCanvas.height * imgWidth) / mapCanvas.width;
        
        if (imgHeight + yPos > pdfHeight - 20) {
            pdf.addPage();
            yPos = 10;
        }

        pdf.addImage(mapCanvas.toDataURL('image/png'), 'PNG', 10, yPos, imgWidth, imgHeight);
        yPos += imgHeight + 10;

        // Ajouter les instructions si elles tiennent
        const instructionsPanel = document.getElementById('instructionsPanel');
        if (instructionsPanel.style.display !== 'none' && yPos < pdfHeight - 30) {
            pdf.setFontSize(14);
            pdf.text('Instructions de navigation:', 10, yPos);
            yPos += 7;

            const instructions = document.querySelectorAll('.instruction-item');
            pdf.setFontSize(10);
            instructions.forEach((instruction, index) => {
                if (yPos > pdfHeight - 20) {
                    pdf.addPage();
                    yPos = 10;
                }
                
                const text = instruction.textContent.replace(/\s+/g, ' ').trim();
                const lines = pdf.splitTextToSize(text, pdfWidth - 20);
                pdf.text(lines, 10, yPos);
                yPos += lines.length * 5 + 3;
            });
        }

        // Sauvegarder le PDF
        const fileName = `itineraire_${currentRoute.start.substring(0, 10)}_${currentRoute.end.substring(0, 10)}.pdf`.replace(/[^a-z0-9]/gi, '_');
        pdf.save(fileName);

        btn.disabled = false;
        btn.innerHTML = originalText;
        
        alert('✅ PDF généré avec succès!');
    } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        alert('❌ Erreur lors de la génération du PDF. Vérifiez la console pour plus de détails.');
        
        const btn = document.getElementById('exportPdfBtn');
        btn.disabled = false;
        btn.innerHTML = '📄 Exporter en PDF';
    }
}

// Gestion des erreurs de chargement de l'API
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.message, e.filename, e.lineno);
    
    if (e.message.includes('google') || e.message.includes('maps') || e.filename && e.filename.includes('maps')) {
        console.error('❌ Erreur de chargement de Google Maps API');
        alert('❌ Erreur: Impossible de charger Google Maps.\n\nVérifiez votre clé API dans index.html');
    }
    
    // Ne pas bloquer l'exécution pour les erreurs de bibliothèques externes
    if (e.filename && (e.filename.includes('jspdf') || e.filename.includes('html2canvas'))) {
        console.warn('⚠️ Bibliothèque externe non chargée:', e.filename);
        return;
    }
});

// Fallback si initMap n'est pas appelé automatiquement
window.addEventListener('load', () => {
    // Attendre un peu pour que Google Maps se charge
    setTimeout(() => {
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined' && !map) {
            console.log('🔄 Tentative d\'initialisation manuelle de la carte...');
            initMap();
        }
    }, 2000);
});
