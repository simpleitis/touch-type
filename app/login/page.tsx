'use client';

import Link from 'next/link';

const page = () => {
  return (
    <div>
      <p className='text-9xl font-extrabold'>Login page</p>

      <form>
        
      </form>

      <div className='padding-5 w-max border p-2'>
        <Link href='/register'>Register page</Link>
      </div>
    </div>
  );
};

export default page;
