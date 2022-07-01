import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import { Button, Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useState } from "react";
import request from "../../helpers/request";

import { FormModalProduct, FormModalDelete } from "./form";
import { useEffect } from "react";
import moment from "moment";

const Dashboard = () => {
  const [productList, setProductList] = useState([]);
  const [todoProduct, setTodoProduct] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [productUpdated, setProductUpdated] = useState({});

  const AddProduct = () => {
    setTodoProduct("Add");
    setFormVisible(true);
  };

  const UpdateProduct = (data) => {
    setProductUpdated(data);
    setTodoProduct("Update");
    setFormVisible(true);
  };

  const DeleteProduct = (data) => {
    setProductUpdated(data);
    setTodoProduct("Delete");
    setFormVisible(true);
  };

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

  const bgColorSoft = {
    backgroundColor: "#55789b",
    color: "#fff",
  };

  const bgColorHard = {
    backgroundColor: "#476582",
    color: "#fff",
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center p-0">
        <div className="position-relative top-0 pt-4 table_width">
          <div>
            <h3 className="text-center mb-3">Product</h3>
          </div>
          <div className="px-3 py-3">
            <Button color="primary" onClick={AddProduct}>Add Product</Button>
          </div>
          <div>
            <Table hover size="sm">
              <thead>
                <tr
                  className="justify-content-center align-items-center text-center"
                  style={{ backgroundColor: "#829ebb" }}
                >
                  <th
                    style={
                      productList.length === 0
                        ? {
                            minWidth: "50px",
                            width: "5%",
                            borderRadius: "12px 0 0 12px",
                            borderBottom: "none",
                          }
                        : {
                            minWidth: "50px",
                            width: "5%",
                            borderRadius: "12px 0 0 0",
                            borderBottom: "2px solid #fff",
                          }
                    }
                  >
                    No
                  </th>
                  {productList.length === 0 ? (
                    <>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "none",
                          width: "22%",
                        }}
                      >
                        Product Name
                      </th>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "none",
                          width: "8%",
                        }}
                      >
                        Quantity
                      </th>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "none",
                          width: "17%",
                        }}
                      >
                        Price
                      </th>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "none",
                          width: "17%",
                        }}
                      >
                        Total
                      </th>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "none",
                          width: "11%",
                        }}
                      >
                        Last Update
                      </th>
                    </>
                  ) : (
                    <>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "2px solid #fff",
                          width: "22%",
                        }}
                      >
                        Product Name
                      </th>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "2px solid #fff",
                          width: "8%",
                        }}
                      >
                        Quantity
                      </th>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "2px solid #fff",
                          width: "17%",
                        }}
                      >
                        Price
                      </th>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "2px solid #fff",
                          width: "17%",
                        }}
                      >
                        Total
                      </th>
                      <th
                        style={{
                          minWidth: "50px",
                          borderBottom: "2px solid #fff",
                          width: "11%",
                        }}
                      >
                        Last Update
                      </th>
                    </>
                  )}

                  <th
                    style={
                      productList.length === 0
                        ? {
                            minWidth: "50px",
                            width: "20%",
                            borderRadius: "0 12px 12px 0",
                            borderBottom: "none",
                          }
                        : {
                            minWidth: "50px",
                            width: "20%",
                            borderRadius: "0 12px 0 0",
                            borderBottom: "2px solid #fff",
                          }
                    }
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, index) => (
                  <tr
                    key={index}
                    style={index % 2 === 0 ? bgColorSoft : bgColorHard}
                  >
                    <th
                      scope="row"
                      className="align-middle text-center"
                      style={
                        index === productList.length - 1
                          ? { borderRadius: "0 0 0 12px", borderBottom: "none" }
                          : null
                      }
                    >
                      {index + 1}.
                    </th>
                    <td
                      className="align-middle"
                      style={
                        index === productList.length - 1
                          ? { borderBottom: "none" }
                          : null
                      }
                    >
                      {item.product}
                    </td>
                    <td
                      className="align-middle text-center"
                      style={
                        index === productList.length - 1
                          ? { borderBottom: "none" }
                          : null
                      }
                    >
                      {item.quantity}
                    </td>
                    <td
                      className="align-middle text-end"
                      style={
                        index === productList.length - 1
                          ? { borderBottom: "none" }
                          : null
                      }
                    >
                      {formatCurrent(item.price)}
                    </td>
                    <td
                      className="align-middle text-end"
                      style={
                        index === productList.length - 1
                          ? { borderBottom: "none" }
                          : null
                      }
                    >
                      {isNaN(item.quantity * item.price)
                        ? 0
                        : formatCurrent(item.quantity * item.price)}
                    </td>
                    <td
                      className="align-middle text-end"
                      style={
                        index === productList.length - 1
                          ? { borderBottom: "none" }
                          : null
                      }
                    >
                      {item.updateAt === 0
                        ? "-"
                        : moment(item.updateAt).format("DD/MM/YYYY")}
                    </td>
                    <td
                      className="align-middle"
                      style={
                        index === productList.length - 1
                          ? { borderRadius: "0 0 12px 0", borderBottom: "none" }
                          : null
                      }
                    >
                      <div className="d-flex justify-content-center wrap_btn">
                        <Button
                          onClick={() => UpdateProduct(item)}
                          className="me-1 py-1 px-2"
                          color="warning"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => DeleteProduct(item)}
                          className="ms-1 py-1 px-2"
                          color="danger"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Modal
            isOpen={formVisible}
            toggle={() => setFormVisible(!formVisible)}
            style={{ top: "15%", left: "0%" }}
          >
            <ModalHeader className="bg_color_modal">{`${todoProduct} Product`}</ModalHeader>
            <ModalBody className="bg_color_modal">
              {todoProduct === "Delete" ? (
                <FormModalDelete
                  type={todoProduct}
                  productUpdated={productUpdated}
                  setFormVisible={setFormVisible}
                  fetchData={fetchData}
                />
              ) : (
                <FormModalProduct
                  type={todoProduct}
                  productUpdated={productUpdated}
                  setFormVisible={setFormVisible}
                  fetchData={fetchData}
                />
              )}
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
