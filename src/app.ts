import appInit from "./server";
const port = process.env.PORT;

appInit()
    .then((app) => {
        app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
        });
    })
    .catch(() => {
        console.log("Error Fail Starting the server");
    });


    