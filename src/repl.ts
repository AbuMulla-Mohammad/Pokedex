
import { State } from "./state.js";

export async function startREPL(state:State) {
    const {rl,commands} = state;
    rl.prompt();
    rl.on("line", async (line) => {
        line = line.trim().toLowerCase();

        if (line === "") {
            rl.prompt();
            return;
        }
        const [cmdName, ...args] = line.split(/\s+/);
        const command=commands[cmdName];
        
        if (!command) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }
        try {
            await command.callback(state,...args);
        } catch (error) {
            console.error("An error occurred while executing the command:", error);
        }
        rl.prompt();
    });
 }

