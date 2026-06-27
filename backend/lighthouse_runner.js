const { default: lighthouse } = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

(async () => {

    let chrome;

    try {

        console.log("STEP 1");

        chrome = await chromeLauncher.launch({
            chromePath: process.env.CHROME_PATH,
            chromeFlags: [
                "--headless=new",
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--disable-setuid-sandbox"
            ]
        });

        console.log("STEP 2");
        console.log("PORT:", chrome.port);

        console.log("STEP 3");

        const runnerResult = await lighthouse(process.argv[2], {
            port: chrome.port,
            output: "json",
            logLevel: "error",
            onlyCategories: [
                "performance",
                "seo"
            ]
        });

        console.log("STEP 4");

        console.log(JSON.stringify({
            performance_score: Math.round(
                runnerResult.lhr.categories.performance.score * 100
            ),
            seo_score: Math.round(
                runnerResult.lhr.categories.seo.score * 100
            )
        }));

    } catch (err) {

        console.error("LIGHTHOUSE ERROR");
        console.error(err);

    } finally {

        if (chrome) {
            await chrome.kill().catch(() => {});
        }

        console.log("END");
    }

})();