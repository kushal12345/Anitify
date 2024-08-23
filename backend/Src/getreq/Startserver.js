function startServer (app,PORT){
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}

export default startServer;