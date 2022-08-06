import fetch from 'node-fetch';
import Endpoints from './endpoints.js';
import type { AES, AllCosmeticsOptions, AllNews, AnyEndpointOptions, Banner, BannerColor, BaseStatOptions, ClientOptions, CombinedShop, Cosmetic, CosmeticSearchOptions, CreatorCode, IdStatsOptions, Language, Map, NameStatsOptions, NewCosmetics, News, NewsOptions, Playlist, PlaylistOptions, Shop, ShopOptions, Stats, Raw, RawFortniteAPIError } from './types.js';
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
	private async fetch(route: string, authorization = false) {
		const res = await fetch(route, authorization && this.key !== null ? { headers: { Authorization: this.key } } : undefined);
		return res.json() as unknown;
	}

	async aes(keyFormat: 'hex' | 'base64' = 'hex') {
		const route = this.route(Endpoints.AES, { keyFormat });
		const res = await this.fetch(route) as Raw<AES> | RawFortniteAPIError;
		if (res.status !== 200) throw new FortniteAPIError(res, route);
		return res.data;
	}

	async banners(language: Language = this.language) {
		const route = this.route(Endpoints.Banners, { language });
		const res = await this.fetch(route) as Raw<Banner[]> | RawFortniteAPIError;
		if (res.status !== 200) throw new FortniteAPIError(res, route);
		return res.data;
	}
	async bannerColors() {
		return (await this.fetch(this.route(Endpoints.BannerColors)) as Raw<BannerColor[]>).data;
	}

	async creatorCode(name: string) {
		const route = this.route(Endpoints.CreatorCode, { name });
		const res = await this.fetch(route) as Raw<CreatorCode> | RawFortniteAPIError;
		if (res.status !== 200) throw new FortniteAPIError(res, route);
		return res.data;
	}

	listCosmetics(options: AllCosmeticsOptions & { combined: true }): Promise<NewCosmetics>;
	listCosmetics(options?: AllCosmeticsOptions): Promise<Cosmetic[]>;
	async listCosmetics(options: AllCosmeticsOptions = {}) {
		if (options.new) {
			const route = this.route(Endpoints.NewCosmetics, { language: options.language ?? this.language });
			const res = await this.fetch(route) as Raw<NewCosmetics> | RawFortniteAPIError;
			if (res.status !== 200) throw new FortniteAPIError(res, route);
			return res.data;
		}
		else {
			const route = this.route(Endpoints.CosmeticsList, { language: options.language ?? this.language });
			const res = await this.fetch(route) as Raw<Cosmetic[]> | RawFortniteAPIError;
			if (res.status !== 200) throw new FortniteAPIError(res, route);
			return res.data;
		}
	}
	async findCosmetic(options: CosmeticSearchOptions<'single'>) {
		const route = options.id === undefined
			? this.route(Endpoints.CosmeticsSearch, options)
			: this.route(`${Endpoints.CosmeticsById}${options.id}`, { language: options.language ?? this.language });
		const res = await this.fetch(route) as Raw<Cosmetic> | RawFortniteAPIError;
		if (res.status !== 200) throw new FortniteAPIError(res, route);
		return res.data;
	}
	async filterCosmetics(options: CosmeticSearchOptions<'multiple'>) {
		const route = options.id === undefined
			? this.route(Endpoints.CosmeticsSearchAll, options)
			: this.route(`${Endpoints.CosmeticsSearchByIds}`, { id: options.id, language: options.language ?? this.language });
		const res = await this.fetch(route) as Raw<Cosmetic[]> | RawFortniteAPIError;
		if (res.status !== 200) throw new FortniteAPIError(res, route);
		return res.data;
	}

	async map(language: Language = this.language) {
		const route = this.route(Endpoints.Map, { language });
		const res = await this.fetch(route) as Raw<Map> | RawFortniteAPIError;
		if (res.status !== 200) throw new FortniteAPIError(res, route);
		return res.data;
	}

	news(options: NewsOptions & { mode: 'br' | 'stw' | 'creative' }): Promise<News>;
	news(options?: NewsOptions): Promise<AllNews>;
	async news(options: NewsOptions = {}) {
		if (options.mode === undefined) {
			const route = this.route(Endpoints.News, { language: options.language ?? this.language });
			const res = await this.fetch(route) as Raw<AllNews> | RawFortniteAPIError;
			if (res.status !== 200) throw new FortniteAPIError(res, route);
			return res.data;
		}
		else {
			const modeToEndpoint = {
				br: Endpoints.BRNews,
				stw: Endpoints.STWNews,
				creative: Endpoints.CreativeNews
			};
			const endpoint = modeToEndpoint[options.mode];
			const route = this.route(endpoint, { language: options.language ?? this.language });
			const res = await this.fetch(route) as Raw<News> | RawFortniteAPIError;
			if (res.status !== 200) throw new FortniteAPIError(res, route);
			return res.data;
		}
	}

	playlists(options: PlaylistOptions & { id: string }): Promise<Playlist>;
	playlists(options?: PlaylistOptions): Promise<Playlist[]>;
	async playlists(options: PlaylistOptions = {}) {
		if (options.id === undefined) {
			const route = this.route(Endpoints.Playlists, { language: options.language ?? this.language });
			const res = await this.fetch(route) as Raw<Playlist[]> | RawFortniteAPIError;
			if (res.status !== 200) throw new FortniteAPIError(res, route);
			return res.data;
		}
		else {
			const route = this.route(`${Endpoints.PlaylistById}${options.id}`, { language: options.language ?? this.language });
			const res = await this.fetch(route) as Raw<Playlist> | RawFortniteAPIError;
			if (res.status !== 200) throw new FortniteAPIError(res, route);
			return res.data;
		}
	}

	shop(options: ShopOptions & { combined: true }): Promise<CombinedShop>;
	shop(options?: ShopOptions): Promise<Shop>;
	async shop(options: ShopOptions = {}) {
		if (options.combined) {
			const route = this.route(options.combined ? Endpoints.BRShopCombined : Endpoints.BRShop, { language: options.language ?? this.language });
			const res = await this.fetch(route) as Raw<CombinedShop> | RawFortniteAPIError;
			if (res.status !== 200) throw new FortniteAPIError(res, route);
			return res.data;
		}
		else {
			const route = this.route(options.combined ? Endpoints.BRShopCombined : Endpoints.BRShop, { language: options.language ?? this.language });
			const res = await this.fetch(route) as Raw<Shop> | RawFortniteAPIError;
			if (res.status !== 200) throw new FortniteAPIError(res, route);
			return res.data;
		}
	}

	async stats(options: NameStatsOptions | IdStatsOptions) {
		if (this.key === null) throw new TypeError('Client#stats() requires an authorization key passed into the Client constructor options. You may request one at https://dash.fortnite-api.com/account');

		const hasName = 'name' in options;
		const hasId = 'id' in options;
		if (!hasName && !hasId) throw new TypeError('Neither the "name" nor the "id" property of the Client#stats() argument were provided');
		else if (hasName && hasId) throw new TypeError('The "name" and "id" properties of the Client#stats() argument are mutually exclusive');
		else if (hasId && 'accountType' in options) throw new TypeError('The "name" and "accountType" properties of the Client#stats() argument are mutually exclusive');

		let route: string;
		if (hasName) {
			route = this.route(Endpoints.BRStats, options);
		}
		else {
			const params: BaseStatOptions = {};
			if (options.timeWindow !== undefined) params.timeWindow = options.timeWindow;
			if (options.image !== undefined) params.image = options.image;
			route = this.route(`${Endpoints.BRStatsByAccountId}${options.id}`, params);
		}

		const res = await this.fetch(route, true) as Raw<Stats> | RawFortniteAPIError;
		if (res.status !== 200) throw new FortniteAPIError(res, route);
		return res.data;
	}
}