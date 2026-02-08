import { State } from "src/state";

export async function commandCatch(state: State, ...args: string[]) {
    const name = args[0]?.toLowerCase();
    if (!name) {
        console.log("Please provide a Pokemon name.");
        return;
    }

    console.log(`Throwing a Pokeball at ${args[0]}...`);
    try {
         const result = await state.pokeAPI.fetchPokemonDetails(name);
        if (!result.ok) {
            if (result.error.kind === "not_found") {
                console.log(`Pokemon "${name}" not found.`);
            } else {
                console.log(`Error fetching Pokemon: ${result.error.message}`);
            }
            return;
        }
        const pokemon = result.data;

        const chance = 1 - pokemon.base_experience / 300;
        if (Math.random() <= chance) {
            console.log(`${pokemon.name} escaped!`);
        } else {
            
            state.pokedex[pokemon.name] = pokemon;
            console.log(`${pokemon.name} was caught!`);
            console.log("You may now inspect it with the inspect command.")
        }
    } catch (err) {
        console.log("Error fetching locations:", err);
    }
}