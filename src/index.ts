import fetch from 'node-fetch';
import Endpoints from './endpoints.js';
import type { AES, AllCosmeticsOptions, AllNews, AnyEndpointOptions, Banner, BannerColor, BaseStatOptions, ClientOptions, CombinedShop, Cosmetic, CosmeticSearchOptions, CreatorCode, IdStatsOptions, Language, Map, NameStatsOptions, NewCosmetics, News, NewsOptions, Playlist, PlaylistOptions, Shop, ShopOptions, Stats, Raw, RawFortniteAPIError, AnyData } from './types.js';
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

	private route(endpoint: string, params: AnyEndpointOptions | { keyFormat: 'hex' | 'base64' } = {}) {
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
		if (options.new) {
			return this.fetch<NewCosmetics>(this.route(Endpoints.NewCosmetics, { language: options.language ?? this.language }));
		}
		else {
			return this.fetch<Cosmetic[]>(this.route(Endpoints.CosmeticsList, { language: options.language ?? this.language }));
		}
	}
	async findCosmetic(options: CosmeticSearchOptions<'single'>) {
		return this.fetch<Cosmetic>(
			options.id === undefined
				? this.route(Endpoints.CosmeticsSearch, options)
				: this.route(Endpoints.CosmeticsById.replace('{cosmetic-id}', options.id), { language: options.language ?? this.language })
		);
	}
	async filterCosmetics(options: CosmeticSearchOptions<'multiple'>) {
		return this.fetch<Cosmetic[]>(
			options.id === undefined
				? this.route(Endpoints.CosmeticsSearchAll, options)
				: this.route(`${Endpoints.CosmeticsSearchByIds}`, { id: options.id, language: options.language ?? this.language })
		);
	}

	async map(language: Language = this.language) {
		return this.fetch<Map>(this.route(Endpoints.Map, { language }));
	}

	news(options: NewsOptions & { mode: 'br' | 'stw' | 'creative' }): Promise<News>;
	news(options?: NewsOptions): Promise<AllNews>;
	async news(options: NewsOptions = {}) {
		if (options.mode === undefined) {
			return this.fetch<AllNews>(this.route(Endpoints.News, { language: options.language ?? this.language }));
		}
		else {
			const modeToEndpoint = {
				br: Endpoints.BRNews,
				stw: Endpoints.STWNews,
				creative: Endpoints.CreativeNews
			};
			const endpoint = modeToEndpoint[options.mode];
			return this.fetch<News>(this.route(endpoint, { language: options.language ?? this.language }));
		}
	}

	playlists(options: PlaylistOptions & { id: string }): Promise<Playlist>;
	playlists(options?: PlaylistOptions): Promise<Playlist[]>;
	async playlists(options: PlaylistOptions = {}) {
		if (options.id === undefined) {
			return this.fetch<Playlist[]>(this.route(Endpoints.Playlists, { language: options.language ?? this.language }));
		}
		else {
			return this.fetch<Playlist>(this.route(Endpoints.PlaylistById.replace('{playlist-id}', options.id), { language: options.language ?? this.language }));
		}
	}

	shop(options: ShopOptions & { combined: true }): Promise<CombinedShop>;
	shop(options?: ShopOptions): Promise<Shop>;
	async shop(options: ShopOptions = {}) {
		return (options.combined)
			? this.fetch<CombinedShop>(this.route(options.combined ? Endpoints.BRShopCombined : Endpoints.BRShop, { language: options.language ?? this.language }))
			: this.fetch<Shop>(this.route(options.combined ? Endpoints.BRShopCombined : Endpoints.BRShop, { language: options.language ?? this.language }));
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