const { chromium } = require("playwright");
const path = require("path");
const pdfkit = require("pdfkit");
const fs = require("fs");

async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms)); 
}

/**
 * 截取指定页的图
 * @param {Frame} frame 
 * @param {int} pageIndex 
 */
async function captureScreen(frame, pageIndex)
{
    console.log(`captureScreen(${pageIndex})`)
    let id = `#view` + (pageIndex-1);
    let filename = path.join(__dirname , `/images/view${pageIndex}.png`)
    await frame.locator(id).screenshot({ path: filename  });
}

/**
 * 下一页，一定是完整地显示画面所有内容
 * @param {Frame} frame playwright Frame对象
 * @param {int} index 需要到的页面索引
 */
async function nextPage(frame, index, total)
{
    console.log(`nextPage(${index}, ${total})`)
    let currIndex = Number(await frame.innerText('#PageIndex')); 
    // 翻到指定页的后一页
    while (currIndex <= index && currIndex < total) {
        await frame.click('.btmRight');
        frame.waitForSelector(`#view${currIndex-1}:visible`);
        currIndex = Number(await frame.innerText('#PageIndex')); 
        console.log(`翻到了第${currIndex}页，多次打印，就是此页有动画`) 
    }
    if (index < total) {
        // 再翻回前一页，这样才能拿到完整的页面
        await frame.click('.btmLeft');
        frame.waitForSelector(`#view${index-1}:visible`);
    } else {
        // 最后一页多点击几次
        for(let i =0; i<4; i++) {
            await frame.click('.btmRight');
            frame.waitForSelector(`#view${currIndex-1}:visible`);
        }
    }
}


/**
 * 图片写入PDF
 * @param {int} total 图片页数
 */
async function writePdf(name, total) 
{
    let pdf = new pdfkit({ autoFirstPage: false });
    let filename = path.join(__dirname , `/pdf/${name}.pdf`);
    pdf.pipe(fs.createWriteStream(filename));

    for(let i=1; i<=total; i++) {
        img =  pdf.openImage(path.join(__dirname , `/images/view${i}.png`)) 
        pdf.addPage({ size: [ img.width, img.height ] })
        pdf.image(img, 0, 0)
    }
    pdf.end();
}

(async() => {
    const browser = await chromium.launch({
        // proxy: {
        //     server: ''
        // }
    }); 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://max.book118.com/html/2018/1203/5132020314001333.shtm');
    await page.waitForSelector('#btn_preview_remain');
    await page.click('#btn_preview_remain'); 
    await page.waitForSelector('.preview-iframe');
    const elementHandle = await page.$('.preview-iframe');
    const frame = await elementHandle.contentFrame();

    await frame.waitForSelector('#PageIndex');
    await frame.waitForSelector('#PageCount');
    let pageIndex = Number(await frame.innerText('#PageIndex')); 
    let pageCount = Number(await frame.innerText('#PageCount')); 
    console.log("抓取开始！！！");
    for(let i = pageIndex; i<=pageCount; i++) {
        console.log(`开始抓取第${i}页`);
        await nextPage(frame, i, pageCount);
        await captureScreen(frame, i);
        console.log(`结束抓取第${i}页`);
    }

    writePdf("茶艺基础知识学习课件", pageCount);

    await browser.close();
})().catch(error => console.log(error));