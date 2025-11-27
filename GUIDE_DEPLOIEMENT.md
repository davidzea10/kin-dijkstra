# 🚀 Guide de Déploiement - Kin_dijkstra

## 📋 Table des matières
1. [Préparation du projet](#1-préparation-du-projet)
2. [Création du compte GitHub](#2-création-du-compte-github)
3. [Création du repository](#3-création-du-repository)
4. [Upload des fichiers](#4-upload-des-fichiers)
5. [Configuration GitHub Pages](#5-configuration-github-pages)
6. [Accès à votre site](#6-accès-à-votre-site)
7. [Alternatives d'hébergement](#7-alternatives-dhébergement)

---

## 1. Préparation du projet

### Vérifier que tous les fichiers sont prêts

Assurez-vous que votre structure de dossiers est correcte :

```
Kin_dijkstra/
├── index.html
├── css/
│   ├── home.css
│   └── styles.css
├── js/
│   ├── home.js
│   └── script.js
├── pages/
│   ├── app.html
│   └── apropos.html
├── assets/
└── README.md
```

### ⚠️ Important : Vérifier la clé API

Votre clé API Google Maps est déjà dans le code. Pour la production, vous devriez :
- Créer une nouvelle clé API avec restrictions de domaine
- Ou garder la même clé (moins sécurisé mais fonctionnel)

---

## 2. Création du compte GitHub

### Si vous n'avez pas de compte :

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"Sign up"** (S'inscrire)
3. Remplissez le formulaire :
   - Nom d'utilisateur
   - Email
   - Mot de passe
4. Vérifiez votre email
5. Complétez votre profil

**C'est gratuit et prend 2 minutes !**

---

## 3. Création du repository

### Étape 1 : Créer un nouveau repository

1. Connectez-vous à GitHub
2. Cliquez sur le bouton **"+"** en haut à droite
3. Sélectionnez **"New repository"**

### Étape 2 : Configurer le repository

Remplissez les informations :

- **Repository name** : `kin-dijkstra` (ou `Kin_dijkstra`)
- **Description** : `Calculateur d'itinéraire intelligent pour Kinshasa utilisant Google Maps API`
- **Visibilité** : 
  - ✅ **Public** (recommandé pour GitHub Pages gratuit)
  - ⚠️ **Private** (nécessite un compte GitHub Pro pour Pages)
- **Ne cochez PAS** "Add a README file" (on a déjà un README)
- **Ne cochez PAS** "Add .gitignore"
- **Ne cochez PAS** "Choose a license"

4. Cliquez sur **"Create repository"**

---

## 4. Upload des fichiers

### Méthode 1 : Via l'interface GitHub (Simple - Recommandé)

#### Étape 1 : Préparer les fichiers

1. Ouvrez votre dossier du projet dans l'explorateur de fichiers
2. Sélectionnez **TOUS** les fichiers et dossiers :
   - `index.html`
   - `css/` (dossier entier)
   - `js/` (dossier entier)
   - `pages/` (dossier entier)
   - `assets/` (dossier entier)
   - `README.md`
   - `STRUCTURE.md`
   - `GUIDE_DEPLOIEMENT.md`

#### Étape 2 : Upload sur GitHub

1. Sur la page de votre nouveau repository GitHub
2. Cliquez sur **"uploading an existing file"** (ou glissez-déposez)
3. Glissez-déposez tous vos fichiers et dossiers
4. En bas de la page, remplissez :
   - **Commit message** : `Initial commit - Kin_dijkstra application`
5. Cliquez sur **"Commit changes"**

✅ **C'est fait ! Vos fichiers sont sur GitHub !**

---

### Méthode 2 : Via Git en ligne de commande (Avancé)

Si vous avez Git installé :

```bash
# 1. Ouvrir PowerShell dans le dossier du projet
cd "C:\Users\DEBUZE DAVID\Documents\aMes travaux\aaaL4\PREMIER SEMESTRE\Systeme intelligent\Tp2"

# 2. Initialiser Git
git init

# 3. Ajouter tous les fichiers
git add .

# 4. Faire le premier commit
git commit -m "Initial commit - Kin_dijkstra application"

# 5. Ajouter le remote GitHub (remplacez USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/kin-dijkstra.git

# 6. Pousser vers GitHub
git branch -M main
git push -u origin main
```

---

## 5. Configuration GitHub Pages

### Étape 1 : Activer GitHub Pages

1. Dans votre repository GitHub, allez dans **"Settings"** (Paramètres)
2. Dans le menu de gauche, cliquez sur **"Pages"**
3. Sous **"Source"**, sélectionnez :
   - **Branch** : `main` (ou `master`)
   - **Folder** : `/ (root)`
4. Cliquez sur **"Save"**

### Étape 2 : Attendre le déploiement

- GitHub va déployer votre site (cela prend 1-2 minutes)
- Vous verrez un message vert : **"Your site is live at..."**

---

## 6. Accès à votre site

### URL de votre site

Votre site sera accessible à :

```
https://VOTRE-USERNAME.github.io/kin-dijkstra/
```

**Exemple** : Si votre username est `david123`, l'URL sera :
```
https://david123.github.io/kin-dijkstra/
```

### ⚠️ Important : Mettre à jour les chemins si nécessaire

Si votre site ne fonctionne pas, vérifiez que tous les chemins relatifs sont corrects dans vos fichiers HTML.

---

## 7. Alternatives d'hébergement

### Option A : Netlify (Très simple)

1. Allez sur [netlify.com](https://www.netlify.com)
2. Créez un compte (gratuit)
3. Cliquez sur **"Add new site"** > **"Import an existing project"**
4. Connectez votre compte GitHub
5. Sélectionnez votre repository `kin-dijkstra`
6. Cliquez sur **"Deploy"**
7. Votre site sera accessible à : `https://kin-dijkstra.netlify.app`

**Avantages** :
- ✅ Déploiement automatique à chaque push
- ✅ HTTPS automatique
- ✅ URL personnalisée
- ✅ Très rapide

---

### Option B : Vercel (Pour développeurs)

1. Allez sur [vercel.com](https://vercel.com)
2. Créez un compte (gratuit)
3. Cliquez sur **"New Project"**
4. Importez depuis GitHub
5. Sélectionnez votre repository
6. Cliquez sur **"Deploy"**

**Avantages** :
- ✅ Performance optimale
- ✅ Déploiement automatique
- ✅ Analytics gratuit

---

### Option C : Firebase Hosting (Google)

1. Allez sur [firebase.google.com](https://firebase.google.com)
2. Créez un projet Firebase
3. Installez Firebase CLI
4. Déployez avec `firebase deploy`

**Avantages** :
- ✅ Intégration Google
- ✅ CDN global
- ✅ Gratuit avec quota généreux

---

## 🎯 Recommandation

**Pour votre projet, je recommande GitHub Pages** car :
- ✅ C'est le plus simple
- ✅ Gratuit et illimité
- ✅ Intégré à GitHub
- ✅ HTTPS automatique
- ✅ Pas de configuration complexe

---

## 📝 Checklist finale

Avant de déployer, vérifiez :

- [ ] Tous les fichiers sont dans les bons dossiers
- [ ] La clé API Google Maps est présente dans `pages/app.html`
- [ ] Tous les liens relatifs sont corrects
- [ ] Le README.md est à jour
- [ ] Les fichiers sont uploadés sur GitHub
- [ ] GitHub Pages est activé
- [ ] Le site est accessible

---

## 🐛 Dépannage

### Le site ne s'affiche pas
- Vérifiez que GitHub Pages est activé dans Settings > Pages
- Attendez 2-3 minutes pour le déploiement
- Vérifiez l'URL (elle doit être exacte)

### La carte Google Maps ne fonctionne pas
- Vérifiez que votre clé API est valide
- Vérifiez que les services sont activés dans Google Cloud Console
- Vérifiez la console du navigateur (F12) pour les erreurs

### Les styles ne s'appliquent pas
- Vérifiez les chemins des fichiers CSS (doivent être relatifs)
- Videz le cache du navigateur (Ctrl+F5)

---

## 🎉 Félicitations !

Une fois déployé, votre application sera accessible partout dans le monde !

**Partagez votre lien avec vos amis et votre professeur !**

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12)
2. Vérifiez les logs GitHub Pages dans Settings > Pages
3. Consultez la documentation GitHub Pages

**Bon déploiement ! 🚀**

