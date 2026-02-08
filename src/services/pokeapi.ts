import { Cache } from "../pokecache.js";
import { ApiResult, Pokemon, PokemonDetails, PokemonStats, ShallowLocations } from "./types.js";


export class PokeAPI {
    private static readonly BASE_URL = "https://pokeapi.co/api/v2";
    private readonly cache = new Cache(3000);
    constructor() { }
    
    async fetchLocations(pageUrl?: string): Promise<ApiResult<ShallowLocations>> {
        const url = pageUrl || `${PokeAPI.BASE_URL}/location-area?offset=0&limit=20`;

        const cachedData = this.cache.get<ShallowLocations>(url);
            if (cachedData != undefined) {
                return {
                    ok: true,
                    data:cachedData,
                };

            }
        try {
            
            const response = await fetch(url);
            if (!response.ok) {
                return {
                    ok: false,
                    error: {
                        kind: response.status === 404 ? "not_found" : "http",
                        message: `HTTP ${response.status} ${response.statusText}`,
                        status:response.status
                    }
                }
            }
            const data = (await response.json()) as ShallowLocations;

            this.cache.add<ShallowLocations>(url, data);
            return {
                ok: true,
                data
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Network error";
            return {
                ok: false,
                error: {
                    kind: "network",
                    message
                }
            };
        }
    }
    async fetchLocation(locationName: string): Promise<ApiResult<Location>> {
        const url = `${PokeAPI.BASE_URL}/location-area/${locationName}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                return {
                    ok: false,
                    error: {
                        kind: response.status === 404 ? "not_found" : "http",
                        message: `HTTP ${response.status} ${response.statusText}`,
                        status: response.status
                    }
                }
            }
            const data = (await response.json()) as Location;
            return {
                ok: true,
                data
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Network error";
            return {
                ok: false,
                error: {
                    kind: "network",
                    message
                }
            };
        }
    }
    async fetchPokemonsForSpecificArea(loactionName: string): Promise<ApiResult<string[]>> {
        const url = `${PokeAPI.BASE_URL}/location-area/${loactionName}`;
        try {
            const cachedData = this.cache.get<string[]>(url);
            if (cachedData !== undefined) {
                return {
                    ok: true,
                    data: cachedData
                };

            }
            const response = await fetch(url);
            if (!response.ok) {
                return {
                    ok: false,
                    error: {
                        kind: response.status === 404 ? "not_found" : "http",
                        message: `HTTP ${response.status} ${response.statusText}`,
                        status: response.status
                    }
                };
            }
            const data = await response.json();

            if (!data?.pokemon_encounters) {
                return {
                    ok: true,
                    data:[]
                }
            };

            const pokemonNames = data.pokemon_encounters.map((p: any) => p.pokemon.name);

            this.cache.add<string[]>(url, pokemonNames);
            return {
                ok: true,
                data:pokemonNames
            };

        } catch (error) {
            const message = error instanceof Error ? error.message : "Network error";
            return {
                ok: false,
                error: {
                    kind: "network",
                    message
                }
            };
        }
    }
    async fetchPokemon(name: string): Promise<ApiResult<Pokemon>> {
        const url = `${PokeAPI.BASE_URL}/pokemon/${name}`;
        const cachedData = this.cache.get<Pokemon>(url);
        if (cachedData !== undefined) {
            return {
                ok: true,
                data: cachedData,
            };

        }
        try {
            const response = await fetch(url);
            if (!response.ok) {
                return {
                    ok: false,
                    error: {
                        kind: response.status === 404 ? "not_found" : "http",
                        message: `HTTP ${response.status} ${response.statusText}`,
                        status: response.status
                    }
                }
            }
            const data = (await response.json()) as Pokemon;

            this.cache.add<Pokemon>(url, data);
            return {
                ok: true,
                data
            };

        } catch (error) {
            const message = error instanceof Error ? error.message : "Network error";
            return {
                ok: false,
                error: {
                    kind: "network",
                    message
                }
            };
        }
    }
    async fetchPokemonDetails(name: string): Promise<ApiResult<PokemonDetails>> {
        const url = `${PokeAPI.BASE_URL}/pokemon/${name}`;
        const cachedData = this.cache.get<PokemonDetails>(url);
            if (cachedData !== undefined) {
                return {
                    ok: true,
                    data:cachedData
                }

            }
        try {
            
            const response = await fetch(url);
            if (!response.ok) {
                return {
                    ok: false,
                    error: {
                        kind: response.status === 404 ? "not_found" : "http",
                        message: `HTTP ${response.status} ${response.statusText}`,
                        status: response.status
                    }
                };
            }
            const data = await response.json();

            const stats = Object.fromEntries(
                data.stats.map((s: any) => [s.stat.name, s.base_stat])
            ) as PokemonStats;

            const pokemonDetails: PokemonDetails = {
                name: data.name,
                height: data.height,
                weight: data.weight,
                base_experience:data.base_experience,
                stats,
                types: data.types.map((t: any) => t.type.name),
            };

            this.cache.add<PokemonDetails>(url, pokemonDetails);
            return {
                ok: true,
                data:pokemonDetails
            };
        } catch (err) {
            const message = err instanceof Error ? err.message : "Network error";
            return {
                ok: false,
                error: {
                    kind: "network",
                    message
                }
            };
        }
    }
}


