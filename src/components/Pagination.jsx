import React from 'react'

function Pagination({ numPages, currentPage, handlePageClick }) {
	return (
		<div className="pagination">
			<button
				className="page-number"
				disabled={currentPage === 1}
				style={{
					borderColor: currentPage === 1 ? "#919EAB" : "#DFE3E8",
					color: currentPage === 1 ? "#C4CDD5" : "#000000",
					cursor: currentPage === 1 ? "not-allowed" : "pointer",
					backgroundColor: currentPage === 1 ? "#919EAB" : "#FFFFFF00",
				}}
				onClick={() => handlePageClick(currentPage - 1)}
			>
				{"<"}
			</button>
			<div
				key={1}
				className="page-number"
				onClick={() => handlePageClick(1)}
				style={{
					borderColor: currentPage === 1 ? "#0052FE" : "#DFE3E8",
					color: currentPage === 1 ? "#0052FE" : "#000000",
				}}
			>
				{1}
			</div>
			{numPages.length > 1 && (
				<div
					key={2}
					className="page-number"
					onClick={() => handlePageClick(2)}
					style={{
						borderColor: currentPage === 2 ? "#0052FE" : "#DFE3E8",
						color: currentPage === 2 ? "#0052FE" : "#000000",
					}}
				>
					{2}
				</div>
			)}
			{(currentPage <= 2 || currentPage >= numPages.length - 1) &&
				numPages.length > 4 && (
					<div
						className="page-number"
						style={{
							borderColor: "#DFE3E8",
							color: "#000000",
						}}
					>
						...
					</div>
				)}
			{currentPage > 3 && currentPage < numPages.length - 1 && (
				<div
					className="page-number"
					style={{
						borderColor: "#DFE3E8",
						color: "#000000",
					}}
				>
					...
				</div>
			)}
			{numPages.slice(2, numPages.length - 2).map((number) =>
				currentPage === number ? (
					<div
						key={number}
						className="page-number"
						onClick={() => handlePageClick(number)}
						style={{
							borderColor: number === currentPage ? "#0052FE" : "#DFE3E8",
							color: number === currentPage ? "#0052FE" : "#000000",
						}}
					>
						{number}
					</div>
				) : null
			)}
			{currentPage < numPages - 2 && currentPage > 2 && (
				<div
					className="page-number"
					style={{
						borderColor: "#DFE3E8",
						color: "#000000",
					}}
				>
					...
				</div>
			)}
			{numPages.length > 3 ? (
				<>
					<div
						key={numPages.length - 1}
						className="page-number"
						onClick={() => handlePageClick(numPages.length - 1)}
						style={{
							borderColor:
								currentPage === numPages.length - 1 ? "#0052FE" : "#DFE3E8",
							color:
								currentPage === numPages.length - 1 ? "#0052FE" : "#000000",
						}}
					>
						{numPages.length - 1}
					</div>
					<div
						key={numPages.length}
						className="page-number"
						onClick={() => handlePageClick(numPages.length)}
						style={{
							borderColor:
								currentPage === numPages.length ? "#0052FE" : "#DFE3E8",
							color: currentPage === numPages.length ? "#0052FE" : "#000000",
						}}
					>
						{numPages.length}
					</div>
				</>
			) : null}
			<button
				className="page-number"
				disabled={currentPage === numPages.length}
				onClick={() => handlePageClick(currentPage + 1)}
				style={{
					borderColor: currentPage === numPages.length ? "#919EAB" : "#DFE3E8",
					color: currentPage === numPages.length ? "#C4CDD5" : "#000000",
					cursor: currentPage === numPages.length ? "not-allowed" : "pointer",
					backgroundColor:
						currentPage === numPages.length ? "#919EAB" : "#FFFFFF00",
				}}
			>
				{">"}
			</button>
		</div>
	);
}

export default Pagination