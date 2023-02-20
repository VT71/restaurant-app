import React from "react";
import "../../App.css";
import { useSearchParams } from "react-router-dom";

function MenuPage() {
    const [queryParameters] = useSearchParams();

    return (
        <div>
            <h2>Table: {queryParameters.get("table")}</h2>
            <h1 className="mt-4 mb-5 text-center">Menu</h1>
            <div id="carouselExample" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="w-75 mx-auto d-flex justify-content-around">
                            <div className="card w-25 d-inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body menu">
                                    <h5 className="card-title">Card title</h5>
                                    <div className="card-text">
                                        <p>Ingredients</p>
                                        <ul>
                                            <li>Ingredient1</li>
                                            <li>Ingredient2</li>
                                            <li>Ingredient3</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center">
                                    <button className="btn btn-primary">
                                        Add To Order
                                    </button>
                                </div>
                            </div>
                            <div className="card w-25 d-inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body menu">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        This is a longer card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                </div>
                                <div className="card-footer d-flex align-items-center">
                                    <div className="foodQuantityControl d-flex align-items-center">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                        >
                                            -
                                        </button>
                                        <h5 className="m-auto">1</h5>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card w-25 d-inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body menu">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        This is a longer card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="w-75 mx-auto d-flex justify-content-around">
                            <div className="card w-25 d-inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body menu">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        This is a longer card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                </div>
                            </div>
                            <div className="card w-25 d-inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body menu">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        This is a longer card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                </div>
                            </div>
                            <div className="card w-25 d-inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body menu">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        This is a longer card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="w-75 mx-auto d-flex justify-content-around">
                            <div className="card w-25 d-inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        This is a longer card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                </div>
                            </div>
                            <div className="card w-25 d-inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        This is a longer card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                </div>
                            </div>
                            <div className="card w-25 d-inline-block">
                                <img
                                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2799&q=80"
                                    className="card-img-top"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        This is a longer card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            ;
        </div>
    );
}

export default MenuPage;
