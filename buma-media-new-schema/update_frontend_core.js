const fs = require('fs');
const path = require('path');

const BUMA_DIR = 'C:\\Users\\Admin\\Documents\\GitHub\\buma';

// 1. Update lib/queries.ts
const queriesContent = `export const GET_BILLBOARDS = \`
*[_type == "billboard"] | order(_createdAt desc) {
  _id,
  name,
  agency,
  "image": images[0].asset->url,
  "images": images[].asset->url,
  description,
  displayType,
  billboardSize,
  billboardDimensions,
  availability,
  country,
  state,
  city,
  cityState,
  latitude,
  longitude,
  contactPerson,
  contactPersonEmail,
  contactPersonPhone,
  companyEmail,
  companyPhone,
  pricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  }
}
\`;

export const GET_RADIO_STATIONS = \`
*[_type == "radioStation"] | order(_createdAt desc) {
  _id,
  name,
  frequency,
  "logo": logo.asset->url,
  "image": image.asset->url,
  transmissionType,
  coverage,
  programmes,
  programmeType,
  language,
  location,
  mediaOwner,
  website,
  stationManager,
  contactPerson,
  role,
  listenership,
  spotAdvertPricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  announcementPricing[] {
    wordCount,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  jinglesPricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  liveAppearancePricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  sponsoredProgrammePricing[] {
    duration,
    timeBand,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  onAirHypePricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  "onAirHypePricingItems": onAirHypePricing[] {
    duration,
    timeBand,
    wordCount,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  beltPricing[] {
    belt,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  }
}
\`;

export const GET_INFLUENCERS = \`
*[_type == "influencer"] | order(_createdAt desc) {
  _id,
  name,
  "image": image.asset->url,
  location,
  language,
  contentCategory,
  platform,
  manager,
  managementTeam,
  managementEmail,
  postPricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  igFollowers,
  facebookFollowers,
  ytSubscribers,
  ytViews,
  tiktokFollowers,
  category
}
\`;

export const GET_TV_STATIONS = \`
*[_type == "tvStation"] | order(_createdAt desc) {
  _id,
  name,
  "logo": logo.asset->url,
  category,
  transmissionType,
  advertType,
  mediaOwner,
  ownershipGroup,
  website,
  stationManager,
  contactPerson,
  role,
  phoneNumber,
  email,
  programmes,
  coverage,
  runOfSpotPricing[] {
    duration,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  advertSpotPricing[] {
    duration,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  liveCoveragePricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  guestAppearancePricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  sponsoredProgrammePricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  announcementPricing[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  }
}
\`;

export const GET_PR_MEDIA = \`
*[_type in ["prMedia", "prAgency", "newsOutlet"]] | order(_createdAt desc) {
  _id,
  name,
  "logo": logo.asset->url,
  mediaCategories,
  category,
  coverage,
  location,
  contentCategory,
  audienceType,
  publicNoticeBlackPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  productsColourPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  productsBlackPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  politicsColorPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  politicsBlackPricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  allureRatePricing {
    currency,
    "price": coalesce(price, basePrice, priceWithMarkup),
    basePrice,
    priceWithMarkup
  },
  specialPositions[] {
    position,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  customPackages[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  services[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  placements[] {
    name,
    description,
    pricing {
      currency,
      "price": coalesce(price, basePrice, priceWithMarkup),
      basePrice,
      priceWithMarkup
    }
  },
  website,
  companyEmail,
  companyPhone,
  contactPerson,
  role
}
\`;

export const GET_NEWS_OUTLETS = GET_PR_MEDIA;
export const GET_PR_AGENCIES = GET_PR_MEDIA;
`;

fs.writeFileSync(path.join(BUMA_DIR, 'lib', 'queries.ts'), queriesContent, 'utf8');
console.log('Updated lib/queries.ts');

