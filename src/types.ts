export type DateString = string;

export type UnixTimestamp = number;

export type Language = 'ar' | 'de' | 'en' | 'es' | 'es-419' | 'fr' | 'it' | 'ja' | 'ko' | 'pl' | 'pt-BR' | 'ru' | 'tr' | 'zh-CN' | 'zh-Hant';

export interface LanguageSupportingOption {
	language?: Language;
}

export interface ClientOptions extends LanguageSupportingOption {
	key?: string;
}

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
	customExclusiveCallout: string | undefined;
	type: CosmeticValues;
	rarity: CosmeticValues;
	series: {
		value: string;
		image: string | null;
		backendValue: string;
	} | null;
	set: CosmeticValues;
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
		other: { [key: string]: string } | null;
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
	builtInEmoteIds: string[] | undefined;
	searchTags: string[] | null;
	gameplayTags: string[] | null;
	metaTags: string[] | null;
	showcaseVideo: string | null;
	dynamicPakId: string | null;
	itemPreviewHeroPath: string | undefined;
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

export interface AllCosmeticsOptions extends LanguageSupportingOption {
	new?: boolean;
}

export type CosmeticSearchParametersType = 'single' | 'multiple';

export interface CosmeticSearchOptions<T extends CosmeticSearchParametersType = CosmeticSearchParametersType> extends LanguageSupportingOption {
	searchLanguage?: string;
	matchMethod?: 'full' | 'contains' | 'starts' | 'ends';
	id?: T extends 'single' ? string : string[];
	name?: string;
	description?: string;
	type?: string;
	displayType?: string;
	backendType?: string;
	rarity?: string;
	displayRarity?: string;
	backendRarity?: string;
	hasSeries?: boolean;
	series?: string;
	backendSeries?: string;
	hasSet?: boolean;
	set?: string;
	setText?: string;
	backendSet?: string;
	hasIntroduction?: boolean;
	backendIntroduction?: number;
	introductionChapter?: string;
	introductionSeason?: string;
	hasFeaturedImage?: boolean;
	hasVariants?: boolean;
	hasGameplayTags?: boolean;
	gameplayTag?: string;
	hasMetaTags?: boolean;
	metaTag?: string;
	hasDynamicPakId?: boolean;
	dynamicPakId?: string;
	added?: UnixTimestamp;
	addedSince?: UnixTimestamp;
	unseenFor?: number;
	lastAppearance?: UnixTimestamp;
}

export interface BaseBRStats {
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
		images: Record<string, string>;
		colors: Record<string, string>;
		scalings: Record<string, number>;
		flags: Record<string, boolean>;
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
	combined?: boolean;
}

export interface SoloStats extends BaseBRStats {
	top10: number;
	top25: number;
}

export interface DuoStats extends BaseBRStats {
	top5: number;
	top12: number;
}

export interface SquadStats extends BaseBRStats {
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
	ltm: BaseBRStats;
}

export interface BRStats {
	account: {
		id: string;
		name: string;
	};
	battlePass: {
		level: number;
		progress: number;
	};
	image: string | null;
	stats: {
		all: PlatformStats;
		keyboardMouse: PlatformStats;
		gamepad: PlatformStats;
		touch: PlatformStats;
	};
}

export interface BaseStatOptions {
	timeWindow?: 'season' | 'lifetime';
	image?: 'all' | 'keyboardMouse' | 'gamepad' | 'touch';
}

export interface NameStatsOptions extends BaseStatOptions {
	name: string;
	accountType?: 'epic' | 'psn' | 'xbl';
}

export interface IdStatsOptions extends BaseStatOptions {
	id: string;
}

export type AnyData = AES | Banner[] | BannerColor[] | NewCosmetics | Cosmetic | Cosmetic[] | CreatorCode | Map | News | AllNews | Playlist | Playlist[] | CombinedShop | Shop | BRStats;

export interface Raw<Data extends AnyData> {
	status: 200;
	data: Data;
}

export type AnyEndpointOptions = AllCosmeticsOptions | CosmeticSearchOptions | NewsOptions | PlaylistOptions | ShopOptions | BaseStatOptions | NameStatsOptions | IdStatsOptions;