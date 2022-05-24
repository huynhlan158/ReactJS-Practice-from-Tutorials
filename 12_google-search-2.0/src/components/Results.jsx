import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { useResultContext } from '../contexts/ResultContextProvider'
import Loading from './Loading'

function Results () {
    const { results, isLoading, searchTerm, getResults } = useResultContext()
    const location = useLocation()

    useEffect(() => {
        if(searchTerm) {
            if(location.pathname === '/video') {
                getResults(`/search/q=${searchTerm} videos`)
            } else {
                getResults(`${location.pathname}/q=${searchTerm}&num=40`)
            }
        }
    }, [searchTerm, location.pathname])

    if(isLoading) return <Loading />

    switch (location.pathname) {
        case '/search':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
                    {results?.map(({ link, title }, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={link} target="_blank" rel="noreferrer">
                                <p className="text-sm">
                                    {link.length > 30 ? `${link.substring(0, 30)}..` : link}
                                </p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            )
        case '/image':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results?.map(({ image, link: {href, title}}, index) => (
                        <a key={index} href={href} className="sm:p-3 p-5" target='_blank' rel='noreferrer'>
                            <img src={image?.src} alt={title} loading='lazy' />
                            <p className="w-36 break-word text-s, ,t-2">{title}</p>
                        </a>
                    ))}
                </div>
            )
        case '/news':
            return (
                <div className="flex flex-wrap justify-between item-centers space-y-6 sm:px-56">
                    {results.map(({ links, source, title }, index) => {
                        return (
                            <div key={index} className="md:w-2/5 w-full">
                            <a href={links?.[0].href} target="_blank" rel="noreferrer" className="hover:underline">
                                <p className="text-lg dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                            <div className="flex gap-4">
                                <a href={source?.href} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300">
                                    {source?.href}
                                </a>
                            </div>
                        </div>
                        )
                    })}
                </div>
            )
        case '/video':
            return(
                <div className="flex flex-wrap">
                    {results.map(({additional_links}, index) => {
                        return (
                            <div key={index} className="p-2">
                                {additional_links?.[0]?.href && <ReactPlayer url={additional_links?.[0].href} control="true" width='355px' height='200px'/>}
                            </div>
                        )
                    })}
                </div>
            )
        default:
            return 'ERROR'
    }
}

export default Results