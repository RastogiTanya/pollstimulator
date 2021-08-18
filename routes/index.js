var express = require("express");
var router = express.Router();
var dataAccess = require("../datalayer/data");

/* GET home page. */
router.get("/", async (req, res) => {
	res.render("menu", { title: "Catalogue" });
});

/* Add candidate , done by admin only */
router.get("/add", function (req, res, next) {
	res.render("admin", { title: "Add Candidate", show: false });
});

router.post("/add", (req, res) => {
	// dataAccess.addCandidate();
	dataAccess.addCandidate(req.body.studentId, req.body.name);

	res.render("admin", { title: "Add Candidate", show: true });
});

router.get("/result", (req, res) => {
	let poll = dataAccess.getAll().currentPoll;
	let candidate = dataAccess.getAll().candidate;
	let data = [];

	for (let current in poll) {
		data.push({ name: candidate[current], vote: poll[current] });
	}

	data.sort((a, b) => {
		return a.vote > b.vote ? -1 : 1;
	});

	res.render("result", { title: "Result", data, data });
});

module.exports = router;
