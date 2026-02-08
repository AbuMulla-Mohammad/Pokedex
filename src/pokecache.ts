export type CacheEntry<T> = {
    createdAt: number,
    val:T
}
export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined=undefined;
    #interval: number;
    constructor(timestamp: number) {
        this.#interval = timestamp;
        this.#startReapLoop();
    }
    add<T>(key: string, val: T) {
        this.#cache.set(key, { createdAt: Date.now(), val });
    }
    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (!entry)
            return undefined;
        return entry.val as T;
    }
    #reap() {
        const now = Date.now();
        for (const [key, val] of this.#cache) {
            if (now - val.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
         if (this.#cache.size === 0) {
            this.stopReapLoop();
        }
        // for (const [key, val] of this.#cache) {
        //     if (val.createdAt[0] > (Date.now() - this.#interval))
        //         this.#cache.delete(key);
        // }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
        //TODO: review this code
        // const intervalId = setInterval(this.#reap, this.#interval);
        // this.#reapIntervalId = intervalId;
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}