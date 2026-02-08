import { State } from "src/state";

export async function commandExit(state:State):Promise<void>{
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();
   process.exit(0);
}
