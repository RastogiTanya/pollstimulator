let previousStudent = {};
let candidate = {};
let currentPoll = {};
module.exports = {
	addCandidate: (candidateId, name) => {
		candidate[candidateId] = name;
	},
	getAll: () => {
		return { currentPoll: currentPoll, candidate: candidate };
	},
	vote: (studentId, candidateId) => {
		if (previousStudent[studentId] == undefined) {
			previousStudent[studentId] = 1;
			if (currentPoll[candidateId] != undefined) {
				currentPoll[candidateId] = currentPoll[candidateId] + 1;
			} else {
				currentPoll[candidateId] = 1;
			}
			return 1;
		} else {
			return 0;
		}
	},

	getWinner: function () {
		var max = -1;
		var id;
		for (var current in currentPoll) {
			if (currentPoll[current] > max) {
				max = currentPoll[current];
				id = current;
			}
		}

		return { id: id, vote: max };
	},
};
