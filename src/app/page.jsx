import React from "react";
import Hero from "./_Compenents/_header/Hero";
import NewProducts from "./_Compenents/NewProducts";
import Features from "./_Compenents/Features";

function page() {
  return (
  
    <main>
      <div className=" ">
        <Hero />
        <Features />
        <NewProducts />
      </div>
    </main>
  );
}

export default page;
