import logo from "./logo.svg";
import "./App.css";
import list from "./rankallot.json";
import { useState } from "react";
import insertdata from "./insert1.json";
import insertdata2 from "./insert2.json";
import { Table } from "antd";

function App() {
	const [rankalloted, setRankalloted] = useState([]);
	const [checker, setChecker] = useState(0);

	const columns1 = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Cutoff",
			dataIndex: "cutoff",
			key: "cutoff"
		}
	];

	const columns2 = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "cutoff",
			dataIndex: "cutoff",
			key: "cutoff"
		},
		{
			title: "rank",
			dataIndex: "rank",
			key: "rank"
		}
	];

	const allotrank = () => {
		var sorttedlist = list.sort((a, b) => {
			return b.cutoff - a.cutoff;
		});

		sorttedlist.forEach((e, index) => {
			e["rank"] = index + 1;
			return e;
		});

		console.log(sorttedlist);
		setRankalloted(sorttedlist);
		setChecker(1);
	};

	const insert1 = () => {
		const ranges = [];

		for (let indexrank = 0; indexrank < rankalloted.length - 1; indexrank++) {
			const rankelement = rankalloted[indexrank];
			const rankelement2 = rankalloted[indexrank + 1];

			const interval = {
				index: -1,
				rankgroup: -1,
				inserts: []
			};

			for (
				let indexinsert = 0;
				indexinsert < insertdata.length;
				indexinsert++
			) {
				const elementinsert = insertdata[indexinsert];

				if (
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
			rangeitem.inserts.forEach((e, index) => {
				e["rank"] = rangeitem.rankgroup + String.fromCharCode(97 + index);
				e["iter"] = 1;
				e["charval"] = index;
				rankalloted.push(e);
			});
		});

		var sorttedrankallot = rankalloted.sort((a, b) => {
			return b.cutoff - a.cutoff;
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
					allotrank();
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
				{checker === 0 && <Table dataSource={list} columns={columns1} />}
				{checker === 1 && <Table dataSource={rankalloted} columns={columns2} />}
				{checker === 2 && <Table dataSource={rankalloted} columns={columns2} />}
				{checker === 3 && <Table dataSource={rankalloted} columns={columns2} />}
			</div>
		</div>
	);
}

export default App;
