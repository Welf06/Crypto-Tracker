import React, { useState, useEffect, useMemo } from "react";

import axios from "axios";

import Pagination from "./Pagination";
import "../styles/table.css";
import star from "../assets/star.svg";
import option from "../assets/option.svg";
import upArrow from "../assets/up-arrow.svg";
import downArrow from "../assets/down-arrow.svg";
import equal from "../assets/equal.svg";


function Table() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [numRows, setNumRows] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [numPages, setNumPages] = useState([]);

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
		// Assuming we are dealing with a maximum of 100 coins, as given in the task doc
		// setNumPages([...Array(Math.ceil(100 / numRows)+1).keys()]);
	}, [numRows, currentPage]);

	useEffect(() => {
		setNumPages(
			Array.from({ length: Math.ceil(100 / numRows) }, (_, i) => i + 1)
		);
	}, [numRows]);

	useEffect(() => {
		if (data.length > 0) setLoading(false);
	}, [data]);

	const handlePageClick = (page) => {
		setCurrentPage(page);
	};

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
						<select
							value={numRows}
							onChange={(e) => setNumRows(e.target.value)}
						>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
				</div>
				{loading && <div className="loading">Loading...</div>}
				{!loading && (
					<>
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
													{numRows * (currentPage - 1) + index + 1}
												</td>
												<td>
													<div className="name-container">
														<img
															src={item.image}
															alt={item.name}
															style={{ height: "1.5rem", width: "1.5rem" }}
														/>
														<div className="name">{item.name}</div>
														<div
															className="symbol"
															style={{ color: "#808A9D" }}
														>
															{item.symbol.toUpperCase()}
														</div>
													</div>
												</td>
												<td>${item.current_price.toLocaleString()}</td>
												<td
													className="arrow-container"
													style={{
														color:
															item.price_change_percentage_24h_in_currency > 0
																? "#16C784"
																: item.price_change_percentage_24h_in_currency <
																  0
																? "#EA3943"
																: item.price_change_percentage_24h_in_currency ===
																  0
																? "#000000"
																: "",
													}}
												>
													{item.price_change_percentage_24h_in_currency > 0 && (
														<img
															src={upArrow}
															alt="up"
															style={{ height: "0.5rem", width: "0.5rem" }}
														/>
													)}
													{item.price_change_percentage_24h_in_currency < 0 && (
														<img
															src={downArrow}
															alt="down"
															style={{ height: "0.5rem", width: "0.5rem" }}
														/>
													)}
													{item.price_change_percentage_24h_in_currency ===
														0 && (
														<img
															src={equal}
															alt="equal"
															style={{ height: "0.5rem", width: "0.5rem" }}
														/>
													)}

													<span>
														{item.price_change_percentage_24h_in_currency.toFixed(
															2
														)}
													</span>
												</td>
												<td
													className="arrow-container"
													style={{
														color:
															item.price_change_percentage_7d_in_currency > 0
																? "#16C784"
																: item.price_change_percentage_7d_in_currency <
																  0
																? "#EA3943"
																: item.price_change_percentage_7d_in_currency ===
																  0
																? "#000000"
																: "",
													}}
												>
													{/* API Data doesn't give the price change in 7d for one or more of the coins, putting null in that case */}
													{item.price_change_percentage_7d_in_currency > 0 && (
														<img
															src={upArrow}
															alt="up"
															style={{ height: "0.5rem", width: "0.5rem" }}
														/>
													)}
													{item.price_change_percentage_7d_in_currency < 0 && (
														<img
															src={downArrow}
															alt="down"
															style={{ height: "0.5rem", width: "0.5rem" }}
														/>
													)}
													{item.price_change_percentage_7d_in_currency ===
														0 && (
														<img
															src={equal}
															alt="equal"
															style={{ height: "0.5rem", width: "0.5rem" }}
														/>
													)}
													<span>
														{item.price_change_percentage_7d_in_currency
															? item.price_change_percentage_7d_in_currency.toFixed(
																	2
															  )
															: "null"}
													</span>
												</td>
												<td>${item.market_cap.toLocaleString()}</td>
												<td>
													<div>${item.total_volume.toLocaleString()}</div>
													<div
														style={{
															fontSize: "0.7rem",
															color: "#9E9E9E",
															fontWeight: "500",
														}}
													>
														{Math.ceil(
															item.total_volume / item.current_price
														).toLocaleString()}{" "}
														{item.symbol.toUpperCase()}
													</div>
												</td>
												<td>
													<div>
														{item.circulating_supply.toLocaleString()}{" "}
														{item.symbol.toUpperCase()}
													</div>
													<div className="progress-container">
														<hr
															style={{
																border: "0.2rem solid #EFF2F5",
																borderRadius: "5px",
																backgroundColor: "#EFF2F5",
																width: "100%",
																marginTop: "0.5rem",
															}}
														/>
														<hr
															style={{
																border: "0.2rem solid #CFD6E4",
																borderRadius: "5px",
																backgroundColor: "#CFD6E4",
																width: `${Math.min(
																	(item.circulating_supply /
																		item.total_supply) *
																		100,
																	100
																)}%`,
																transform: "translateY(-100%)",
															}}
														/>
													</div>
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
					</>
				)}
				<div className="table-footer">
					{/* pagination in bottom right */}
					<Pagination
						numPages={numPages}
						currentPage={currentPage}
						handlePageClick={handlePageClick}
					/>
				</div>
			</div>
		</>
	);
}

export default Table;
