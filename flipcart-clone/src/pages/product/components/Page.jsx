import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "../../../components/card";

const Page = (props) => {
  const { page } = props;
  return <div>hi</div>;
};

export default Page;
/* <>
      <h3>{page.title}</h3>
      <Carousel>
        {page.banners &&
          page.banners.map((banner, i) => {
            return (
              <a key={i} style={{ display: "block" }} href={banner.navigateTo}>
                <img src={banner.img} alt="" />
              </a>
            );
          })}
      </Carousel>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {page.products &&
          page.products.map((product, i) => {
            return (
              <Card key={i}>
                <img src={product.img} alt="" />
              </Card>
            );
          })}
      </div>
    </> 
*/