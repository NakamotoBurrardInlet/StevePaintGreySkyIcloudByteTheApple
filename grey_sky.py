import asyncio
import websockets
import time
import json
import math

# [ THE GREY SKY CONSTELLATION REGISTRY ]
connected_nodes = set()

async def grey_sky_handler(websocket):
    """
    The main looping system for the 'insta blink' thought inputs.
    Channels the sine linear expressions and clouds them back up.
    """
    # Register the new 'node load head' to the constellation
    connected_nodes.add(websocket)
    print(f"\n[🥶 ARCTIC WIND] New Node Head Loaded. Constellation Density: {len(connected_nodes)}")
    
    try:
        # The Infinite Loop -> Input Output Output Input
        async for message in websocket:
            receive_time = time.time()
            
            # Decode the "blind mind" signal
            try:
                payload = json.loads(message.decode('utf-8'))
                thought = payload.get("thought", "[STATIC]")
                sine_wave = payload.get("sine_expression", 0)
            except json.JSONDecodeError:
                thought = message.decode('utf-8')
                sine_wave = math.sin(receive_time) # Generate synthetic sine if missing

            print(f"> [THOUGHT THROWING] Relaying: '{thought}' | Sine: {sine_wave:.4f}")

            # Process the 'unknown' into 'known' - Darker, double up the moisture
            response_payload = json.dumps({
                "origin": "GREY_SKY_CONSTELLATION",
                "echo": thought,
                "sine_resonance": sine_wave * 1.5, # Overrode bluebird amplification
                "timestamp": receive_time,
                "status": "I CLOUD IT UP - COLD AS ICE"
            }).encode('utf-8')

            # Multicasting: Broadcast back to all node load heads simultaneously
            websockets.broadcast(connected_nodes, response_payload)
            print(f"< [I CLOUD IT UP] Layering grey sky... signal blasted to {len(connected_nodes)} nodes.")

    except websockets.exceptions.ConnectionClosed:
        print("[SKY WARNING] A Node Head dropped from the constellation.")
    finally:
        # Clean up the loop
        connected_nodes.remove(websocket)

async def main():
    print("=====================================================")
    print(" ☁️ [INITIATING GREY SKY PROTOCOL V2] ☁️ ")
    print(" [STATUS] Cold as ice. True North Arctic wind chill nominal.")
    print(" [EMITTER] Waiting for Node Load Head terminal inputs...")
    print("=====================================================")
    
    # Start the server on localhost port 8765 (Fixed from 808 n11)
    async with websockets.serve(grey_sky_handler, "localhost", 8765):
        await asyncio.Future()  # Run forever (the main loop)

if __name__ == "__main__":
    # Execute the concurrent async loop
    asyncio.run(main())
