import { Endpoints } from './endpoints.js';
import type { AES, AESFormat, AllCosmetics, AllNews, AnyData, AnyEndpointOptions, AnyStatsOptions, BRCosmetic, Banner, BannerColor, BaseStatOptions, Bean, CarCosmetic, ClientOptions, CosmeticSearchOptions, CosmeticsOptions, CreatorCode, FortniteMap, GameMode, Input, InstrumentCosmetic, LEGOCosmetic, LEGOKit, Language, NewCosmeticsData, News, NewsOptions, Playlist, PlaylistOptions, Raw, RawFortniteAPIError, Shop, Stats, StringRecord, TrackCosmetic } from './types.js';

export * from './types.js';
export { Endpoints } from './endpoints.js';

/**
 * An error thrown when Fortnite-API responds with a non-200 status
 */
export class FortniteAPIError extends Error {
	/**
	 * The error's status code
	 */
	code: number;
	/**
	 * The URL which threw the error
	 */
	route: string;
	constructor(error: RawFortniteAPIError, route: string) {
		super(error.error);
		this.name = 'FortniteAPIError';
		this.code = error.status;
		this.route = route;
	}
}

/**
 * A class whose methods fetch data from Fortnite-API
 */
export class Client {
	/**
	 * The API key to use when calling Client#stats()
	 */
	key: string | null;
	/**
	 * The default language to use for all applicable methods
	 */
	language: Language;
	constructor(options: ClientOptions = {}) {
		this.key = options.key ?? null;
		this.language = options.language ?? 'en';
	}

	private route(endpoint: string, params: AnyEndpointOptions | StringRecord = {}, hasArray = false) {
		if (!hasArray) {
			return `${endpoint}?${new URLSearchParams(Object.entries(params))}`;
		}
		return Object.keys(params).length === 0
			? endpoint
			: `${endpoint}?${Object.entries(params).map(([key, value]) => Array.isArray(value) ? value.map(v => `${key}=${v}`).join('&') : `${key}=${value}`).join('&')}`;
	}
	private async fetch<Data extends AnyData>(route: string, authorization = false) {
		const res = await fetch(route, authorization && this.key !== null ? { headers: { Authorization: this.key } } : undefined).then(r => r.json()) as Raw<Data> | RawFortniteAPIError;
		if ('error' in res) throw new FortniteAPIError(res, route);
		return res.data;
	}

	/**
	 * Fetches the current AES key.
	 *
	 * @param keyFormat - The AES key's format
	 * @returns Information about the current AES key
	 */
	aes(keyFormat: AESFormat = 'hex') {
		return this.fetch<AES>(this.route(Endpoints.AES, { keyFormat }));
	}

	/**
	 * Fetches all banners.
	 *
	 * @param language - The language for the returned data
	 * @returns An array of every banner
	 */
	banners(language: Language = this.language) {
		return this.fetch<Banner[]>(this.route(Endpoints.Banners, { language }));
	}
	/**
	 * Fetches all banner colors.
	 *
	 * @returns An array of every banner color
	 */
	bannerColors() {
		return this.fetch<BannerColor[]>(this.route(Endpoints.BannerColors));
	}

	/**
	 * Fetches all recently-released cosmetics.
	 *
	 * @param options - Options for fetching cosmetics
	 * @returns An array of recently-released cosmetics
	 */
	cosmetics(options: CosmeticsOptions & { cosmeticType: 'new' }): Promise<NewCosmeticsData>;
	/**
	 * Fetches all jam tracks.
	 *
	 * @param options - Options for fetching cosmetics
	 * @returns An array of jam tracks
	 */
	cosmetics(options: CosmeticsOptions & { cosmeticType: 'tracks' }): Promise<TrackCosmetic[]>;
	/**
	 * Fetches all cars.
	 *
	 * @param options - Options for fetching cosmetics
	 * @returns An array of cars
	 */
	cosmetics(options: CosmeticsOptions & { cosmeticType: 'cars' }): Promise<CarCosmetic[]>;
	/**
	 * Fetches all instruments.
	 *
	 * @param options - Options for fetching cosmetics
	 * @returns An array of instruments
	 */
	cosmetics(options: CosmeticsOptions & { cosmeticType: 'instruments' }): Promise<InstrumentCosmetic[]>;
	/**
	 * Fetches all LEGO cosmetics.
	 *
	 * @param options - Options for fetching cosmetics
	 * @returns An array of LEGO cosmetics
	 */
	cosmetics(options: CosmeticsOptions & { cosmeticType: 'lego' }): Promise<LEGOCosmetic[]>;
	/**
	 * Fetches all LEGO cosmetics.
	 *
	 * @param options - Options for fetching cosmetics
	 * @returns An array of LEGO cosmetics
	 */
	cosmetics(options: CosmeticsOptions & { cosmeticType: 'beans' }): Promise<Bean[]>;
	/**
	 * Fetches all cosmetics.
	 *
	 * @param options - Options for fetching cosmetics
	 * @returns An object with mapped by each type of cosmetic
	 */
	cosmetics(options?: CosmeticsOptions): Promise<AllCosmetics>;
	cosmetics(options: CosmeticsOptions = {}) {
		const params = { language: options.language ?? this.language };
		switch (options.cosmeticType) {
			case 'new': {
				return this.fetch<NewCosmeticsData>(this.route(Endpoints.NewCosmetics, params));
			}
			case 'br': {
				return this.fetch<BRCosmetic[]>(this.route(Endpoints.BRCosmetics, params));
			}
			case 'tracks': {
				return this.fetch<TrackCosmetic[]>(this.route(Endpoints.Tracks, params));
			}
			case 'cars': {
				return this.fetch<CarCosmetic[]>(this.route(Endpoints.Cars, params));
			}
			case 'instruments': {
				return this.fetch<InstrumentCosmetic[]>(this.route(Endpoints.Instruments, params));
			}
			case 'lego': {
				return this.fetch<LEGOCosmetic[]>(this.route(Endpoints.LEGO, params));
			}
			case 'legoKits': {
				return this.fetch<LEGOKit[]>(this.route(Endpoints.LEGOKits, params));
			}
			case 'beans': {
				return this.fetch<Bean[]>(this.route(Endpoints.Beans, params));
			}
			default: {
				return this.fetch<AllCosmetics>(this.route(Endpoints.AllCosmetics, params));
			}
		}
	}

