const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'http://localhost:3000';
const OUT_DIR = './docs/screenshots';

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Helper to wait for a certain time
const delay = ms => new Promise(res => setTimeout(res, ms));

async function takeScreenshots() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log("Waiting for backend services to stabilize...");
    await delay(3000);

    // 1. LOGIN PAGE
    console.log("Taking Home/Login screenshot...");
    try {
        await page.goto(`${URL}/login`, { waitUntil: 'networkidle2' });
        await delay(3000); // Wait for background
        await page.screenshot({ path: `${OUT_DIR}/login.png` });
    } catch (err) { console.error("Error capturing login:", err.message); }

    // 2. SIGNUP PAGE
    console.log("Taking Signup screenshot...");
    try {
        await page.goto(`${URL}/signup`, { waitUntil: 'networkidle2' });
        await delay(3000); // Wait for background
        await page.screenshot({ path: `${OUT_DIR}/signup.png` });
    } catch (err) { console.error("Error capturing signup:", err.message); }

    // 3. LOGIN AND DASHBOARD
    console.log("Logging in with provided credentials...");
    try {
        await page.goto(`${URL}/login`, { waitUntil: 'networkidle2' });
        await delay(2000);
        // Fill login form
        await page.type('input[type="email"]', 'p3@gmail.com');
        await page.type('input[type="password"]', '123456');
        await page.click('button[type="submit"]');

        await delay(2000);
        // Fallback: If login failed, register the user
        if (page.url().includes('login')) {
            console.log("Login failed, attempting to register p3@gmail.com instead...");
            await page.goto(`${URL}/signup`, { waitUntil: 'networkidle2' });
            await delay(2000);
            await page.type('input[type="text"]', `Test User P3`);
            await page.type('input[type="email"]', 'p3@gmail.com');
            await page.type('input[type="password"]', '123456');
            await page.click('button[type="submit"]');
        }

        // Wait for the redirect and boot sequence
        console.log("Waiting for Dashboard boot sequence (12s)...");
        await delay(12000);
        await page.screenshot({ path: `${OUT_DIR}/dashboard.png` });
    } catch (err) { console.error("Error capturing dashboard:", err.message); }

    // 4. NOTES APP
    console.log("Taking Notes App screenshot...");
    try {
        await page.goto(`${URL}/notes`, { waitUntil: 'networkidle2' });
        await delay(3000);
        await page.screenshot({ path: `${OUT_DIR}/notes.png` });
    } catch (err) { console.error("Error capturing notes app:", err.message); }

    // 5. HACKER TYPE APP
    console.log("Taking Hacker Type screenshot...");
    try {
        await page.goto(`${URL}/type`, { waitUntil: 'networkidle2' });
        await delay(3000);
        await page.screenshot({ path: `${OUT_DIR}/hackertype.png` });
    } catch (err) { console.error("Error capturing hacker type:", err.message); }

    // 6. PROMETHEUS
    console.log("Taking Prometheus screenshot...");
    try {
        await page.goto('http://localhost:30000', { waitUntil: 'networkidle2', timeout: 10000 });
        await delay(3000);
        await page.screenshot({ path: `${OUT_DIR}/prometheus.png` });
    } catch (err) { console.error("Error capturing prometheus:", err.message); }

    // 7. GRAFANA
    console.log("Taking Grafana screenshot...");
    try {
        await page.goto('http://localhost:32000', { waitUntil: 'networkidle2', timeout: 10000 });
        await delay(3000);
        // Grafana has its own login, let's just grab the login page or whatever is accessible
        await page.screenshot({ path: `${OUT_DIR}/grafana.png` });
    } catch (err) { console.error("Error capturing grafana:", err.message); }

    // 8. JENKINS
    console.log("Taking Jenkins screenshot...");
    try {
        await page.goto('http://localhost:8081', { waitUntil: 'networkidle2', timeout: 10000 });
        await delay(3000);

        // Attempt Login
        try {
            const usernameInput = await page.$('input[name="j_username"]');
            if (usernameInput) {
                console.log("Found Jenkins login, logging in...");
                await page.type('input[name="j_username"]', 'azureuser');
                await page.type('input[name="j_password"]', 'admin');
                await page.click('button[name="Submit"]');
                await delay(5000); // Wait for Jenkins dashboard to load
            }
        } catch (e) {
            console.log("Jenkins login form not found or error:", e.message);
        }

        await page.screenshot({ path: `${OUT_DIR}/jenkins.png` });
    } catch (err) { console.error("Error capturing jenkins:", err.message); }

    console.log("Screenshots captured successfully.");
    await browser.close();
}

takeScreenshots().catch(console.error);
