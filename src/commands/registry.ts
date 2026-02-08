import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "../state.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands():Record<string,CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit
        },
        map: {
            name: "map",
            description: "Displays the location of a pokemon",
            callback:commandMap
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous batch of locations",
            callback:commandMapb
        },
        explore: {
            name: "explore",
            description: "Explores pokemons",
            callback:commandExplore
        },
        catch: {
            name: "catch",
            description: "this will try to catch a Pokemon ",
            callback:commandCatch
        },
        inspect: {
            name: "inspect",
            description: "inspects cought Pokemon",
            callback:commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "shows all cought Pokemons",
            callback:commandPokedex
        }
    }
}