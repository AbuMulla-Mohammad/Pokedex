import { State } from "src/state";

export async function commandMapb(state: State) {
    if (!state.prevLocationsURL) {
        console.log("No previous locations page.");
        return;
    }
    try {
        const result = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
        if (!result.ok) {
            if (result.error.kind == "not_found") {
                console.log("No locations found.");
            } else {
                console.log(`Error fetching locations: ${result.error.message}`);
            }
            return
        }
        const data = result.data;
        if (data.results.length === 0) {
            console.log("No locations found.");
        } else {
            for (const item of data.results) {
                console.log(item.name);
            }
        }
        state.nextLocationsURL = data.next ?? undefined;
        state.prevLocationsURL = data.previous ?? undefined;
    } catch (err) {
        console.log("Error fetching locations:", err);
    }
}