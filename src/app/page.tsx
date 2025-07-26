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
import { ProductContext } from "@/context/ProductsProvider"
export default function Home() {
  const { products }=useContext(ProductContext);
  return (
    <div className="flex flex-col space-y-2">
      <ItemsFilter/>
      {!products ?(<p className="text black">products loading..</p>):(
      <>
      <Image src={'/banner1.jpg'} alt="banner" width={700} height={200} className="w-full md:h-[250px]"/>
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
      </>)}
    </div>
  );
}
