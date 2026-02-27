"use client";
import Image from "next/image";
import { useState } from "react";

function GaleryImage({ img }) {
  const [bigImage, setBigImage] = useState(img[0]);
  const handelBigImage = (ima) => {
    setBigImage(ima);
  };
  return (
    <section className="bg-white">
      <div className="flex flex-col-reverse md:flex-row lg:flex-row  pt-10">
        {/* Image */}
        <div className="flex flex-row justify-center lg:justify-start  md:flex-col gap-2 mt-4 md:mx-4  lg:mt-0 lg:mx-4">
          {img?.map((image, index) => (
            <div key={index} className="bg-gray-100 border border-gray-300 rounded-md">
              <Image
                src={image}
                width={100}
                height={100}
                            style={{ width: '100%', height: 'auto' }} 

                alt="image product"
                className="object-cover object-center cursor-pointer "
                onClick={() => handelBigImage(image)}
              />
            </div>
          ))}
        </div>
        <div className="bg-gray-100 relative border border-gray-300 rounded-md">
          <Image
            src={bigImage}
            width={500}
            height={500}
            
            priority
            style={{ width: '100%', height: 'auto' }} 
            alt="image product"
            className="object-contain object-center"
          />
        </div>
      </div>
      
    </section>
  );
}

export default GaleryImage;
