var correctChart = document.getElementById("correct").getContext('2d');
var topicChart = document.getElementById("topic").getContext('2d');
var answersChart = document.getElementById("answers").getContext('2d');
var ratioChart = document.getElementById("ratio").getContext('2d');
var correctChartBE = document.getElementById("correct__be").getContext('2d');
var badge = {
    "bronze": "#CD7F32",
    "silver": "silver",
    "gold": "gold"
};

window.addEventListener("load", function() {
    guestViewCharts();
    
    if(sessionStorage.getItem("user_id") != 'null' && sessionStorage.getItem("site") != 'null') {

        SE.eventWrapper(SE.getBaseStats);
        SE.eventWrapper(SE.getTagsStats);
        SE.eventWrapper(SE.getAnswersStats);
        SE.eventWrapper(SE.getTopTagsStats);
        
        fetch("http://127.0.0.1:5500/statistics?account_id=" + 43279)
        .then(response => response.json())
        .then(response => {
            window.postMessage({
                type: AppConfig.EVENTS.RECEIVED_BE_STATISTICS,
                payload: response
            });
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        showPopupError("Need to authenticate!");
    }
});


window.addEventListener('message', (event) => {
    if (event.data.type === AppConfig.EVENTS.RECEIVED_BASE_STATISTICS) {
        if (event.data.payload.badge_counts.gold > 0) {
            buildBadge(badge["gold"]);
        } else {
            if (event.data.payload.badge_counts.silver > 0) {
                buildBadge(badge["silver"]);
            }
        }
        buildBadge(badge["bronze"]);
        buildRatio(event.data.payload.up_vote_count, event.data.payload.down_vote_count);
    }
    if (event.data.type === AppConfig.EVENTS.RECEIVED_TAGS_STATISTICS) {
        let tags = [];
        let count = [];
        for (let i = 0; i < event.data.payload.length; ++i) {
            tags.push(event.data.payload[i].name.toUpperCase());
            count.push(event.data.payload[i].count);
        }
        buildFavoriteTags(tags, count, Math.pow(10, Math.max(...count).toString().length - 1));
    }
    if (event.data.type === AppConfig.EVENTS.RECEIVED_ANSWERS_STATISTICS) {
        let accepted = 0;
        for (let i = 0; i < event.data.payload.length; ++i) {
            if (event.data.payload[i].accepted) {
                ++accepted;
            }
        }
        buildCorrectAnswers(accepted, event.data.payload.length - accepted, correctChart);
        setPercentage((accepted / event.data.payload.length).toFixed(2) * 100, "percentage");
    }
    if (event.data.type === AppConfig.EVENTS.RECEIVED_TOP_TAGS_STATISTICS) {
        let tags = []
        let values = []
        for (let i = 0; i < event.data.payload.length; ++i) {
            tags.push(event.data.payload[i].tag_name.toUpperCase());
            values.push(event.data.payload[i].answer_score);
        }
        buildTopTags(tags, values, Math.pow(10, Math.max(...values).toString().length - 1));
    }
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

function buildCorrectAnswers(accepted, pending, canvas) {
    var correct = new Chart(canvas, {
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

function buildBadge(color) {
    let badgeSvg = document.getElementById("type");
    badgeSvg.style = "fill: " + color + ";";
}

function setPercentage(percentage, id) {
    let elem = document.getElementById(id)
    elem.innerHTML = percentage + "%";
}

function setStorageItems(id, item) {
    if (item !== null) {
        sessionStorage.setItem(id, item);
    } else {
        showPopupError("Invalid querry parameter!");
    }
}

function guestViewCharts() {
    if (sessionStorage.getItem("authenticated") === null) {
        let urlParams = new URLSearchParams(window.location.search);
        setStorageItems("user_id", urlParams.get("user_id"))
        setStorageItems("site", urlParams.get("site"))
    }
}