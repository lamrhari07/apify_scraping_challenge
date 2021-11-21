const Apify = require('apify');

const { utils: { log } } = Apify;

exports.handleStart = async ({ request, $ }) => {
    // Handle Start URLs
    const links = [];

    const MainNavList = $('nav.nav-main.clearfix').find('ul.nav-list-main.is-level-1').eq(1)

    const NavLevelTwo = MainNavList.find('li.nav-item-main.is-level-2').find('span')
    const NavLevelThree = MainNavList.find('li.nav-item-main.is-level-3').find('span')

    NavLevelTwo.map((i, v) => {
        const link = $(v).attr('data-link')
        if (!links.includes(link)) {
            links.push(link)
        }
    })

    NavLevelThree.map((i, v) => {
        const link = $(v).attr('data-link')
        if (!links.includes(link)) {
            links.push(link)
        }
    })

    return links
};

exports.handleList = async ({ request, $ }) => {
    // Handle pagination
};

exports.handleDetail = async ({ request, $ }) => {
    // Handle details

    const products = [];

    const MainProductList = $('div.fl-result').find('ul.product-list.clearfix').find('li.js-init')


    log.info(console.log(MainProductList));
};
