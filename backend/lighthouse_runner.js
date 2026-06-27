const { default: lighthouse } = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

console.log("========== LIGHTHOUSE DEBUG ==========");

async function run(url) {
    let chrome;

    try {
        console.log("STEP 1: Script Started");
        console.log("Target URL:", url);

        console.log("STEP 2: CHROME_PATH =", process.env.CHROME_PATH);

        console.log("STEP 3: Launching Chrome...");

        chrome = await chromeLauncher.launch({
            chromePath: process.env.CHROME_PATH,
            chromeFlags: [
                "--headless=new",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--disable-software-rasterizer",
                "--disable-extensions",
                "--disable-background-networking",
                "--disable-sync",
                "--disable-default-apps"
            ]
        });

        console.log("STEP 4: Chrome launched successfully");
        console.log("Chrome PID:", chrome.pid);
        console.log("Chrome Port:", chrome.port);

        const options = {
            logLevel: "error",
            output: "json",
            port: chrome.port
        };

        console.log("STEP 5: Starting Lighthouse...");

        const runnerResult = await lighthouse(url, options);

        console.log("STEP 6: Lighthouse completed");

        const categories = runnerResult.lhr.categories;
        const audits = runnerResult.lhr.audits;

        const result = {
            performance_score: Math.round(categories.performance.score * 100),

            accessibility_score: Math.round(
                categories.accessibility.score * 100
            ),

            best_practices_score: Math.round(
                categories["best-practices"].score * 100
            ),

            seo_score: Math.round(
                categories.seo.score * 100
            ),

            first_contentful_paint:
                audits["first-contentful-paint"].displayValue,

            largest_contentful_paint:
                audits["largest-contentful-paint"].displayValue,

            speed_index:
                audits["speed-index"].displayValue,

            total_blocking_time:
                audits["total-blocking-time"].displayValue,

            cumulative_layout_shift:
                audits["cumulative-layout-shift"].displayValue,
        };

        console.log("STEP 7: Printing JSON");
        console.log(JSON.stringify(result));

    } catch (err) {

        console.error("========== LIGHTHOUSE ERROR ==========");
        console.error(err);

        if (err.stack) {
            console.error(err.stack);
        }

    } finally {

        if (chrome) {

            console.log("STEP 8: Closing Chrome");

            try {
                await chrome.kill();
                console.log("Chrome closed.");
            } catch (e) {
                console.error("Failed to close Chrome:", e);
            }
        }

        console.log("========== END ==========");
    }
}

const url = process.argv[2];

run(url);