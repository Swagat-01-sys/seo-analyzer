const { default: lighthouse } = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

async function run(url) {
    const chrome = await chromeLauncher.launch({
        chromePath: process.env.CHROME_PATH,
        chromeFlags: ["--headless", "--no-sandbox"],
    });

    const options = {
        logLevel: "error",
        output: "json",
        port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);

    const categories = runnerResult.lhr.categories;
    const audits = runnerResult.lhr.audits;

    const result = {
        performance_score: Math.round(categories.performance.score * 100),

        accessibility_score: Math.round(categories.accessibility.score * 100),

        best_practices_score: Math.round(
            categories["best-practices"].score * 100
        ),

        seo_score: Math.round(categories.seo.score * 100),

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

    console.log(JSON.stringify(result));

    try {
    await chrome.kill();
    } catch (err) {
    }
}

const url = process.argv[2];

run(url).catch(err => {
    console.error(err);
    process.exit(1);
});