	/**
	 * Finds the first BR cosmetic that matches provided search parameters.
	 *
	 * @param options - Options for finding a BR cosmetic
	 * @returns A BR cosmetic that matches the search parameters
	 */
	brCosmeticsSearch(options: CosmeticSearchOptions<'single'>) {
		const language = options.language ?? this.language;
		return this.fetch<BRCosmetic>(
			options.id === undefined
				? this.route(Endpoints.BRCosmeticSearch, { ...options, language })
				: this.route(Endpoints.BRCosmeticById.replace('{cosmetic-id}', options.id), { language })
		);
	}
	/**
	 * Finds all BR cosmetics that match provided search parameters.
	 *
	 * @param options - Options for finding BR cosmetics
	 * @returns All BR cosmetics that match the search parameters
	 */
	brCosmeticsSearchAll(options: CosmeticSearchOptions<'multiple'>) {
		const language = options.language ?? this.language;
		return this.fetch<BRCosmetic[]>(
			options.id === undefined
				? this.route(Endpoints.BRCosmeticsSearchAll, { ...options, language })
				: this.route(`${Endpoints.BRCosmeticsSearchByIds}`, { id: options.id, language }, true)
		);
	}

	/**
	 * Fetches information about a creator code.
	 *
	 * @param name - The creator code's name
	 * @returns Information about the creator code
	 */
	creatorCode(name: string) {
		return this.fetch<CreatorCode>(this.route(Endpoints.CreatorCode, { name }));
	}

	/**
	 * Fetches information about the current Battle Royale map.
	 *
	 * @param language - The language for the returned data
	 * @returns Information about the current map
	 */
	map(language: Language = this.language) {
		return this.fetch<FortniteMap>(this.route(Endpoints.Map, { language }));
	}

	/**
	 * Fetches a specific mode's news.
	 *
	 * @param options - Options for fetching the news
	 * @returns The provided mode's news
	 */
	news(options: NewsOptions & { mode: GameMode }): Promise<News>;
	/**
	 * Fetches every mode's news.
	 *
	 * @param options - Options for fetching the news
	 * @returns All modes' news
	 */
	news(options?: NewsOptions): Promise<AllNews>;
	news(options: NewsOptions = {}) {
		const params = { language: options.language ?? this.language };
		return options.mode === undefined
			? this.fetch<AllNews>(this.route(Endpoints.News, params))
			: this.fetch<News>(this.route({
				br: Endpoints.BRNews,
				stw: Endpoints.STWNews,
				creative: Endpoints.CreativeNews
			}[options.mode], params));
	}

	/**
	 * Fetches a playlist by its id.
	 *
	 * @param options - Options for fetching a playlist
	 * @returns The playlist with the provided id
	 */
	playlists(options: PlaylistOptions & { id: string }): Promise<Playlist>;
	/**
	 * Fetches all playlists.
	 *
	 * @param options - Options for fetching all playlists
	 * @returns An array of all playlists
	 */
	playlists(options?: PlaylistOptions): Promise<Playlist[]>;
	playlists(options: PlaylistOptions = {}) {
		const params = { language: options.language ?? this.language };
		return options.id === undefined
			? this.fetch<Playlist[]>(this.route(Endpoints.Playlists, params))
			: this.fetch<Playlist>(this.route(Endpoints.PlaylistById.replace('{playlist-id}', options.id), params));
	}

	/**
	 * Fetches the current item shop.
	 *
	 * @param language - The language for the returned data
	 * @returns The item shop
	 */
	shop(language: Language = this.language) {
		return this.fetch<Shop>(this.route(Endpoints.Shop, { language }));
	}

	stats(options: AnyStatsOptions & { image: Input }): Promise<Stats<true>>;
	stats(options?: AnyStatsOptions): Promise<Stats<false>>;
	/**
	 * Fetches a user's stats by name or id.
	 *
	 * @param options - Options for fetching stats
	 * @returns The user's stats
	 */
	stats(options: AnyStatsOptions) {
		if (this.key === null) throw new TypeError('Client#stats() requires an authorization key passed into the Client constructor options. You may request one at https://dash.fortnite-api.com/account');

		const hasName = 'name' in options;
		const hasId = 'id' in options;
		if (!hasName && !hasId) throw new TypeError('Neither the "name" nor the "id" property of the Client#stats() argument were provided');
		else if (hasName && hasId) throw new TypeError('The "name" and "id" properties of the Client#stats() argument are mutually exclusive');
		else if (hasId && 'accountType' in options) throw new TypeError('The "id" and "accountType" properties of the Client#stats() argument are mutually exclusive');

		let route: string;
		if (hasName) {
			route = this.route(Endpoints.BRStats, options);
		}
		else {
			const params: BaseStatOptions = {};
			if (options.timeWindow !== undefined) params.timeWindow = options.timeWindow;
			if (options.image !== undefined) params.image = options.image;
			route = this.route(Endpoints.BRStatsByAccountId.replace('{accountId}', options.id), params);
		}

		return this.fetch<Stats<boolean>>(route, true);
	}
}