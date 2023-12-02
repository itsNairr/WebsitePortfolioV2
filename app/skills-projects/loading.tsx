import React from 'react';
import Loader from '../components/Loader';

function loading() {
    return (
        <div className="min-h-screen max-h-full pt-[120px] pb-[100px] w-full flex flex-col items-center justify-center">
            <Loader />
        </div>
    );
}

export default loading;