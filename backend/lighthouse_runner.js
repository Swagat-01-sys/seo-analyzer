const { default: lighthouse } = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

(async () => {
    let chrome;

    try {
        console.log("STEP 1: Script Started");

        const chromePath = process.env.CHROME_PATH || "/usr/bin/chromium";
        console.log("Chrome Path:", chromePath);

        chrome = await chromeLauncher.launch({
            chromePath,
            chromeFlags: [
                "--headless=new",
                "--no-sandbox",
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-setuid-sandbox",
                "--remote-debugging-port=0"
            ]
        });

        console.log("STEP 2: Chrome Launched");
        console.log("PID:", chrome.pid);
        console.log("PORT:", chrome.port);

        const options = {
            logLevel: "info",
            output: "json",
            port: chrome.port,
        };

        console.log("STEP 3: Starting Lighthouse");

        const result = await Promise.race([
            lighthouse(process.argv[2], options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("LIGHTHOUSE_TIMEOUT")), 60000)
            )
        ]);

        console.log("STEP 4: Lighthouse Finished");

        const report = {
            performance_score: Math.round(result.lhr.categories.performance.score * 100),
            accessibility_score: Math.round(result.lhr.categories.accessibility.score * 100),
            best_practices_score: Math.round(result.lhr.categories["best-practices"].score * 100),
            seo_score: Math.round(result.lhr.categories.seo.score * 100),
            first_contentful_paint: result.lhr.audits["first-contentful-paint"].displayValue,
            largest_contentful_paint: result.lhr.audits["largest-contentful-paint"].displayValue,
            speed_index: result.lhr.audits["speed-index"].displayValue,
            total_blocking_time: result.lhr.audits["total-blocking-time"].displayValue,
            cumulative_layout_shift: result.lhr.audits["cumulative-layout-shift"].displayValue,
        };

        console.log(JSON.stringify(report));

    } catch (err) {

        console.error("========== ERROR ==========");
        console.error(err);
        console.error(err.stack);

    } finally {

        if (chrome) {
            console.log("Closing Chrome...");
            await chrome.kill().catch(() => {});
        }

        console.log("Runner Finished");
    }

})();