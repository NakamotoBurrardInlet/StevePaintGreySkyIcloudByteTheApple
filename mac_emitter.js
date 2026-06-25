const WebSocket = require('ws');
const readline = require('readline');

// Terminal Color Tripping (ANSI Escape Codes)
const GREEN_CORE = '\x1b[32m';
const GREY_SKY = '\x1b[90m';
const BLUEBIRD = '\x1b[34m';
const ICE_WHITE = '\x1b[37m';
const RESET = '\x1b[0m';

const WS_URL = 'ws://localhost:8765';
let ws; 

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(GREEN_CORE + "=====================================================");
console.log(" 🍏 [BOOTING HEAVY EMITTER MACINTOSH APPLE SEQUENCE] ");
console.log(" 🧠 [NODE HEAD LOAD: INTELLIGENT SEQUENCER INITIALIZING...] ");
console.log("=====================================================" + RESET);

let reconnectAttempts = 0;

function connectGreySky() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(GREY_SKY + `[SYSTEM] Scanning frequency... Channeling ${WS_URL}...` + RESET);
    
    ws = new WebSocket(WS_URL);

    ws.on('open', function open() {
        reconnectAttempts = 0; // Reset regenerator
        console.log(BLUEBIRD + "\n[SYSTEM] ++ OVERRODE BLUEBIRD: CONSTELLATION LINK ESTABLISHED ++" + RESET);
        console.log(GREY_SKY + "[SYSTEM] Connected to the Grey Sky. 'I Cloud it up' sequence active." + RESET);
        console.log(ICE_WHITE + "[SYSTEM] Throw your blind mind thought below:\n" + RESET);
        terminal.prompt();
    });

    ws.on('message', function incoming(data) {
        const decodedSignal = JSON.parse(data.toString('utf-8'));
        
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        
        // Output to input - relaying the echo back to the brain
        console.log(GREY_SKY + `\n☁️ [OMEGA SKY SIGNAL]: ${decodedSignal.echo}` + RESET);
        console.log(ICE_WHITE + `❄️ [RESONANCE]: Sine linear bounce at ${decodedSignal.sine_resonance.toFixed(4)}` + RESET);
        console.log(GREEN_CORE + `🍏 [STATUS]: ${decodedSignal.status}\n` + RESET);
        terminal.prompt();
    });

    ws.on('error', function error(err) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        if (err.code === 'ECONNREFUSED') {
            console.log(GREY_SKY + "[SKY WARNING] Horizon offline. Waiting for the Grey Sky." + RESET);
        } else {
            console.log(ICE_WHITE + `[SKY ERROR] Synapse blind mind disruption: ${err.message}` + RESET);
        }
    });

    ws.on('close', function close() {
        console.log(GREY_SKY + '\n[SYSTEM] Connection severed from the constellation.' + RESET);
        
        // Super light speed regenerator with exponential backoff (max 5 seconds)
        reconnectAttempts++;
        const backoff = Math.min(1000 * reconnectAttempts, 5000);
        console.log(BLUEBIRD + `[SYSTEM] Node Head Regenerator looping in ${backoff/1000}s...` + RESET);
        
        setTimeout(connectGreySky, backoff);
    });
}

// Continuous input/output brain loop
terminal.on('line', (line) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        // Calculate the pro signaling channeling sine linear expression
        const sineLinear = Math.sin(Date.now() / 1000); 

        const payload = JSON.stringify({
            thought: line,
            sine_expression: sineLinear,
            node_id: "MACINTOSH_APPLE_CORE_1"
        });

        ws.send(Buffer.from(payload, 'utf-8'));
    } else {
        console.log(GREY_SKY + "[WARNING] Blind mind blocked. Grey Sky connection is currently offline." + RESET);
    }
    terminal.prompt();
});

// Boot the sequence
connectGreySky();

