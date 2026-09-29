import express from "express";

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.json({message: 'sucess'});
})

const PORT = process.env.PORT ?? 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));