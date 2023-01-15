import React, { useState, useEffect, useMemo } from "react";

import axios from "axios";

import Pagination from "./Pagination";
import "../styles/table.css";
import star from "../assets/star.svg";
import upArrow from "../assets/up-arrow.svg";
import downArrow from "../assets/down-arrow.svg";
import equal from "../assets/equal.svg";

function Modal({ data, setOpenModal }) {
	return (
		<>
			<div className="modal-container">
				<div className="modal-header">
					<div className="modal-header-left">
						<div className="modal-header-left-image">
							<img src={data.image} alt="coin" />
						</div>
						<div className="modal-header-left-name">{data.name}</div>
					</div>
					<div
						className="modal-header-right"
						onClick={() => {
							setOpenModal(false);
							document.body.style.overflow = "auto";
							document.body.style.height = "auto";
						}}
					>
						<div className="modal-header-right-close">X</div>
					</div>
				</div>
				<div className="price-modal-row">
					<div className="flex-column">
						<div className="price-modal-row-title">PRICE</div>
						<div>${data.current_price.toLocaleString()}</div>
					</div>
					<div className="flex-column">
						<div className="price-modal-row-title">24H</div>
						<div
							style={{
								color:
									data.price_change_percentage_24h_in_currency > 0
										? "#16C784"
										: data.price_change_percentage_24h_in_currency < 0
										? "#EA3943"
										: data.price_change_percentage_24h_in_currency === 0
										? "#000000"
										: "",
							}}
						>
							{data.price_change_percentage_24h_in_currency > 0 && (
								<img
									src={upArrow}
									alt="up"
									style={{ height: "0.5rem", width: "0.5rem" }}
								/>
							)}
							{data.price_change_percentage_24h_in_currency < 0 && (
								<img
									src={downArrow}
									alt="down"
									style={{ height: "0.5rem", width: "0.5rem" }}
								/>
							)}
							{data.price_change_percentage_24h_in_currency === 0 && (
								<img
									src={equal}
									alt="equal"
									style={{ height: "0.5rem", width: "0.5rem" }}
								/>
							)}

							<span>
								{data.price_change_percentage_24h_in_currency.toFixed(2)}%
							</span>
						</div>
					</div>
					<div className="flex-column">
						<div className="price-modal-row-title">7D</div>
						{/* API Data doesn't give the price change in 7d for one or more of the coins, putting null in that case */}
						<div
							style={{
								color:
									data.price_change_percentage_24h_in_currency > 0
										? "#16C784"
										: data.price_change_percentage_24h_in_currency < 0
										? "#EA3943"
										: data.price_change_percentage_24h_in_currency === 0
										? "#000000"
										: "",
							}}
						>
							{data.price_change_percentage_7d_in_currency > 0 && (
								<img
									src={upArrow}
									alt="up"
									style={{ height: "0.5rem", width: "0.5rem" }}
								/>
							)}
							{data.price_change_percentage_7d_in_currency < 0 && (
								<img
									src={downArrow}
									alt="down"
									style={{ height: "0.5rem", width: "0.5rem" }}
								/>
							)}
							{data.price_change_percentage_7d_in_currency === 0 && (
								<img
									src={equal}
									alt="equal"
									style={{ height: "0.5rem", width: "0.5rem" }}
								/>
							)}
							<span>
								{data.price_change_percentage_7d_in_currency
									? data.price_change_percentage_7d_in_currency.toFixed(2)
									: "null"}
								%
							</span>
						</div>
					</div>
				</div>
				<div className="price-modal-row">
					<div className="flex-column">
						<div className="price-modal-row-title">MARKET CAP</div>
						<div>${data.market_cap.toLocaleString()}</div>
					</div>
				</div>
				<div className="price-modal-row">
					<div className="flex-column">
						<div className="price-modal-row-title">VOLUME (24H)</div>
						<div>
							${data.total_volume.toLocaleString()}{" "}
							<span
								style={{
									fontSize: "0.9rem",
									color: "#9E9E9E",
									fontWeight: "500",
								}}
							>
								(
								{Math.ceil(
									data.total_volume / data.current_price
								).toLocaleString()}{" "}
								{data.symbol.toUpperCase()})
							</span>
						</div>
					</div>
				</div>
				<div className="price-modal-row">
					<div className="flex-column">
						<div className="price-modal-row-title">CIRCULATING SUPPLY</div>
						<div>
							<div>
								{data.circulating_supply.toLocaleString()}{" "}
								{data.symbol.toUpperCase()}
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
											(data.circulating_supply / data.total_supply) * 100,
											100
										)}%`,
										transform: "translateY(-100%)",
									}}
								/>
							</div>
						</div>
					</div>
				</div>
            <div className="price-modal-row">
            </div>
			</div>
		</>
	);
}
function TableMobile() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [numRows, setNumRows] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [numPages, setNumPages] = useState([]);

	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState({});

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
			{openModal && (
				<div className="modal">
					<Modal data={modalData} setOpenModal={setOpenModal} />
				</div>
			)}
			<div className="table">
				<div className="table-heading">
					Top 100 Cryptocurrencies by Market Cap
				</div>
				<div className="table-header">
					<div className="tag-container"></div>
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
										<th style={{ textAlign: "right" }}></th>
										<th style={{ textAlign: "left" }}>NAME</th>
										<th>PRICE</th>
										<th>24H</th>
									</tr>
								</thead>
								<tbody>
									{data.map((item, index) => {
										return (
											<tr
												key={index}
												onClick={() => {
													setOpenModal(true);
													setModalData(item);
													document.body.style.height = "100vh";
													document.body.style.overflow = "hidden";
												}}
											>
												<td>
													<img
														src={star}
														alt="favorite"
														style={{ cursor: "pointer" }}
													/>
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

export default TableMobile;
