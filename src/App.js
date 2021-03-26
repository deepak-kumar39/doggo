import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
    const [breed, setBreed] = useState([]);
    const [src, setSrc] = useState("");
    const [err, setErr] = useState("");
    const defaultImg = "https://images.dog.ceo/breeds/affenpinscher/n02110627_2157.jpg";
    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/list/all")
            .then((response) => response.json())
            .then((data) => setBreed(Object.keys(data.message)));
    }, []);
    const handleSelect = (event) => {
        let val = event.target.value;
        let url = `https://dog.ceo/api/breed/${val}/images/random`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setSrc(data.message))
            .catch(() => setErr("Breed Not Found"));
        // console.log(src);
    };
    return (
        <div className="App">
            <h1>Select Breed from the list</h1>
            <select className="box" onClick={handleSelect}>
                {breed.map((item, index) => (
                    <option key={index}>{item}</option>
                ))}
            </select>
            <div>
          
              {err ? err: <img src={src || defaultImg} alt="dog" />}
          
            </div>
            <div className="container">{src.split("/")[4]}</div>
        </div>
    );
}