// 2. Update components/mediaFormatters.ts
const mediaFormattersContent = `import { Pricing, RadioStation, TvStation, PrMedia } from "@/types/media";

export const formatLabel = (value?: string) => {
	if (!value) return "Not specified";

	return (
		value
			.split(":")
			.pop()
			?.replace(/_/g, " ")
			.replace(/\\b\\w/g, (char) => char.toUpperCase()) || value
	);
};

export const getPriceAmount = (pricing?: Pricing): number | undefined => {
	if (!pricing) return undefined;
	const amount = pricing.price ?? pricing.basePrice ?? pricing.priceWithMarkup;
	return typeof amount === "number" ? amount : undefined;
};

export const formatPriceValue = (pricing?: Pricing) => {
	const amount = getPriceAmount(pricing);

	if (typeof amount !== "number") return "Request quote";

	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: (pricing?.currency || "ngn").toUpperCase(),
		maximumFractionDigits: 0,
	}).format(amount);
};

// Radio helpers

export const getRadioPricingGroups = (station: RadioStation) => [
	{
		title: "Belt Pricing",
		icon: "mdi:clock-time-four-outline",
		items: (station.beltPricing || []).map((item) => ({
			label: formatLabel(item.belt),
			price: item.pricing,
		})),
	},
	{
		title: "Jingles Pricing",
		icon: "mdi:music-note",
		items: (station.jinglesPricing || []).map((item) => ({
			label: formatLabel(item.duration || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "Sponsored Programme Pricing",
		icon: "mdi:television-play",
		items: (station.sponsoredProgrammePricing || []).map((item) => ({
			label: formatLabel(item.duration || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "Spot Advert Pricing",
		icon: "mdi:bullhorn-outline",
		items: (station.spotAdvertPricing || []).map((item) => ({
			label: formatLabel(item.duration || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "Live Appearance Pricing",
		icon: "mdi:microphone-variant",
		items: (station.liveAppearancePricing || []).map((item) => ({
			label: formatLabel(item.duration || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "Announcement Pricing",
		icon: "mdi:message-text-outline",
		items: (station.announcementPricing || []).map((item) => ({
			label: formatLabel(item.wordCount || item.timeBand),
			price: item.pricing,
		})),
	},
	{
		title: "On-Air Hype Pricing",
		icon: "mdi:radio-handheld",
		items: station.onAirHypePricingItems?.length
			? station.onAirHypePricingItems.map((item) => ({
					label: formatLabel(item.duration || item.wordCount || item.timeBand),
					price: item.pricing,
				}))
			: station.onAirHypePricing
				? [{ label: "Standard package", price: station.onAirHypePricing }]
				: [],
	},
];

export const getLowestRadioPrice = (station: RadioStation) => {
	const prices = getRadioPricingGroups(station)
		.flatMap((group) => group.items)
		.map((item) => getPriceAmount(item.price))
		.filter((price): price is number => typeof price === "number");

	if (!prices.length) return undefined;

	return Math.min(...prices);
};

export const formatRadioLowestPrice = (station: RadioStation) => {
	const amount = getLowestRadioPrice(station);
	if (typeof amount !== "number") return "Request quote";

	const firstPricing = getRadioPricingGroups(station)
		.flatMap((group) => group.items)
		.find((item) => getPriceAmount(item.price) === amount)?.price;

	return formatPriceValue({
		currency: firstPricing?.currency,
		price: amount,
	});
};

export const countRadioRateCards = (station: RadioStation) =>
	getRadioPricingGroups(station).reduce(
		(total, group) => total + group.items.length,
		0,
	);

// TV helpers

export const getTvPricingGroups = (station: TvStation) => [
	{
		title: "Run of Spot",
		icon: "mdi:television-play",
		isTimedDuration: true,
		items: (station.runOfSpotPricing || []).map((item) => ({
			label: formatLabel(item.duration),
			price: item.pricing,
			description: undefined,
		})),
	},
	{
		title: "Advert Spot",
		icon: "mdi:bullhorn-outline",
		isTimedDuration: true,
		items: (station.advertSpotPricing || []).map((item) => ({
			label: formatLabel(item.duration),
			price: item.pricing,
			description: undefined,
		})),
	},
	{
		title: "Live Coverage",
		icon: "mdi:broadcast",
		isTimedDuration: false,
		items: (station.liveCoveragePricing || []).map((item) => ({
			label: item.name || "Package",
			price: item.pricing,
			description: item.description,
		})),
	},
	{
		title: "Guest Appearance",
		icon: "mdi:account-voice",
		isTimedDuration: false,
		items: (station.guestAppearancePricing || []).map((item) => ({
			label: item.name || "Package",
			price: item.pricing,
			description: item.description,
		})),
	},
	{
		title: "Sponsored Programme",
		icon: "mdi:star-circle-outline",
		isTimedDuration: false,
		items: (station.sponsoredProgrammePricing || []).map((item) => ({
			label: item.name || "Package",
			price: item.pricing,
			description: item.description,
		})),
	},
	{
		title: "Announcement",
		icon: "mdi:message-text-outline",
		isTimedDuration: false,
		items: (station.announcementPricing || []).map((item) => ({
			label: item.name || "Package",
			price: item.pricing,
			description: item.description,
		})),
	},
];

export const getTvLowestPrice = (station: TvStation) => {
	const prices = getTvPricingGroups(station)
		.flatMap((g) => g.items)
		.map((i) => getPriceAmount(i.price))
		.filter((p): p is number => typeof p === "number");
	return prices.length ? Math.min(...prices) : undefined;
};

export const formatTvLowestPrice = (station: TvStation) => {
	const amount = getTvLowestPrice(station);
	if (typeof amount !== "number") return "Request quote";
	const firstPricing = getTvPricingGroups(station)
		.flatMap((g) => g.items)
		.find((i) => getPriceAmount(i.price) === amount)?.price;
	return formatPriceValue({ currency: firstPricing?.currency, price: amount });
};

export const countTvRateCards = (station: TvStation) =>
	getTvPricingGroups(station).reduce((t, g) => t + g.items.length, 0);

// PR x Media helpers

export const getPrMediaPricingItems = (media: PrMedia) => {
	const items: { label: string; price?: Pricing; description?: string; category?: string }[] = [];

	if (media.publicNoticeBlackPricing) {
		items.push({ label: "Public Notice (B&W)", price: media.publicNoticeBlackPricing, category: "Standard Rate" });
	}
	if (media.productsColourPricing) {
		items.push({ label: "Products (Colour)", price: media.productsColourPricing, category: "Standard Rate" });
	}
	if (media.productsBlackPricing) {
		items.push({ label: "Products (B&W)", price: media.productsBlackPricing, category: "Standard Rate" });
	}
	if (media.politicsColorPricing) {
		items.push({ label: "Politics (Colour)", price: media.politicsColorPricing, category: "Standard Rate" });
	}
	if (media.politicsBlackPricing) {
		items.push({ label: "Politics (B&W)", price: media.politicsBlackPricing, category: "Standard Rate" });
	}
	if (media.allureRatePricing) {
		items.push({ label: "Allure Rate", price: media.allureRatePricing, category: "Standard Rate" });
	}

	(media.specialPositions || []).forEach((pos) => {
		items.push({
			label: formatLabel(pos.position),
			price: pos.pricing,
			description: pos.description,
			category: "Special Position",
		});
	});

	(media.customPackages || media.services || media.placements || []).forEach((pkg) => {
		items.push({
			label: pkg.name || "Custom Package",
			price: pkg.pricing,
			description: pkg.description,
			category: "Custom Package",
		});
	});

	return items;
};

export const getPrLowestPrice = (media: PrMedia) => {
	const prices = getPrMediaPricingItems(media)
		.map((item) => getPriceAmount(item.price))
		.filter((p): p is number => typeof p === "number");
	return prices.length ? Math.min(...prices) : undefined;
};

export const formatPrLowestPrice = (media: PrMedia) => {
	const amount = getPrLowestPrice(media);
	if (typeof amount !== "number") return "Request quote";
	const firstPricing = getPrMediaPricingItems(media).find(
		(item) => getPriceAmount(item.price) === amount,
	)?.price;
	return formatPriceValue({ currency: firstPricing?.currency, price: amount });
};

export const getNewsLowestPrice = getPrLowestPrice;
export const formatNewsLowestPrice = formatPrLowestPrice;
`;

