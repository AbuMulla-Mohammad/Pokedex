import { createInterface, Interface } from "node:readline";
import { getCommands } from "./commands/registry.js";
import { PokeAPI  } from "./services/pokeapi.js";
import { PokemonDetails } from "./services/types.js";


export type State = {
    rl: Interface,
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI,
    pokedex: Record<string, PokemonDetails>,
    nextLocationsURL?: string,
    prevLocationsURL?: string
     
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State,...args:string[]) => Promise<void>;
}

export function initState(): State{
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const commands = getCommands();
    const pokeAPI = new PokeAPI();
    const pokedex:Record<string, PokemonDetails> = {};
    return {
        rl,
        commands,
        pokeAPI,
        pokedex
    }
}