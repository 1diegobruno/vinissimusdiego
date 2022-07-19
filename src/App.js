import "./App.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Pagination from "@mui/material/Pagination";

function App() {
  const [vinos, setVinos] = useState([]);
  const [paginate, setPaginate] = useState([]);
  const getProducts = (x) => {
    fetch(
      "https://dummyjson.com/products?limit=8&skip=" +
        8 * x +
        "&select=title,price,images,description"
    )
      .then((res) => res.json())
      .then((res) => {
        setVinos(res.products);
        console.log(res);
        let arr = [];
        for (let i = 1; i <= res.total / 8; i++) {
          arr.push(i);
        }
        setPaginate(arr);
      });
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Container>
        <Row>
          {vinos.map((l, i) => {
            return (
              <Col key={i} sm={3}>
                <Card style={{ width: "18rem", height: 400, margin: 25 }}>
                  <div
                    style={{
                      width: "100%",
                      height: 250,
                      background: "url(" + l.images[0] + ")",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <Card.Body>
                    <Card.Title>{l.title}</Card.Title>
                    <Card.Text>{l.description}</Card.Text>
                    <div></div>
                    <div>{l.price + " €"}</div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Pagination
        count={paginate.length}
        onChange={(x, y) => {
          getProducts(y);
        }}
      />
    </div>
  );
}

export default App;
