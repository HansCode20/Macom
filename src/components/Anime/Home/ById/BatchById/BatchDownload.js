import React from 'react'

const BatchDownload = ({downloadUrls}) => {
  return (
    <div className='container mx-auto w-full mt-5 p-4 bg-[#222222] rounded-lg'>
        <h1 className='text-3xl font-semibold'>Link Download</h1>
        {downloadUrls.map((batch) => (
            <div className='space-y-5 mt-10'>
                <h2 className='text-2xl font-semibold mt-5 pb-2 border-b border-gray-500'>{batch.title}</h2>

                <div className='space-y-4'>
                    {batch.qualities && batch.qualities.length > 0 ? (
                        batch.qualities.map((quality) => (
                            <div className='bg-gray-800 p-2'>
                                <h4 className='text-lg font-medium mb-2 '>{quality.title}</h4>

                                <div className='flex flex-wrap gap-5'>
                                    {quality.urls && quality.urls.length > 0 ? (
                                        quality.urls.map((link) => (
                                            <a  
                                             key={link.url} 
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
  )
}

export default BatchDownload;