/**
 * A string that can be converted into a Date
 */
export type DateString = string;

/**
 * A unix timestamp in milliseconds
 */
export type UnixTimestamp = number;

/**
 * An object with string keys and string values
 */
export type StringRecord = {
	[key: string]: string;
};

/**
 * All supported languages for many endpoints
 */
export type Language = 'ar' | 'de' | 'en' | 'es' | 'es-419' | 'fr' | 'it' | 'ja' | 'ko' | 'pl' | 'pt-BR' | 'ru' | 'tr' | 'zh-CN' | 'zh-Hant';

/**
 * Options that support a language parameter
 */
export interface LanguageSupportingOption {
	/**
	 * The language for the returned data
	 */
	language?: Language;
}

/**
 * Options for constructing a Client instance
 */
export interface ClientOptions extends LanguageSupportingOption {
	/**
	 * An API key used for Client#stats()
	 *
	 * @remarks
	 *
	 * A key can be obtained at {@link https://dash.fortnite-api.com/account}.
	 */
	key?: string;
}

/**
 * A non-200 response received from Fortnite-API
 */
export interface RawFortniteAPIError {
	status: 400 | 403 | 404;
	error: string;
}

export interface AES {
	build: string;
	mainKey: string | null;
	dynamicKeys: {
		pakFilename: string;
		pakGuild: string;
		key: string;
	}[];
	updated: DateString;
}

export interface Banner {
	id: string;
	devName: string;
	name: string;
	description: string;
	category: string | null;
	fullUsageRights: boolean;
	images: {
		smallIcon: string;
		icon: string;
	};
}

export interface BannerColor {
	id: string;
	color: string;
	category: string;
	subCategoryGroup: number;
}

export interface Cosmetic {
	id: string;
	name: string;
	description: string;
	customExclusiveCallout?: string;
	type: CosmeticValues;
	rarity: CosmeticValues;
	series: {
		value: string;
		image: string | null;
		colors: string[];
		backendValue: string;
	} | null;
	set: CosmeticValues | null;
	introduction: {
		chapter: string;
		season: string;
		text: string;
		backendValue: number;
	} | null;
	images: {
		smallIcon: string | null;
		icon: string;
		featured: string | null;
		other: StringRecord | null;
	};
	variants: {
		channel: string;
		type: string;
		options: {
			tag: string;
			name: string;
			image: string;
		}[];
	}[] | null;
	builtInEmoteIds?: string[];
	searchTags: string[] | null;
	gameplayTags: string[] | null;
	metaTags: string[] | null;
	showcaseVideo: string | null;
	dynamicPakId: string | null;
	itemPreviewHeroPath?: string;
	displayAssetPath: string | null;
	definitionPath: string | null;
	path: string;
	added: DateString;
	shopHistory: DateString[] | null;
}

export interface NewCosmetics {
	build: string;
	previousBuild: string;
	hash: string;
	date: DateString;
	lastAddition: DateString;
	items: Cosmetic[];
}

/**
 * Options for listing all cosmetics
 */
export interface AllCosmeticsOptions extends LanguageSupportingOption {
	/**
	 * Whether to only return new cosmetics
	 */
	new?: boolean;
}

/**
 * Whether to search for single cosmetic or multiple cosmetics
 */
export type CosmeticSearchParametersType = 'single' | 'multiple';

/**
 * Options for finding or filtering cosmetics
 */
