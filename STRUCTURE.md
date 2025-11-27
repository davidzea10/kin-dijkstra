# 📁 Structure du Projet Kin_dijkstra

## Organisation des dossiers

```
Kin_dijkstra/
├── index.html              # Page d'accueil (landing page)
├── css/
│   ├── home.css           # Styles pour la page d'accueil
│   └── styles.css          # Styles pour l'application principale
├── js/
│   ├── home.js            # Scripts pour la page d'accueil
│   └── script.js          # Scripts pour l'application principale
├── pages/
│   ├── app.html           # Page principale de l'application
│   └── apropos.html       # Page "À propos"
├── assets/                # Dossier pour les images et ressources
│   └── (images à télécharger ici)
└── README.md              # Documentation principale
```

## 📸 Images à télécharger (optionnel)

Si vous souhaitez ajouter des images à la page d'accueil, vous pouvez les télécharger et les placer dans le dossier `assets/`.

### Suggestions d'images :
- **Hero image** : Une image de carte ou de navigation (format recommandé: 1920x1080px)
- **Feature icons** : Des icônes personnalisées (actuellement utilisant Font Awesome)
- **Background patterns** : Des motifs de fond pour les sections

### Sources recommandées pour télécharger des images :
- [Unsplash](https://unsplash.com) - Photos gratuites et libres
- [Pexels](https://www.pexels.com) - Photos gratuites
- [Flaticon](https://www.flaticon.com) - Icônes gratuites
- [Freepik](https://www.freepik.com) - Graphiques et illustrations

### Exemple d'utilisation :
Si vous téléchargez une image `hero-bg.jpg`, placez-la dans `assets/hero-bg.jpg` et modifiez `css/home.css` :

```css
.hero-section {
    background-image: url('../assets/hero-bg.jpg');
    background-size: cover;
    background-position: center;
}
```

## 🚀 Navigation

La barre de navigation est présente sur toutes les pages avec :
- **Accueil** : Retour à la page d'accueil
- **Page Principale** : Accès à l'application de calcul d'itinéraire
- **À Propos** : Informations sur l'application et les développeurs

## 📝 Notes

- Tous les fichiers CSS sont dans le dossier `css/`
- Tous les fichiers JavaScript sont dans le dossier `js/`
- Toutes les pages (sauf l'accueil) sont dans le dossier `pages/`
- Les ressources (images, etc.) vont dans `assets/`

