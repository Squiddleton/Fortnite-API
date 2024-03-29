export type AccountType = 'epic' | 'psn' | 'xbl';

export type AESFormat = 'hex' | 'base64';

export type GameMode = 'br' | 'stw' | 'creative';

export type Input = 'all' | 'keyboardMouse' | 'gamepad' | 'touch';

export type MatchMethod = 'full' | 'contains' | 'starts' | 'ends';

export type TimeWindow = 'season' | 'lifetime';

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

export interface BannerImages {
	smallIcon: string;
	icon: string;
}

export interface BattlePassProgress {
	level: number;
	progress: number;
}

export interface Bundle {
	name: string;
	info: string;
	image: string;
}

export interface Coordinates {
	x: number;
	y: number;
	z: number;
}

export interface CosmeticImages {
	smallIcon: string | null;
	icon: string | null;
	featured: string | null;
	lego: LEGOCosmeticImages | null;
	other: StringRecord | null;
}

export interface CosmeticIntroduction {
	chapter: string;
	season: string;
	text: string;
	backendValue: number;
}

export interface CosmeticSeries {
	value: string;
	image: string | null;
	colors: string[];
	backendValue: string;
}

export interface CosmeticSet {
	value: string;
	text: string;
	backendValue: string;
}

export interface DynamicKey {
	pakFilename: string;
	pakGuild: string;
	key: string;
}

export interface EntryBanner {
	value: string;
	intensity: string;
	backendValue: string;
}

export interface EntrySession {
	id: string;
	name: string;
	index: number;
	landingPriority: number;
	sortOffersByOwnership: boolean;
	showIneligibleOffers: boolean;
	showTimer: boolean;
	enableToastNotification: boolean;
	hidden: boolean;
}

export interface EpicAccount {
	id: string;
	name: string;
}

export interface LEGOCosmeticImages extends NewCosmeticImages {
	wide: string | null;
}

export interface MapImages {
	blank: string;
	pois: string;
}

export interface MaterialInstance {
	id: string;
	images: StringRecord;
	colors: StringRecord;
	scalings: Record<string, number> | null;
	flags: Record<string, boolean> | null;
}

export interface Message {
	title: string;
	body: string;
	image: string;
	adspace: string;
}

export interface MOTD {
	id: string;
	title: string;
	tabTitle: string;
	body: string;
	image: string;
	titleImage: string;
	sortingPriority: number;
	hidden: boolean;
}

export interface NewCosmeticImages {
	small: string;
	large: string;
}

export interface Option {
	tag: string;
	name: string | null;
	image: string;
}

export interface PlaylistImages {
	showcase: string | null;
	missionIcon: string | null;
}

export interface POI {
	id: string;
	name: string;
	location: Coordinates;
}

export interface ShopBanner {
	value: string;
	intensity: string;
	backendValue: string;
}

export interface ShopLayout {
	id: string;
	name: string;
	category: string;
	index: number;
	showIneligibleOffers: string;
}

export interface ShopSection {
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
}

export interface TrackDifficulty {
	vocals: number;
	guitar: number;
	bass: number;
	plasticBass: number;
	drums: number;
	plasticDrums: number;
}

export interface Variant {
	channel: string;
	type: string | null;
	options: Option[];
}

export interface VoteEntry {
	regularPrice: number;
	finalPrice: number;
	bundle: Bundle;
	banner: EntryBanner;
	giftable: boolean;
	refundable: boolean;
	sortPriority: number;
	categories: string[];
	sectionId: string;
	session: EntrySession;
	devName: string;
	offerId: string;
	displayAssetPath: string;
	tileSize: string;
	newDisplayAssetPath: string;
	newDisplayAsset: NewDisplayAsset;
	items: BRCosmetic[];
}

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
	status: number;
	error: string;
}

export interface AES {
	build: string;
	mainKey: string | null;
	dynamicKeys: DynamicKey[];
	updated: DateString;
}

export interface Banner {
	id: string;
	devName: string;
	name: string;
	description: string;
	category: string | null;
	fullUsageRights: boolean;
	images: BannerImages;
}

export interface BannerColor {
	id: string;
	color: string;
	category: string;
	subCategoryGroup: number;
}

export interface BaseCosmetic {
	id: string;
	gameplayTags: string[] | null;
	added: DateString;
	shopHistory: DateString[] | null;
}

export interface BRCosmetic extends BaseCosmetic {
	name: string;
	description: string;
	customExclusiveCallout?: string;
	type: CosmeticValues;
	rarity: CosmeticValues;
	series: CosmeticSeries | null;
	set: CosmeticSet | null;
	introduction: CosmeticIntroduction | null;
	images: CosmeticImages;
	variants: Variant[] | null;
	builtInEmoteIds?: string[];
	searchTags: string[] | null;
	metaTags: string[] | null;
	showcaseVideo: string | null;
	dynamicPakId: string | null;
	itemPreviewHeroPath?: string;
	displayAssetPath: string | null;
	definitionPath: string | null;
	path: string;
}

/**
 * @deprecated Use BRCosmetic instead.
 */
export type Cosmetic = BRCosmetic;

export interface TrackCosmetic extends BaseCosmetic {
	devName: string;
	title: string;
	artist: string;
	album: null;
	releaseYear: number;
	bpm: number;
	duration: number;
	difficulty: TrackDifficulty;
	genres: string[] | null;
	albumArt: string;
}

export interface CarCosmetic extends InstrumentCosmetic {
	vehicleId: string;
}

export interface InstrumentCosmetic extends BaseCosmetic {
	type: CosmeticValues;
	rarity: CosmeticValues;
	name: string;
	description: string;
	images: NewCosmeticImages;
	series: CosmeticSeries | null;
	path: string;
	showcaseVideo: string | null;
}

