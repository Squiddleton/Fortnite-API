import fetch from 'node-fetch';
import Endpoints from './endpoints.js';
import type { AES, AllCosmeticsOptions, AllNews, AnyData, AnyEndpointOptions, Banner, BannerColor, BaseStatOptions, ClientOptions, CombinedShop, Cosmetic, CosmeticSearchOptions, CreatorCode, IdStatsOptions, Language, Map, NameStatsOptions, NewCosmetics, News, NewsOptions, Playlist, PlaylistOptions, Shop, ShopOptions, Stats, StringRecord, Raw, RawFortniteAPIError } from './types.js';
export * from './types.js';
export { default as Endpoints } from './endpoints.js';

class FortniteAPIError extends Error {
	code: number;
	route: string;
	constructor(error: RawFortniteAPIError, route: string) {
		super(error.error);
		this.name = 'FortniteAPIError';
		this.code = error.status;
		this.route = route;
	}
}

export class Client {
	key: string | null;
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
		if (res.status !== 200) throw new FortniteAPIError(res, route);
		return res.data;
	}

	async aes(keyFormat: 'hex' | 'base64' = 'hex') {
		return this.fetch<AES>(this.route(Endpoints.AES, { keyFormat }));
	}

	async banners(language: Language = this.language) {
		return this.fetch<Banner[]>(this.route(Endpoints.Banners, { language }));
	}
	async bannerColors() {
		return this.fetch<BannerColor[]>(this.route(Endpoints.BannerColors));
	}

	async creatorCode(name: string) {
		return this.fetch<CreatorCode>(this.route(Endpoints.CreatorCode, { name }));
	}

	listCosmetics(options: AllCosmeticsOptions & { combined: true }): Promise<NewCosmetics>;
	listCosmetics(options?: AllCosmeticsOptions): Promise<Cosmetic[]>;
	async listCosmetics(options: AllCosmeticsOptions = {}) {
		const params = { language: options.language ?? this.language };
		return options.new
			? this.fetch<NewCosmetics>(this.route(Endpoints.NewCosmetics, params))
			: this.fetch<Cosmetic[]>(this.route(Endpoints.CosmeticsList, params));
	}
	async findCosmetic(options: CosmeticSearchOptions<'single'>) {
		const language = options.language ?? this.language;
		return this.fetch<Cosmetic>(
			options.id === undefined
				? this.route(Endpoints.CosmeticsSearch, { ...options, language })
				: this.route(Endpoints.CosmeticsById.replace('{cosmetic-id}', options.id), { language })
		);
	}
	async filterCosmetics(options: CosmeticSearchOptions<'multiple'>) {
		const language = options.language ?? this.language;
		return this.fetch<Cosmetic[]>(
			options.id === undefined
				? this.route(Endpoints.CosmeticsSearchAll, { ...options, language })
				: this.route(`${Endpoints.CosmeticsSearchByIds}`, { id: options.id, language }, true)
		);
	}

	async map(language: Language = this.language) {
		return this.fetch<Map>(this.route(Endpoints.Map, { language }));
	}

	news(options: NewsOptions & { mode: 'br' | 'stw' | 'creative' }): Promise<News>;
	news(options?: NewsOptions): Promise<AllNews>;
	async news(options: NewsOptions = {}) {
		const params = { language: options.language ?? this.language };
		return options.mode === undefined
			? this.fetch<AllNews>(this.route(Endpoints.News, params))
			: this.fetch<News>(this.route({
				br: Endpoints.BRNews,
				stw: Endpoints.STWNews,
				creative: Endpoints.CreativeNews
			}[options.mode], params));
	}

	playlists(options: PlaylistOptions & { id: string }): Promise<Playlist>;
	playlists(options?: PlaylistOptions): Promise<Playlist[]>;
	async playlists(options: PlaylistOptions = {}) {
		const params = { language: options.language ?? this.language };
		return options.id === undefined
			? this.fetch<Playlist[]>(this.route(Endpoints.Playlists, params))
			: this.fetch<Playlist>(this.route(Endpoints.PlaylistById.replace('{playlist-id}', options.id), params));
	}

	shop(options: ShopOptions & { combined: true }): Promise<CombinedShop>;
	shop(options?: ShopOptions): Promise<Shop>;
	async shop(options: ShopOptions = {}) {
		const params = { language: options.language ?? this.language };
		return options.combined
			? this.fetch<CombinedShop>(this.route(options.combined ? Endpoints.BRShopCombined : Endpoints.BRShop, params))
			: this.fetch<Shop>(this.route(options.combined ? Endpoints.BRShopCombined : Endpoints.BRShop, params));
	}

	async stats(options: NameStatsOptions | IdStatsOptions) {
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

		return this.fetch<Stats>(route, true);
	}
}