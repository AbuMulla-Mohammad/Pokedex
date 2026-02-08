import { State } from "src/state";

export async function commandInspect(state: State, ...args: string[]) {
     const name = args[0]?.toLowerCase();
    if (!name) {
        console.log("Please provide a Pokemon name.");
        return;
    }

    const pokemon = state.pokedex[name];
    if (!pokemon) {
        console.log("You have not caught that Pokemon.");
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    for (const [name, value] of Object.entries(pokemon.stats)) {
        console.log(`  -${name}: ${value}`);
    }
    console.log("Types:");
    for (const type of pokemon.types) {
        console.log(`  - ${type}`);
    }
}