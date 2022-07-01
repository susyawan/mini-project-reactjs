import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import { Button, Form, FormGroup, Input } from "reactstrap";
import request from "../../helpers/request";
import { useEffect } from "react";
import { useState } from "react";

const FormModalProduct = ({
  type,
  productUpdated,
  setFormVisible,
  fetchData,
}) => {
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const firstCapital = (str) => {
    const result = str.split(" ");
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i][0].toUpperCase() + result[i].substr(1);
    }
    return result.join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Add") {
      await request
        .post("/product", {
          product: firstCapital(product),
          quantity: quantity,
          price: price,
          createAt: Date.now(),
          updateAt: 0,
        })
        .then(() => fetchData())
        .catch((err) => console.log(err));
    } else {
      await request
        .put(
          `/product/${productUpdated.id}`,
          {
            product: firstCapital(product),
            quantity: quantity,
            price: price,
            updateAt: Date.now(),
          },
          {
            params: productUpdated.id,
          }
        )
        .then(() => fetchData())
        .catch((err) => console.log(err));
    }
    alert(`Success ${type} ${firstCapital(product)}`);
    setFormVisible(false);
  };

  useEffect(() => {
    if (type === "Update") {
      setProduct(productUpdated.product);
      setQuantity(productUpdated.quantity);
      setPrice(productUpdated.price);
    }
  }, [type, productUpdated]);

  return (
    <>
      <Form>
        <FormGroup>
          <div className="input-group py-2">
            <div className="input-group-text w-25 justify-content-end">
              Product :
            </div>
            <Input
              value={product}
              placeholder="Product"
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className="input-group py-2">
            <div className="input-group-text w-25 justify-content-end">
              Quantity :
            </div>
            <Input
              value={quantity}
              placeholder="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
          <div className="input-group py-2">
            <div className="input-group-text w-25 justify-content-end">
              Price :
            </div>
            <Input
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button color="primary" onClick={handleSubmit} className="me-1">
            {type}
          </Button>
          <Button onClick={() => setFormVisible(false)} className="ms-1">
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

const FormModalDelete = ({
  type,
  productUpdated,
  setFormVisible,
  fetchData,
}) => {
  const [product, setProduct] = useState();
  const handleDelete = async (e) => {
    e.preventDefault();
    await request
      .delete(`/product/${productUpdated.id}`, productUpdated.id, {
        params: productUpdated.id,
      })
      .then(() => fetchData())
      .catch((err) => console.log(err));
    setFormVisible(false);
  };

  useEffect(() => {
    if (type === "Delete") {
      setProduct(productUpdated.product);
    }
  }, [type, productUpdated]);

  return (
    <>
      <Form>
        <div className="p-2">
          Delete <strong style={{color: 'black'}}>" {product} "</strong> ?
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Button color="danger" onClick={handleDelete}>{type}</Button>&nbsp;&nbsp;
          <Button onClick={() => setFormVisible(false)}>Cancel</Button>
        </div>
      </Form>
    </>
  );
};

export { FormModalProduct, FormModalDelete };
