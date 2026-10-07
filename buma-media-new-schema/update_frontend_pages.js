const fs = require('fs');
const path = require('path');

const BUMA_DIR = 'C:\\Users\\Admin\\Documents\\GitHub\\buma';

// 1. Update app/tv/page.tsx
const tvPageContent = `"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ListSpace from "@/components/ListSpace";
import CategorySwitcher from "@/components/categories/CategorySwitcher";
import CategoryWaitlist from "@/components/categories/CategoryWaitlist";
import { sanity } from "@/lib/sanity";
import { GET_TV_STATIONS } from "@/lib/queries";
import { TvStation } from "@/types/media";
import { logo as defaultLogo } from "@/assets";
import {
	countTvRateCards,
	formatLabel,
	formatPriceValue,
	formatTvLowestPrice,
	getTvPricingGroups,
} from "@/components/mediaFormatters";

const TvSkeleton = () => (
	<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
		<div className="mb-5 flex items-center justify-between">
			<div className="h-14 w-14 animate-pulse rounded-xl bg-gray-100" />
			<div className="h-7 w-24 animate-pulse rounded-full bg-gray-100" />
		</div>
		<div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
		<div className="mb-6 h-4 w-1/2 animate-pulse rounded bg-gray-100" />
		<div className="mb-6 grid grid-cols-2 gap-2">
			<div className="h-16 animate-pulse rounded-xl bg-gray-100" />
			<div className="h-16 animate-pulse rounded-xl bg-gray-100" />
		</div>
		<div className="h-12 animate-pulse rounded-xl bg-gray-200" />
	</div>
);

const TvDetailModal = ({
	station,
	onClose,
}: {
	station: TvStation | null;
	onClose: () => void;
}) => {
	if (!station) return null;

	const pricingGroups = getTvPricingGroups(station);
	const message = encodeURIComponent(
		\`Hi, I am interested in placing ads on \${station.name}\`,
	);
	const whatsappUrl = \`https://wa.me/2347040925563?text=\${message}\`;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
			<div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn">
				<div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
					<div className="flex items-center gap-4">
						<div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
							<Image
								src={station.logo || defaultLogo}
								alt={station.name}
								width={64}
								height={64}
								className="h-full w-full object-contain"
							/>
						</div>
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
								{formatLabel(station.category)} TV Station
							</p>
							<h2 className="mt-1 text-xl font-bold text-gray-950">{station.name}</h2>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
						aria-label="Close TV station details"
					>
						<Icon icon="mdi:close" className="text-2xl" />
					</button>
				</div>

				<div className="max-h-[calc(92vh-96px)] overflow-y-auto p-5">
					<div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Transmission Type
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{formatLabel(station.transmissionType)}
							</p>
						</div>
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Coverage
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{station.coverage?.join(", ") || "Not specified"}
							</p>
						</div>
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Rate Cards
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{countTvRateCards(station)}
							</p>
						</div>
					</div>

					{station.advertType?.length ? (
						<section className="mb-5 rounded-xl border border-gray-100 p-4">
							<h3 className="mb-3 text-sm font-bold text-gray-950">Advert Formats Accepted</h3>
							<div className="flex flex-wrap gap-2">
								{station.advertType.map((type) => (
									<span
										key={type}
										className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
									>
										{formatLabel(type)}
									</span>
								))}
							</div>
						</section>
					) : null}

					{station.programmes?.length ? (
						<section className="mb-5 rounded-xl border border-gray-100 p-4">
							<h3 className="mb-3 text-sm font-bold text-gray-950">Programmes</h3>
							<div className="flex flex-wrap gap-2">
								{station.programmes.map((programme) => (
									<span
										key={programme}
										className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
									>
										{programme}
									</span>
								))}
							</div>
						</section>
					) : null}

					{(station.mediaOwner || station.website || station.contactPerson) && (
						<section className="mb-5 rounded-xl border border-gray-100 p-4">
							<h3 className="mb-3 text-sm font-bold text-gray-950">Station Details</h3>
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
								{station.mediaOwner && (
									<div>
										<span className="text-gray-400">Media Owner: </span>
										<span className="font-semibold text-gray-800">{station.mediaOwner}</span>
									</div>
								)}
								{station.ownershipGroup && (
									<div>
										<span className="text-gray-400">Ownership Group: </span>
										<span className="font-semibold text-gray-800">{station.ownershipGroup}</span>
									</div>
								)}
								{station.website && (
									<div>
										<span className="text-gray-400">Website: </span>
										<a href={station.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-purple underline">
											{station.website}
										</a>
									</div>
								)}
								{station.contactPerson && (
									<div>
										<span className="text-gray-400">Contact Person: </span>
										<span className="font-semibold text-gray-800">{station.contactPerson} ({station.role || "Manager"})</span>
									</div>
								)}
							</div>
						</section>
					)}

					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						{pricingGroups.map((group) => (
							<section
								key={group.title}
								className="rounded-xl border border-gray-100 p-4"
							>
								<div className="mb-3 flex items-center gap-2">
									<Icon icon={group.icon} className="h-5 w-5 text-slate-600" />
									<h3 className="text-sm font-bold text-gray-950">{group.title}</h3>
								</div>
								{group.items.length ? (
									<div className="space-y-2">
										{group.items.map((item) => (
											<div
												key={\`\${group.title}-\${item.label}\`}
												className="rounded-lg bg-gray-50 px-3 py-2"
											>
												<div className="flex items-center justify-between gap-4">
													<span className="text-sm font-medium text-gray-700">
														{item.label}
													</span>
													<span className="text-sm font-bold text-gray-950">
														{formatPriceValue(item.price)}
													</span>
												</div>
												{item.description && (
													<p className="mt-1 text-xs text-gray-400">{item.description}</p>
												)}
											</div>
										))}
									</div>
								) : (
									<p className="text-sm text-gray-400">No price entered</p>
								)}
							</section>
						))}
					</div>

					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 font-semibold text-white transition hover:bg-slate-700"
					>
						<Icon icon="mdi:whatsapp" className="h-5 w-5" />
						Request TV plan
					</a>
				</div>
			</div>
		</div>
	);
};

const TVPage = () => {
	const [stations, setStations] = useState<TvStation[]>([]);
	const [selectedStation, setSelectedStation] = useState<TvStation | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchStations = async () => {
			try {
				setIsLoading(true);
				const data = await sanity.fetch<TvStation[]>(GET_TV_STATIONS);
				setStations(data || []);
			} catch (fetchError) {
				console.error(fetchError);
				setError("We could not load TV stations right now.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchStations();
	}, []);

	const filteredStations = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();
		if (!normalizedSearch) return stations;

		return stations.filter((station) =>
			[
				station.name,
				station.category,
				station.transmissionType,
				station.mediaOwner,
				...(station.coverage || []),
				...(station.programmes || []),
				...(station.advertType || []),
				...getTvPricingGroups(station).flatMap((group) => [
					group.title,
					...group.items.map((item) => item.label),
				]),
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase()
				.includes(normalizedSearch),
		);
	}, [searchTerm, stations]);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value && resultsRef.current) {
			resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			<section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-primary-purple px-6 py-24 text-center text-white md:py-32">
				<div className="absolute inset-0 opacity-15 pattern-dots" />

				<div className="relative z-10 mx-auto max-w-4xl space-y-8">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-100 backdrop-blur-md">
						<span className="flex h-2 w-2 rounded-full bg-green-400" />
						TV media options
					</div>

					<h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
						TV Advertising
					</h1>

					<p className="mx-auto max-w-2xl text-xl leading-relaxed text-purple-100/90 md:text-2xl">
						Search live TV stations, transmission types, programmes and rate options for
						your campaign.
					</p>

					<div className="mx-auto mt-12 max-w-2xl">
						<div className="relative">
							<input
								type="text"
								placeholder="Search stations, coverage, transmission or programmes..."
								className="w-full rounded-full bg-white py-5 pl-14 pr-12 text-lg text-gray-900 shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-purple-400/50"
								value={searchTerm}
								onChange={(event) => handleSearch(event.target.value)}
							/>
							<Icon
								icon="mdi:magnify"
								className="absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-primary-purple"
							/>
							{searchTerm && (
								<button
									type="button"
									onClick={() => handleSearch("")}
									className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-gray-100"
									aria-label="Clear search"
								>
									<Icon icon="mdi:close" className="h-5 w-5 text-gray-400" />
								</button>
							)}
						</div>
					</div>

					<div className="flex flex-wrap justify-center gap-3 text-sm">
						<span className="text-purple-200/70">Popular:</span>
						{["National", "Commercial", "Terrestrial", "Satellite", "Sponsored"].map((tag) => (
							<button
								key={tag}
								type="button"
								onClick={() => handleSearch(tag)}
								className="rounded-md px-3 py-1 text-purple-100 transition hover:bg-white/10 hover:text-white"
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			</section>

			<CategorySwitcher activeHref="/tv" />

			<main ref={resultsRef} className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
				<div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm font-semibold text-slate-600">Television Media</p>
						<h2 className="text-2xl font-bold text-gray-900">
							{isLoading
								? "Loading stations"
								: \`\${filteredStations.length} station\${filteredStations.length === 1 ? "" : "s"} found\`}
						</h2>
					</div>
				</div>

				{error && (
					<div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-700">
						{error}
					</div>
				)}

				{isLoading ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map((_, index) => (
							<TvSkeleton key={index} />
						))}
					</div>
				) : filteredStations.length === 0 ? (
					<CategoryWaitlist
						icon="mdi:television-classic"
						title="No TV stations available yet"
						description="TV station options will appear here once they are ready. You can still request a curated TV plan from the team."
						searchTerm={searchTerm}
					/>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredStations.map((station) => {
							const coverage = station.coverage?.join(", ") || "Coverage pending";
							const programmes =
								station.programmes?.join(", ") || "Programmes pending";
							const message = encodeURIComponent(
								\`Hi, I am interested in placing ads on \${station.name}\`,
							);
							const whatsappUrl = \`https://wa.me/2347040925563?text=\${message}\`;

							return (
								<article
									key={station._id}
									className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
								>
									<div>
										<div className="relative z-10 mb-4 flex items-start justify-between">
											<div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
												<Image
													src={station.logo || defaultLogo}
													alt={station.name}
													width={56}
													height={56}
													className="h-full w-full object-contain"
												/>
											</div>
											{station.category && (
												<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
													{formatLabel(station.category)}
												</span>
											)}
										</div>

										<h3 className="relative z-10 mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-slate-700">
											{station.name}
										</h3>

										<div className="relative z-10 mb-6 space-y-2 text-xs text-gray-500">
											{station.transmissionType && (
												<p className="flex items-center gap-2">
													<Icon icon="mdi:access-point" className="h-4 w-4 text-primary-purple" />
													{formatLabel(station.transmissionType)}
												</p>
											)}
											<p className="flex items-center gap-2">
												<Icon icon="mdi:map-marker" className="h-4 w-4" />
												{coverage}
											</p>
											<p className="flex items-center gap-2">
												<Icon icon="mdi:television-classic" className="h-4 w-4" />
												{programmes}
											</p>
										</div>

										<div className="relative z-10 mb-6 grid grid-cols-2 gap-2">
											<div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
												<p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
													Category
												</p>
												<p className="text-sm font-bold text-gray-800">
													{formatLabel(station.category)}
												</p>
											</div>
											<div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
												<p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
													Price From
												</p>
												<p className="text-sm font-bold text-gray-800">
													{formatTvLowestPrice(station)}
												</p>
											</div>
										</div>

										<div className="relative z-10 mb-6 flex flex-wrap gap-2">
											{(station.runOfSpotPricing || []).slice(0, 2).map((item) => (
												<span
													key={item.duration}
													className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
												>
													{formatLabel(item.duration)}
												</span>
											))}
											{(station.advertSpotPricing || []).slice(0, 2).map((item) => (
												<span
													key={\`advert-\${item.duration}\`}
													className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
												>
													{formatLabel(item.duration)}
												</span>
											))}
										</div>
									</div>

									<button
										type="button"
										onClick={() => setSelectedStation(station)}
										className="relative z-10 mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 transition hover:border-slate-400 hover:text-slate-700"
									>
										<Icon icon="mdi:table-eye" className="h-5 w-5" />
										View full rate card
									</button>

									<a
										href={whatsappUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 font-semibold text-white shadow-lg shadow-gray-200 transition hover:bg-slate-700 hover:shadow-slate-300/40"
									>
										<Icon icon="mdi:whatsapp" className="h-5 w-5" />
										Book Ad Slot
									</a>
								</article>
							);
						})}
					</div>
				)}
			</main>

			<TvDetailModal
				station={selectedStation}
				onClose={() => setSelectedStation(null)}
			/>

			<ListSpace />
		</div>
	);
};

export default TVPage;
`;

