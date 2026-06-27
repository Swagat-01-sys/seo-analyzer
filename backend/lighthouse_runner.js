const chromeLauncher = require("chrome-launcher");

(async () => {
    console.log("STEP 1");

    try {
        console.log("STEP 2");

        const chrome = await chromeLauncher.launch({
            chromePath: process.env.CHROME_PATH,
            chromeFlags: [
                "--headless=new",
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu"
            ]
        });

        console.log("STEP 3");
        console.log("PORT:", chrome.port);

        await chrome.kill();

        console.log("STEP 4");
    } catch (e) {
        console.error(e);
    }
})();