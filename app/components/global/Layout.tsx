import {usePreviewContext} from 'hydrogen-sanity';

import Footer from '~/components/global/Footer';
import Header from '~/components/global/Header';
import {PreviewBanner} from '~/components/preview/PreviewBanner';

type LayoutProps = {
  backgroundColor?: string;
  children: React.ReactNode;
};

export function Layout({backgroundColor, children}: LayoutProps) {
  const isPreview = Boolean(usePreviewContext());

  return (
    <>
      <div className="absolute left-0 top-0">
        <a
          href="#mainContent"
          className="sr-only p-4 focus:not-sr-only focus:block"
        >
          Skip to content
        </a>
      </div>

      <div
        className="max-w-screen flex min-h-screen flex-col"
        style={{background: backgroundColor}}
      >
<<<<<<< HEAD
        {/* <Header /> */}
=======
        <Header />
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926

        <main className="relative grow" id="mainContent" role="main">
          <div className="mx-auto pb-overlap">{children}</div>
        </main>
      </div>

<<<<<<< HEAD
      {/* <Footer /> */}
=======
      <Footer />
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926

      {isPreview ? <PreviewBanner /> : <></>}
    </>
  );
}