fs.writeFileSync(path.join(BUMA_DIR, 'app', 'tv', 'page.tsx'), tvPageContent, 'utf8');
console.log('Updated app/tv/page.tsx');

// 2. Update app/radio/page.tsx
const radioPageContent = `"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ListSpace from "@/components/ListSpace";
import CategorySwitcher from "@/components/categories/CategorySwitcher";
import CategoryWaitlist from "@/components/categories/CategoryWaitlist";
import { sanity } from "@/lib/sanity";
import { GET_RADIO_STATIONS } from "@/lib/queries";
import { RadioStation } from "@/types/media";
import { logo as defaultLogo } from "@/assets";
import {
	countRadioRateCards,
	formatLabel,
	formatPriceValue,
	formatRadioLowestPrice,
	getRadioPricingGroups,
} from "@/components/mediaFormatters";

const formatNumber = (value?: number) =>
	typeof value === "number" ? new Intl.NumberFormat("en-NG").format(value) : "N/A";

const RadioSkeleton = () => (
	<div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
		<div className='mb-5 flex items-center justify-between'>
			<div className='h-14 w-14 animate-pulse rounded-xl bg-gray-100' />
			<div className='h-7 w-24 animate-pulse rounded-full bg-gray-100' />
		</div>
		<div className='mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200' />
		<div className='mb-6 h-4 w-1/2 animate-pulse rounded bg-gray-100' />
		<div className='mb-6 grid grid-cols-2 gap-2'>
			<div className='h-16 animate-pulse rounded-xl bg-gray-100' />
			<div className='h-16 animate-pulse rounded-xl bg-gray-100' />
		</div>
		<div className='h-12 animate-pulse rounded-xl bg-gray-200' />
	</div>
);

const RadioDetailModal = ({
	station,
	onClose,
}: {
	station: RadioStation | null;
	onClose: () => void;
}) => {
	if (!station) return null;

	const pricingGroups = getRadioPricingGroups(station);
	const message = encodeURIComponent(
		\`Hi, I'm interested in placing ads on \${station.name}\`,
	);
	const whatsappUrl = \`https://wa.me/2347040925563?text=\${message}\`;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6'>
			<div className='max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn'>
				<div className='flex items-start justify-between gap-4 border-b border-gray-100 p-5'>
					<div className='flex items-center gap-4'>
						<div className='flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm'>
							<Image
								src={station.logo || station.image || defaultLogo}
								alt={station.name}
								width={64}
								height={64}
								className='h-full w-full object-contain'
							/>
						</div>
						<div>
							<p className='text-xs font-bold uppercase tracking-[0.18em] text-primary-purple'>
								{station.frequency || "Radio Station"}
							</p>
							<h2 className='mt-1 text-xl font-bold text-gray-950'>
								{station.name}
							</h2>
						</div>
					</div>
					<button
						type='button'
						onClick={onClose}
						className='rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900'
						aria-label='Close radio details'
					>
						<Icon icon='mdi:close' className='text-2xl' />
					</button>
				</div>

				<div className='max-h-[calc(92vh-96px)] overflow-y-auto p-5'>
					<div className='mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3'>
						<div className='rounded-xl bg-gray-50 p-4'>
							<p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
								Listenership
							</p>
							<p className='mt-1 text-sm font-bold text-gray-900'>
								{formatNumber(station.listenership)}
							</p>
						</div>
						<div className='rounded-xl bg-gray-50 p-4'>
							<p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
								Coverage
							</p>
							<p className='mt-1 text-sm font-bold text-gray-900'>
								{station.coverage?.join(", ") || station.location || "Not specified"}
							</p>
						</div>
						<div className='rounded-xl bg-gray-50 p-4'>
							<p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
								Rate Cards
							</p>
							<p className='mt-1 text-sm font-bold text-gray-900'>
								{countRadioRateCards(station)}
							</p>
						</div>
					</div>

					{station.programmeType?.length ? (
						<section className='mb-5 rounded-xl border border-gray-100 p-4'>
							<h3 className='mb-3 text-sm font-bold text-gray-950'>Programme Types</h3>
							<div className='flex flex-wrap gap-2'>
								{station.programmeType.map((type) => (
									<span
										key={type}
										className='rounded-full bg-accent-purple px-3 py-1 text-xs font-semibold text-primary-purple'
									>
										{formatLabel(type)}
									</span>
								))}
							</div>
						</section>
					) : null}

					{station.programmes?.length ? (
						<section className='mb-5 rounded-xl border border-gray-100 p-4'>
							<h3 className='mb-3 text-sm font-bold text-gray-950'>
								Programmes
							</h3>
							<div className='flex flex-wrap gap-2'>
								{station.programmes.map((programme) => (
									<span
										key={programme}
										className='rounded-full bg-accent-purple px-3 py-1 text-xs font-semibold text-primary-purple'
									>
										{programme}
									</span>
								))}
							</div>
						</section>
					) : null}

					{(station.mediaOwner || station.website || station.contactPerson) && (
						<section className='mb-5 rounded-xl border border-gray-100 p-4'>
							<h3 className='mb-3 text-sm font-bold text-gray-950'>Station Contacts & Owner</h3>
							<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs'>
								{station.mediaOwner && (
									<div>
										<span className='text-gray-400'>Media Owner: </span>
										<span className='font-semibold text-gray-800'>{station.mediaOwner}</span>
									</div>
								)}
								{station.website && (
									<div>
										<span className='text-gray-400'>Website: </span>
										<a href={station.website} target='_blank' rel='noopener noreferrer' className='font-semibold text-primary-purple underline'>
											{station.website}
										</a>
									</div>
								)}
								{station.contactPerson && (
									<div>
										<span className='text-gray-400'>Contact: </span>
										<span className='font-semibold text-gray-800'>{station.contactPerson} ({station.role || "Manager"})</span>
									</div>
								)}
							</div>
						</section>
					)}

					<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
						{pricingGroups.map((group) => (
							<section
								key={group.title}
								className='rounded-xl border border-gray-100 p-4'
							>
								<div className='mb-3 flex items-center gap-2'>
									<Icon
										icon={group.icon}
										className='h-5 w-5 text-primary-purple'
									/>
									<h3 className='text-sm font-bold text-gray-950'>
										{group.title}
									</h3>
								</div>
								{group.items.length ? (
									<div className='space-y-2'>
										{group.items.map((item) => (
											<div
												key={\`\${group.title}-\${item.label}\`}
												className='flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-3 py-2'
											>
												<span className='text-sm font-medium text-gray-700'>
													{item.label}
												</span>
												<span className='text-sm font-bold text-gray-950'>
													{formatPriceValue(item.price)}
												</span>
											</div>
										))}
									</div>
								) : (
									<p className='text-sm text-gray-400'>No price entered</p>
								)}
							</section>
						))}
					</div>

					<a
						href={whatsappUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-purple px-4 py-3.5 font-semibold text-white transition hover:bg-primary-purple-dark'
					>
						<Icon icon='mdi:whatsapp' className='h-5 w-5' />
						Request radio plan
					</a>
				</div>
			</div>
		</div>
	);
};

const RadioPage = () => {
	const [stations, setStations] = useState<RadioStation[]>([]);
	const [selectedStation, setSelectedStation] = useState<RadioStation | null>(
		null,
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchStations = async () => {
			try {
				setIsLoading(true);
				const data = await sanity.fetch<RadioStation[]>(GET_RADIO_STATIONS);
				setStations(data || []);
			} catch (fetchError) {
				console.error(fetchError);
				setError("We could not load radio stations right now.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchStations();
	}, []);

	const filteredStations = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();
		if (!normalizedSearch) return stations;

		return stations.filter((station) =>
			[
				station.name,
				station.frequency,
				station.location,
				station.mediaOwner,
				...(station.coverage || []),
				...(station.programmes || []),
				...(station.programmeType || []),
				...(station.language || []),
				...getRadioPricingGroups(station).flatMap((group) => [
					group.title,
					...group.items.map((item) => item.label),
				]),
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase()
				.includes(normalizedSearch),
		);
	}, [searchTerm, stations]);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value && resultsRef.current) {
			resultsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<div className='flex min-h-screen flex-col bg-gray-50'>
			<section className='relative overflow-hidden bg-gradient-to-br from-primary-purple via-purple-700 to-indigo-900 px-6 py-24 text-center text-white md:py-32'>
				<div className='absolute inset-0 opacity-20 pattern-dots'></div>

				<div className='relative z-10 mx-auto max-w-4xl space-y-8'>
					<div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-100 backdrop-blur-md'>
						<span className='flex h-2 w-2 rounded-full bg-green-400'></span>
						Radio media options
					</div>

					<h1 className='text-5xl font-extrabold tracking-tight md:text-7xl'>
						Radio Advertising
					</h1>

					<p className='mx-auto max-w-2xl text-xl leading-relaxed text-purple-100/90 md:text-2xl'>
						Search live radio stations, frequencies, coverage areas, programmes and rate
						options for your campaign.
					</p>

					<div className='mx-auto mt-12 max-w-2xl'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search stations, frequencies, coverage or programmes...'
								className='w-full rounded-full bg-white py-5 pl-14 pr-12 text-lg text-gray-900 shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-purple-400/50'
								value={searchTerm}
								onChange={(event) => handleSearch(event.target.value)}
							/>
							<Icon
								icon='mdi:magnify'
								className='absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-primary-purple'
							/>
							{searchTerm && (
								<button
									type='button'
									onClick={() => handleSearch("")}
									className='absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-gray-100'
									aria-label='Clear search'
								>
									<Icon icon='mdi:close' className='h-5 w-5 text-gray-400' />
								</button>
							)}
						</div>
					</div>
				</div>
			</section>

			<CategorySwitcher activeHref='/radio' />

			<main
				ref={resultsRef}
				className='mx-auto w-full max-w-7xl flex-1 px-6 py-12'
			>
				<div className='mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
					<div>
						<p className='text-sm font-semibold text-primary-purple'>
							Radio Inventory
						</p>
						<h2 className='text-2xl font-bold text-gray-900'>
							{isLoading
								? "Loading stations"
								: \`\${filteredStations.length} station\${
										filteredStations.length === 1 ? "" : "s"
									} found\`}
						</h2>
					</div>
				</div>

				{error && (
					<div className='mb-6 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-700'>
						{error}
					</div>
				)}

				{isLoading ? (
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{Array.from({ length: 6 }).map((_, index) => (
							<RadioSkeleton key={index} />
						))}
					</div>
				) : filteredStations.length === 0 ? (
					<CategoryWaitlist
						icon='mdi:radio-tower'
						title='No radio stations available yet'
						description='Radio station options will appear here once they are ready. You can still request a curated radio plan from the team.'
						searchTerm={searchTerm}
					/>
				) : (
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{filteredStations.map((station) => {
							const coverage = station.coverage?.join(", ") || station.location || "Coverage pending";
							const programmes =
								station.programmes?.join(", ") || "Programmes pending";
							const message = encodeURIComponent(
								\`Hi, I'm interested in placing ads on \${station.name}\`,
							);
							const whatsappUrl = \`https://wa.me/2347040925563?text=\${message}\`;

							return (
								<article
									key={station._id}
									className='group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl'
								>
									<div>
										<div className='relative z-10 mb-4 flex items-start justify-between'>
											<div className='flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm'>
												<Image
													src={station.logo || station.image || defaultLogo}
													alt={station.name}
													width={56}
													height={56}
													className='h-full w-full object-contain'
												/>
											</div>
											{station.frequency && (
												<span className='rounded-full bg-accent-purple px-3 py-1 text-xs font-bold text-primary-purple'>
													{station.frequency}
												</span>
											)}
										</div>

										<h3 className='relative z-10 mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-primary-purple'>
											{station.name}
										</h3>

										<div className='relative z-10 mb-6 space-y-2 text-xs text-gray-500'>
											<p className='flex items-center gap-2'>
												<Icon icon='mdi:map-marker' className='h-4 w-4' />
												{coverage}
											</p>
											<p className='flex items-center gap-2'>
												<Icon icon='mdi:playlist-music' className='h-4 w-4' />
												{programmes}
											</p>
										</div>

										<div className='relative z-10 mb-6 grid grid-cols-2 gap-2'>
											<div className='rounded-xl border border-gray-100 bg-gray-50 p-3'>
												<p className='mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400'>
													Transmission
												</p>
												<p className='text-sm font-bold text-gray-800'>
													{formatLabel(station.transmissionType) || "FM Radio"}
												</p>
											</div>
											<div className='rounded-xl border border-gray-100 bg-gray-50 p-3'>
												<p className='mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400'>
													Price From
												</p>
												<p className='text-sm font-bold text-gray-800'>
													{formatRadioLowestPrice(station)}
												</p>
											</div>
										</div>

										<div className='relative z-10 mb-6 flex flex-wrap gap-2'>
											{(station.beltPricing || []).slice(0, 3).map((item) => (
												<span
													key={item.belt}
													className='rounded-full bg-accent-purple px-3 py-1 text-xs font-semibold text-primary-purple'
												>
													{formatLabel(item.belt)}
												</span>
											))}
										</div>
									</div>

									<button
										type='button'
										onClick={() => setSelectedStation(station)}
										className='relative z-10 mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 transition hover:border-primary-purple hover:text-primary-purple'
									>
										<Icon icon='mdi:table-eye' className='h-5 w-5' />
										View full rate card
									</button>

									<a
										href={whatsappUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 font-semibold text-white shadow-lg shadow-gray-200 transition hover:bg-primary-purple hover:shadow-primary-purple/30'
									>
										<Icon icon='mdi:whatsapp' className='h-5 w-5' />
										Book Ad Slot
									</a>
								</article>
							);
						})}
					</div>
				)}
			</main>

			<RadioDetailModal
				station={selectedStation}
				onClose={() => setSelectedStation(null)}
			/>

			<ListSpace />
		</div>
	);
};

export default RadioPage;
`;