export type AnyCosmetic = BRCosmetic | TrackCosmetic | CarCosmetic | InstrumentCosmetic;

export interface LEGOCosmetic {
	id: string;
	cosmeticId: string;
	soundLibraryTags: string[] | null;
	images: LEGOCosmeticImages;
	path: string;
	added: DateString;
}

export interface LEGOKit extends BaseCosmetic {
	name: string | null;
	images: NewCosmeticImages;
	path: string;
}

export type CosmeticType = 'all' | 'br' | 'tracks' | 'instruments' | 'cars' | 'lego' | 'legoKits';

export interface AllCosmetics {
	br: BRCosmetic[];
	tracks: TrackCosmetic[];
	instruments: InstrumentCosmetic[];
	cars: CarCosmetic[];
	lego: LEGOCosmetic[];
	legoKits: LEGOKit[];
}


export interface NewCosmeticsData {
	date: DateString;
	build: string;
	previousBuild: string;
	hashes: Record<CosmeticType, string>;
	lastAdditions: Record<CosmeticType, DateString>;
	items: AllCosmetics;
}

export interface NewBRCosmetics {
	build: string;
	previousBuild: string;
	hash: string;
	date: DateString;
	lastAddition: DateString;
	items: BRCosmetic[];
}

/**
 * @deprecated Use NewBRCosmetics instead.
 */
export type NewCosmetics = NewBRCosmetics;

/**
 * Options for fetching all BR cosmetics
 */
export interface AllBRCosmeticsOptions extends LanguageSupportingOption {
	/**
	 * Whether to only return new cosmetics
	 */
	new?: boolean;
}

/**
 * Options for fetching all BR cosmetics
 * @deprecated Use AllBRCosmeticsOptions instead.
 */
export type AllCosmeticsOptions = AllBRCosmeticsOptions;

export type FetchCosmeticType = Exclude<CosmeticType, 'all' | 'br'> | 'new';

/**
 * Options for fetching all cosmetics
 */
export interface CosmeticsOptions extends AllBRCosmeticsOptions {
	/**
	 * The type of cosmetics to return
	 */
	cosmeticType?: FetchCosmeticType;
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
	matchMethod?: MatchMethod;
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
	account: EpicAccount;
	status: string;
	verified: boolean;
}

export interface FortniteMap {
	images: MapImages;
	pois: POI[];
}

/**
 * @deprecated Use FortniteMap instead.
 */
export type Map = FortniteMap;

export interface News {
	hash: string;
	date: DateString;
	image: string | null;
	motds: MOTD[] | null;
	messages: Message[] | null;
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
	mode?: GameMode;
}

export interface Playlist {
	id: string;
	name: string | null;
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
	images: PlaylistImages;
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
	materialInstances: MaterialInstance[];
}

export interface BaseShopEntry {
	regularPrice: number;
	finalPrice: number;
	bundle: Bundle;
	banner: ShopBanner;
	giftable: boolean;
	refundable: boolean;
	sortPriority: number;
	categories: string[];
	sectionId: string;
	section: ShopSection | null;
	layout: ShopLayout;
	devName: string;
	offerId: string;
	displayAssetPath: string;
	tileSize: string;
	newDisplayAssetPath: string;
	newDisplayAsset: NewDisplayAsset;
}

export interface ShopEntry extends BaseShopEntry {
	items: BRCosmetic[];
}

export interface ShopCategory {
	name: string | null;
	entries: ShopEntry[];
}

export interface Votes {
	name: string;
	entries: VoteEntry[];
}

export type NewCosmetic = BRCosmetic | TrackCosmetic | InstrumentCosmetic | CarCosmetic;

export interface NewShopEntry extends BaseShopEntry {
	brItems: BRCosmetic[] | null;
	tracks: TrackCosmetic[] | null;
	instruments: InstrumentCosmetic[] | null;
	cars: CarCosmetic[] | null;
	legoKits: LEGOKit[] | null;
}

export interface NewShop {
	hash: string;
	date: DateString;
	vbuckIcon: string;
	entries: NewShopEntry[];
}

export interface CombinedShop {
	hash: string;
	date: DateString;
	vbuckIcon: string;
	featured: ShopCategory | null;
	daily: ShopCategory | null;
	votes: Votes[] | null;
	voteWinners: Votes[] | null;
}

export interface Shop extends CombinedShop {
	specialFeatured: ShopCategory | null;
	specialDaily: ShopCategory | null;
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
	account: EpicAccount;
	battlePass: BattlePassProgress;
	image: image extends true ? string : null;
	stats: Record<Input, PlatformStats>;
}

export interface BaseStatOptions {
	/**
	 * The time period of stats to display
	 *
	 * @remarks
	 *
	 * Defaults to "lifetime".
	 */
	timeWindow?: TimeWindow;
	/**
	 * Whether to include an automatically-generated image of a control input's stats
	 *
	 * @remarks
	 *
	 * Stats#image returns null by default.
	 */
	image?: Input;
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
	accountType?: AccountType;
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
export type AnyData = AES | Banner[] | BannerColor[] | AllCosmetics | TrackCosmetic[] | CarCosmetic[] | InstrumentCosmetic[] | LEGOCosmetic[] | LEGOKit[] | NewCosmeticsData | NewBRCosmetics | BRCosmetic | BRCosmetic[] | CreatorCode | FortniteMap | News | AllNews | Playlist | Playlist[] | NewShop | CombinedShop | Shop | Stats<boolean>;

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
export type AnyEndpointOptions = AllBRCosmeticsOptions | CosmeticSearchOptions<CosmeticSearchParametersType> | NewsOptions | PlaylistOptions | ShopOptions | BaseStatOptions | AnyStatsOptions;