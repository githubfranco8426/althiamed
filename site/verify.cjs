const { chromium } = require('C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({headless:true,channel:'msedge'});
 const page = await browser.newPage();
 const errors=[];page.on('pageerror', e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173');
 await page.evaluate(()=>document.fonts.ready);
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${width}`);
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:'desktop-preview.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'mobile-preview.png',fullPage:true});
 await page.locator('.menu-toggle').click();
 assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');
 assert(await page.locator('#mobile-nav').isHidden());
 await page.locator('.faq-list summary').first().click();
  assert(await page.locator('.faq-list details').first().getAttribute('open') !== null);
 await page.locator('.team-carousel [data-carousel-next]').click();
 assert.equal(await page.locator('[data-carousel-dot="1"]').getAttribute('aria-selected'),'true');
 await page.locator('.team-carousel').press('ArrowRight');
 assert.equal(await page.locator('[data-carousel-dot="2"]').getAttribute('aria-selected'),'true');
 await page.locator('[data-carousel-dot="0"]').click();
 assert.equal(await page.locator('[data-carousel-dot="0"]').getAttribute('aria-selected'),'true');
 assert.equal(await page.locator('.team-slide').first().getAttribute('aria-hidden'),'false');
 await page.locator('#privacy-link').click();
 assert(await page.locator('#privacidad details').getAttribute('open') !== null);
 const wa = new URL(await page.locator('[data-location="hero"]').getAttribute('href'));
 assert.equal(wa.hostname,'wa.me');assert.equal(wa.pathname,'/56983841630');
 assert.equal(wa.searchParams.get('text'),'Hola, quiero agendar una hora médica en Althia Med.');
 // Cancel outbound navigation after allowing the delegated tracking handler to run.
 await page.evaluate(()=>window.addEventListener('click',event=>event.preventDefault()));
 for(const selector of ['[data-location="hero"]','[data-service="medicina-general"]','[data-event="call_click"]','[data-event="map_click"]']) await page.locator(selector).click();
 let events=await page.evaluate(()=>window.dataLayer);
 for(const name of ['page_view','whatsapp_click','specialty_click','call_click','map_click']) assert(events.some(e=>e.event===name),name);
 assert.equal(await page.locator('iframe').count(),0);
 await page.route('https://maps.google.com/**', route=>route.fulfill({body:'Map integration test',contentType:'text/html'}));
 await page.locator('#load-map').click();
 assert.equal(await page.locator('iframe').count(),1);
 assert((await page.locator('iframe').getAttribute('src')).includes('output=embed'));
 for(const [channel,text] of [['instagram','Instagram'],['google','Google'],['pendon','pendón'],['medicina_general','campaña de Medicina General'],['invalid','Hola, quiero agendar']]){
  await page.goto('http://127.0.0.1:4173/?canal='+channel);
  assert(new URL(await page.locator('[data-location="hero"]').getAttribute('href')).searchParams.get('text').includes(text));
 }
 await page.goto('http://127.0.0.1:4173/?utm_source=instagram&utm_campaign=medicina_general');
 assert.equal(await page.evaluate(()=>dataLayer[0].channel),'medicina_general');
 assert.deepEqual(errors,[]);
 await page.context().setOffline(true);
 // All core contact URLs are present in HTML even if JavaScript is unavailable.
 const nojs=await browser.newContext({javaScriptEnabled:false});
 const fallback=await nojs.newPage();await fallback.goto('http://127.0.0.1:4173');
 assert((await fallback.locator('[data-location="hero"]').getAttribute('href')).includes('wa.me/56983841630?text='));
 console.log(JSON.stringify({passed:true,widths:[320,390,768,1440],events:events.map(e=>e.event),channelLinks:6,consoleErrors:errors},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
