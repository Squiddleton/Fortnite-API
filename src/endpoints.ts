enum Endpoints {
	AES = 'https://fortnite-api.com/v2/aes',

	Banners = 'https://fortnite-api.com/v1/banners',
	BannerColors = 'https://fortnite-api.com/v1/banners/colors',

	Cosmetics = 'https://fortnite-api.com/v2/cosmetics',
	NewAllCosmetics = 'https://fortnite-api.com/v2/cosmetics/new',
	BRCosmetics = 'https://fortnite-api.com/v2/cosmetics/br',
	Tracks = 'https://fortnite-api.com/v2/cosmetics/tracks',
	Instruments = 'https://fortnite-api.com/v2/cosmetics/instruments',
	Cars = 'https://fortnite-api.com/v2/cosmetics/cars',
	LEGO = 'https://fortnite-api.com/v2/cosmetics/lego',
	LEGOKits = 'https://fortnite-api.com/v2/cosmetics/lego/kits',
	CosmeticsById = 'https://fortnite-api.com/v2/cosmetics/br/{cosmetic-id}',
	CosmeticsSearch = 'https://fortnite-api.com/v2/cosmetics/br/search',
	CosmeticsSearchAll = 'https://fortnite-api.com/v2/cosmetics/br/search/all',
	CosmeticsSearchByIds = 'https://fortnite-api.com/v2/cosmetics/br/search/ids',

	CreatorCode = 'https://fortnite-api.com/v2/creatorcode',

	Map = 'https://fortnite-api.com/v1/map',

	News = 'https://fortnite-api.com/v2/news',
	BRNews = 'https://fortnite-api.com/v2/news/br',
	STWNews = 'https://fortnite-api.com/v2/news/stw',
	CreativeNews = 'https://fortnite-api.com/v2/news/creative',

	Playlists = 'https://fortnite-api.com/v1/playlists',
	PlaylistById = 'https://fortnite-api.com/v1/playlists/{playlist-id}',

	Shop = 'https://fortnite-api.com/v2/shop',

	BRStats = 'https://fortnite-api.com/v2/stats/br/v2',
	BRStatsByAccountId = 'https://fortnite-api.com/v2/stats/br/v2/{accountId}'
}

export default Endpoints;