fs.writeFileSync(path.join(BUMA_DIR, 'components', 'mediaFormatters.ts'), mediaFormattersContent, 'utf8');
console.log('Updated components/mediaFormatters.ts');

// 3. Update components/BillboardModal.tsx
const billboardModalContent = `"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { bbill } from "@/assets";
import { Billboard } from "@/types/billboard";

interface BillboardModalProps {
	billboard: Billboard | null;
	onClose: () => void;
}

const formatLabel = (value?: string) => {
	if (!value) return "Not specified";

	return value
		.split(":")
		.pop()
		?.replace(/_/g, " ")
		.replace(/\\b\\w/g, (char) => char.toUpperCase()) || value;
};

const formatPrice = (billboard: Billboard) => {
	const amount = billboard.pricing?.price ?? billboard.pricing?.basePrice ?? billboard.pricing?.priceWithMarkup;

	if (typeof amount !== "number") return "Request quote";

	const currency = (billboard.pricing?.currency || "ngn").toUpperCase();

	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency,
		maximumFractionDigits: 0,
	}).format(amount);
};

const BillboardModal = ({ billboard, onClose }: BillboardModalProps) => {
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	if (!billboard) return null;

	const galleryImages =
		billboard.images?.length ? billboard.images : billboard.image ? [billboard.image] : [];
	const imageSrc = galleryImages[activeImageIndex] || billboard.image || bbill;
	const details = [
		["Agency", billboard.agency || billboard.name],
		["Display Type", formatLabel(billboard.displayType)],
		["Billboard Size", formatLabel(billboard.billboardSize)],
		["Dimensions", billboard.billboardDimensions || "Not specified"],
		["Location", formatLabel(billboard.cityState || [billboard.city, billboard.state].filter(Boolean).join(", "))],
		["Country", formatLabel(billboard.country)],
		["Availability", formatLabel(billboard.availability)],
		["Price", formatPrice(billboard)],
	];

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6'>
			<div className='max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn'>
				<div className='flex items-start justify-between gap-4 border-b border-gray-100 p-5'>
					<div>
						<p className='text-xs font-bold uppercase tracking-[0.18em] text-primary-purple'>
							OOH Billboard
						</p>
						<h2 className='mt-1 text-xl font-bold text-gray-950'>
							{billboard.name}
						</h2>
					</div>
					<button
						type='button'
						onClick={onClose}
						className='rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900'
						aria-label='Close billboard details'
					>
						<Icon icon='mdi:close' className='text-2xl' />
					</button>
				</div>

				<div className='max-h-[calc(92vh-88px)] overflow-y-auto'>
					<div className='relative h-72 w-full bg-gray-100'>
						<Image
							src={imageSrc}
							alt={billboard.name}
							fill
							className='object-cover'
						/>
					</div>

					<div className='space-y-5 p-5'>
						{galleryImages.length > 1 && (
							<div className='flex gap-2 overflow-x-auto pb-1'>
								{galleryImages.map((image, index) => (
									<button
										key={image}
										type='button'
										onClick={() => setActiveImageIndex(index)}
										className={\`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border \${
											index === activeImageIndex
												? "border-primary-purple"
												: "border-gray-100"
										}\`}
										aria-label={\`Show billboard image \${index + 1}\`}
									>
										<Image
											src={image}
											alt={\`\${billboard.name} \${index + 1}\`}
											fill
											className='object-cover'
										/>
									</button>
								))}
							</div>
						)}

						<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
							{details.map(([label, value]) => (
								<div key={label} className='rounded-xl bg-gray-50 p-4'>
									<p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
										{label}
									</p>
									<p className='mt-1 text-sm font-semibold text-gray-900'>
										{value}
									</p>
								</div>
							))}
						</div>

						{billboard.description && (
							<div className='rounded-xl border border-gray-100 p-4'>
								<h3 className='text-sm font-bold text-gray-950'>
									Description
								</h3>
								<p className='mt-2 text-sm leading-6 text-gray-600'>
									{billboard.description}
								</p>
							</div>
						)}

						{(billboard.contactPerson || billboard.companyEmail || billboard.companyPhone) && (
							<div className='rounded-xl border border-gray-100 p-4'>
								<h3 className='mb-2 text-sm font-bold text-gray-950'>Contact & Inquiries</h3>
								<div className='space-y-1 text-xs text-gray-600'>
									{billboard.contactPerson && <p><strong>Contact:</strong> {billboard.contactPerson}</p>}
									{billboard.companyEmail && <p><strong>Email:</strong> {billboard.companyEmail}</p>}
									{billboard.companyPhone && <p><strong>Phone:</strong> {billboard.companyPhone}</p>}
								</div>
							</div>
						)}

						<div className='rounded-xl border border-gray-100 p-4'>
							<div className='mb-3 flex items-center gap-2'>
								<Icon
									icon='mdi:cash-multiple'
									className='h-5 w-5 text-primary-purple'
								/>
								<h3 className='text-sm font-bold text-gray-950'>Pricing</h3>
							</div>
							<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
								<div className='rounded-lg bg-gray-50 p-3'>
									<p className='text-xs text-gray-400'>Currency</p>
									<p className='mt-1 text-sm font-bold text-gray-900'>
										{billboard.pricing?.currency?.toUpperCase() || "NGN"}
									</p>
								</div>
								<div className='rounded-lg bg-gray-50 p-3'>
									<p className='text-xs text-gray-400'>Price</p>
									<p className='mt-1 text-sm font-bold text-gray-900'>
										{formatPrice(billboard)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BillboardModal;
`;

