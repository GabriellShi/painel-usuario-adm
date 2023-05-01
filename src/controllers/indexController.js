const indexController = {
    // Pode retornar uma página ou não
    home: (req, res) => {
        return res.render("index", {title: "Pagina do Anime", //user: req.cookies.user,
    })
    },
};



module.exports = indexController;

