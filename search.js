const https = require('https');
const fs = require('fs');
const readline = require('readline');

function fetchRobloxInfo(userId) {
    const url = `https://dude.ong/api/roblox-info?id=${userId}`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

function askForFileName() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Enter the filename to save the data: ', (filename) => {
            resolve(filename);
            rl.close();
        });
    });
}

async function main() {
    if (process.argv.length !== 3) {
        console.error('Please provide a Roblox user ID.');
        console.error(`Usage: node ${process.argv[1]} [Roblox User ID]`);
        process.exit(1);
    }

    const userId = process.argv[2];
    const data = await fetchRobloxInfo(userId);

    const filename = await askForFileName();

    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Data saved to ${filename}`);
        }
    });
}

main();
