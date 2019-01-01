var correctChart = document.getElementById("correct").getContext('2d');
var topicChart = document.getElementById("topic").getContext('2d');
var answersChart = document.getElementById("answers").getContext('2d');
var ratioChart = document.getElementById("ratio").getContext('2d');
var badge = {
    "bronze": "#CD7F32",
    "silver": "silver",
    "gold": "gold"
};

SE.getBaseStats()
    .then((result) => {
        if (result.badge_counts.gold > 0) {
            buildBadge(badge["gold"]);
        } else {
            if (result.badge_counts.silver > 0) {
                buildBadge(badge["silver"]);
            }
        }
        buildBadge(badge["bronze"]);
        buildRatio(result.up_vote_count, result.down_vote_count);
    }).catch((err) => {
        showPopupError(err);
    });

SE.getTagsStats()
    .then((result) => {
        let tags = [];
        let count = [];
        for (let i = 0; i < result.length; ++i) {
            tags.push(result[i].name.toUpperCase());
            count.push(result[i].count);
        }
        buildFavoriteTags(tags, count, Math.pow(10, Math.max(...count).toString().length - 1));
    }).catch((err) => {
        showPopupError(err);
    });

SE.getAnswersStats()
    .then((result) => {
        let accepted = 0;
        for (let i = 0; i < result.length; ++i) {
            if (result[i].accepted) {
                ++accepted;
            }
        }
        buildCorrectAnswers(accepted, result.length - accepted);
        setPercentage((accepted / result.length).toFixed(2) * 100);
    }).catch((err) => {
        showPopupError(err);
    });

SE.getTopTagsStats()
    .then((result) => {
        let tags = []
        let values = []
        for (let i = 0; i < result.length; ++i) {
            tags.push(result[i].tag_name.toUpperCase());
            values.push(result[i].answer_score);
        }
        buildTopTags(tags, values, Math.pow(10, Math.max(...values).toString().length - 1));
    }).catch((err) => {
        showPopupError(err);
    });

function buildRatio(upvoteCount, downvoteCount) {
    var accuracy = new Chart(ratioChart, {
        type: 'pie',
        data: {
            labels: ["Upvote", "Downvote"],
            datasets: [{
                label: '# of Votes',
                data: [upvoteCount, downvoteCount],
                backgroundColor: [
                    'rgba(0,206,153,0.8)',
                    'rgba(220, 20, 60, 0.8)',
                ],
                borderColor: [
                    'rgba(0,206,153,1)',
                    'rgba(220, 20, 60, 1)',
                ],
                borderWidth: 1,
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: 'white'
                }
            }
        }
    });
}

function buildFavoriteTags(tags, count, step) {
    var topic = new Chart(topicChart, {
        type: 'line',
        data: {
            labels: tags,
            datasets: [{
                label: '# of Tags',
                data: count,
                backgroundColor: 'rgba(0,206,153,0.8)',
                borderColor: 'rgba(0,206,153,1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: 'white',
                        stepSize: step
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'white',
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: 'white',
                }
            }
        }
    });
}

function buildCorrectAnswers(accepted, pending) {
    var correct = new Chart(correctChart, {
        type: 'doughnut',
        data: {
            labels: ["Accepted", "Pending"],
            datasets: [{
                label: '# of Answers',
                data: [accepted, pending],
                backgroundColor: [
                    'rgba(0,206,153,0.8)',
                    'rgba(220, 20, 60, 0.8)',
                ],
                borderColor: [
                    'rgba(0,206,153,1)',
                    'rgba(220, 20, 60, 1)',
                ],
                borderWidth: 1
            }]
        },

        options: {
            cutoutPercentage: 85,
            scales: {
                yAxes: [{
                    ticks: {
                        display: false,
                        fontColor: 'white'
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: 'white'
                }
            }
        }
    });
}

function buildTopTags(tags, values, step) {
    var answers = new Chart(answersChart, {
        type: 'bar',
        data: {
            labels: tags,
            datasets: [{
                label: '# of Score',
                data: values,
                backgroundColor: 'rgba(0,206,153,0.8)',
                borderColor: 'rgba(0,206,153,1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'white',
                        stepSize: step,
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'white'
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: 'white'
                }
            }
        }
    });

}

function buildBadge(value) {
    let badgeSvg = document.getElementById("type");
    badgeSvg.style = "fill: " + value + ";";
}

function setPercentage(ratio) {
    let elem = document.getElementById("percentage")
    elem.innerHTML = ratio + "%";
}