import { State } from "src/state";

export async function commandExplore(state: State, ...args: string[]) {
    if (!args[0]) {
        console.log("Please provide an area name. Usage: explore <area>");
        return;
    }
    try {
        const result = await state.pokeAPI.fetchPokemonsForSpecificArea(args[0]);
        if (!result.ok) {
            if (result.error.kind === "not_found") {
                console.log(`Area "${args[0]}" not found.`);
            } else {
                console.log(`Error fetching area: ${result.error.message}`);
            }
            return;
        }
        if (result.data.length === 0) {
            console.log("No Pokemon found in this area.");
            return;
        }
        for (const item of result.data) {
            console.log(item);
        }
    } catch (err) {
        console.log("Error fetching locations:", err);
    }
}