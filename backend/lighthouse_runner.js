const { default: lighthouse } = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

async function run(url) {
    let chrome;

    try {
        console.log("CHROME_PATH =", process.env.CHROME_PATH);

        chrome = await chromeLauncher.launch({
            chromePath: process.env.CHROME_PATH,
            chromeFlags: [
                "--headless",
                "--no-sandbox",
                "--disable-gpu",
                "--disable-dev-shm-usage"
            ]
        });

        console.log("Chrome launched");

        const result = await lighthouse(url, {
            output: "json",
            logLevel: "error",
            port: chrome.port
        });

        console.log("Lighthouse finished");

        console.log(JSON.stringify({
            performance_score: Math.round(result.lhr.categories.performance.score * 100),
            accessibility_score: Math.round(result.lhr.categories.accessibility.score * 100),
            best_practices_score: Math.round(result.lhr.categories["best-practices"].score * 100),
            seo_score: Math.round(result.lhr.categories.seo.score * 100),
            first_contentful_paint: result.lhr.audits["first-contentful-paint"].displayValue,
            largest_contentful_paint: result.lhr.audits["largest-contentful-paint"].displayValue,
            speed_index: result.lhr.audits["speed-index"].displayValue,
            total_blocking_time: result.lhr.audits["total-blocking-time"].displayValue,
            cumulative_layout_shift: result.lhr.audits["cumulative-layout-shift"].displayValue
        }));

    } catch (err) {
        console.error(err.stack || err);
    } finally {
        if (chrome) {
            await chrome.kill().catch(() => {});
        }
    }
}

run(process.argv[2]);