/**
 * This template is a production ready boilerplate for developing with `CheerioCrawler`.
 * Use this to bootstrap your projects using the most up-to-date code.
 * If you're looking for examples or want to learn more, see README.
 */

const Apify = require('apify');
const { handleStart, handleList, handleDetail } = require('./src/routes');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const { startUrls } = await Apify.getInput();

    const requestList = await Apify.openRequestList('start-urls', ['https://www.edeka24.de/']);
    const requestQueue = await Apify.openRequestQueue();
    // await requestQueue.addRequest({ url: 'https://apify.com' });
 
    // const proxyConfiguration = await Apify.createProxyConfiguration();
    // URL SOURCE string
    // CATEGORY [] | string
    //  PRODUCTS []

    const crawler = new Apify.CheerioCrawler({
        requestList,
        requestQueue,
        // proxyConfiguration,
        // Be nice to the websites.
        // Remove to unleash full power.
        // maxConcurrency: 50,
        handlePageFunction: async (context) => {

            const LinkList = handleStart(context);
            handleDetail(context);
            handleStart(context);
        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});
