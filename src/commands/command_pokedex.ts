import { State } from "src/state";

export async function commandPokedex(state: State) {
    const entries = Object.entries(state.pokedex);
    if (entries.length === 0) {
        console.log("You didn't catch any Pokemon yet");
        return;
    }
    console.log("Your Pokedex:")
    for (const [name, details] of entries) {
        console.log(`- ${details.name}`);
    }

}