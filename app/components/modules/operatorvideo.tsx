interface OperatorVideoProps {
  module: {
    youtubeUrl?: string;
    thumbnail?: any;
  };
}
 
export function OperatorVideo({module}: OperatorVideoProps) {
  const {youtubeUrl, thumbnail} = module;
 
  // console.log('🎯 OperatorVideo COMPONENT CALLED!');
  // console.log('📝 Module data:', module);
 
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };
 
  return (
    <section className="bg-[#F9F9F9]  py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="mx-auto max-w-[1184px]">
        {/* <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Anytime Mailbox explained by a Mailbox Operator
          </h2>
          <p className="text-gray-600">Watch on YouTube</p>
        </div> */}
        
        <div className="bg-white rounded-[20px] overflow-hidden">
          {youtubeUrl ? (
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(youtubeUrl)}`}
                title="Operator Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          ) : thumbnail?.asset?.url ? (
            <img
              src={thumbnail.asset.url}
              alt="Video Thumbnail"
              className="w-full h-auto"
            />
          ) : (
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Video content</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}