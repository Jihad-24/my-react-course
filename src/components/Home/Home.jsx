import { useState } from "react";
import Cart from "../Cart/Cart";
import "./Home.css"
import { useEffect } from "react";
import Swal from 'sweetalert2';

const Home = () => {
    const [allCards, setAllCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState([]);
    const [totalRemaining, setTotalRemaining] = useState(20);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch('./data.json')
            .then((res) => res.json())
            .then((data) => setAllCards(data));
    }, []);

    const handleSelectorcards = (card) => {
        const isExist = selectedCard.find((item) => item.id == card.id);
        let credit = card.credit;
        const NewPrice = totalPrice + card.price;

        if (isExist) {
            return Swal.fire({
                title: 'Already Enrolled!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }
        else {
            selectedCard.forEach((item) => {
                credit = credit + item.credit;
            });
            const totalremaining = 20 - credit;
            if (credit > 20) {
                return Swal.fire({
                    title: "You Don't Have Enough Credit!",
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
            else {
                setTotalCredit(credit);
                setTotalRemaining(totalremaining);
                setSelectedCard([...selectedCard, card]);
                setTotalPrice(NewPrice);
            }
        }
    };
    return (
        <div>
            <header>
                <h1>Course Registration</h1>
            </header>
            <div className="container">
                <div className="home-container">
                    <div className="card-container">
                        {
                            allCards.map(card => (
                                <div key={card.id} className="card">
                                    <div className="card-image">
                                        <img className="photo" src={card.image} alt="Comming Soon" />
                                    </div>
                                    <h4>{card.title}</h4>
                                    <p><small>{card.description}</small></p>
                                    <div className="info">
                                        <p>Price : ${card.price}</p>
                                        <p>Credit : {card.credit}hr</p>
                                    </div>
                                    <button className="card-btn" onClick={() => handleSelectorcards(card)}>Select</button>
                                </div>
                            ))
                        }
                    </div>
                    <div className="cart">
                        <Cart selectedCard={selectedCard} totalRemaining={totalRemaining} totalCredit={totalCredit} totalPrice={totalPrice}></Cart>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;