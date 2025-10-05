const puppeteer = require('puppeteer');

async function fillFormRPA(targetUrl, formData) {
    const browser = await puppeteer.launch({ 
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
        headless: true 
    }); 
    const page = await browser.newPage();
    
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 }); 

    // मुख्य RPA लॉजिक: यहाँ फ़ॉर्म भरता है
    for (const key in formData) {
        const value = formData[key];
        
        // फ़ॉर्म फ़ील्ड की ID या Name वही होनी चाहिए जो JSON की 'key' है (जैसे name, age)
        const selector = `#${key}, [name="${key}"]`; 
        
        const element = await page.$(selector);
        if (element) {
             await element.type(value, { delay: 50 }); 
        } else {
             console.warn(`Field not found: ${key}`);
             // आप यहाँ एक एरर वापस भेज सकते हैं
        }
    }

    // यहाँ फ़ॉर्म सबमिट करने का लॉजिक जोड़ें (जैसे: await page.click('button[type="submit"]');)

    await page.waitForTimeout(3000); 

    await browser.close();
    
    return { status: 'RPA process completed on browser.' };
}

module.exports = fillFormRPA;