fs.writeFileSync(path.join(BUMA_DIR, 'components', 'BillboardModal.tsx'), billboardModalContent, 'utf8');
console.log('Updated components/BillboardModal.tsx');

// 4. Update components/categories/Body.tsx
const categoriesBodyContent = fs.readFileSync(path.join(BUMA_DIR, 'components', 'categories', 'Body.tsx'), 'utf8');
const updatedCategoriesBody = categoriesBodyContent.replace(
	/const amount = billboard\.pricing\?\.priceWithMarkup;/g,
	'const amount = billboard.pricing?.price ?? billboard.pricing?.basePrice ?? billboard.pricing?.priceWithMarkup;'
);
fs.writeFileSync(path.join(BUMA_DIR, 'components', 'categories', 'Body.tsx'), updatedCategoriesBody, 'utf8');
console.log('Updated components/categories/Body.tsx');

// 5. Update utils/navigation.ts
const navigationContent = `export const headerLinks = [
	{
		title: "Home",
		link: "/",
	},
	{
		title: "Categories",
		link: "/categories",
		type: "dropdown",
	},
	{
		title: "Blog",
		link: "/blog",
	},
	{
		title: "Contact Us",
		link: "/contact",
	},
];

export const categoryData = {
	OOH: {
		title: "Out of Home (OOH)",
		href: "/categories",
		icon: "mdi:billboard",
		comingSoon: false,
		description:
			"Billboards, gantries, LEDs, wall panels and other outdoor advertising spaces.",
	},
	Radio: {
		title: "Radio Stations",
		href: "/radio",
		icon: "mdi:radio-tower",
		comingSoon: false,
		description: "Reach your audience through popular radio stations.",
	},
	TV: {
		title: "TV Stations",
		href: "/tv",
		icon: "mdi:television-classic",
		comingSoon: false,
		description: "Television advertising across national, regional and commercial channels.",
	},
	PRMedia: {
		title: "PR x Media",
		href: "/pr",
		icon: "mdi:newspaper-variant-outline",
		comingSoon: false,
		description: "Top PR agencies, newspapers, print, digital news outlets and wire placements.",
	},
	"Influencer Marketing": {
		title: "Influencer Marketing",
		href: "/influencers",
		icon: "mdi:account-star",
		comingSoon: false,
		description: "Connect with top creators and influencers to promote your brand.",
	},
};
`;

fs.writeFileSync(path.join(BUMA_DIR, 'utils', 'navigation.ts'), navigationContent, 'utf8');
console.log('Updated utils/navigation.ts');
