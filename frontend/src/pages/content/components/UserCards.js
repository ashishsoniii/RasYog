import React from "react";

function Cards({ cardsData }) {
  return (
    <section className="Cards cards-middle">
      {cardsData.map((card, index) => (
        <div className="">
          <div key={index} className="card   ">
            <div className="image-container ">
              <img className="" src={card.imageSrc} alt={card.content} />
            </div>
            <img src="" alt="" />
            <h1 className="text-xl font-bold">{card.content}</h1>
            <h2 className="tracking-wide">{card.post}</h2>
            <ul className="cards__list ">
              {card.link1.icon && (
                <li>
                  <i className="fab fa-linkedin-in">
                    <a href={card.link1.url} target="__blank">
                      {card.link1.icon}
                    </a>
                  </i>
                </li>
              )}
              {card.link2 && (
                <li>
                  <i className="fab fa-linkedin-in">
                    <a href={card.link2.url} target="__blank">
                      {card.link2.icon}
                    </a>
                  </i>
                </li>
              )}
              {card.link3 && (
                <li>
                  <i className="fab fa-linkedin-in">
                    <a href={card.link3.url} target="__blank">
                      {card.link3.icon}
                    </a>
                  </i>
                </li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Cards;
