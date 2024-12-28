import logo from "./logo.svg";
import "./App.css";
// import list from "./rankallot.json";
import { useState } from "react";
import insertdata from "./insert1.json";
import insertdata2 from "./insert2.json";
import { Table } from "antd";
import list from "./MOCK_DATA.json";

function App() {
	const [rankalloted, setRankalloted] = useState([]);
	const [checker, setChecker] = useState(0);
	const [withoutr2, setWithoutr2] = useState([]);

	const columns1 = [
		{
			title: "id",
			dataIndex: "id",
			key: "id"
		},
		{
			title: "r1",
			dataIndex: "r1",
			key: "r1"
		},
		{
			title: "r2",
			dataIndex: "r2",
			key: "r2"
		}
	];

	const columns2 = [
		{
			title: "id",
			dataIndex: "id",
			key: "id"
		},
		{
			title: "r1",
			dataIndex: "r1",
			key: "r1"
		},
		{
			title: "r2",
			dataIndex: "r2",
			key: "r2"
		}
	];

	// const comparefucntion = (a, b) => {
	// 	if (a.cutoff === b.cutoff) {
	// 		if (a.math === b.math) {
	// 			if (a.phy === b.phy) {
	// 				if (a.other === b.other) {
	// 				} else {
	// 					return b.other - a.other;
	// 				}
	// 			} else {
	// 				return b.phy - a.phy;
	// 			}
	// 		} else {
	// 			return b.math - a.math;
	// 		}
	// 	} else {
	// 		return b.cutoff - a.cutoff;
	// 	}
	// };

	// const allotrank = () => {
	// 	var sorttedlist = list.sort((a, b) => {
	// 		return comparefucntion(a, b);
	// 	});

	// 	sorttedlist.forEach((e, index) => {
	// 		e["rank"] = index + 1;
	// 		e["charval"] = 0;
	// 		return e;
	// 	});

	// 	console.log(sorttedlist);
	// 	setRankalloted(sorttedlist);
	// 	setChecker(1);
	// };

	const split = () => {
		const data = list;
		const without = [];

		for (var i = 0; i < data.length; i++) {
			if (data[i].r2 == null) {
				without.push(data[i]);
				data.splice(i, 1);
				i--;
			}
		}

		var sorttedrankallot = data.sort((a, b) => {
			return a.r1 - b.r1;
		});

		setRankalloted(sorttedrankallot);
		setWithoutr2(without);
		console.log(sorttedrankallot);
		console.log(without);
	};

	const insert1 = () => {
		// console.log(withoutr2);
		const ranges = [];

		for (let indexrank = 0; indexrank < rankalloted.length - 1; indexrank++) {
			const rankelement = rankalloted[indexrank];
			const rankelement2 = rankalloted[indexrank + 1];

			const interval = {
				index: -1,
				rankgroup: -1,
				inserts: []
			};

			for (let indexinsert = 0; indexinsert < withoutr2.length; indexinsert++) {
				const elementinsert = withoutr2[indexinsert];
				// // console.log(rankelement.r1);
				console.log(elementinsert.r1);
				// // console.log(rankelement2.r1);

				if (
					elementinsert.r1 < rankelement2.r1 &&
					elementinsert.r1 > rankelement.r1
				) {
					interval.index = indexrank + 1;
					interval.rankgroup = rankelement.r2;
					interval.inserts.push(elementinsert);
					interval.inserts = interval.inserts.sort((a, b) => {
						return a.r1 - b.r1;
					});
				}
			}

			if (interval.index !== -1) {
				ranges.push(interval);
			}
		}

		ranges.forEach((rangeitem) => {
			rangeitem.inserts.forEach((e, index) => {
				e["r2"] = rangeitem.rankgroup + String.fromCharCode(97 + index);
				e["iter"] = 1;
				e["charval"] = index;
				rankalloted.push(e);
			});
		});

		var sorttedrankallot = rankalloted.sort((a, b) => {
			return a.r1 - b.r1;
		});

		setRankalloted(sorttedrankallot);
		setChecker(2);
		console.log(sorttedrankallot);
	};

	const insert2 = () => {
		const ranges = [];

		for (let indexrank = 0; indexrank < rankalloted.length - 1; indexrank++) {
			const rankelement = rankalloted[indexrank];
			const rankelement2 = rankalloted[indexrank + 1];

			const interval = {
				mem: -1,
				index: -1,
				rankgroup: -1,
				inserts: []
			};

			for (
				let indexinsert = 0;
				indexinsert < insertdata2.length;
				indexinsert++
			) {
				const elementinsert = insertdata2[indexinsert];

				//for aa condition

				if (
					elementinsert.cutoff < rankelement.cutoff &&
					elementinsert.cutoff > rankelement2.cutoff &&
					rankelement2.iter === 1 &&
					rankelement.iter === undefined
				) {
					interval.index = indexrank + 1;
					interval.rankgroup = rankelement2.rank;
					interval.inserts.push(elementinsert);
					interval.inserts = interval.inserts.sort((a, b) => {
						return b.cutoff - a.cutoff;
					});
				}

				// for 4a, 5 condition
				else if (
					elementinsert.cutoff < rankelement.cutoff &&
					elementinsert.cutoff > rankelement2.cutoff &&
					rankelement.iter === 1 &&
					rankelement2.iter === undefined
				) {
					console.log(rankelement2);

					interval.mem = rankelement.charval + 1;
					interval.index = indexrank + 1;
					interval.rankgroup = rankelement.rank;
					interval.inserts.push(elementinsert);
					interval.inserts = interval.inserts.sort((a, b) => {
						return b.cutoff - a.cutoff;
					});
				}

				//for 4a,4b inbtw insert
				else if (
					elementinsert.cutoff < rankelement.cutoff &&
					elementinsert.cutoff > rankelement2.cutoff &&
					rankelement2.iter !== undefined &&
					rankelement.iter !== undefined
				) {
					interval.index = indexrank + 1;
					interval.rankgroup = rankelement2.rank;
					interval.inserts.push(elementinsert);
					interval.inserts = interval.inserts.sort((a, b) => {
						return b.cutoff - a.cutoff;
					});
				}

				//for normal insertion
				else if (
					elementinsert.cutoff < rankelement.cutoff &&
					elementinsert.cutoff > rankelement2.cutoff
				) {
					interval.index = indexrank + 1;
					interval.rankgroup = rankelement.rank;
					interval.inserts.push(elementinsert);
					interval.inserts = interval.inserts.sort((a, b) => {
						return b.cutoff - a.cutoff;
					});
				}
			}

			if (interval.index !== -1) {
				ranges.push(interval);
			}
		}

		ranges.forEach((rangeitem) => {
			if (rangeitem.mem === -1) {
				rangeitem.inserts.forEach((e, index) => {
					e["rank"] = rangeitem.rankgroup + String.fromCharCode(97 + index);
					e["iter"] = 2;
					rankalloted.push(e);
				});
			} else {
				rangeitem.inserts.forEach((e, index) => {
					e["rank"] =
						rangeitem.rankgroup[0] +
						String.fromCharCode(97 + index + rangeitem.mem);
					e["iter"] = 2;
					rankalloted.push(e);
				});
			}
		});

		var sorttedrankallot = rankalloted.sort((a, b) => {
			return b.cutoff - a.cutoff;
		});

		setRankalloted(sorttedrankallot);
		setChecker(3);

		console.log(sorttedrankallot);
	};

	return (
		<div className="App">
			<button
				onClick={() => {
					// allotrank();
					split();
				}}
			>
				Allot Rank
			</button>
			<button
				onClick={() => {
					insert1();
				}}
			>
				Insert 1
			</button>
			<button
				onClick={() => {
					insert2();
				}}
			>
				Insert Further
			</button>

			<div>
				{checker === 0 && (
					<Table dataSource={list} columns={columns1} pagination={false} />
				)}
				{checker === 1 && (
					<Table
						dataSource={rankalloted}
						columns={columns2}
						pagination={false}
					/>
				)}
				{checker === 2 && (
					<Table
						dataSource={rankalloted}
						columns={columns2}
						pagination={false}
					/>
				)}
				{checker === 3 && (
					<Table
						dataSource={rankalloted}
						columns={columns2}
						pagination={false}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
