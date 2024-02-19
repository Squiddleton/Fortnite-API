enum Endpoints {
	AES = 'https://fortnite-api.com/v2/aes',

	Banners = 'https://fortnite-api.com/v1/banners',
	BannerColors = 'https://fortnite-api.com/v1/banners/colors',

	Cosmetics = 'https://fortnite-api.com/v2/cosmetics',
	BRCosmetics = 'https://fortnite-api.com/v2/cosmetics/br',
	/**
	 * @deprecated Use Endpoints.BRCosmetics instead.
	 */
	CosmeticsList = 'https://fortnite-api.com/v2/cosmetics/br',
	NewAllCosmetics = 'https://fortnite-api.com/v2/cosmetics/new',
	NewBRCosmetics = 'https://fortnite-api.com/v2/cosmetics/br/new',
	/**
	 * @deprecated Use Endpoints.NewBRCosmetics instead.
	 */
	NewCosmetics = 'https://fortnite-api.com/v2/cosmetics/br/new',
	CosmeticsById = 'https://fortnite-api.com/v2/cosmetics/br/{cosmetic-id}',
	CosmeticsSearch = 'https://fortnite-api.com/v2/cosmetics/br/search',
	CosmeticsSearchAll = 'https://fortnite-api.com/v2/cosmetics/br/search/all',
	CosmeticsSearchByIds = 'https://fortnite-api.com/v2/cosmetics/br/search/ids',
	Tracks = 'https://fortnite-api.com/v2/cosmetics/tracks',
	Cars = 'https://fortnite-api.com/v2/cosmetics/cars',
	Instruments = 'https://fortnite-api.com/v2/cosmetics/instruments',
	LEGO = 'https://fortnite-api.com/v2/cosmetics/lego',

	CreatorCode = 'https://fortnite-api.com/v2/creatorcode',

	Map = 'https://fortnite-api.com/v1/map',

	News = 'https://fortnite-api.com/v2/news',
	BRNews = 'https://fortnite-api.com/v2/news/br',
	STWNews = 'https://fortnite-api.com/v2/news/stw',
	CreativeNews = 'https://fortnite-api.com/v2/news/creative',

	Playlists = 'https://fortnite-api.com/v1/playlists',
	PlaylistById = 'https://fortnite-api.com/v1/playlists/{playlist-id}',

	Shop = 'https://fortnite-api.com/v2/shop',
	BRShop = 'https://fortnite-api.com/v2/shop/br',
	BRShopCombined = 'https://fortnite-api.com/v2/shop/br/combined',

	BRStats = 'https://fortnite-api.com/v2/stats/br/v2',
	BRStatsByAccountId = 'https://fortnite-api.com/v2/stats/br/v2/{accountId}'
}

export default Endpoints;