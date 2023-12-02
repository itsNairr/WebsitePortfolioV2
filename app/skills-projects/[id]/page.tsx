import React from 'react';

function page({params} : any) {
    const {id} = params
    return (
        <div className="min-h-screen max-h-full pt-[120px] pb-[100px] w-full">
            {id}
        </div>
    );
}

export default page;