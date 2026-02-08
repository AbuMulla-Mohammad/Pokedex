
export type ShallowLocations = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Location[]
}
export type Location = {
    name: string,
    url: string,
}
export type Pokemon = {
    name: string;
    base_experience: number;
}
export type PokemonDetails = {
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    stats: PokemonStats;
    types: string[];
}
export type PokemonStats = {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
}

export type ApiErrorKind = "not_found" | "network" | "http" | "parsing";
export type ApiError = {
    kind: ApiErrorKind;
    message: string;
    status?: number;
};
export type ApiResult<T>={ ok: true; data: T } | { ok: false; error: ApiError };