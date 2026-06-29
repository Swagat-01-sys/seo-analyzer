const lighthouse = require("lighthouse").default;
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
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-setuid-sandbox"
            ]
        });

        console.log("STEP 2");

        const options = {
            port: chrome.port,
            output: "json",
            logLevel: "error"
        };

        console.log("STEP 3");

        const url = process.argv[2];

        const result = await lighthouse(

            url,
            options
        );

        console.log("STEP 4");

        console.log(result.lhr.categories.performance.score);

    }

    catch(e){

        console.log("ERROR");

        console.log(e.stack || e);

    }

    finally{

        if(chrome){

            try{

                await chrome.kill();

            }

            catch{}

        }

    }

})();