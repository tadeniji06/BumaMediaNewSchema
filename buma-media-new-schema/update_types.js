const fs = require('fs');
const path = require('path');

const BUMA_DIR = 'C:\\Users\\Admin\\Documents\\GitHub\\buma';

// 1. Update types/media.ts
const mediaTsContent = `export interface Pricing {
	currency?: string;
	price?: number;
	basePrice?: number;
	priceWithMarkup?: number;
}

export interface RadioPricingItem {
	belt?: string;
	duration?: string;
	timeBand?: string;
	wordCount?: string;
	pricing?: Pricing;
}

export interface RadioStation {
	_id: string;
	name: string;
	frequency?: string;
	logo?: string;
	image?: string;
	transmissionType?: string;
	coverage?: string[];
	programmes?: string[];
	programmeType?: string[];
	language?: string[];
	location?: string;
	mediaOwner?: string;
	website?: string;
	stationManager?: string;
	contactPerson?: string;
	role?: string;
	listenership?: number;
	spotAdvertPricing?: RadioPricingItem[];
	announcementPricing?: RadioPricingItem[];
	jinglesPricing?: RadioPricingItem[];
	liveAppearancePricing?: RadioPricingItem[];
	sponsoredProgrammePricing?: RadioPricingItem[];
	onAirHypePricing?: Pricing;
	onAirHypePricingItems?: RadioPricingItem[];
	beltPricing?: RadioPricingItem[];
}

export interface InfluencerPricingItem {
	name?: string;
	description?: string;
	pricing?: Pricing;
}

export interface Influencer {
	_id: string;
	name: string;
	image?: string;
	location?: string;
	language?: string[];
	contentCategory?: string[];
	platform?: string[];
	manager?: string;
	managementTeam?: string;
	managementEmail?: string;
	postPricing?: InfluencerPricingItem[];
	igFollowers?: string;
	facebookFollowers?: string;
	ytSubscribers?: string;
	ytViews?: string;
	tiktokFollowers?: string;
	category?: string;
}

// TV Station
export interface TvTimedPricingItem {
	duration?: string;
	pricing?: Pricing;
}

export interface TvPlaceholderPricingItem {
	name?: string;
	description?: string;
	pricing?: Pricing;
}

export interface TvStation {
	_id: string;
	name: string;
	logo?: string;
	category?: string;
	transmissionType?: string;
	advertType?: string[];
	mediaOwner?: string;
	ownershipGroup?: string;
	website?: string;
	stationManager?: string;
	contactPerson?: string;
	role?: string;
	phoneNumber?: string;
	email?: string;
	programmes?: string[];
	coverage?: string[];
	runOfSpotPricing?: TvTimedPricingItem[];
	advertSpotPricing?: TvTimedPricingItem[];
	liveCoveragePricing?: TvPlaceholderPricingItem[];
	guestAppearancePricing?: TvPlaceholderPricingItem[];
	sponsoredProgrammePricing?: TvPlaceholderPricingItem[];
	announcementPricing?: TvPlaceholderPricingItem[];
}

// PR x Media
export interface PrSpecialPositionItem {
	position?: string;
	description?: string;
	pricing?: Pricing;
}

export interface PrCustomPackageItem {
	name?: string;
	description?: string;
	pricing?: Pricing;
}

export interface PrMedia {
	_id: string;
	name: string;
	logo?: string;
	mediaCategories?: string[];
	coverage?: string[];
	location?: string;
	contentCategory?: string[];
	audienceType?: string[];
	publicNoticeBlackPricing?: Pricing;
	productsColourPricing?: Pricing;
	productsBlackPricing?: Pricing;
	politicsColorPricing?: Pricing;
	politicsBlackPricing?: Pricing;
	allureRatePricing?: Pricing;
	specialPositions?: PrSpecialPositionItem[];
	customPackages?: PrCustomPackageItem[];
	website?: string;
	companyEmail?: string;
	companyPhone?: string;
	contactPerson?: string;
	role?: string;

	// Backwards compatibility aliases
	category?: string;
	services?: PrCustomPackageItem[];
	placements?: PrCustomPackageItem[];
	reach?: number;
}

// Legacy type aliases
export type NewsPlacementItem = PrCustomPackageItem;
export type NewsOutlet = PrMedia;
export type PrServiceItem = PrCustomPackageItem;
export type PrAgency = PrMedia;
`;

fs.writeFileSync(path.join(BUMA_DIR, 'types', 'media.ts'), mediaTsContent, 'utf8');
console.log('Updated types/media.ts');

// 2. Update types/billboard.ts
const billboardTsContent = `export interface Billboard {
	_id: string;
	name: string;
	agency?: string;
	image?: string;
	images?: string[];
	description?: string;
	displayType?: string;
	billboardSize?: string;
	billboardDimensions?: string;
	availability: "available" | "booked" | "reserved" | "maintenance";
	country?: string;
	state?: string;
	city?: string;
	cityState?: string;
	latitude?: number;
	longitude?: number;
	contactPerson?: string;
	contactPersonEmail?: string;
	contactPersonPhone?: string;
	companyEmail?: string;
	companyPhone?: string;
	pricing?: {
		currency?: string;
		price?: number;
		basePrice?: number;
		priceWithMarkup?: number;
	};
}
`;

fs.writeFileSync(path.join(BUMA_DIR, 'types', 'billboard.ts'), billboardTsContent, 'utf8');
console.log('Updated types/billboard.ts');
