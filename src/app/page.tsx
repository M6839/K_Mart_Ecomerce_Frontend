'use client'
import ItemsFilter from "@/components/ItemsFilter";
import Image from "next/image";
import MensFashion from "@/components/MensFashion";
import WomensFashion from "@/components/WomensFashion";
import Mobiles from "@/components/Mobiles";
import TVs from "@/components/TVs";
import Books from "@/components/Books";
import Watches from "@/components/Watches";
import Kitchen from "@/components/Kitchen"
import Electronics from "@/components/Electronics";
import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { ProductContext } from "@/context/ProductsProvider"
export default function Home() {
  const { loading }=useContext(ProductContext);
  if (loading) {
    return (
      <p className="text-black text-center pt-16 text-2xl min-h-screen">Products loading...</p>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
     <ItemsFilter/>
     <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} autoplay={true} autoplaySpeed={3000}>
     <div> <Image src={'/banner1.jpg'} alt="banner" width={700} height={200} className="w-full h-[100px] md:h-[280px]"/></div>
     <div> <Image src={'/banner2.jpg'} alt="banner" width={700} height={200} className="w-full h-[100px] md:h-[280px]"/></div>
     <div> <Image src={'/banner3.jpg'} alt="banner" width={700} height={200} className="w-full h-[100px] md:h-[280px]"/></div>
          <div> <Image src={'/banner4.jpg'} alt="banner" width={700} height={200} className="w-full h-[100px] md:h-[280px]"/></div>
     </Slider>
      <Mobiles/>
      <Books/>
      <TVs/>
      <Watches/>
      <Kitchen/>
      <Electronics/>
      <Image src={'/GentsBanner.gif'} alt="banner" width={700} height={200} className="w-full md:h-[250px]"/>
      <MensFashion/>
       <Image src={'/LadiesBanner.gif'} alt="banner" width={700} height={200} className="w-full md:h-[250px]"/>
      <WomensFashion/>
    </div>
  );
}
