function connectToDatabase() {
    let randomTime = Math.floor(Math.random() * 2000) + 1;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Connection Established');
            randomTime % 2 ? resolve("data") : reject("oops");
        }, randomTime);
    });
}

function queryData(query) {
    let randomTime = Math.floor(Math.random() * 1000) + 1;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Query Complete: ' + query);
            randomTime % 2 ? resolve("data") : reject("oops");
        }, randomTime);
    });
}

// connectToDatabase()
//     .then((data) => {
//         console.log("Connect Success: " + data);

//         queryData("SELECT * FROM users")
//             .then((data) => {
//                 console.log("Query Success:" + data);
//             })
//             .catch((err) => {
//                 console.log("Query Failed: " + err);
//             });
//     })
//     .catch((err) => {
//         console.log("Connect Failed:" + err);
//     });

// connectToDatabase()
//     .then((data) => {
//         console.log("Connect Success: " + data);

//         return queryData("SELECT * FROM users");
//     })
//     .then((data) => {
//         console.log("Query Success:" + data);
//     })
//     .catch((err) => {
//         console.log("Connect Failed:" + err);
//     });

async function performDatabaseOperations() {
    try {
        await connectToDatabase();
        await queryData("SELECT * FROM users");
    } catch (err) {
        console.log("Operation Failed: " + err);
    }
};

performDatabaseOperations();