export interface CosmeticSearchOptions<T extends CosmeticSearchParametersType> extends LanguageSupportingOption {
	/**
	 * The search parameters' language
	 */
	searchLanguage?: string;
	/**
	 * The logic for comparing search parameters to the actual cosmetics
	 *
	 * @remarks
	 *
	 * Defaults to "full".
	 */
	matchMethod?: 'full' | 'contains' | 'starts' | 'ends';
	/**
	 * The cosmetic's id for Client#findCosmetics() or an array of ids for Client#filterCosmetics()
	 */
	id?: T extends 'single' ? string : string[];
	/**
	 * The cosmetic's in-game name
	 */
	name?: string;
	/**
	 * The cosmetic's description
	 */
	description?: string;
	/**
	 * The cosmetic's type
	 */
	type?: string;
	/**
	 * The cosmetic's in-game type
	 */
	displayType?: string;
	/**
	 * The cosmetic's internal type
	 */
	backendType?: string;
	/**
	 * The cosmetic's rarity
	 */
	rarity?: string;
	/**
	 * The cosmetic's in-game rarity
	 */
	displayRarity?: string;
	/**
	 * The cosmetic's internal rarity
	 */
	backendRarity?: string;
	/**
	 * Whether the cosmetic's rarity is part of a special series
	 */
	hasSeries?: boolean;
	/**
	 * The cosmetic's rarity series
	 */
	series?: string;
	/**
	 * The cosmetic's internal rarity series
	 */
	backendSeries?: string;
	/**
	 * Whether the cosmetic is part of a set
	 */
	hasSet?: boolean;
	/**
	 * The cosmetic's set
	 */
	set?: string;
	/**
	 * The cosmetic's set text
	 */
	setText?: string;
	/**
	 * The cosmetic's internal set
	 */
	backendSet?: string;
	/**
	 * Whether the cosmetic has an introduction
	 */
	hasIntroduction?: boolean;
	/**
	 * The cosmetic's internal introduction
	 */
	backendIntroduction?: number;
	/**
	 * The chapter that the cosmetic was introduced in
	 */
	introductionChapter?: string;
	/**
	 * The season that the cosmetic was introduced in
	 */
	introductionSeason?: string;
	/**
	 * Whether the cosmetic has a featured image
	 */
	hasFeaturedImage?: boolean;
	/**
	 * Whether the cosmetic has variants
	 */
	hasVariants?: boolean;
	/**
	 * Whether the cosmetic has gameplay tags
	 */
	hasGameplayTags?: boolean;
	/**
	 * One of the cosmetic's gameplay tags
	 */
	gameplayTag?: string;
	/**
	 * Whether the cosmetic has meta tags
	 */
	hasMetaTags?: boolean;
	/**
	 * One of the cosmetic's meta tags
	 */
	metaTag?: string;
	/**
	 * Whether the cosmetic has a dynamic pak id
	 */
	hasDynamicPakId?: boolean;
	/**
	 * The cosmetic's dynamic pak id
	 */
	dynamicPakId?: string;
	/**
	 * The timestamp when the cosmetic was added to the game
	 */
	added?: UnixTimestamp;
	/**
	 * The time since the cosmetic was added to the game
	 */
	addedSince?: UnixTimestamp;
	/**
	 * The time since the cosmetic last appeared
	 */
	unseenFor?: number;
	/**
	 * The timestamp of the cosmetic's last appearance
	 */
	lastAppearance?: UnixTimestamp;
}

export interface CreatorCode {
	code: string;
	account: {
		id: string;
		name: string;
	};
	status: string;
	verified: boolean;
}

export interface Map {
	images: {
		blank: string;
		pois: string;
	};
	pois: {
		id: string;
		name: string;
		location: {
			x: number;
			y: number;
			z: number;
		};
	}[];
}

export interface News {
	hash: string;
	date: DateString;
	image: string | null;
	motds: {
		id: string;
		title: string;
		tabTitle: string;
		body: string;
		image: string;
		titleImage: string;
		sortingPriority: number;
		hidden: boolean;
	}[] | null;
	messages: {
		title: string;
		body: string;
		image: string;
		adspace: string;
	}[] | null;
}

export interface AllNews {
	br: News | null;
	stw: News | null;
	creative: News | null;
}

export interface NewsOptions extends LanguageSupportingOption {
	/**
	 * The mode whose news will be fetched
	 *
	 * @remarks
	 *
	 * Defaults to return all modes' news.
	 */
	mode?: 'br' | 'stw' | 'creative';
}

export interface Playlist {
	id: string;
	name: string;
	subName: string | null;
	description: string | null;
	gameType: string | null;
	ratingType: string | null;
	minPlayers: number;
	maxPlayers: number;
	maxTeams: number;
	maxTeamSize: number;
	maxSquads: number;
	maxSquadSize: number;
	isDefault: boolean;
	isTournament: boolean;
	isLimitedTimeMode: boolean;
	isLargeTeamGame: boolean;
	accumulateToProfileStats: boolean;
	images: {
		showcase: string | null;
		missionIcon: string | null;
	};
	gameplayTags: string[];
	path: string;
	added: DateString;
}

export interface PlaylistOptions extends LanguageSupportingOption {
	/**
	 * The playlist's id
	 */
	id?: string;
}

export interface CosmeticValues {
	value: string;
	displayValue: string;
	backendValue: string;
}

export interface NewDisplayAsset {
	id: string;
	cosmeticId: string | null;
	materialInstances: {
		id: string;
		images: StringRecord;
		colors: StringRecord;
		scalings: {
			[scaling: string]: number;
		};
		flags: {
			[flag: string]: boolean;
		};
	}[];
}

export interface ShopEntry {
	regularPrice: number;
	finalPrice: number;
	bundle: {
		name: string;
		info: string;
		image: string;
	};
	banner: {
		value: string;
		intensity: string;
		backendValue: string;
	};
	giftable: boolean;
	refundable: boolean;
	sortPriority: number;
	categories: string[];
	sectionId: string;
	section: {
		id: string;
		name: string;
		index: number;
		landingPriority: number;
		sortOffersByOwnership: boolean;
		showIneligibleOffers: boolean;
		showIneligibleOffersIfGiftable: boolean;
		showTimer: boolean;
		enableToastNotification: boolean;
		hidden: boolean;
	};
	devName: string;
	offerId: string;
	displayAssetPath: string;
	tileSize: string;
	newDisplayAssetPath: string;
	newDisplayAsset: NewDisplayAsset;
	items: Cosmetic[];
}

