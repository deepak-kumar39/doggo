import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
    const [breed, setBreed] = useState([]);
    const [val, setVal] = useState("");
    const [src, setSrc] = useState("https://images.dog.ceo/breeds/affenpinscher/n02110627_2157.jpg");
    const [err, setErr] = useState("");

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/list/all")
          .then((response) => response.json())
          .then((data) => setBreed(Object.entries(data.message)));
        breed &&
          setVal(
            breed.map((item, index) =>
              item[1].length > 0 ? (
                item[1].map((itm) => <option>{item[0] + " " + itm}</option>)
              ) : (
                <option>{item[0]}</option>
              )
            )
          );
      }, [breed]);
    const handleSelect = (event) => {
        let val = event.target.value.split(" ");
    let url =
      val.length > 1
        ? `https://dog.ceo/api/breed/${val[0]}/${val[1]}/images/random`
        : `https://dog.ceo/api/breed/${val[0]}/images/random`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setSrc(data.message))
      .catch(() => setErr("Breed Not Found"));
        // console.log(src);
    };
    return (
        <div className="App">
            <h1>Select Breed from the list</h1>
            <select className="box" onClick={handleSelect}>{val}</select>
            {src ? (
        <div>
              {err ? err: <img src={src} alt="dog" />}
        </div>
      ) : (
        <h3> No image to show</h3>
      )}
            <div className="container">{src.split("/")[4]}</div>
        </div>
    );
}

