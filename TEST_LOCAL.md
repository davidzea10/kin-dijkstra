# 🧪 Guide de Test en Local

## Méthode 1: Python (Recommandé - Simple)

### Si vous avez Python installé:

1. **Ouvrez PowerShell ou Terminal** dans le dossier du projet

2. **Pour Python 3:**
   ```powershell
   python -m http.server 8000
   ```
   
   **Pour Python 2:**
   ```powershell
   python -m SimpleHTTPServer 8000
   ```

3. **Ouvrez votre navigateur** et allez à:
   ```
   http://localhost:8000
   ```

4. **Pour arrêter le serveur:** Appuyez sur `Ctrl + C` dans le terminal

---

## Méthode 2: Node.js (Si vous avez Node.js)

1. **Installez http-server globalement** (une seule fois):
   ```powershell
   npm install -g http-server
   ```

2. **Lancez le serveur:**
   ```powershell
   http-server -p 8000
   ```

3. **Ouvrez votre navigateur** à:
   ```
   http://localhost:8000
   ```

---

## Méthode 3: PHP (Si vous avez PHP)

1. **Lancez le serveur:**
   ```powershell
   php -S localhost:8000
   ```

2. **Ouvrez votre navigateur** à:
   ```
   http://localhost:8000
   ```

---

## Méthode 4: Extension VS Code (Si vous utilisez VS Code)

1. **Installez l'extension "Live Server"** dans VS Code

2. **Clic droit sur `index.html`** > **"Open with Live Server"**

3. L'application s'ouvrira automatiquement dans votre navigateur!

---

## ⚠️ Important

**Ne double-cliquez PAS directement sur `index.html`** - cela peut causer des problèmes avec l'API Google Maps à cause des restrictions CORS.

**Utilisez toujours un serveur HTTP local!**

---

## 🎯 Test Rapide

Une fois le serveur lancé:

1. ✅ La carte de Kinshasa devrait s'afficher
2. ✅ Les champs "Gombe, Kinshasa" et "Limete, Kinshasa" sont pré-remplis
3. ✅ Cliquez sur "Calculer l'itinéraire"
4. ✅ Vous devriez voir:
   - Le trajet tracé sur la carte
   - La distance totale
   - La durée estimée
   - Les instructions de navigation

---

## 🐛 Si ça ne marche pas

- Vérifiez que le serveur est bien lancé (vous devriez voir des messages dans le terminal)
- Vérifiez que vous accédez à `http://localhost:8000` (pas `file://`)
- Ouvrez la console du navigateur (F12) pour voir les erreurs éventuelles
- Vérifiez que votre clé API est bien activée dans Google Cloud Console