export type ShopCategory = {
	name: string | null;
	entries: ShopEntry[];
} | null;

export interface Votes {
	name: string;
	entries: {
		regularPrice: number;
		finalPrice: number;
		bundle: {
			name: string;
			info: string;
			image: string;
		};
		banner: {
			value: string;
			intensity: string;
			backendValue: string;
		};
		giftable: boolean;
		refundable: boolean;
		sortPriority: number;
		categories: string[];
		sectionId: string;
		session: {
			id: string;
			name: string;
			index: number;
			landingPriority: number;
			sortOffersByOwnership: boolean;
			showIneligibleOffers: boolean;
			showTimer: boolean;
			enableToastNotification: boolean;
			hidden: boolean;
		};
		devName: string;
		offerId: string;
		displayAssetPath: string;
		tileSize: string;
		newDisplayAssetPath: string;
		newDisplayAsset: NewDisplayAsset;
		items: Cosmetic[];
	}[];
}

export interface CombinedShop {
	hash: string;
	date: DateString;
	vbuckIcon: string;
	featured: ShopCategory;
	daily: ShopCategory;
	votes: Votes[] | null;
	voteWinners: Votes[] | null;
}

export interface Shop extends CombinedShop {
	specialFeatured: ShopCategory;
	specialDaily: ShopCategory;
}

export interface ShopOptions extends LanguageSupportingOption {
	/**
	 * Whether to combine the normal and special shop categories
	 */
	combined?: boolean;
}

export interface BaseStats {
	score: number;
	scorePerMin: number;
	scorePerMatch: number;
	wins: number;
	kills: number;
	killsPerMin: number;
	killsPerMatch: number;
	deaths: number;
	kd: number;
	matches: number;
	winRate: number;
	minutesPlayed: number;
	playersOutlived: number;
	lastModified: DateString;
}

export interface SoloStats extends BaseStats {
	top10: number;
	top25: number;
}

export interface DuoStats extends BaseStats {
	top5: number;
	top12: number;
}

export interface SquadStats extends BaseStats {
	top3: number;
	top6: number;
}

export type OverallStats = SoloStats & DuoStats & SquadStats;

export interface PlatformStats {
	overall: OverallStats;
	solo: SoloStats;
	duo: DuoStats;
	trio: null;
	squad: SquadStats;
	ltm: BaseStats;
}

export interface Stats<image extends boolean> {
	account: {
		id: string;
		name: string;
	};
	battlePass: {
		level: number;
		progress: number;
	};
	image: image extends true ? string : null;
	stats: {
		all: PlatformStats;
		keyboardMouse: PlatformStats;
		gamepad: PlatformStats;
		touch: PlatformStats;
	};
}

export interface BaseStatOptions {
	/**
	 * The time period of stats to display
	 *
	 * @remarks
	 *
	 * Defaults to "lifetime".
	 */
	timeWindow?: 'season' | 'lifetime';
	/**
	 * Whether to include an automatically-generated image of a control input's stats
	 *
	 * @remarks
	 *
	 * Stats#image returns null by default.
	 */
	image?: 'all' | 'keyboardMouse' | 'gamepad' | 'touch';
}

export interface NameStatsOptions extends BaseStatOptions {
	/**
	 * The account's name
	 */
	name: string;
	/**
	 * The account's platform
	 *
	 * @remarks
	 *
	 * Defaults to "epic".
	 */
	accountType?: 'epic' | 'psn' | 'xbl';
}

export interface IdStatsOptions extends BaseStatOptions {
	/**
	 * The account's id
	 */
	id: string;
}

export type AnyStatsOptions = NameStatsOptions | IdStatsOptions;

/**
 * Any type of data that Fortnite-API can return from a 200 response
 */
export type AnyData = AES | Banner[] | BannerColor[] | NewCosmetics | Cosmetic | Cosmetic[] | CreatorCode | Map | News | AllNews | Playlist | Playlist[] | CombinedShop | Shop | Stats<boolean>;

/**
 * The data that Fortnite-API directly returns from a 200 response
 */
export interface Raw<Data extends AnyData> {
	status: 200;
	data: Data;
}

/**
 * Any options object used as a Client method's parameter
 */
export type AnyEndpointOptions = AllCosmeticsOptions | CosmeticSearchOptions<CosmeticSearchParametersType> | NewsOptions | PlaylistOptions | ShopOptions | BaseStatOptions | AnyStatsOptions;