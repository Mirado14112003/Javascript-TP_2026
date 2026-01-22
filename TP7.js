//Gestion d'erreurs & retry
//objectifs : appels robustes
//with timeout(promise,ms) affichage avec console.log 
function withTimeout(promise, ms) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, ms);
        promise
            .then((value) => {
                clearTimeout(timer);
                resolve(value);
            })
            .catch((error) => {
                clearTimeout(timer);
                reject(error);
            });
    });
}
//retry(fn, attempts,delay)avec logs avec afficchage sur console.log
async function retry(fn, attempts, delay) {
    for (let i = 0; i < attempts; i++) {
        try {
            const result = await fn();
            return result;
        } catch (error) {
            console.log(`Attempt ${i + 1} failed: ${error.message}`);
            if (i < attempts - 1) {
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
    throw new Error(`All ${attempts} attempts failed`);
}

//Exemples d'utilisation
//Exemple pour withTimeout
const examplePromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Success!');
    }, 2000);
});

withTimeout(examplePromise, 1000)
    .then((result) => console.log(result))
    .catch((error) => console.log(error.message));
//Exemple pour retry
let attemptCount = 0;   
const unreliableFunction = () => {
    return new Promise((resolve, reject) => {
        attemptCount++;
        if (attemptCount < 3) {
            reject(new Error('Failed attempt'));
        } else {
            resolve('Successful attempt');
        }
    });
};

retry(unreliableFunction, 5, 1000)
    .then((result) => console.log(result))
    .catch((error) => console.log(error.message));