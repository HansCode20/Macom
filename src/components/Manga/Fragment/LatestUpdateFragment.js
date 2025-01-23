import React, {useState, useEffect} from 'react'
import LatestMangaChapters from '../LatestManga/LatestMangaChapters';
import LatestMangaVolume from '../LatestManga/LatestMangaVolume';
import { getMangaLatest } from '../../../utils/MangaApi';

const LatestUpdateFragment = () => {
    const [latestUpdatesChapter, setLatestUpdatesChapter] = useState([]);
    const [latestUpdatesVolume, setLatestUpdatesVolume] = useState([]);

    const fetchLatestManga = async () => {
        try {
            const response = await getMangaLatest();
            setLatestUpdatesChapter(response.latestUpdate.chapters);
            setLatestUpdatesVolume(response.latestUpdate.volumes)
        }  catch (error) {
            console.error('Error fetching latest manga:', error);
        }
    };

    useEffect(() => {
        fetchLatestManga();
    }, []);
  return (
    <div className='space-y-20'>
        <div>
           <LatestMangaVolume latestUpdatesVolume={latestUpdatesVolume}/>
        </div>
        <div className='space-y-10'>
            <h1 className='text-center text-2xl'>New Manga</h1>
            <LatestMangaChapters latestUpdatesChapter={latestUpdatesChapter} />
        </div>
    </div>
  )
}

export default LatestUpdateFragment