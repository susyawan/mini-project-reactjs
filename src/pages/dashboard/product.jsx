import request from "../../helpers/request";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Header } from "../../components";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const fetchData = async () => {
    await request
      .get("/product")
      .then(({ data }) => {
        setProductList(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formatCurrent = (price, sign = "Rp.") => {
    const pieces = parseFloat(price).toFixed(0).split("");
    let ii = pieces.length;
    while ((ii -= 3) > 0) {
      pieces.splice(ii, 0, ".");
    }
    return sign + pieces.join("");
  };

  return (
    <>
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center text-center my-3">
        {productList.length === 0 ? (
          <div className="my-5">
            <h1>Product Not Found</h1>
          </div>
        ) : (
          <div className="my-4">
            <h1>Product</h1>
          </div>
        )}
        <div className="d-flex justify-content-center flex-wrap w-75">
          <div className="cont_card justify-content-center gap-3 w-100">
            {productList.length > 0
              ? productList.map((item, index) => (
                  <div className="box_card">
                    <Card>
                      <CardBody className="bg-dark">
                        <div
                          className="position-absolute rounded-circle text-light text-center bg-danger"
                          style={{ width: "30px", height: "30px" }}
                        >
                          {index + 1}
                        </div>
                        <CardTitle tag="h5">{item.product}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                          Quantity : {item.quantity}
                        </CardSubtitle>
                        <CardText>Price : {formatCurrent(item.price)}</CardText>
                      </CardBody>
                    </Card>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