fs.writeFileSync(path.join(BUMA_DIR, 'app', 'radio', 'page.tsx'), radioPageContent, 'utf8');
console.log('Updated app/radio/page.tsx');

// 3. Update app/pr/page.tsx (Unified PR x Media)
const prPageContent = `"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ListSpace from "@/components/ListSpace";
import CategorySwitcher from "@/components/categories/CategorySwitcher";
import CategoryWaitlist from "@/components/categories/CategoryWaitlist";
import { sanity } from "@/lib/sanity";
import { GET_PR_MEDIA } from "@/lib/queries";
import { PrMedia } from "@/types/media";
import { logo as defaultLogo } from "@/assets";
import {
	formatLabel,
	formatPrLowestPrice,
	formatPriceValue,
	getPrMediaPricingItems,
} from "@/components/mediaFormatters";

const PrSkeleton = () => (
	<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
		<div className="mb-5 flex items-center justify-between">
			<div className="h-14 w-14 animate-pulse rounded-xl bg-gray-100" />
			<div className="h-7 w-24 animate-pulse rounded-full bg-gray-100" />
		</div>
		<div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
		<div className="mb-6 h-4 w-1/2 animate-pulse rounded bg-gray-100" />
		<div className="mb-6 grid grid-cols-2 gap-2">
			<div className="h-16 animate-pulse rounded-xl bg-gray-100" />
			<div className="h-16 animate-pulse rounded-xl bg-gray-100" />
		</div>
		<div className="h-12 animate-pulse rounded-xl bg-gray-200" />
	</div>
);

const PrDetailModal = ({
	media,
	onClose,
}: {
	media: PrMedia | null;
	onClose: () => void;
}) => {
	if (!media) return null;

	const pricingItems = getPrMediaPricingItems(media);
	const message = encodeURIComponent(
		\`Hi, I am interested in PR and media placements with \${media.name}\`,
	);
	const whatsappUrl = \`https://wa.me/2347040925563?text=\${message}\`;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
			<div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-fadeIn">
				<div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
					<div className="flex items-center gap-4">
						<div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
							<Image
								src={media.logo || defaultLogo}
								alt={media.name}
								width={64}
								height={64}
								className="h-full w-full object-contain"
							/>
						</div>
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
								{media.mediaCategories?.map(formatLabel).join(", ") || formatLabel(media.category) || "PR x Media"}
							</p>
							<h2 className="mt-1 text-xl font-bold text-gray-950">{media.name}</h2>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
						aria-label="Close details"
					>
						<Icon icon="mdi:close" className="text-2xl" />
					</button>
				</div>

				<div className="max-h-[calc(92vh-96px)] overflow-y-auto p-5 space-y-5">
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Coverage / Circulation
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{media.coverage?.join(", ") || "Not specified"}
							</p>
						</div>
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Location
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{media.location || "Nigeria"}
							</p>
						</div>
						<div className="rounded-xl bg-gray-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								Rates & Placements
							</p>
							<p className="mt-1 text-sm font-bold text-gray-900">
								{pricingItems.length}
							</p>
						</div>
					</div>

					{media.contentCategory?.length ? (
						<section className="rounded-xl border border-gray-100 p-4">
							<h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Content Categories</h3>
							<div className="flex flex-wrap gap-2">
								{media.contentCategory.map((cat) => (
									<span key={cat} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
										{formatLabel(cat)}
									</span>
								))}
							</div>
						</section>
					) : null}

					{media.audienceType?.length ? (
						<section className="rounded-xl border border-gray-100 p-4">
							<h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Audience Types</h3>
							<div className="flex flex-wrap gap-2">
								{media.audienceType.map((aud) => (
									<span key={aud} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
										{formatLabel(aud)}
									</span>
								))}
							</div>
						</section>
					) : null}

					{pricingItems.length > 0 && (
						<section className="rounded-xl border border-gray-100 p-4">
							<div className="mb-3 flex items-center gap-2">
								<Icon icon="mdi:cash-multiple" className="h-5 w-5 text-emerald-600" />
								<h3 className="text-sm font-bold text-gray-950">Standard Rates & Placements</h3>
							</div>
							<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
								{pricingItems.map((item, index) => (
									<div key={\`\${item.label}-\${index}\`} className="rounded-lg bg-gray-50 px-4 py-3">
										<div className="flex items-center justify-between gap-4">
											<div>
												<p className="text-sm font-semibold text-gray-800">{item.label}</p>
												{item.category && <p className="text-[10px] text-gray-400">{item.category}</p>}
											</div>
											<p className="text-sm font-bold text-gray-950">{formatPriceValue(item.price)}</p>
										</div>
										{item.description && (
											<p className="mt-1 text-xs text-gray-500">{item.description}</p>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					{(media.website || media.companyEmail || media.companyPhone || media.contactPerson) && (
						<section className="rounded-xl border border-gray-100 p-4">
							<h3 className="mb-3 text-sm font-bold text-gray-950">Contact & Company Info</h3>
							<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-gray-700">
								{media.website && (
									<p><strong>Website:</strong> <a href={media.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">{media.website}</a></p>
								)}
								{media.companyEmail && <p><strong>Email:</strong> {media.companyEmail}</p>}
								{media.companyPhone && <p><strong>Phone:</strong> {media.companyPhone}</p>}
								{media.contactPerson && <p><strong>Contact:</strong> {media.contactPerson} ({media.role || "Lead"})</p>}
							</div>
						</section>
					)}

					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
					>
						<Icon icon="mdi:whatsapp" className="h-5 w-5" />
						Enquire About Placements
					</a>
				</div>
			</div>
		</div>
	);
};

const PRPage = () => {
	const [mediaList, setMediaList] = useState<PrMedia[]>([]);
	const [selectedMedia, setSelectedMedia] = useState<PrMedia | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const resultsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchMedia = async () => {
			try {
				setIsLoading(true);
				const data = await sanity.fetch<PrMedia[]>(GET_PR_MEDIA);
				setMediaList(data || []);
			} catch (fetchError) {
				console.error(fetchError);
				setError("We could not load PR & Media outlets right now.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchMedia();
	}, []);

	const filteredMedia = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();
		if (!normalizedSearch) return mediaList;

		return mediaList.filter((item) =>
			[
				item.name,
				item.category,
				item.location,
				...(item.mediaCategories || []),
				...(item.coverage || []),
				...(item.contentCategory || []),
				...(item.audienceType || []),
				...getPrMediaPricingItems(item).map((p) => p.label),
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase()
				.includes(normalizedSearch),
		);
	}, [searchTerm, mediaList]);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		if (value && resultsRef.current) {
			resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			<section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-800 px-6 py-24 text-center text-white md:py-32">
				<div className="absolute inset-0 opacity-10 pattern-dots" />

				<div className="relative z-10 mx-auto max-w-4xl space-y-8">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-100 backdrop-blur-md">
						<span className="flex h-2 w-2 rounded-full bg-green-400" />
						PR x Media Options
					</div>

					<h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
						PR &amp; Media Placements
					</h1>

					<p className="mx-auto max-w-2xl text-xl leading-relaxed text-emerald-100/90 md:text-2xl">
						Publish rate cards, public notices, press releases and sponsored positions across top print and digital media agencies.
					</p>

					<div className="mx-auto mt-12 max-w-2xl">
						<div className="relative">
							<input
								type="text"
								placeholder="Search agencies, publications, positions or markets..."
								className="w-full rounded-full bg-white py-5 pl-14 pr-12 text-lg text-gray-900 shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
								value={searchTerm}
								onChange={(event) => handleSearch(event.target.value)}
							/>
							<Icon
								icon="mdi:magnify"
								className="absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-emerald-600"
							/>
							{searchTerm && (
								<button
									type="button"
									onClick={() => handleSearch("")}
									className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-gray-100"
									aria-label="Clear search"
								>
									<Icon icon="mdi:close" className="h-5 w-5 text-gray-400" />
								</button>
							)}
						</div>
					</div>

					<div className="flex flex-wrap justify-center gap-3 text-sm">
						<span className="text-emerald-200/70">Popular:</span>
						{["Print", "Online News", "Public Notice", "Product Launch", "Politics"].map(
							(tag) => (
								<button
									key={tag}
									type="button"
									onClick={() => handleSearch(tag)}
									className="rounded-md px-3 py-1 text-emerald-100 transition hover:bg-white/10 hover:text-white"
								>
									{tag}
								</button>
							),
						)}
					</div>
				</div>
			</section>

			<CategorySwitcher activeHref="/pr" />

			<main ref={resultsRef} className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
				<div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm font-semibold text-emerald-600">PR x Media Inventory</p>
						<h2 className="text-2xl font-bold text-gray-900">
							{isLoading
								? "Loading outlets"
								: \`\${filteredMedia.length} outlet\${filteredMedia.length === 1 ? "" : "s"} found\`}
						</h2>
					</div>
				</div>

				{error && (
					<div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-medium text-red-700">
						{error}
					</div>
				)}

				{isLoading ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map((_, index) => (
							<PrSkeleton key={index} />
						))}
					</div>
				) : filteredMedia.length === 0 ? (
					<CategoryWaitlist
						icon="mdi:newspaper-variant-outline"
						title="No PR x Media outlets available yet"
						description="PR and media placements will appear here once they are ready. You can still request a curated PR plan from the team."
						searchTerm={searchTerm}
					/>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredMedia.map((media) => {
							const message = encodeURIComponent(
								\`Hi, I am interested in PR services from \${media.name}\`,
							);
							const whatsappUrl = \`https://wa.me/2347040925563?text=\${message}\`;
							const pricingItems = getPrMediaPricingItems(media);

							return (
								<article
									key={media._id}
									className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
								>
									<div>
										<div className="relative z-10 mb-4 flex items-start justify-between">
											<div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
												<Image
													src={media.logo || defaultLogo}
													alt={media.name}
													width={56}
													height={56}
													className="h-full w-full object-contain"
												/>
											</div>
											{media.mediaCategories?.[0] && (
												<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
													{formatLabel(media.mediaCategories[0])}
												</span>
											)}
										</div>

										<h3 className="relative z-10 mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-emerald-700">
											{media.name}
										</h3>

										<div className="relative z-10 mb-6 space-y-2 text-xs text-gray-500">
											<p className="flex items-center gap-2">
												<Icon icon="mdi:map-marker" className="h-4 w-4" />
												{media.coverage?.join(", ") || media.location || "Circulation pending"}
											</p>
										</div>

										<div className="relative z-10 mb-6 grid grid-cols-2 gap-2">
											<div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
												<p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
													Placements
												</p>
												<p className="text-sm font-bold text-gray-800">
													{pricingItems.length}
												</p>
											</div>
											<div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
												<p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
													Price From
												</p>
												<p className="text-sm font-bold text-gray-800">
													{formatPrLowestPrice(media)}
												</p>
											</div>
										</div>

										{pricingItems.length > 0 && (
											<div className="relative z-10 mb-6 flex flex-wrap gap-2">
												{pricingItems.slice(0, 3).map((item, i) => (
													<span
														key={\`\${item.label}-\${i}\`}
														className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
													>
														{item.label}
													</span>
												))}
											</div>
										)}
									</div>

									<button
										type="button"
										onClick={() => setSelectedMedia(media)}
										className="relative z-10 mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 transition hover:border-emerald-400 hover:text-emerald-700"
									>
										<Icon icon="mdi:table-eye" className="h-5 w-5" />
										View rate card &amp; services
									</button>

									<a
										href={whatsappUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3.5 font-semibold text-white shadow-lg shadow-gray-200 transition hover:bg-emerald-700 hover:shadow-emerald-300/30"
									>
										<Icon icon="mdi:whatsapp" className="h-5 w-5" />
										Enquire Now
									</a>
								</article>
							);
						})}
					</div>
				)}
			</main>

			<PrDetailModal
				media={selectedMedia}
				onClose={() => setSelectedMedia(null)}
			/>

			<ListSpace />
		</div>
	);
};

export default PRPage;
`;

fs.writeFileSync(path.join(BUMA_DIR, 'app', 'pr', 'page.tsx'), prPageContent, 'utf8');
console.log('Updated app/pr/page.tsx');

// 4. Update app/news/page.tsx to redirect or render PR x Media
const newsPageContent = `"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewsRedirect() {
	const router = useRouter();
	useEffect(() => {
		router.replace("/pr");
	}, [router]);

	return null;
}
`;

fs.writeFileSync(path.join(BUMA_DIR, 'app', 'news', 'page.tsx'), newsPageContent, 'utf8');
console.log('Updated app/news/page.tsx');
