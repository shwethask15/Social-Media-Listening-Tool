import React from 'react';
import SmlShow from './Sml-Show'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLiveVerbatims } from '../redux/slice/slice';


const SmlList = () => {
    const dispatch = useDispatch();
    const { liveVerbatims } = useSelector((state) => state.liveVerbatims);

    useEffect(() => {
        dispatch(fetchLiveVerbatims());
    }, [dispatch]);

    let data = liveVerbatims;

    let count = data.length
    return (
        <div>
            <div className='smlHeading'>
                <p>Live Trending Verbatims - SML</p>
                <p>Count: {count}</p>
            </div>
            <div>
                {data.map((item, index) => (
                    <SmlShow key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default SmlList;
