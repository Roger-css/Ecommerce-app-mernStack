import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "../../../components/card";

const Page = (props) => {
  const { page } = props;
  return (
    <div style={{ margin: "0 10px", backgroundColor: "white" }}>
      <h3 style={{ margin: "15px 0" }}>{page.title}</h3>
      <Carousel
        autoPlay={true}
        renderIndicator={() => {}}
        renderThumbs={() => {}}
      >
        {page.banners &&
          page.banners.map((banner, i) => {
            return (
              <a
                key={i}
                style={{ display: "block", width: "100%", height: "100%" }}
                href={banner.navigateTo}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                  }}
                  src={banner.img}
                  alt=""
                />
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
                <img
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                  src={product.img}
                  alt=""
                />
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
