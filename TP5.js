// wait(ms)
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// simulatedLogin(user, pass)
function simulatedLogin(user, pass) {
    return new Promise(async (resolve, reject) => { // async pour pouvoir utiliser await
        console.log("connexion en cours ...");

        await wait(2000); // on attend 2 secondes

        if (user === 'Leo' && pass === 134) {
            resolve("connexion réussie"); // appeler resolve correctement
        } else {
            reject("user incorrect && password incorrect"); // appeler reject correctement
        }
    });
}

// getUserData(token)
async function getUserData(token) {
    try {
        await wait(1000); // simule un délai réseau
        if (token === "connexion réussie") {
            // renvoie des données simulées
            return { name: "Leo", age: 20, role: "admin" };
        } else {
            throw new Error("token invalide");
        }
    } catch(e) {
        console.log("Erreur getUserData :", e.message);
        throw e; // on relance pour que l'appelant sache
    }
}

// Exemple d'utilisation avec async/await + try/catch
async function main() {
    try {
        const loginResult = await simulatedLogin("Leo", 134);
        console.log(loginResult); // "connexion réussie"

        const userData = await getUserData(loginResult);
        console.log(userData); // { name: "Leo", age: 20, role: "admin" }
    } catch(e) {
        console.log("Erreur :", e);
    }
}

main();
