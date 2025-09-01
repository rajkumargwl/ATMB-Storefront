import clsx from 'clsx';

import LinkButton from '~/components/elements/LinkButton';
import HeroContent from '~/components/heroes/HeroContent';
import type {SanityHeroHome} from '~/lib/sanity';

type Props = {
  hero: SanityHeroHome;
};


export default function HomeHero({ hero }: Props) {
  return (
    <section className="bg-[#F2F5F7]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
        {/* Left: text + CTA */}
        <div className="max-w-xl">
          {hero?.title && (
            <h2 className="mb-3 text-[24px] font-semibold text-slate-700">
              {hero?.title}
            </h2>
          )}

          <h1 className={clsx('text-[54px] text-slate-900')}>
              {hero?.heading || 'Run Your Business From Anywhere.'}
          </h1>

          <p className="mt-6 text-[22px] font-medium">
             {hero?.description || 'From your first business idea to scaling globally, we handle the essentials so you can focus on what matters most.'}
          </p>

          <div className="mt-8">
              <a href={hero?.buttonLink || '#'} className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white shadow hover:bg-slate-800">
                {typeof hero?.buttonText === 'object' ? hero.buttonText.label : hero?.buttonText || 'Get Started'}
              </a>
          </div>
        </div>

        {/* Right: two big background pills + small image tiles + labels */}
        <div className="relative h-[520px] w-full">
          {/* Back/right big pill */}
          <div className="absolute right-0 top-8 h-[460px] w-[270px] rounded-[150px] bg-[#E1E4E5]" />

          {/* Front/left big pill */}
          <div className="absolute left-0 top-0 h-[520px] w-[280px] rounded-[140px] bg-[#E1E4E5]" />

          {/* Small image tile on front/left pill (centered) */}
          <div className="absolute left-[146px] top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Tile />
          </div>

          {/* Small image tile on back/right pill */}
          <div className="absolute right-[84px] top-[230px]">
            <Tile />
          </div>

          {/* Floating label: top-right */}
          <div className="absolute right-4 top-16 w-[280px] rounded-full bg-white px-5 py-4 shadow-md">
            <p className="text-sm font-semibold text-slate-900">{hero?.card?.title1 || 'Aspiring Entrepreneur'}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
            {hero?.card?.subtitle1 || 'Start strong with all essentials handled from day one.'}
            </p>
          </div>

          {/* Floating label: bottom-left */}
          <div className="absolute bottom-8 left-0 w-[300px] rounded-full bg-white px-5 py-4 shadow-md">
            <p className="text-sm font-semibold text-slate-900">{hero?.card?.title2 || 'Small Business Owner'}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
            {hero?.card?.subtitle2 || 'Manage your mail, calls, and growth without missing a beat.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small image placeholder tile */
function Tile() {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-md border border-slate-400 bg-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-slate-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M8 13l2.5-3 3.5 4 2-2 3 4" />
        <circle cx="9" cy="9" r="1.2" />
      </svg>
    </div>
  );
}



// export default function HomeHero({hero}: Props) {
//   return (
//     <div
//       className={clsx(
//         'flex flex-col items-center rounded-b-xl bg-peach px-4 pb-4 pt-24',
//         'md:px-8 md:pb-8 md:pt-34',
//       )}
//     >
//       {/* Title */}
//       {hero.title && (
//         <h1
//           className={clsx(
//             'mb-7 max-w-[60rem] whitespace-pre-line text-center text-3xl',
//             'md:text-5xl',
//           )}
//         >
//           {hero.title}
//         </h1>
//       )}

//       {hero.subheading && (
//         <h1
//           className={clsx(
//             'mb-7 max-w-[60rem] whitespace-pre-line text-center text-normal',
//             'md:text-normal',
//           )}
//         >
//           {hero.subheading}
//         </h1>
//       )}

//       {/* Link */}
//       {hero.link && <LinkButton link={hero.link} />}

//       {/* Hero content */}
//       {hero.content && (
//         <div
//           className={clsx(
//             'mt-6 w-full', //
//             'md:mt-12',
//           )}
//         >
//           <HeroContent content={hero.content} />
//         </div>
//       )}
//     </div>
//   );
// }