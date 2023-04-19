#!/usr/bin/env node
import minimist from "minimist";
import express from "express"; 
import "./lib/rpsls.js";
import rpsls from "./lib/rpsls.js";

var argv = minimist(process.argv.slice(2)); 

const PORT = argv.port || 5000; 

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

app.listen(PORT);
app.get("/app", (_, rs) => {
    rs.send("200 OK"); 
})
app.get("/app/rps", (_, rs) => {
    rs.send(JSON.stringify(rpsls.rpsDef())); 
}) 
app.get("/app/rpsls", (_, rs) => {
    rs.send(JSON.stringify(rpsls.rpslsDef())); 
})
app.post("/app/rps/play", (rq, rs) => {
    rs.send(JSON.stringify(rpsls.rps(rq.body["shot"])))
})
app.get("/app/rps/play", (rq, rs) => {
    rs.send(JSON.stringify(rpsls.rps(rq.query["shot"])))
})
app.get("/app/rps/play/:shot", (rq, rs) => {
    rs.send(JSON.stringify(rpsls.rps(rq.params["shot"])))
})
app.post("/app/rps/play", (rq, rs) => {
    rs.send(JSON.stringify(rpsls.rpsls(rq.body["shot"])))
})
app.get("/app/rpsls/play", (rq, rs) => {
    rs.send(JSON.stringify(rpsls.rpsls(rq.query["shot"])))
})
app.post("/app/rps/play/:shot", (rq, rs) => {
    rs.send(JSON.stringify(rpsls.rpsls(rq.params["shot"])))
})
app.get("*", (_, rs) => {
    rs.send("404 NOT FOUND")
})


