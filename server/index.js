const puppeteer = require('puppeteer')


const scrape = async () => {
// This is the site to scrape flow data
let siteurl = 'https://waterdata.usgs.gov/nwis/uv?cb_00060=on&cb_00065=on&format=html&site_no=01168500&period=&begin_date=2021-04-24&end_date=2021-05-01'

const browser = await puppeteer.launch({headless: true,defaultviewport: null, args: [
    '--no-sandbox',
    '--ignore-certificate-errors',
    '--single-process',
    '--incognito',
    '--no-zygote',
]});

let page = await browser.newPage();

await page.goto(siteurl, {waituntil: 'networkidle2'});
// this is where you are pulling data from the webpage, could grab screnshots, etc.
let data = await page.evaluate(async () => {
    let flowData = await document.querySelector("body > table.tablesorter.dataListWithSuperscript.tablesorter-jui.ui-widget.ui-widget-content.ui-corner-all.hasStickyHeaders.hasFilters > tbody > tr:nth-child(711)").innerText ;
    return flowData
})

console.log(data)

}

console.log(scrape())