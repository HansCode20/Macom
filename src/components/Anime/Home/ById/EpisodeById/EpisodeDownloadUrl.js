import React from 'react'

const EpisodeDownloadUrl = ({ downloadUrls }) => {
  return (
    <div className='container mx-auto w-full mt-10 p-4  rounded-lg'>
      {downloadUrls.map((batch, batchIndex) => (
        <div key={`batch-${batchIndex}`} className='space-y-5 mt-10'>
          <h2 className='text-2xl font-semibold mt-5 pb-2 border-b border-gray-500'>{batch.title}</h2>

          <div className='space-y-4'>
            {batch.qualities && batch.qualities.length > 0 ? (
              batch.qualities.map((quality, qualityIndex) => (
                <div key={`quality-${qualityIndex}`} className='bg-gray-800 p-2'>
                  <h4 className='text-lg font-medium mb-2 '>{quality.title}</h4>

                  <div className='flex flex-wrap gap-5'>
                    {quality.urls && quality.urls.length > 0 ? (
                      quality.urls.map((link, linkIndex) => (
                        <a
                          key={`link-${linkIndex}-${link.url}`}
                          href={link.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className="text-sm text-white/60 hover:text-white px-3 py-1 bg-gray-900 rounded"
                        >
                          {link.title}
                        </a>
                      ))
                    ) : (
                      <p>Not Found Urls quality</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Not Found qualities</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EpisodeDownloadUrl;
