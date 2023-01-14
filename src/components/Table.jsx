import React, { useState, useEffect } from "react";

import "../styles/table.css";
import star from "../assets/star.svg";
import option from "../assets/option.svg";
import axios from "axios";

function Table() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [numRows, setNumRows] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const getData = (per_page, page) => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false&price_change_percentage=24h%2C7d`
			)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		setLoading(true);
		getData(numRows, currentPage);
	}, [numRows, currentPage]);

	useEffect(() => {
		if (data.length > 0) setLoading(false);
		console.log(data);
	}, [data]);

	return (
		<>
			<div className="table">
				<div className="table-heading">
					Top 100 Cryptocurrencies by Market Cap
				</div>
				<div className="table-header">
					<div className="tag-container">
						<div
							className="tag"
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "2px",
								color: "#000000",
							}}
						>
							<img src={star} alt="star" /> Favourites
						</div>
						<div className="tag active">CryptoCurrencies</div>
						<div className="tag">DeFi</div>
						<div className="tag">NFTs & Collectibles</div>
					</div>
					<div className="custom-sheet-number">
						<div>show rows</div>
						<select>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
				</div>
				{loading && <div className="loading">Loading...</div>}
				{!loading && (
					<div className="table-body">
						<table>
							<thead>
								<tr>
									<th></th>
									<th style={{ textAlign: "center" }}>#</th>
									<th style={{ textAlign: "left" }}>NAME</th>
									<th>PRICE</th>
									<th>24H</th>
									<th>7D</th>
									<th>MARKET CAP</th>
									<th>VOLUME(24H)</th>
									<th>CIRCULATING SUPPLY</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, index) => {
									return (
										<tr key={index}>
											<td>
												<img
													src={star}
													alt="favorite"
													style={{ cursor: "pointer" }}
												/>
											</td>
											<td style={{ color: "#808A9D", textAlign: "center" }}>
												{index + 1}
											</td>
											<td>
												<div className="name-container">
													<img
														src={item.image}
														alt={item.name}
														style={{ height: "1.5rem", width: "1.5rem" }}
													/>
													<div className="name">{item.name}</div>
													<div className="symbol" style={{ color: "#808A9D" }}>
														{item.symbol.toUpperCase()}
													</div>
												</div>
											</td>
											<td>${item.current_price.toLocaleString()}</td>
											<td>
												{item.price_change_percentage_24h_in_currency.toFixed(
													2
												)}
											</td>
											<td>
												{item.price_change_percentage_7d_in_currency.toFixed(2)}
											</td>
											<td>${item.market_cap.toLocaleString()}</td>
											<td>${item.total_volume.toLocaleString()}</td>
											<td>
												{item.circulating_supply.toLocaleString()}{" "}
												{item.symbol.toUpperCase()}
											</td>
											<td>
												<img
													src={option}
													alt="options"
													style={{ cursor: "pointer" }}
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
}

export default Table;
